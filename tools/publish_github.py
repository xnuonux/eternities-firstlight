#!/usr/bin/env python3
"""Bootstrap a private approved GitHub repository. Requires local GitHub CLI login.
No history replacement, merge, deployment, token entry, or global Git configuration changes.
Default mode only describes the proposed action. Remote publication was not
available in the originating ChatGPT session; live transport is not certified.
"""
from __future__ import annotations
import argparse
import json
from pathlib import Path
import re
import shutil
import subprocess
import sys

ALLOWLIST = {"xnuonux/eternities-firstlight", "xnuonux/eternities-heaven"}
OWNER = "xnuonux"
ROOT = Path(__file__).resolve().parents[1]


def validate_target(value: str) -> str:
    if value not in ALLOWLIST:
        raise ValueError("Target is not one of the two explicitly approved repositories")
    return value


def validate_remote_refs(text: str, local_sha: str) -> bool:
    """Return True only for an already identical main. Refuse any other history."""
    refs = []
    for line in text.splitlines():
        parts = line.split()
        if len(parts) != 2 or not re.fullmatch(r"[0-9a-f]{40,64}", parts[0]):
            raise ValueError("Malformed remote ref response")
        refs.append((parts[0], parts[1]))
    if not refs:
        return False
    if refs == [(local_sha, "refs/heads/main")]:
        return True
    raise ValueError("Remote is not empty or identical. Stop and use a reviewed branch/PR; never overwrite it")


def run(args: list[str], *, check: bool = True) -> subprocess.CompletedProcess:
    result = subprocess.run(args, cwd=ROOT, text=True, capture_output=True, timeout=120)
    if check and result.returncode:
        # Do not echo credential-helper output or raw provider diagnostics.
        raise RuntimeError(f"{args[0]} operation failed (exit {result.returncode}); inspect securely on this machine")
    return result


def git(*args: str, network: bool = False, check: bool = True):
    base = ["git"]
    if network:
        # Per-command helper, never a persisted token or a global credential change.
        base += ["-c", "credential.helper=", "-c", "credential.helper=!gh auth git-credential"]
    return run(base + list(args), check=check)


def restore_bundle() -> None:
    if (ROOT / ".git").exists():
        if git("rev-parse", "--show-toplevel").stdout.strip() != str(ROOT):
            raise ValueError("Unexpected working-tree root")
        return
    # Do not initialize or reset inside someone else's enclosing working tree.
    if git("rev-parse", "--show-toplevel", check=False).returncode == 0:
        raise ValueError("Extract this repository outside any other Git working tree")
    bundle = ROOT / "INITIAL.bundle"
    if not bundle.is_file():
        raise ValueError("No local repository or INITIAL.bundle; preserve the supplied source and investigate")
    git("init", "-b", "main")
    git("bundle", "verify", str(bundle))
    git("fetch", str(bundle), "refs/heads/main")
    # A mixed reset installs the history/index, never changes working file bytes.
    git("reset", "--mixed", "FETCH_HEAD")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--create-and-push", action="store_true", help="Explicitly authorize bootstrap of the named private repository")
    args = parser.parse_args()
    config = json.loads((ROOT / "REPOSITORY.json").read_text(encoding="utf-8"))
    target = validate_target(config["target"])
    if not args.create_and_push:
        print(json.dumps({"action": "plan_only", "target": target, "visibility": "private", "writes": False,
                          "next": "Read docs/GITHUB_PUBLICATION.md, then use --create-and-push on an authorized machine"}, indent=2))
        return 0
    if not shutil.which("git") or not shutil.which("gh") or not shutil.which("node"):
        raise RuntimeError("Install Git, GitHub CLI and Node.js on the authorized machine first")
    login = run(["gh", "api", "user", "--jq", ".login"]).stdout.strip()
    if login != OWNER:
        raise ValueError("GitHub CLI is not logged in as the expected owner; refusing")
    restore_bundle()
    if git("symbolic-ref", "--short", "HEAD").stdout.strip() != "main":
        raise ValueError("Bootstrap is restricted to the prepared main branch")
    if git("status", "--porcelain").stdout.strip():
        raise ValueError("Working tree contains changes. Review and commit them; this script never creates a commit")
    # Rebuild without external dependencies, then prove no tracked bytes changed.
    run([sys.executable, "build.py"])
    tests = sorted(str(p.relative_to(ROOT)) for p in (ROOT / "tests").glob("*.test.cjs"))
    run(["node", "--test", *tests])
    run([sys.executable, "-m", "unittest", "discover", "-s", "tests", "-p", "test_publication.py"])
    if git("status", "--porcelain").stdout.strip():
        raise ValueError("Rebuilding changed the committed output; stop and review")
    head = git("rev-parse", "HEAD").stdout.strip()
    url = "https://github.com/" + target + ".git"
    origin = git("remote", "get-url", "origin", check=False)
    if origin.returncode == 0 and origin.stdout.strip() != url:
        raise ValueError("Existing origin differs from the exact expected HTTPS remote")
    remote = run(["gh", "api", "repos/" + target], check=False)
    if remote.returncode:
        if "404" not in remote.stderr:
            raise RuntimeError("Repository check failed for a reason other than Not Found; no creation attempted")
        run(["gh", "repo", "create", target, "--private", "--description", config["description"]])
        remote = run(["gh", "api", "repos/" + target])
    metadata = json.loads(remote.stdout)
    if metadata.get("full_name") != target or metadata.get("private") is not True:
        raise ValueError("Resolved repository is not the expected private destination")
    refs = git("ls-remote", "--refs", url, network=True).stdout
    already = validate_remote_refs(refs, head)
    if not already:
        # Create-only lease guards a branch appearing after the empty-repository check.
        # Empty expected value means refs/heads/main MUST NOT EXIST; it cannot replace history.
        git("push", "--force-with-lease=refs/heads/main:", url, "HEAD:refs/heads/main", network=True)
    observed = git("ls-remote", "--refs", url, network=True).stdout
    if not validate_remote_refs(observed, head):
        raise RuntimeError("Remote main was not present after publication")
    if origin.returncode != 0:
        git("remote", "add", "origin", url)
    print(json.dumps({"status": "verified_remote_main", "repository": target,
                      "commit": head, "private": True, "already_present": already,
                      "deployed": False}, indent=2))
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except (ValueError, OSError, RuntimeError, subprocess.TimeoutExpired, json.JSONDecodeError) as exc:
        raise SystemExit("Publication stopped: " + str(exc))

# Firstlight 06 — playable source import handoff

Prepared 2026-09-11. Read alongside `FIRSTLIGHT_VERTICAL_SLICE_GDD.md`.

## Current remote boundary

This branch contains the implemented slice's design and this handoff, **not the full runnable source**. The full application is delivered in the originating conversation's `ETERNITIES_FIRSTLIGHT_06_REPOSITORY.zip`. Do not relabel this documentation PR as a completed source upload or deployment.

## Exact delivery identities

- ZIP: `ETERNITIES_FIRSTLIGHT_06_REPOSITORY.zip`
- ZIP bytes: **36,963,395**
- ZIP SHA-256: `20ce77c8ee972c0e68a658549d41b24d9275982d251c8da5acb352956d3478fa`
- Standalone: `FIRSTLIGHT_06_OFFLINE.html` (also `firstlight-06/FIRSTLIGHT_VALLEY.html` in ZIP)
- HTML bytes: **261,357**
- HTML SHA-256: `d71cf0dfac579132229e66f205393fc9955cdf90308b0b695362313c5b20bc77`
- Local source-bundle commit: `b7dc1deb37ba943d681560e181c94411c22c1b05` — **not a claimed remote commit**.

The package contains 167 entries, complete source, two identical playable HTML outputs, tests, current evidence, explicitly historical earlier evidence, the GDD and source-only Git history. The original generated concept illustrations are not substituted for browser screenshots or imported as game assets.

## Final tested scope

190 local rule tests passed, including 66 adventure cases. The fresh-world domain journey completed using accepted movement and gameplay commands with no inventory grants, position edits, planted defeats or direct story flags. Automated tactics and accelerated time are not a human playtest.

227 browser checks passed across the original-world, creative, sandbox and adventure suites, plus eight independent rendered reflection-orientation samples. All integrated browser reports match the final HTML hash above. The earlier PR-body hash records the immediately preceding tested UI build; this handoff identifies the final delivery after the mobile discovery-counter overlap was removed.

Ten local refusal/idempotency checks passed for the additive checkout importer. A fresh local repository rehearsal with the existing charter and GDD copied 76 new files, preserved those existing documents, rebuilt identical HTML and passed all 190 local tests. This rehearsal used a remote URL as metadata only: no GitHub transport was exercised by it.

The ZIP was extracted fresh, verified against its manifest, rebuilt identically, and passed the local tests and complete chapter journey again. The source-only Git bundle was cloned independently, passed Git object checking, rebuilt the same HTML and passed 190 tests.

## Finish the repository import

Use the exact ZIP supplied by Dom, not a reconstructed or older source package. Verify its SHA-256. Extract outside the current checkout and read its `docs/GITHUB_PUBLICATION.md`.

From a clean non-main checkout of this repository, inspect and run the package's `tools/import_into_checkout.py` first without `--apply`. It validates the exact source manifest, expected Firstlight origin, clean checkout, non-main branch and safe paths. It accepts identical files and refuses conflicting existing files or symlinks. It never invokes the network, stages, commits, installs, builds, or overwrites existing different content.

After the plan is correct, use `--apply`, inspect the changes, build with Python, run the local tests and earned journey, then commit and push a review branch. Verify the remote tree and build hash before updating publication status. Do not force main or run the older `.import/READY.json` workflow with unrelated content.

Continue with the package's `docs/NEXT_SESSION.md`: improve combat feel, companion/path reliability and one bounded next route before multiplying classes or maps. The first online spike is separate server-owned state, not trust in editable offline JSON.

## Limits

Native file/loopback navigation was blocked by the browser environment's administrator policy; no policy was bypassed. Successful browser tests used the exact offline document and explicitly labeled Map-backed storage fixtures. Native storage, physical phones, Firefox/Safari, GPU performance, 60 FPS, multiplayer, a trusted economy and production hosting are not qualified.

No paid service, account creation, private Raven/Luna memory, model call, live resident change, default-branch merge or Heaven-repository migration occurred.

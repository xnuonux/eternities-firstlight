#!/usr/bin/env python3
"""Copy verified source into a clean non-main Firstlight Git checkout. No network,
commits, installs, builds, or automatic overwrite. Default is a dry-run plan.
"""
from __future__ import annotations
import argparse
import hashlib
import json
from pathlib import Path, PurePosixPath
import subprocess

ROOT=Path(__file__).resolve().parents[1]
REMOTES={'https://github.com/xnuonux/eternities-firstlight.git','https://github.com/xnuonux/eternities-firstlight','git@github.com:xnuonux/eternities-firstlight.git'}

def sha(data: bytes) -> str: return hashlib.sha256(data).hexdigest()

def git(dest: Path,*args: str) -> str:
 r=subprocess.run(['git','-C',str(dest),*args],capture_output=True,text=True,timeout=10)
 if r.returncode: raise ValueError('Destination is not an eligible Git checkout')
 return r.stdout.strip()

def relative(raw: str) -> Path:
 p=PurePosixPath(raw)
 if not raw or p.is_absolute() or '\\' in raw or any(x in {'','.','..','.git'} or ':' in x for x in raw.split('/')):
  raise ValueError('Unsafe source path')
 return Path(*p.parts)

def plan(dest: Path,source: Path=ROOT) -> list[tuple[Path,bytes]]:
 dest=dest.resolve(strict=True)
 if Path(git(dest,'rev-parse','--show-toplevel')).resolve()!=dest: raise ValueError('Use the repository root')
 if git(dest,'remote','get-url','origin') not in REMOTES: raise ValueError('Wrong remote: only the founder-approved Firstlight repository is supported')
 if git(dest,'symbolic-ref','--short','HEAD') in {'main','master'}: raise ValueError('Create a review branch before importing')
 if git(dest,'status','--porcelain'): raise ValueError('Review or save existing working-tree changes first')
 manifest=json.loads((source/'SOURCE_MANIFEST.json').read_text());seen=set();new=[]
 for row in manifest['files']:
  rel=relative(row['path']);key=rel.as_posix().casefold()
  if key in seen: raise ValueError('Duplicate/case-colliding source path')
  seen.add(key);src=source/rel;data=src.read_bytes()
  if src.is_symlink() or len(data)!=row['bytes'] or sha(data)!=row['sha256']: raise ValueError('Source integrity mismatch: '+str(rel))
  target=dest/rel
  for parent in [target,*target.parents]:
   if parent==dest: break
   if parent.is_symlink(): raise ValueError('Refusing a symlink destination')
  if target.exists():
   if not target.is_file() or target.read_bytes()!=data: raise ValueError('Existing file differs; reconcile manually: '+str(rel))
  else: new.append((target,data))
 return new

def main() -> None:
 p=argparse.ArgumentParser(description=__doc__);p.add_argument('checkout',type=Path);p.add_argument('--apply',action='store_true');a=p.parse_args()
 try:
  files=plan(a.checkout)
  if a.apply:
   created=[]
   try:
    for path,data in files:
     path.parent.mkdir(parents=True,exist_ok=True)
     with path.open('xb') as f:
      created.append(path);f.write(data)
   except Exception:
    for path in created:path.unlink(missing_ok=True)
    raise
  print(json.dumps({'status':'copied_not_committed' if a.apply else 'dry_run','new_files':len(files),'existing_files_overwritten':0,'network_calls':0,'next':'Inspect git diff and untracked files; build, test, commit, push the review branch, and open a draft PR.'},indent=2))
 except (OSError,ValueError,KeyError,subprocess.SubprocessError) as e:p.exit(1,'Import refused: '+str(e)+'\n')
if __name__=='__main__':main()

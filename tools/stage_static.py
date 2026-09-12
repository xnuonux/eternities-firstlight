#!/usr/bin/env python3
"""Stage only the public playable index. Does not deploy or access a network."""
from pathlib import Path
import subprocess,sys,shutil,hashlib
root=Path(__file__).resolve().parents[1]
subprocess.run([sys.executable,str(root/'build.py')],cwd=root,check=True)
out=root/'dist';out.mkdir(exist_ok=True)
if any(p.name!='index.html' for p in out.iterdir()):
 raise SystemExit('dist contains unexpected files; inspect manually before staging')
shutil.copyfile(root/'index.html',out/'index.html')
print('Staged dist/index.html SHA256 '+hashlib.sha256((out/'index.html').read_bytes()).hexdigest())

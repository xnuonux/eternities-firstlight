#!/usr/bin/env python3
"""Read-only SHA-256 verification of this package. No installs or network."""
from pathlib import Path, PurePosixPath
import hashlib, json
ROOT=Path(__file__).resolve().parents[1]

def digest(p):
    h=hashlib.sha256()
    with p.open('rb') as f:
        for b in iter(lambda:f.read(1024*1024),b''):h.update(b)
    return h.hexdigest()

def main():
    data=json.loads((ROOT/'MANIFEST.json').read_text())
    seen=set()
    for row in data['files']:
        rel=PurePosixPath(row['path'])
        if rel.is_absolute() or '..' in rel.parts or '\\' in row['path'] or row['path'] in seen:
            raise ValueError('Unsafe or duplicate manifest path')
        seen.add(row['path']);p=ROOT.joinpath(*rel.parts)
        if p.is_symlink() or p.stat().st_size!=row['bytes'] or digest(p)!=row['sha256']:
            raise ValueError('File mismatch: '+row['path'])
    print(json.dumps({'result':'passed','files_verified':len(seen),'note':'Manifest consistency is not an authenticity signature or a software security audit.'},indent=2))
if __name__=='__main__':main()

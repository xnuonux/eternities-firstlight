#!/usr/bin/env python3
"""Rebuild and test the checksum-qualified Firstlight source distribution."""
from pathlib import Path
import argparse
import hashlib
import json
import os
import shutil
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--browser', action='store_true')
    parser.add_argument('--output', type=Path, default=ROOT/'verification')
    args = parser.parse_args()
    if not shutil.which('node'):
        parser.error('Node.js is required for development checks. Install Node 22 or 24.')
    output = args.output.resolve()
    output.mkdir(parents=True, exist_ok=True)
    preload = '--require="'+str(ROOT/'src/gathering-adapter.js')+'"'
    env = {**os.environ, 'PYTHONUTF8': '1', 'NODE_OPTIONS': (os.environ.get('NODE_OPTIONS','')+' '+preload).strip()}
    print(f'Python: {sys.version.split()[0]}; Node: {subprocess.check_output(["node","--version"],text=True).strip()}', flush=True)
    print(f'Logs: {output}', flush=True)
    def run(name, command, timeout=180):
        print(f'Running {name}...', flush=True)
        log = output/(name+'.log')
        with log.open('wb') as stream:
            try:
                result = subprocess.run(command, cwd=ROOT, env=env, stdout=stream, stderr=subprocess.STDOUT, timeout=timeout)
            except subprocess.TimeoutExpired:
                raise SystemExit(f'FAILED: {name} exceeded {timeout}s; see {log}')
        if result.returncode:
            print(log.read_text(encoding='utf-8',errors='replace')[-8000:],file=sys.stderr)
            raise SystemExit(f'FAILED: {name} (exit {result.returncode}); see {log}')
        print(f'PASS: {name}', flush=True)
    run('build', [sys.executable,'build.py'])
    first = (ROOT/'index.html').read_bytes()
    identity = json.loads((ROOT/'BUILD_IDENTITY.json').read_text(encoding='utf-8'))
    if identity != {'version':1,'bytes':len(first),'sha256':hashlib.sha256(first).hexdigest()}:
        raise SystemExit('FAILED: generated client does not match the reviewed build identity.')
    run('build-repeat', [sys.executable,'build.py'])
    if first != (ROOT/'index.html').read_bytes() or first != (ROOT/'FIRSTLIGHT_VALLEY.html').read_bytes():
        raise SystemExit('FAILED: deterministic assembly or duplicate entrypoint mismatch.')
    print(f'HTML: {len(first)} bytes; SHA-256 {hashlib.sha256(first).hexdigest()}',flush=True)
    modules = sorted((ROOT/'src').glob('*.js'))
    rules = sorted((ROOT/'tests').glob('*.test.cjs'))
    if not modules or not rules:
        raise SystemExit('FAILED: source modules or rule tests are missing.')
    for module in modules:
        run('syntax-'+module.stem,['node','--check',str(module)])
    run('rules',['node','--test','--test-reporter=tap',*map(str,rules)])
    print('\n'.join((output/'rules.log').read_text(encoding='utf-8').splitlines()[-9:]),flush=True)
    run('python',[sys.executable,'-m','unittest','discover','-s','tests','-p','test_*.py','-v'])
    print('\n'.join((output/'python.log').read_text(encoding='utf-8').splitlines()[-5:]),flush=True)
    journeys = [
        ('crossing-blade','crossing_journey.cjs',[]),('crossing-bow','crossing_journey.cjs',['--bow']),
        ('starter-blade','starter_journey.cjs',[]),('starter-bow','starter_journey.cjs',['--bow']),('starter-veteran','starter_veteran.cjs',[]),
        ('pursuit-blade','pursuit_journey.cjs',[]),('pursuit-bow','pursuit_journey.cjs',['--bow']),('pursuit-veteran','pursuit_journey.cjs',['--veteran']),
        ('characters-journey','characters_journey.cjs',['--sources-ready']),('classes-journey','classes_journey.cjs',['--sources-ready']),
        ('cosmos-journey','cosmos_journey.cjs',['--sources-ready']),('earth-journey','earth_journey.cjs',['--sources-ready']),
        ('earth-outing-blade','pursuit_journey.cjs',['--earth']),('earth-outing-bow','pursuit_journey.cjs',['--earth','--bow']),('earth-outing-veteran','pursuit_journey.cjs',['--earth','--veteran']),
        ('earth-story-blade','earth_story_journey.cjs',[]),('earth-story-bow','earth_story_journey.cjs',['--bow']),('earth-story-veteran','earth_story_journey.cjs',['--veteran','--sources-ready']),
        ('earth-notes-blade','earth_notes_journey.cjs',['--sources-ready']),('earth-notes-bow','earth_notes_journey.cjs',['--bow','--sources-ready']),('earth-notes-veteran','earth_notes_journey.cjs',['--veteran','--sources-ready']),
        ('gathering-journey','gathering_journey.cjs',['--sources-ready'])]
    for name, file, flags in journeys:
        run(name,['node','tests/'+file,*flags])
    if args.browser:
        suites = ['crossing_browser','regression09_browser','cutaway_browser','reflection_browser','native_origin_browser','starter_browser','camera_browser','pursuit_browser','characters_browser','classes_browser','cosmos_browser','earth_browser','earth_story_browser','earth_notes_browser','gathering_browser']
        for suite in suites:
            run(suite,[sys.executable,f'tests/{suite}.py'],timeout=1200 if suite=='regression09_browser' else 600)
    print('Verification passed. Automated checks do not qualify human pacing or device performance.',flush=True)

if __name__=='__main__':
    main()

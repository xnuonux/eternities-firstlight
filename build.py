#!/usr/bin/env python3
"""Build the self-contained client. Network and runtime packages are not required.

Generated HTML is checked against BUILD_IDENTITY.json. Deliberately update that
record only after source review with --record-identity; ordinary launches cannot
silently approve a different client. Both output entrypoints remain identical.
"""
from pathlib import Path
import argparse
import hashlib
import json

ROOT = Path(__file__).resolve().parent
PAIRS = [('earth-notes.js','EARTH_NOTES'),('earth-notes-ui.js','EARTH_NOTES_UI'),('earth-notes-art.js','EARTH_NOTES_ART'),('earth-story.js','EARTH_STORY'),('earth-story-ui.js','EARTH_STORY_UI'),('earth.js','EARTH'),('cosmos.js','COSMOS'),('cosmos-ui.js','COSMOS_UI'),('cosmos-art.js','COSMOS_ART'),('cosmos.css','COSMOS_STYLE'),('earth-ui.js','EARTH_UI'),('earth-art.js','EARTH_ART'),('earth.css','EARTH_STYLE'),('classes.js','CLASSES'),('classes-ui.js','CLASSES_UI'),('classes.css','CLASSES_STYLE'),('characters.js','CHARACTERS'),('characters-ui.js','CHARACTERS_UI'),('characters.css','CHARACTERS_STYLE'),('pursuit.js','PURSUIT'),('pursuit-ui.js','PURSUIT_UI'),('pursuit.css','PURSUIT_STYLE'),('starter.js','STARTER'),('starter-art.js','STARTER_ART'),('starter-ui.js','STARTER_UI'),('starter.css','STARTER_STYLE'),('crossing.js','CROSSING'),('crossing-art.js','CROSSING_ART'),('crossing-ui.js','CROSSING_UI'),('crossing.css','CROSSING_STYLE'),('beacon.js','BEACON'),('combat.js','COMBAT'),('beacon-art.js','BEACON_ART'),('rpg-ui.js','RPG_UI'),('rpg.css','RPG_STYLE'),('arsenal.js','ARSENAL'),('arsenal-art.js','ARSENAL_ART'),('arsenal-ui.js','ARSENAL_UI'),('road.js','ROAD'),('road-art.js','ROAD_ART'),('adventure.js','ADVENTURE'),('adventure-ui.js','ADVENTURE_UI'),('adventure-art.js','ADVENTURE_ART'),('sandbox.js','SANDBOX'),('sandbox-ui.js','SANDBOX_UI'),('sandbox-art.js','SANDBOX_ART'),('creative.js','CREATIVE'),('experience.js','EXPERIENCE'),('style.css','STYLE'),('engine.js','ENGINE'),('core.js','CORE'),('world.js','WORLD'),('app.js','APP')]
EXTENSIONS = ['gathering.js', 'gathering-adapter.js', 'gathering-music.js', 'gathering-ui.js']

def assemble():
    text = (ROOT/'src/shell.html').read_text(encoding='utf-8')
    marker = '<script>/*__APP__*/</script>'
    if text.count(marker) != 1:
        raise ValueError('Expected exactly one reviewed application entrypoint')
    extra = []
    for name in EXTENSIONS:
        body = (ROOT/'src'/name).read_text(encoding='utf-8')
        if '</script' in body.lower():
            raise ValueError('Embedded script terminator in '+name)
        extra.append('<script>'+body+'</script>')
    text = text.replace(marker, ''.join(extra)+marker)
    text = text.replace('</style>', (ROOT/'src/gathering.css').read_text(encoding='utf-8')+'</style>', 1)
    for name, token in PAIRS:
        body = (ROOT/'src'/name).read_text(encoding='utf-8')
        if name.endswith('.js') and '</script' in body.lower():
            raise ValueError('Embedded script terminator in '+name)
        marker = '/*__'+token+'__*/'
        if text.count(marker) != 1:
            raise ValueError('Missing or duplicate build placeholder '+token)
        text = text.replace(marker, body)
    if '/*__' in text:
        raise ValueError('Unresolved build placeholder')
    return text.encode('utf-8')

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--record-identity', action='store_true', help='Explicit developer action: record the reviewed output identity')
    args = parser.parse_args()
    data = assemble()
    identity = {'version': 1, 'bytes': len(data), 'sha256': hashlib.sha256(data).hexdigest()}
    manifest = ROOT/'BUILD_IDENTITY.json'
    if args.record_identity:
        manifest.write_text(json.dumps(identity, indent=2)+'\n', encoding='utf-8', newline='\n')
    elif not manifest.exists() or json.loads(manifest.read_text(encoding='utf-8')) != identity:
        raise SystemExit('Build identity differs or is missing. Review source and explicitly record the new identity. No output was replaced.')
    for name in ['FIRSTLIGHT_VALLEY.html', 'index.html']:
        (ROOT/name).write_bytes(data)
    print(f"{identity['bytes']:,} bytes; SHA-256 {identity['sha256']}")

if __name__ == '__main__':
    main()

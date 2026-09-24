#!/usr/bin/env python3
"""Build an isolated gathering candidate; never overwrite the trusted entrypoints.

The base client must reproduce PR19's reviewed byte identity. The extension is
experimental until full game/browser qualification passes. --preview uses a new
loopback-only origin and never stops the user's existing Firstlight server.
"""
from pathlib import Path
import argparse
import ast
import functools
import hashlib
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
import webbrowser

ROOT = Path(__file__).resolve().parents[1]
BASE_COMMIT = '1abddcfbf30bacb2791dde14fbc1fe7e46b666f7'
BASE_SHA256 = '14c79b47648e13764fbe4d623d4835ebe0089a54f37bc48d8d6fa7bccc2a8750'
SCRIPTS = ['gathering.js','gathering-adapter.js','gathering-music.js','gathering-ui.js']

def assemble(root=ROOT):
    root = Path(root)
    syntax = ast.parse((root/'build.py').read_text(encoding='utf-8'))
    loops = [n for n in syntax.body if isinstance(n,ast.For) and isinstance(n.target,ast.Tuple) and [getattr(t,'id',None) for t in n.target.elts]==['name','token']]
    if len(loops)!=1:
        raise ValueError('The reviewed base build recipe changed. Review the new base before adapting this candidate.')
    pairs = ast.literal_eval(loops[0].iter)
    text = (root/'src/shell.html').read_text(encoding='utf-8')
    for name, token in pairs:
        body = (root/'src'/name).read_text(encoding='utf-8')
        marker = '/*__'+token+'__*/'
        if text.count(marker)!=1 or name.endswith('.js') and '</script' in body.lower():
            raise ValueError('Unsafe or ambiguous base assembly: '+name)
        text = text.replace(marker,body)
    if '/*__' in text or hashlib.sha256(text.encode('utf-8')).hexdigest()!=BASE_SHA256:
        raise ValueError('Base no longer matches '+BASE_COMMIT+'. Do not silently mix this candidate with newer code.')
    app = '<script>'+(root/'src/app.js').read_text(encoding='utf-8')+'</script>'
    if text.count(app)!=1:
        raise ValueError('Expected one application bootstrap.')
    blocks = []
    inputs = {}
    for name in SCRIPTS:
        data = (root/'src'/name).read_bytes()
        body = data.decode('utf-8')
        if '</script' in body.lower():
            raise ValueError('Embedded script terminator in '+name)
        blocks.append('<script>'+body+'</script>')
        inputs[name] = hashlib.sha256(data).hexdigest()
    style = (root/'src/gathering.css').read_text(encoding='utf-8')
    if '</style' in style.lower():
        raise ValueError('Embedded style terminator.')
    text = text.replace(app,''.join(blocks)+app)
    text = text.replace('</style>',style+'</style>',1)
    data = text.encode('utf-8')
    return data, {'status':'candidate-not-release','base_commit':BASE_COMMIT,'base_html_sha256':BASE_SHA256,'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest(),'script_sha256':inputs,'css_sha256':hashlib.sha256(style.encode('utf-8')).hexdigest()}

def main():
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('--output',type=Path,default=ROOT/'FIRSTLIGHT_TABLE_CANDIDATE.html')
    p.add_argument('--preview',action='store_true',help='Open an isolated temporary loopback origin; do not use personal saves')
    a=p.parse_args();out=a.output.resolve()
    if out in [(ROOT/'index.html').resolve(),(ROOT/'FIRSTLIGHT_VALLEY.html').resolve()]:
        p.error('Candidate output cannot replace a trusted entrypoint.')
    data,identity=assemble()
    out.parent.mkdir(parents=True,exist_ok=True);out.write_bytes(data)
    out.with_suffix('.identity.json').write_text(json.dumps(identity,indent=2)+'\n',encoding='utf-8')
    print('CANDIDATE — full integration is not release-qualified.')
    print(str(out));print(identity['sha256'])
    print('Use an isolated browser profile/origin. Import only an exported COPY; keep the original backup.')
    if a.preview:
        try: relative=out.relative_to(ROOT)
        except ValueError:p.error('--preview requires output inside this checkout')
        handler=functools.partial(SimpleHTTPRequestHandler,directory=str(ROOT))
        server=ThreadingHTTPServer(('127.0.0.1',0),handler)
        from urllib.parse import quote
        url='http://127.0.0.1:'+str(server.server_port)+'/'+quote(relative.as_posix())
        print(url,flush=True);print('Ctrl+C stops only this candidate server.',flush=True);webbrowser.open(url)
        try:server.serve_forever()
        except KeyboardInterrupt:pass
        finally:server.server_close()

if __name__=='__main__':
    main()

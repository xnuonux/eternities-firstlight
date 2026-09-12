#!/usr/bin/env python3
"""Optional loopback-only static development server. No dependencies."""
import argparse
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from functools import partial

def main():
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('--port',type=int,default=8000)
    a=p.parse_args()
    if not 1024<=a.port<=65535: p.error('Choose an unprivileged port from 1024 to 65535')
    root=Path(__file__).resolve().parent
    handler=partial(SimpleHTTPRequestHandler,directory=str(root))
    try:
        with ThreadingHTTPServer(('127.0.0.1',a.port),handler) as server:
            print(f'Open http://127.0.0.1:{a.port}/ — Ctrl+C stops the server.')
            server.serve_forever()
    except KeyboardInterrupt: pass
    except OSError as e: p.exit(1,f'Cannot start local server: {e}\n')
if __name__=='__main__': main()

"""Record a short real browser gameplay session on an isolated loopback origin."""
from pathlib import Path
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
import argparse, hashlib, json, threading
from playwright.sync_api import sync_playwright
from browser_support import launch_kwargs
ROOT=Path(__file__).resolve().parents[1]
class Handler(SimpleHTTPRequestHandler):
    def __init__(self,*a,**k): super().__init__(*a,directory=str(ROOT),**k)
    def log_message(self,*_a): pass
def main():
    ap=argparse.ArgumentParser();ap.add_argument('--seconds',type=float,default=20);ap.add_argument('--fixture',type=Path,help='command-earned save JSON fixture');ap.add_argument('--actions',type=Path,help='JSON list: key, click selector, evaluate expression, wait_ms');ap.add_argument('--output',type=Path,default=Path('evidence10/gameplay-video'));a=ap.parse_args();a.output.mkdir(parents=True,exist_ok=True)
    server=ThreadingHTTPServer(('127.0.0.1',0),Handler);threading.Thread(target=server.serve_forever,daemon=True).start();url=f'http://127.0.0.1:{server.server_port}/FIRSTLIGHT_VALLEY.html';report={'origin':url,'html_sha256':hashlib.sha256((ROOT/'FIRSTLIGHT_VALLEY.html').read_bytes()).hexdigest(),'duration_seconds':a.seconds,'performance_claim':False}
    try:
        with sync_playwright() as pw:
            b=pw.chromium.launch(**launch_kwargs('hardware'));report['browser_version']=b.version;c=b.new_context(viewport={'width':1280,'height':720},record_video_dir=str(a.output));p=c.new_page();fixture=json.loads(a.fixture.read_text(encoding='utf-8')) if a.fixture else None; init='window.__ETERNITIES_TEST_MODE=true;'+(f"window.__ETERNITIES_FIXTURE={json.dumps(fixture)};" if fixture else '');p.add_init_script(init);p.goto(url,wait_until='load');p.wait_for_function('window.Realm');
            if fixture: p.evaluate('(s)=>Realm.test.replace(s)',fixture)
            p.evaluate('Realm.test.render()'); report['fixture']=str(a.fixture) if a.fixture else None
            actions=json.loads(a.actions.read_text(encoding='utf-8')) if a.actions else [{'key':'m','wait_ms':int(a.seconds*1000)},{'key':'Escape','wait_ms':0}]
            for action in actions:
                if 'key' in action: p.keyboard.press(action['key'])
                elif 'click' in action: p.locator(action['click']).click()
                elif 'evaluate' in action: p.evaluate(action['evaluate'])
                p.wait_for_timeout(int(action.get('wait_ms',0)))
            c.close();report['video_path']=str(p.video.path())
            b.close()
    finally: server.shutdown()
    (a.output/'REPORT.json').write_text(json.dumps(report,indent=2),encoding='utf-8');print(json.dumps(report,indent=2))
if __name__=='__main__':main()

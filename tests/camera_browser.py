"""Production camera/UI checks on an isolated origin. Synthetic saves, real input.
Normal RAF is used for WASD and orbit; command walking is accelerated explicitly.
Software WebGL coverage is not a human comfort or GPU performance claim.
"""
from pathlib import Path
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
import hashlib, json, math, threading, traceback
from playwright.sync_api import sync_playwright
from browser_support import chromium_launch_kwargs

ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'evidence10/camera-browser';OUT.mkdir(parents=True,exist_ok=True)
report={'method':__doc__,'html_sha256':hashlib.sha256((ROOT/'index.html').read_bytes()).hexdigest(),'checks':[],'browser_errors':[]}
class Handler(SimpleHTTPRequestHandler):
    def __init__(self,*a,**kw):super().__init__(*a,directory=str(ROOT),**kw)
    def log_message(self,*_):pass
server=ThreadingHTTPServer(('127.0.0.1',0),Handler);threading.Thread(target=server.serve_forever,daemon=True).start()
def check(name,ok):
    report['checks'].append({'name':name,'passed':bool(ok)});print(('PASS ' if ok else 'FAIL ')+name,flush=True)
    if not ok:raise AssertionError(name)
try:
    with sync_playwright() as pw:
        browser=pw.chromium.launch(**chromium_launch_kwargs());context=browser.new_context(viewport={'width':1280,'height':800})
        context.add_init_script('window.__ETERNITIES_TEST_MODE=true;');page=context.new_page();page.on('pageerror',lambda e:report['browser_errors'].append(str(e)))
        page.goto(f'http://127.0.0.1:{server.server_port}/index.html',wait_until='load')
        page.evaluate('Realm.test.quality("low");Realm.test.pause(true);Realm.test.render()');page.wait_for_timeout(1400)
        def ev(code,arg=None):return page.evaluate(code,arg)
        def diag():return ev('Realm.diagnostics')
        def render():ev('Realm.test.render()')
        def view(**kw):ev('(v)=>Realm.test.view(v)',kw);render()
        def walk(x,z):
            check(f'Accepted route {x},{z}',ev('([x,z])=>Realm.test.move(x,z)',[x,z])['ok'])
            ev('()=>{for(let i=0;i<6000&&Realm.test.path.length;i++)Realm.test.step(.05);Realm.test.step(.05);Realm.test.pause(true);Realm.test.render()}')
        check('Fresh world defaults to true perspective',diag()['camera']['projection']=='perspective' and diag()['camera']['preset']=='adventure')
        check('Four visible camera choices',page.locator('.camera-presets button').count()==4)
        before=diag()['adventure']['player'];yaw=diag()['camera']['yaw']
        page.mouse.move(800,380);page.mouse.down(button='right');page.mouse.move(925,395,steps=8);page.mouse.up(button='right');render()
        check('Right drag orbits without issuing movement',abs(diag()['camera']['yaw']-yaw)>.4 and not ev('Realm.test.path.length') and before==diag()['adventure']['player'])
        distance=diag()['camera']['distance'];page.mouse.wheel(0,450);render();check('Wheel changes distance without FOV pumping',diag()['camera']['distance']>distance and diag()['camera']['fov']==60)
        view(yaw=0,elevation=.28,distance=7.5)
        ev('Realm.test.pause(false)');page.keyboard.down('w');page.wait_for_timeout(480);page.keyboard.up('w');ev('Realm.test.pause(true)');after=diag()['adventure']['player']
        check('Real W input walks forward relative to the camera',after['z']<before['z']-.2 and abs(after['x']-before['x'])<.1)
        view(yaw=math.pi/2)
        ev('Realm.test.pause(false)');page.keyboard.down('w');page.wait_for_timeout(480);page.keyboard.up('w');ev('Realm.test.pause(true)');side=diag()['adventure']['player']
        check('Orbit changes real WASD world direction',side['x']<after['x']-.2 and abs(side['z']-after['z'])<.1)
        view(yaw=0,elevation=.18);before=diag()['adventure']['player'];page.mouse.click(800,115);render()
        check('Sky click is ignored without an invalid path or error',not ev('Realm.test.path.length') and before==diag()['adventure']['player'] and not diag()['errors'])
        ev('Realm.test.openPanel("settings")');page.locator('#camera-fov').fill('78');page.locator('#camera-fov').dispatch_event('change');render()
        check('Visible FOV control changes production projection',diag()['camera']['fov']==78 and page.locator('#camera-fov-value').inner_text()=='78°')
        page.select_option('#camera-mode','tactical');check('Settings select retains overhead view',diag()['camera']['preset']=='tactical' and diag()['camera']['projection']=='orthographic')
        page.reload(wait_until='load');ev('Realm.test.pause(true);Realm.test.render()')
        check('Mode and FOV survive actual origin reload',diag()['camera']['preset']=='tactical' and ev('Realm.state.settings.cameraFov')==78)
        page.keyboard.press('r');render();check('R returns to third person behind the character',diag()['camera']['preset']=='adventure' and abs(diag()['camera']['yaw']-diag()['adventure']['player']['yaw']-math.pi)<.001)
        for mode in ['follow','wide','adventure']:
            page.locator(f'[data-rpg="camera"][data-id="{mode}"]').click();render();check(f'{mode} camera control works',diag()['camera']['preset']==mode)
        walk(-11,-1.6);view(yaw=math.pi,elevation=.12,distance=7.5)
        check('Actual house wall pulls the camera in before penetration',diag()['camera']['actualDistance']<2 and diag()['camera']['actualDistance']>=.45)
        # South faces the music room, another legitimate obstruction. West is clear.
        view(yaw=-math.pi/2,elevation=.28)
        check('Camera returns after the wall clears',diag()['camera']['actualDistance']>7)
        page.keyboard.press('e');render();check('House entry preserves perspective with a finite eye',diag()['scene']=='home' and diag()['camera']['projection']=='perspective' and all(math.isfinite(v) for v in diag()['camera']['eye']))
        page.screenshot(path=str(OUT/'HOME.png'));page.keyboard.press('e');render();check('House exit retains third person',diag()['scene']=='valley' and diag()['camera']['preset']=='adventure')
        ev('Realm.test.openPanel("settings")');page.check('#setting-reducedMotion');page.select_option('#camera-mode','adventure');page.click('#close-panel')
        walk(11,9);p=diag()['adventure']['player'];c=diag()['camera']['center'];check('Reduced motion removes camera follow interpolation',abs(c[0]-p['x'])<1e-8 and abs(c[2]-p['z'])<1e-8)
        ev('Realm.test.pause(false)');page.keyboard.press('e');render();check('Initial kit still obtained through visible interaction',ev('Realm.state.adventure.started'))
        page.keyboard.press('e');render();page.click('[data-rpg="starter-accept"]');page.click('#rpg-close');walk(15,7);ev('Realm.test.pause(false)');page.keyboard.press('e');render()
        check('Starter entry retains perspective and the saved FOV',diag()['scene']=='riverbank' and diag()['camera']['fov']==78)
        walk(-7,3);view(yaw=0,elevation=.3,distance=7.5);ev('Realm.test.pause(false)');target=ev("Realm.diagnostics.adventure.enemies.find(e=>e.id==='river-skitter-west')")
        pt=ev('(e)=>Realm.project(e.x,2.4,e.z)',target);check('Projected enemy body is visible',pt['visible']);page.mouse.click(pt['x'],pt['y']);render()
        check('Clicking a visible body selects stationary autoattack',diag()['adventure']['tactics']['target']=='river-skitter-west' and diag()['adventure']['tactics']['auto'] and not ev('Realm.test.path.length'))
        ev('Realm.test.step(2);Realm.test.render()');enemy=next(e for e in diag()['adventure']['enemies'] if e['id']=='river-skitter-west')
        check('Combat still resolves through actual rules after selection',enemy['hp']<target['hp'])
        render();check('Perspective health indicators have bounded screen size',ev("[...document.querySelectorAll('.enemy-health')].every(e=>e.getBoundingClientRect().width<=58)"))
        page.keyboard.press('c');render();before=diag()['adventure']['player'];page.keyboard.press('w');page.keyboard.press('1');render()
        check('Modal equipment blocks walking and attacks',diag()['adventure']['player']==before and ev('Realm.diagnostics.adventure.paused'))
        check('Rounded avatar renders in the equipment portrait',page.locator('#avatar-mount canvas').count()==1 and not diag()['errors']);page.click('#rpg-close')
        page.set_viewport_size({'width':390,'height':844});view(yaw=0,elevation=.28)
        check('Portrait aspect keeps a finite perspective camera',all(math.isfinite(v) for v in diag()['camera']['eye']) and diag()['camera']['projection']=='perspective')
        check('Camera choices stay inside the narrow viewport',page.locator('.camera-presets').evaluate('(e)=>e.getBoundingClientRect().right<=innerWidth'))
        page.screenshot(path=str(OUT/'NARROW.png'))
        check('No unhandled browser errors',not report['browser_errors'] and not diag()['errors']);report['passed']=True;report['browser']=browser.version;browser.close()
except Exception:
    report['passed']=False;report['failure']=traceback.format_exc();print(report['failure'],flush=True)
finally:
    server.shutdown();(OUT/'REPORT.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
raise SystemExit(0 if report['passed'] else 1)


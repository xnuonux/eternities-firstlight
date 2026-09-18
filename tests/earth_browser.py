"""Hearthwater E1 UI, physical routes, cameras and safe source-side persistence.

This suite uses only synthetic/current checked-in fixtures. It verifies geography and
boundary integrity, not human pacing or performance qualification.
"""
from pathlib import Path
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
import hashlib, json, tempfile, threading, traceback
from playwright.sync_api import sync_playwright
from browser_support import chromium_launch_kwargs

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'evidence10/earth-browser';OUT.mkdir(parents=True,exist_ok=True)
report={'method':__doc__,'checks':[],'errors':[],'browser_errors':[],'software_quality':'low','html_sha256':hashlib.sha256((ROOT/'index.html').read_bytes()).hexdigest()}
class Handler(SimpleHTTPRequestHandler):
    def __init__(self,*args,**kw):super().__init__(*args,directory=str(ROOT),**kw)
    def log_message(self,*_args):pass
def check(name,value):
    report['checks'].append({'name':name,'passed':bool(value)});print(('PASS ' if value else 'FAIL ')+name,flush=True)
    if not value:raise AssertionError(name)
server=ThreadingHTTPServer(('127.0.0.1',0),Handler);threading.Thread(target=server.serve_forever,daemon=True).start()
url=f'http://127.0.0.1:{server.server_port}/'
try:
  with tempfile.TemporaryDirectory(prefix='firstlight-earth-') as profile,sync_playwright() as pw:
    context=pw.chromium.launch_persistent_context(profile,**chromium_launch_kwargs(),viewport={'width':1280,'height':800})
    page=context.new_page();page.on('pageerror',lambda e:report['browser_errors'].append(str(e)))
    page.add_init_script('window.__ETERNITIES_TEST_MODE=true;window.__ETERNITIES_CAPTURE_MODE=true;')
    response=page.goto(url,wait_until='load');page.wait_for_function('()=>!!window.Realm')
    check('exact generated build loads',hashlib.sha256(response.body()).hexdigest()==report['html_sha256'])
    ev=lambda js,arg=None:page.evaluate(js,arg)
    state=lambda:ev('()=>Realm.state')
    scene=lambda:ev('()=>Realm.diagnostics.scene')
    def render():ev("()=>{if(Realm.state.settings.quality!=='low')Realm.test.quality('low');Realm.test.render()}")
    def close():
      if page.locator('#rpg-window').evaluate('(e)=>e.open'):page.locator('#rpg-close').click()
    def walk(x,z):
      r=ev('([x,z])=>{const r=Realm.test.move(x,z);if(!r.ok)return r;for(let i=0;i<3500&&Realm.test.path.length;i++)Realm.test.step(.05);Realm.test.render();const p=Realm.diagnostics.adventure.player;return{ok:Math.hypot(p.x-x,p.z-z)<.25}}',[x,z])
      check(f'production walking reaches {x},{z}',r.get('ok'))
    def enter():
      close();walk(0,23);page.keyboard.press('e');render()
      check('physical trail marker opens explicit preview',page.locator('[data-rpg="earth-confirm"]').count()==1)
      page.locator('[data-rpg="earth-confirm"]').click();render();check('explicit input enters Hearthwater',scene()=='earth-hearthwater-approach')
    render();walk(0,27);page.keyboard.press('e');render()\n    check('existing Lantern Pier rest interaction remains independent',scene()=='valley' and page.locator('[data-rpg="earth-confirm"]').count()==0 and 'quiet moment beside the water' in state()['journal'][-1]['text'])\n    render();page.keyboard.press('m');render()
    check('Earth invitation appears beside existing realm invitations',page.locator('[data-rpg="earth-invitation"]').count()==1)
    page.locator('[data-rpg="earth-invitation"]').click();text=page.locator('#rpg-content').inner_text()
    check('remote terms declare no payout and retain old authorities',all(t in text for t in ['no new payout','Oren','Bellweather','Return is available']))
    check('remote invitation cannot enter before physical arrival',page.locator('[data-rpg="earth-confirm"]').count()==0)
    page.locator('[data-rpg="earth-walk"][data-id="gate"]').click();ev('()=>{for(let i=0;i<3000&&Realm.test.path.length;i++)Realm.test.step(.05);Realm.test.render()}')
    check('map invitation walks to lake rather than teleporting',scene()=='valley' and ev('()=>Math.hypot(Realm.diagnostics.adventure.player.x,Realm.diagnostics.adventure.player.z-23)<.25'))
    page.keyboard.press('e');render();before=state();page.screenshot(path=str(OUT/'TRAVEL_PREVIEW.png'))
    page.locator('[data-rpg="earth-confirm"]').click();render()
    check('fresh visitor can enter with no class or campaign advancement',scene()=='earth-hearthwater-approach' and state()==before)
    check('Earth diagnostics report supported ground',ev('()=>Realm.diagnostics.earth.walkable'))
    check('E1 introduces no enemies',ev('()=>Realm.diagnostics.adventure.enemies.length')==0)
    check('return is available immediately',page.locator('#earth-home').is_visible())
    ev('()=>Realm.test.view({yaw:.15,elevation:.30,distance:10})');render();page.screenshot(path=str(OUT/'ARRIVAL_THIRD.png'))
    # Western orchard route.
    for x,z in [(0,10),(-8,3),(-14,-12),(-12,-23),(-10,-30),(0,-35),(0,-43)]:walk(x,z)
    page.keyboard.press('e');render();content=page.locator('#rpg-content').inner_text()
    check('north boundary explains that existing Bellweather gates remain authoritative','Sunward Beacon' in content and 'prerequisites' in content)
    close();page.keyboard.press('v');render()
    check('diorama works on connected Earth ground',ev('()=>Realm.diagnostics.camera.projection')=='orthographic');page.screenshot(path=str(OUT/'BELLWEATHER_ROAD_DIORAMA.png'))
    # Eastern ridge return proves both routes inhabit one physical scene.
    for x,z in [(0,-35),(12,-26),(14,-12),(7,2),(0,10),(0,24)]:walk(x,z)
    check('both approaches remain one continuous scene',scene()=='earth-hearthwater-approach')
    check('walking changed no durable adventure systems',all(state()['adventure'][k]==before['adventure'][k] for k in ['xp','owned','equipment','starter','pursuit','road','beacon','crossing','classPath','companion','arsenal']))
    page.locator('#earth-home').click();render()
    check('return restores exact lake checkpoint',scene()=='valley' and state()['player']==before['player'])
    ev('()=>Realm.test.save()');saved=state();page.reload();page.wait_for_function('()=>!!window.Realm');render()
    check('reload remains on acknowledged valley side',scene()=='valley' and state()['player']==saved['player'])
    # Returning equipment state survives the route.
    fixture=ROOT/'docs/evidence/classes/HUNTER_SOURCE.json';returning=json.loads(fixture.read_text(encoding='utf-8'));returning['settings']['reducedMotion']=True
    ev('(w)=>Realm.test.replace(w)',returning);render();before_returning=state();enter()
    check('returning Hunter equipment and fittings remain unchanged',state()['adventure']['equipment']==before_returning['adventure']['equipment'] and state()['adventure']['arsenal']==before_returning['adventure']['arsenal'])
    page.locator('#earth-home').click();render();check('returning history survives Earth round trip',state()['adventure']==before_returning['adventure'])
    check('no runtime browser exceptions',not report['browser_errors'])
    context.close()
except Exception as e:
  report['errors'].append(str(e));traceback.print_exc()
finally:
  server.shutdown();server.server_close();(OUT/'report.json').write_text(json.dumps(report,indent=2)+'\n',encoding='utf-8')
print(f"Earth browser checks: {sum(x['passed'] for x in report['checks'])}/{len(report['checks'])}; errors: {len(report['errors'])}",flush=True)
if report['errors'] or report['browser_errors']:raise SystemExit(1)

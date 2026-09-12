"""Realm 05 sandbox acceptance. Exact offline HTML; explicit test clock/storage fixture.
UI actions gather, craft, repair, build, water and harvest. No inventory grants in the journey.
Screenshots after the journey may use a separate clearly identified layout fixture.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright
import hashlib,json,traceback
R=Path(__file__).resolve().parents[1]; OUT=R/'evidence07'/'regression';H=(R/'FIRSTLIGHT_VALLEY.html').read_text()
OUT.mkdir(parents=True,exist_ok=True)
REPORT={'build_sha256':hashlib.sha256(H.encode()).hexdigest(),'mode':'Offline exact HTML via set_content; injected Map storage; test clock advances real simulation. No inventory grants in acceptance journey.','checks':[],'errors':[]}
def check(label,cond):
 REPORT['checks'].append({'check':label,'passed':bool(cond)});print(('PASS ' if cond else 'FAIL ')+label,flush=True)
 if not cond:raise AssertionError(label)
ARGS=['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=gl-egl','--disable-gpu-sandbox','--enable-webgl','--ignore-gpu-blocklist']
try:
 with sync_playwright() as pw:
  browser=pw.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=ARGS)
  ctx=browser.new_context(viewport={'width':1440,'height':960},offline=True,accept_downloads=True);errs=[];requests=[]
  def spawn(c,storage=None):
   p=c.new_page();p.on('pageerror',lambda e:errs.append(str(e)));p.on('request',lambda r:requests.append(r.url))
   p.evaluate('''(s)=>{window.__ETERNITIES_TEST_MODE=true;window.__ETERNITIES_CAPTURE_MODE=true;window.ST=new Map(Object.entries(s||{}));Object.defineProperty(window,'localStorage',{value:{getItem:k=>ST.get(k)||null,setItem:(k,v)=>ST.set(k,String(v)),removeItem:k=>ST.delete(k)}})}''',storage or {})
   p.set_content(H,wait_until='load');p.wait_for_function('window.Realm');p.wait_for_timeout(1400)
   p.evaluate('Realm.test.quality("low");Realm.test.render()');return p
  p=spawn(ctx)
  def panel(name):
   p.keyboard.press('Escape');p.evaluate('(n)=>Realm.test.openPanel(n)',name);p.wait_for_timeout(280)
  def advance(t):p.evaluate('(t)=>{Realm.test.step(t);Realm.test.render()}',t)
  def gather(kind,times=1):
   for _ in range(times):
    panel('pack');p.click('[data-action="sb-gather"][data-id="'+kind+'"]');advance(90)
    for k in range(6):advance(.5)
  def craft(id,times=1):
   panel('craft')
   for _ in range(times):
    b=p.locator('[data-action="sb-craft"][data-id="'+id+'"]');check('Craft available: '+id,b.is_enabled());b.click()
  def walk(x,z):
   p.keyboard.press('Escape');p.evaluate('([x,z])=>{const r=RealmCore.pathfind(Realm.state.player,{x,z},{id:"outdoors",sandbox:Realm.state.sandbox});if(!r)throw Error("no route")}',[x,z])
   # Walk via canvas projection after a broad overview, equivalent to normal ground input.
   p.evaluate('Realm.test.view({overview:true});Realm.test.render()');q=p.evaluate('([x,z])=>Realm.project(x,1.3,z)',[x,z])
   p.mouse.click(q['x'],q['y']);advance(90)
  check('Current standalone starts in WebGL2',p.evaluate('Realm.diagnostics.version')=='8.0.0' and p.evaluate('Realm.diagnostics.mode')=='webgl2')
  check('Initial backpack contains no gifted materials',p.evaluate('Realm.state.sandbox.inventory.wood')==0)
  check('Northern shore inaccessible before repair',p.evaluate('RealmCore.pathfind(Realm.state.player,{x:0,z:-40},{id:"outdoors",sandbox:Realm.state.sandbox})===null'))
  gather('wood',5);gather('stone',4);gather('fiber')
  check('Gathering actual nodes produces materials',p.evaluate('Realm.state.sandbox.inventory.wood')==25 and p.evaluate('Realm.state.sandbox.inventory.stone')==20)
  check('Fibre harvest increases seed count',p.evaluate('Realm.state.sandbox.inventory.seeds')==5)
  panel('craft');p.click('[data-action="sb-go"][data-id="bench"]');advance(80)
  check('Walkbench route reaches Oren',p.evaluate('Math.hypot(Realm.state.player.x-11,Realm.state.player.z-9)<.1'))
  craft('pick');craft('axe');craft('plank',6);craft('floor',3);craft('bed');craft('workbench');craft('bench');craft('block',2);craft('masonry',2)
  check('Pickaxe and axe actually crafted',p.evaluate('Realm.state.sandbox.inventory.pick===1&&Realm.state.sandbox.inventory.axe===1'))
  # The materials for crossing are still reserved by the player's own choices, not an invisible quest grant.
  panel('journey');p.click('[data-action="sb-go"][data-id="crossing"]');advance(80)
  check('Player reaches broken crossing',p.evaluate('Math.hypot(Realm.state.player.x,Realm.state.player.z+21.3)<.1'))
  p.click('#interact');check('Repair consumes materials and opens bridge',p.evaluate('Realm.state.sandbox.bridge'))
  panel('journey');p.click('[data-action="sb-go"][data-id="wild"]');advance(55)
  check('Actual walk arrives on new shore',p.evaluate('Math.hypot(Realm.state.player.x,Realm.state.player.z+33)<.1'))
  gather('crystal');check('Mined crystal reaches inventory',p.evaluate('Realm.state.sandbox.inventory.crystal')==3)
  # Walk to public workbench, then make a lantern from the newly harvested crystal.
  p.keyboard.press('Escape');p.evaluate('Realm.test.view({overview:false,center:[0,1.7,-40],half:18});Realm.test.render()')
  walk(-5,-32.5);check('Player reaches field workbench',p.evaluate('Math.hypot(Realm.state.player.x+5,Realm.state.player.z+32.5)<.3'))
  craft('lantern')
  walk(-2.6,-35.5)
  def build(kind,gx,gz):
   panel('build');p.click('[data-action="sb-build"][data-id="'+kind+'"]');p.evaluate('Realm.test.render()');q=p.evaluate('([gx,gz])=>{let c=RealmSandbox.worldCell(gx,gz);return Realm.project(c.x,1.3,c.z)}',[gx,gz]);p.mouse.move(q['x'],q['y']);p.evaluate('Realm.test.render()');
   if kind=='floor' and gx==-2:
    check('Valid placement creates a visible-world blueprint',p.evaluate('Realm.test.presentation().blueprint.valid===true'))
    p.evaluate('Realm.test.render();Realm.test.render();Realm.test.render()')
    check('Music presentation tick does not erase build-mode grid',p.evaluate('Realm.test.presentation().buildMode===true'))
    check('Blueprint survives repeated rendered frames',p.evaluate('Realm.test.presentation().blueprint.kind==="floor"'))
   p.mouse.click(q['x'],q['y']);p.keyboard.press('Escape');p.evaluate('Realm.test.render()')
  build('floor',-2,2);build('bed',-2,2)
  check('Built deck and bed exist on two distinct layers',p.evaluate('Realm.state.sandbox.placed.filter(o=>o.gx===-2&&o.gz===2).length')==2)
  p.click('#interact');check('Interact plants actual seed',p.evaluate('Realm.state.sandbox.placed.find(o=>o.kind==="bed").crop.stage')=='seeded')
  p.click('#interact');check('Second interact waters the crop',p.evaluate('Realm.state.sandbox.placed.find(o=>o.kind==="bed").crop.stage')=='watered')
  p.evaluate('Realm.test.pause(true)');p.wait_for_timeout(200);check('Pause keeps crop timer unchanged',p.evaluate('Realm.state.sandbox.placed.find(o=>o.kind==="bed").crop.stage')=='watered');p.evaluate('Realm.test.pause(false)')
  advance(91);p.click('#interact');check('Ripe crop produces three berries',p.evaluate('Realm.state.sandbox.inventory.berry')==3)
  build('floor',-1,2);build('lantern',-1,2)
  check('Lantern is a saved object, not a status label',p.evaluate('Realm.state.sandbox.placed.some(o=>o.kind==="lantern")'))
  check('All six milestones achieved from empty backpack',p.evaluate('RealmSandbox.objectives(Realm.state.sandbox).every(m=>m.done)'))
  build('masonry',-2,1);build('masonry',-2,1);build('masonry',-2,1)
  check('Three-block stack exists in accepted world',p.evaluate('Realm.state.sandbox.placed.filter(o=>o.kind==="masonry").length')==3)
  panel('build');p.click('[data-action="sb-reclaim"]');q=p.evaluate('Realm.project(-3.3,1.3,-38.35)');p.mouse.move(q['x'],q['y']);p.mouse.click(q['x'],q['y']);p.keyboard.press('Escape')
  check('Reclaim removes only topmost stone block',p.evaluate('Realm.state.sandbox.placed.filter(o=>o.kind==="masonry").length')==2)
  p.evaluate('Realm.test.save()');storage=p.evaluate('Object.fromEntries(ST)');snap=p.evaluate('Realm.state');p.close();p=spawn(ctx,storage)
  check('Cold page restores exact sandbox data',p.evaluate('Realm.state.sandbox')==snap['sandbox'])
  check('Cold page leaves music off',p.evaluate('Realm.diagnostics.audio.state')=='not-created')
  panel('chronicle')
  with p.expect_download() as dl:p.click('[data-action="export"]')
  exported=Path(dl.value.path()).read_bytes();(OUT/'WILDWOOD_JOURNEY_SAVE.json').write_bytes(exported)
  check('Portable world export contains actual build and farm state',json.loads(exported)['sandbox']==p.evaluate('Realm.state.sandbox'))
  p.on('dialog',lambda d:d.accept());before=p.evaluate('JSON.stringify(Realm.state)');bad=json.loads(exported);bad['sandbox']['inventory']['wood']=-2
  p.set_input_files('#import-file',{'name':'bad.json','mimeType':'application/json','buffer':json.dumps(bad).encode()});p.wait_for_timeout(150)
  check('Invalid import refuses the entire replacement',p.evaluate('JSON.stringify(Realm.state)')==before)
  p.set_input_files('#import-file',{'name':'save.json','mimeType':'application/json','buffer':exported});p.wait_for_timeout(150)
  check('Valid import restores sandbox through normal input',p.evaluate('Realm.state.sandbox')==json.loads(exported)['sandbox'])
  p.evaluate('Realm.test.quality("balanced");Realm.test.setTime(17.2);Realm.test.view({overview:false,half:14,center:[-1,1.7,-39]});Realm.test.render()');p.wait_for_timeout(600)
  p.screenshot(path=str(OUT/'05-earned-homestead.png'),timeout=30000)
  check('Water still uses the tested reflection matrix',p.evaluate('Realm.diagnostics.reflection.method')=='world-plane P*V*H')
  check('No JavaScript errors in full sandbox journey',not errs)
  check('No network requests in full sandbox journey',not requests)
  ctx.close()
  mobile=browser.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,offline=True);p=spawn(mobile)
  check('Touch viewport renders WebGL2',p.evaluate('Realm.diagnostics.mode')=='webgl2')
  check('No horizontal page overflow',p.evaluate('document.documentElement.scrollWidth<=innerWidth'))
  for sel in ['#pack-open','#craft-open','#build-open','#studio-open','#interact']:
   b=p.locator(sel).bounding_box();check('Touch button fits '+sel,b and b['x']>=0 and b['x']+b['width']<=390)
  p.click('#pack-open');p.click('[data-action="sb-gather"][data-id="fiber"]');advance(90);advance(1)
  check('Touch backpack can initiate real gathering',p.evaluate('Realm.state.sandbox.inventory.fiber')==3)
  p.click('#build-open');check('Touch construction panel provides 49 accessible tiles',p.locator('.homestead-plan button').count()==49)
  p.wait_for_timeout(400);p.screenshot(path=str(OUT/'05-mobile-construction.png'),timeout=30000)
  mobile.close();browser.close()
except Exception as e:
 REPORT['errors'].append(str(e));REPORT['traceback']=traceback.format_exc();print(REPORT['traceback'],flush=True)
finally:
 REPORT['passed']=not REPORT['errors'] and all(c['passed'] for c in REPORT['checks']);REPORT['checks_passed']=sum(c['passed'] for c in REPORT['checks']);(OUT/'SANDBOX_BROWSER_REPORT.json').write_text(json.dumps(REPORT,indent=2));print(json.dumps({'passed':REPORT['passed'],'checks':REPORT['checks_passed'],'errors':REPORT['errors']},indent=2),flush=True)

"""Exact offline HTML, real UI and earned material checkpoints from arsenal_journey.
No direct item or practice-hit grants. Navigation/time use accepted test helpers.
Storage is an explicit Map-backed fixture, NOT native-origin storage evidence."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import json, hashlib, traceback
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'evidence08';OUT.mkdir(exist_ok=True)
HTML=(ROOT/'FIRSTLIGHT_VALLEY.html').read_text()
START=json.loads((OUT/'ARMORY_MATERIALS_EARNED.json').read_text())
COMPLETE=json.loads((OUT/'ARMORY_COMPLETE_EARNED.json').read_text())
ROAD_READY=json.loads((OUT/'BOW_ROAD_READY_EARNED.json').read_text())
report={'method':__doc__,'build_sha256':hashlib.sha256(HTML.encode()).hexdigest(),'checks':[],'errors':[]}
def check(name,value):
 report['checks'].append({'check':name,'passed':bool(value)});print(('PASS ' if value else 'FAIL ')+name,flush=True)
 if not value:raise AssertionError(name)
ARGS=['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=gl-egl','--enable-webgl','--ignore-gpu-blocklist','--disable-gpu-sandbox']
try:
 with sync_playwright() as pw:
  b=pw.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=ARGS);errors=[];requests=[]
  def spawn(ctx,save=START,fallback=False):
   q=ctx.new_page();q.on('pageerror',lambda e:errors.append(str(e)));q.on('request',lambda r:requests.append(r.url))
   q.evaluate('''({save,fallback})=>{window.__ETERNITIES_TEST_MODE=true;window.__ETERNITIES_CAPTURE_MODE=true;window.ST=new Map([['eternities.realm08.save.v7',JSON.stringify(save)]]);Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>ST.get(k)||null,setItem:(k,v)=>ST.set(k,String(v)),removeItem:k=>ST.delete(k)}});if(fallback){const get=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(t,...a){return t==='webgl2'?null:get.call(this,t,...a)}}}''',{'save':save,'fallback':fallback})
   q.set_content(HTML,wait_until='load');q.wait_for_function('window.Realm');q.wait_for_timeout(500);q.evaluate('Realm.test.quality("low");Realm.test.render()');return q
  ctx=b.new_context(viewport={'width':1440,'height':960},offline=True,accept_downloads=True);p=spawn(ctx)
  def step(t):p.evaluate('(t)=>{Realm.test.step(t);Realm.test.render()}',t)
  def close():
   if p.locator('#drawer').evaluate('(e)=>e.classList.contains("open")'):p.click('#close-panel')
  def panel():
   close();p.click('#armory-open');p.wait_for_timeout(60)
  def walk(x,z):
   close();check('Accepted walking route '+str((x,z)),p.evaluate('([x,z])=>Realm.test.move(x,z).ok',[x,z]));p.evaluate('Realm.test.step(30);Realm.test.render()');v=p.evaluate('Realm.diagnostics.adventure.player');check('Reached '+str((x,z)),((v['x']-x)**2+(v['z']-z)**2)**.5<.15)
  check('Realm08 boots in offline WebGL2',p.evaluate('Realm.diagnostics.version')=='8.0.0' and p.evaluate('Realm.diagnostics.mode')=='webgl2')
  check('Audio silent before gesture',p.evaluate('Realm.diagnostics.audio.state')=='not-created')
  p.click('#interact');check('Prepared workshop interaction opens armory',p.locator('[data-action="ar-craft"]').count()==5);close();p.keyboard.press('9');check('Armory shortcut opens actual recipe panel',p.locator('[data-action="ar-craft"]').count()==5)
  old=p.evaluate('Realm.state.sandbox.inventory')
  p.click('[data-action="ar-craft"][data-id="trail_bow"]');check('Craft consumes actual timber/fibre/stone',p.evaluate('Realm.state.sandbox.inventory.wood')==old['wood']-6 and p.evaluate('Realm.state.sandbox.inventory.fiber')==old['fiber']-4 and p.evaluate('Realm.state.sandbox.inventory.stone')==old['stone']-2)
  check('Unique bow recipe becomes disabled',p.locator('[data-action="ar-craft"][data-id="trail_bow"]').is_disabled())
  p.click('[data-action="ar-equip"][data-id="trail_bow"]');check('Bow equip changes weapon profile',p.evaluate('Realm.diagnostics.adventure.weapon.style')=='bow')
  p.click('[data-action="ar-range-enter"]');close();p.evaluate('Realm.test.render()');check('Practice court renders separate geometry',p.evaluate('Realm.diagnostics.scene')=='range' and p.evaluate('Realm.diagnostics.metrics.instances')>800)
  check('Three practice targets instantiated',p.evaluate('Realm.diagnostics.adventure.enemies.length')==3)
  check('Ranged controls display actual ability names','Arrow' in p.locator('#battle-strike').inner_text() and 'Pierce' in p.locator('#battle-pulse').inner_text())
  p.evaluate('Realm.test.quality("balanced");Realm.test.setTime(17.2);Realm.test.view({overview:true});Realm.test.render()');p.wait_for_timeout(4400);p.screenshot(path=str(OUT/'08-archery-court.png'));p.evaluate('Realm.test.quality("low")')
  check('Solid pillar rejects walking',not p.evaluate('Realm.test.move(3,0).ok'))
  p.click('#explore');p.click('[data-action="place-action"][data-id="home"]');check('Outdoor menu cannot teleport out of court',p.evaluate('Realm.diagnostics.scene')=='range');close()
  walk(0,-3);p.click('#range-begin');p.evaluate('Realm.test.render()');check('Begin round starts actual 30-second timer',p.evaluate('Realm.diagnostics.adventure.range.active'))
  prior=p.evaluate('Realm.state.adventure');p.evaluate('Realm.test.pause(true)');p.wait_for_timeout(400);check('Pause preserves active-time clock',p.evaluate('Realm.state.adventure.elapsed')==prior['elapsed']);p.evaluate('Realm.test.pause(false)')
  # A projected ground hit exercises normal mouse->ray->target dispatch.
  pt=p.evaluate('Realm.project(-6,1.58,-5)');p.mouse.click(pt['x'],pt['y']);step(.1)
  check('Clicking a target releases actual projectile',len(p.evaluate('Realm.diagnostics.adventure.arrows'))>0)
  check('Target has no premature hit at release',p.evaluate('(Realm.diagnostics.adventure.range.hits["range-west"]||0)')==0)
  p.evaluate('Realm.test.quality("balanced");Realm.test.view({overview:false,half:10});Realm.test.render()');p.screenshot(path=str(OUT/'08-arrow-in-flight.png'));p.evaluate('Realm.test.quality("low");Realm.test.view({overview:true});Realm.test.render()')
  for target in ['range-west','range-mid','range-east']:
   panel();p.click('[data-action="ar-target"][data-id="'+target+'"]');close()
   for _ in range(20):
    if p.evaluate('(id)=>(Realm.diagnostics.adventure.range.hits[id]||0)>=2',target):break
    step(.2)
   check('Two physical arrow hits '+target,p.evaluate('(id)=>(Realm.diagnostics.adventure.range.hits[id]||0)>=2',target))
  p.keyboard.press('ArrowDown');p.keyboard.up('ArrowDown') # cancels auto targeting; no test-mode frame movement
  step(.1)
  check('Medal earned without targeting state grants',p.evaluate('Realm.state.adventure.arsenal.rangeMedal'))
  check('First prize exactly five sunmarks and one amber',p.evaluate('Realm.state.adventure.coins')==prior['coins']+5 and p.evaluate('Realm.state.adventure.arsenal.gems.amber')==1)
  check('Practice changes neither health nor XP',p.evaluate('Realm.state.adventure.hp')==prior['hp'] and p.evaluate('Realm.state.adventure.xp')==prior['xp'])
  check('Practice targets never become dead enemies or drops',p.evaluate('Realm.state.adventure.defeated.length')==len(prior['defeated']) and p.evaluate('Realm.state.adventure.drops.length')==len(prior['drops']))
  p.evaluate('Realm.test.render()');check('Completed result shown', 'Round complete' in p.locator('#range-progress').inner_text())
  p.click('#range-begin');step(.15);p.click('#range-stop');step(.2);check('End round clears intent and arrows',not p.evaluate('Realm.diagnostics.adventure.range.active') and not p.evaluate('Realm.diagnostics.adventure.arrows.length') and p.evaluate('Realm.diagnostics.adventure.intent') is None)
  panel();p.select_option('#socket-trail_bow','amber');before=p.evaluate('Realm.state.adventure.arsenal');p.click('[data-action="ar-socket"][data-id="trail_bow"]');check('Fitting a gem in the court is refused without losing it',p.evaluate('Realm.state.adventure.arsenal')==before)
  walk(0,9);p.click('#interact');p.evaluate('Realm.test.render()');check('South gate returns to original workshop',p.evaluate('Realm.diagnostics.scene')=='valley' and p.evaluate('Math.hypot(Realm.state.player.x-11,Realm.state.player.z-9)<.1'))
  panel();p.select_option('#socket-trail_bow','amber');p.click('[data-action="ar-socket"][data-id="trail_bow"]');check('Workbench installs actual earned gem',p.evaluate('Realm.state.adventure.arsenal.sockets.trail_bow')=='amber' and p.evaluate('Realm.state.adventure.arsenal.gems.amber')==0)
  p.select_option('#socket-trail_bow','');p.click('[data-action="ar-socket"][data-id="trail_bow"]');check('Gem removal returns it intact',p.evaluate('Realm.state.adventure.arsenal.gems.amber')==1 and p.evaluate('Realm.state.adventure.arsenal.sockets.trail_bow') is None)
  # Complete earned equipment checkpoint exercises second bow + stat-aware fitting.
  close();p.evaluate('(s)=>Realm.test.replace(s)',COMPLETE);panel();p.evaluate('Realm.test.render()');check('Two bows and original blades survive restore',p.evaluate('Realm.state.adventure.owned.includes("copper_bow")&&Realm.state.adventure.owned.includes("trail_bow")&&Realm.state.adventure.owned.includes("trail_blade")'))
  hp=p.evaluate('Realm.state.adventure.hp');attack=p.evaluate('Realm.diagnostics.adventure.stats.attack');maxhp=p.evaluate('Realm.diagnostics.adventure.stats.maxHP')
  p.select_option('#socket-copper_bow','moonstone');p.click('[data-action="ar-socket"][data-id="copper_bow"]');p.evaluate('Realm.test.render()');check('Moonstone changes equipped stats and returns ruby',p.evaluate('Realm.diagnostics.adventure.stats.maxHP')==maxhp+18 and p.evaluate('Realm.diagnostics.adventure.stats.attack')==attack-4 and p.evaluate('Realm.state.adventure.arsenal.gems.ruby')==1)
  check('Socket fitting does not heal',p.evaluate('Realm.state.adventure.hp')==hp)
  p.screenshot(path=str(OUT/'08-workbench-sockets.png'));close();p.click('#chronicle')
  with p.expect_download() as download:p.click('[data-action="export"]')
  data=Path(download.value.path()).read_bytes();saved=json.loads(data);check('Real export contains bounded new record',saved['version']==7 and saved['adventure']['version']==3 and saved['adventure']['arsenal']['sockets']['copper_bow']=='moonstone')
  p.on('dialog',lambda d:d.accept());p.set_input_files('#import-file',{'name':'round.json','mimeType':'application/json','buffer':data});p.wait_for_timeout(200);check('UI import retains exact sockets, project and home',p.evaluate('Realm.state.adventure.arsenal')==saved['adventure']['arsenal'] and p.evaluate('Realm.state.score')==saved['score'] and p.evaluate('Realm.state.retreat')==saved['retreat'])
  cold=spawn(ctx,p.evaluate('Realm.state'));check('Cold fixture restart preserves earned medal and socket effects',cold.evaluate('Realm.state.adventure.arsenal')==saved['adventure']['arsenal'] and cold.evaluate('Realm.diagnostics.adventure.weapon.style')=='bow');cold.close()
  # Actual first road fight from independently earned ranged checkpoint, no grants.
  p.evaluate('(s)=>Realm.test.replace(s)',ROAD_READY);p.evaluate('Realm.navigate("lookout");Realm.test.step(60);Realm.test.render()');p.click('#interact');p.evaluate('Realm.test.render()');check('Bow travels into the real road scene',p.evaluate('Realm.diagnostics.scene')=='road')
  p.click('#adventure-open');p.click('[data-action="adv-road-route"][data-id="road-prowler"]');close()
  for _ in range(80):
   if p.evaluate('Realm.diagnostics.adventure.arrows.length'):break
   step(.1)
  check('Road auto-target uses ranged approach and arrows',p.evaluate('Realm.diagnostics.adventure.arrows.length')>0 and p.evaluate('Realm.diagnostics.adventure.weapon.style')=='bow')
  p.evaluate('Realm.test.view({overview:false,half:13});Realm.test.quality("balanced");Realm.test.render()');p.screenshot(path=str(OUT/'08-bow-on-the-road.png'));p.evaluate('Realm.test.quality("low")')
  for _ in range(140):
   if p.evaluate('Realm.state.adventure.defeated.includes("road-prowler")'):break
   if p.evaluate('Realm.state.adventure.hp')<60 and p.locator('#battle-heal').is_enabled():p.click('#battle-heal')
   step(.1)
  check('Ranged combat defeats an actual encounter',p.evaluate('Realm.state.adventure.defeated.includes("road-prowler")'))
  check('Ranged defeat gives one cache and exact XP',p.evaluate('Realm.state.adventure.drops.filter(id=>id==="road-prowler").length')==1 and p.evaluate('Realm.state.adventure.xp')==ROAD_READY['adventure']['xp']+20)
  check('No unhandled browser exceptions',not errors);check('No remote requests',not requests);ctx.close()
  # Independent touch-sized context; not a physical phone or Safari test.
  mob=b.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,offline=True);p=spawn(mob,json.loads((OUT/'RANGE_READY_EARNED.json').read_text()));p.click('#explore');p.click('[data-action="sb-open"][data-id="armory"]');p.click('[data-action="ar-range-enter"]');close();p.evaluate('Realm.test.render()');check('Touch-sized range renders',p.evaluate('Realm.diagnostics.scene')=='range')
  check('No horizontal mobile overflow',p.evaluate('document.documentElement.scrollWidth<=innerWidth'))
  for selector in ['#range-round','#battle-hud','#interact']:
   box=p.locator(selector).bounding_box();check('Mobile visible control fits '+selector,box is not None and box['x']>=0 and box['x']+box['width']<=390 and box['y']>=0 and box['y']+box['height']<=844)
  check('Range status does not cover sound or settings',p.locator('#range-round').bounding_box()['y']>=p.locator('#settings').bounding_box()['y']+p.locator('#settings').bounding_box()['height']);
  check('Mobile overview includes target centers',p.evaluate('Realm.diagnostics.adventure.enemies.every(e=>{const p=Realm.project(e.x,2.9,e.z);return p.visible&&p.x>5&&p.x<innerWidth-5})'));p.wait_for_timeout(4300);p.screenshot(path=str(OUT/'08-mobile-court.png'));p.click('#range-menu');check('Mobile gem controls fit drawer',p.locator('#drawer').bounding_box()['width']<=390);p.screenshot(path=str(OUT/'08-mobile-armory.png'));mob.close()
  fb=b.new_context(viewport={'width':1000,'height':800},offline=True);p=spawn(fb,json.loads((OUT/'RANGE_READY_EARNED.json').read_text()),True);panel();p.click('[data-action="ar-range-enter"]');close();p.evaluate('Realm.test.render()');check('Unavailable WebGL renders practice map',p.evaluate('Realm.diagnostics.mode')=='map' and p.evaluate('Realm.diagnostics.scene')=='range');walk(0,-3);p.click('#range-begin');panel();p.click('[data-action="ar-target"][data-id="range-mid"]');step(1.2);check('Map mode uses same travelling arrow rules',p.evaluate('(Realm.diagnostics.adventure.range.hits["range-mid"]||0)>=1'));p.screenshot(path=str(OUT/'08-range-map.png'));fb.close();b.close()
 report['browser_errors']=errors;report['network_requests']=requests;report['passed']=True
except Exception as e:
 report['passed']=False;report['errors'].append(str(e));report['traceback']=traceback.format_exc();print(report['traceback'],flush=True)
finally:
 report['checks_passed']=sum(q['passed'] for q in report['checks']);(OUT/'ARSENAL_BROWSER_REPORT.json').write_text(json.dumps(report,indent=2))

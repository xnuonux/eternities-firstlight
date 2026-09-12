"""Exact offline standalone HTML in Chromium. Earned chapter-II start from
road_journey.cjs. Long-distance navigation and time use real path/simulation
commands; combat, discovery, shop and story use visible UI. Map-backed storage
is an explicitly labeled fixture, not native persistence certification.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright
import json,hashlib,traceback,os
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'evidence07';OUT.mkdir(exist_ok=True)
HTML=(ROOT/'FIRSTLIGHT_VALLEY.html').read_text();START=json.loads((OUT/'CHAPTER_II_START_EARNED.json').read_text())
report={'method':__doc__,'build_sha256':hashlib.sha256(HTML.encode()).hexdigest(),'checks':[],'errors':[]}
def check(name,value):
 report['checks'].append({'check':name,'passed':bool(value)});print(('PASS ' if value else 'FAIL ')+name,flush=True)
 if not value:raise AssertionError(name)
ARGS=['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=gl-egl','--enable-webgl','--ignore-gpu-blocklist','--disable-gpu-sandbox']
try:
 with sync_playwright() as pw:
  b=pw.chromium.launch(executable_path=os.getenv('FIRSTLIGHT_CHROMIUM','/usr/bin/chromium'),headless=True,args=ARGS);errors=[];requests=[]
  def spawn(ctx,save=START,fallback=False):
   p=ctx.new_page();p.on('pageerror',lambda e:errors.append(str(e)));p.on('request',lambda r:requests.append(r.url))
   p.evaluate('''({save,fallback})=>{window.__ETERNITIES_TEST_MODE=true;window.__ETERNITIES_CAPTURE_MODE=true;window.ST=new Map([['eternities.realm07.save.v6',JSON.stringify(save)]]);Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>ST.get(k)||null,setItem:(k,v)=>ST.set(k,String(v)),removeItem:k=>ST.delete(k)}});if(fallback){const get=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(t,...args){return t==='webgl2'?null:get.call(this,t,...args)}}}''',{'save':save,'fallback':fallback})
   p.set_content(HTML,wait_until='load');p.wait_for_function('window.Realm');p.wait_for_timeout(500);p.evaluate('Realm.test.quality("low");Realm.test.render()');return p
  ctx=b.new_context(viewport={'width':1440,'height':960},offline=True,accept_downloads=True);p=spawn(ctx)
  def step(t,render=False):
   p.evaluate('(t)=>Realm.test.step(t)',t)
   if render:p.evaluate('Realm.test.render()')
  def close():
   if p.locator('#drawer').evaluate('(e)=>e.classList.contains("open")'):p.click('#close-panel')
  def panel():
   close();p.click('#adventure-open');p.wait_for_timeout(150)
  def walk(x,z):
   close();check('Accepted route '+str((x,z)),p.evaluate('([x,z])=>Realm.test.move(x,z).ok',[x,z]))
   for _ in range(1100):
    if not p.evaluate('Realm.test.path.length'):break
    if p.evaluate('Realm.state.adventure.hp')<85 and p.locator('#battle-heal').is_visible() and p.locator('#battle-heal').is_enabled():p.click('#battle-heal')
    step(.15)
   pos=p.evaluate('Realm.diagnostics.adventure.player');check('Arrived '+str((x,z)),((pos['x']-x)**2+(pos['z']-z)**2)**.5<.2);p.evaluate('Realm.test.render()')
  def fight(id):
   panel();p.click('[data-action="adv-road-route"][data-id="'+id+'"]')
   for _ in range(260):
    if p.evaluate('(id)=>Realm.state.adventure.defeated.includes(id)',id):break
    if p.evaluate('Realm.state.adventure.hp')<85 and p.locator('#battle-heal').is_enabled():p.click('#battle-heal')
    if p.locator('#battle-pulse').is_enabled() and p.evaluate('Realm.state.adventure.stamina')>=55:p.click('#battle-pulse')
    step(.2)
    if p.evaluate('Realm.state.adventure.hp')<=0:raise AssertionError('UI journey died before '+id)
   check('Defeated using visible controls '+id,p.evaluate('(id)=>Realm.state.adventure.defeated.includes(id)',id));p.evaluate('Realm.test.render()')
  check('Current WebGL2 standalone boots offline',p.evaluate('Realm.diagnostics.version')=='8.0.0' and p.evaluate('Realm.diagnostics.mode')=='webgl2')
  p.click('#interact');p.evaluate('Realm.test.render()');check('E enters the unlocked road',p.evaluate('Realm.diagnostics.scene')=='road');check('Road geometry rendered',p.evaluate('Realm.diagnostics.metrics.instances')>1500)
  p.evaluate('Realm.test.quality("balanced");Realm.test.setTime(17.25);Realm.test.view({overview:true});Realm.test.render()');p.screenshot(path=str(OUT/'07-sunward-road.png'))
  p.click('#explore');p.click('[data-action="place-action"][data-id="home"]');check('Outdoor menu cannot teleport out of expedition',p.evaluate('Realm.diagnostics.scene')=='road');close();p.evaluate('Realm.test.quality("low")')
  fight('road-prowler');unclaimed=p.evaluate('Realm.state');walk(-2,8);p.click('#interact');check('Encounter cache paid',p.evaluate('Realm.state.adventure.coins')==START['adventure']['coins']+5)
  walk(-9,5);panel();p.click('[data-action="adv-seek"][data-id=""]');close();check('Panel Seek begins physical mission not instant discovery',p.evaluate('Realm.diagnostics.adventure.companion.seek')=='cart-latch' and not p.evaluate('Realm.state.adventure.road.revealed.length'))
  step(8,True);check('Fox reveals latch on arrival',p.evaluate('Realm.state.adventure.road.revealed.includes("cart-latch")'))
  walk(-11,3);p.click('#interact');check('Collected discovered cache',p.evaluate('Realm.state.adventure.road.claimed.includes("cart-latch")'))
  walk(-10,12);p.click('#interact');check('Repair opens shop',p.evaluate('Realm.state.adventure.road.cartRepaired'));p.click('#interact');p.wait_for_timeout(150);check('Shop contains four exact offers',p.locator('[data-action="adv-trade"]').count()==4)
  old=p.evaluate('Realm.state.adventure.coins');p.click('[data-action="adv-trade"][data-offer="mantle"]');check('Mantle charged exactly 18',p.evaluate('Realm.state.adventure.coins')==old-18)
  p.click('[data-action="adv-equip"][data-id="courier_mantle"]');check('Merchant item equips',p.evaluate('Realm.state.adventure.equipment.armor')=='courier_mantle')
  coins=p.evaluate('Realm.state.adventure.coins');p.click('[data-action="adv-trade"][data-offer="mantle"]');check('Repeat purchase not charged',p.evaluate('Realm.state.adventure.coins')==coins)
  p.click('[data-action="adv-trade"][data-offer="sell-copper"]');check('Selling copper changes real balance',p.evaluate('Realm.state.adventure.coins')==coins+3);p.screenshot(path=str(OUT/'07-tessa-shop.png'))
  close();p.evaluate('Realm.test.quality("balanced");Realm.test.view({overview:false,half:12,center:[-9,2,10]});Realm.test.render()');p.screenshot(path=str(OUT/'07-caravan.png'));p.evaluate('Realm.test.quality("low")')
  walk(2,3.4);walk(2,-4);check('Bridge connects traversable banks',p.evaluate('RealmRoad.walkable(Realm.diagnostics.adventure.player.x,Realm.diagnostics.adventure.player.z)'))
  fight('road-prism');walk(6,-8);p.click('#interact');walk(9,-13);p.click('#battle-seek');step(8,True);walk(11,-13);p.click('#interact');check('Second discovery separate from latch',p.evaluate('Realm.state.adventure.road.claimed.length')==2)
  walk(0,-12);step(.2,True)
  for _ in range(40):
   if p.evaluate('Realm.diagnostics.adventure.enemies.find(e=>e.id==="road-ram").mode')=='windup':break
   step(.05)
  p.evaluate('Realm.test.quality("balanced");Realm.test.view({overview:false,half:13,center:[0,2,-16]});Realm.test.render()');p.screenshot(path=str(OUT/'07-guardian-charge.png'));p.evaluate('Realm.test.quality("low")');check('Ram telegraphs actual charge',p.evaluate('Realm.diagnostics.adventure.enemies.find(e=>e.id==="road-ram").mode')=='windup')
  p.click('#battle-dodge');check('Dodge spent real stamina',p.evaluate('Realm.state.adventure.stamina')<100)
  fight('road-ram');walk(0,-19);p.click('#interact');walk(0,-24);p.click('#interact');check('Beacon follows actual encounters',p.evaluate('Realm.state.adventure.road.beaconLit'))
  p.evaluate('Realm.test.setTime(20.3);Realm.test.quality("balanced");Realm.test.view({overview:false,half:12,center:[0,2,-22]});Realm.test.render()');p.screenshot(path=str(OUT/'07-beacon-evening.png'));p.evaluate('Realm.test.quality("low")')
  walk(0,17);p.click('#interact');p.evaluate('Realm.test.render()');check('Exit restores lookout position',p.evaluate('Realm.diagnostics.scene')=='valley' and p.evaluate('Realm.state.player.x')==44)
  walk(0,3);p.click('#interact');check('Report completes chapter II',p.evaluate('Realm.state.adventure.road.reported'));check('Quest band exists in inventory',p.evaluate('Realm.state.adventure.owned.includes("wayfarer_band")'))
  panel();p.click('[data-action="adv-equip"][data-id="wayfarer_band"]');check('Quest band equips',p.evaluate('Realm.state.adventure.equipment.charm')=='wayfarer_band');close()
  for key in ['score','retreat','notes','flowers','visitor']:check('Preserved '+key,p.evaluate('(k)=>Realm.state[k]',key)==START[key])
  check('Reflection remains P*V*H',p.evaluate('Realm.diagnostics.reflection.method')=='world-plane P*V*H')
  p.evaluate('Realm.test.save()');complete=p.evaluate('Realm.state');(OUT/'BROWSER_CHAPTER_II_COMPLETE.json').write_text(json.dumps(complete,indent=2));restored=spawn(ctx,complete);check('Cold reload retains completion and gear',restored.evaluate('Realm.state.adventure.road.reported') and restored.evaluate('Realm.state.adventure.equipment.charm')=='wayfarer_band');restored.close()
  # Old mine must not crash or collect a valid but out-of-scene road cache.
  original=p;p=spawn(ctx,unclaimed);check('Unclaimed road cache survives cold reload',p.evaluate('Realm.state.adventure.drops.includes("road-prowler")'));walk(0,-48);p.click('#interact');p.evaluate('Realm.test.render()');check('Mine with road loot renders',p.evaluate('Realm.diagnostics.scene')=='mine');walk(0,4);p.click('#interact');p.evaluate('Realm.test.render()');check('Mine ignores road caches without exception',p.evaluate('Realm.state.adventure.drops.includes("road-prowler")') and not errors);p.close();p=original
  mob=b.new_context(viewport={'width':390,'height':844},device_scale_factor=1,is_mobile=True,has_touch=True,offline=True);m=spawn(mob);m.click('#interact');m.evaluate('Realm.test.render()');check('Touch-sized road renders',m.evaluate('Realm.diagnostics.mode')=='webgl2' and m.evaluate('Realm.diagnostics.scene')=='road');check('No mobile horizontal overflow',m.evaluate('document.documentElement.scrollWidth<=innerWidth'))
  for sel in ['#battle-strike','#battle-pulse','#battle-dodge','#battle-heal','#battle-seek','#interact','#chapter-open']:
   box=m.locator(sel).bounding_box();check('Control fits viewport '+sel,box and box['x']>=0 and box['y']>=0 and box['x']+box['width']<=390.5 and box['y']+box['height']<=844)
  m.screenshot(path=str(OUT/'07-mobile-road.png'));mob.close()
  fb=b.new_context(viewport={'width':1000,'height':800},offline=True);f=spawn(fb,fallback=True);f.click('#interact');f.evaluate('Realm.test.render()');check('Fallback map enters same chapter',f.evaluate('Realm.diagnostics.mode')=='map' and f.evaluate('Realm.diagnostics.scene')=='road');f.click('#battle-pulse');check('Fallback uses same stamina',f.evaluate('Realm.state.adventure.stamina')==70);f.click('#interact');check('Fallback exits through gate',f.evaluate('Realm.diagnostics.scene')=='valley');fb.close()
  check('No page exceptions',not errors);check('No external requests',not requests);report['browser_errors']=errors;report['requests']=requests;b.close()
except Exception as e:
 report['errors'].append(str(e));report['traceback']=traceback.format_exc();print(report['traceback'],flush=True)
finally:
 report['passed']=not report['errors'] and all(c['passed'] for c in report['checks']);report['checks_passed']=sum(c['passed'] for c in report['checks']);(OUT/'ROAD_BROWSER_REPORT.json').write_text(json.dumps(report,indent=2));print(json.dumps({'passed':report['passed'],'checks':report['checks_passed'],'errors':report['errors']}),flush=True)

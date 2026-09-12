from pathlib import Path
from playwright.sync_api import sync_playwright
import json,traceback
R=Path(__file__).resolve().parents[1];O=R/'evidence10';html=(R/'FIRSTLIGHT_VALLEY.html').read_text();save=json.loads((O/'journey/TOWN_MET_EARNED.json').read_text())
with sync_playwright() as pw:
 b=pw.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=gl-egl','--enable-webgl','--ignore-gpu-blocklist','--disable-gpu-sandbox'])
 c=b.new_context(viewport={'width':1440,'height':960},offline=True);p=c.new_page();errors=[];p.on('pageerror',lambda e:errors.append(str(e)))
 p.evaluate('''(s)=>{window.__ETERNITIES_TEST_MODE=true;window.__ETERNITIES_CAPTURE_MODE=true;let m=new Map([['eternities.realm10.save.v9',JSON.stringify(s)]]);Object.defineProperty(window,'localStorage',{value:{getItem:k=>m.get(k)||null,setItem:(k,v)=>m.set(k,v),removeItem:k=>m.delete(k)}})}''',save)
 try:
  p.set_content(html,wait_until='load');p.wait_for_function('window.Realm');p.evaluate('Realm.test.quality("low");Realm.test.move(0,3);Realm.test.step(30)');print('boot',p.evaluate('Realm.diagnostics.version'),errors)
  print('travel',p.evaluate('Realm.test.adventure("smoke-travel","waystone-travel",{id:"bellweather"})'));p.evaluate('Realm.test.step(.1);Realm.test.render()');p.wait_for_timeout(300)
  p.evaluate('Realm.test.quality("balanced");Realm.test.view({half:24,yaw:.33,elevation:.92,overview:true});Realm.test.render()');p.screenshot(path=str(O/'10-town-smoke.png'))
  p.keyboard.press('m');p.screenshot(path=str(O/'10-atlas-smoke.png'));print('atlas',p.locator('#rpg-heading').inner_text(),errors)
  p.click('#rpg-close');p.evaluate('Realm.test.move(-2,9);Realm.test.step(12);Realm.test.render()');p.keyboard.press('e');p.screenshot(path=str(O/'10-rowan-smoke.png'));print('rowan',p.locator('#rpg-heading').inner_text(),errors)
 except Exception:traceback.print_exc();print('page-errors',errors)
 b.close()

"""Actual rendered game images from earned checkpoints. No progress assignment.
Camera/time-of-day set explicitly for presentation; capture mode freezes simulation.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright
import json,hashlib
R=Path(__file__).resolve().parents[1];O=R/'evidence10/captures';O.mkdir(exist_ok=True);HTML=(R/'FIRSTLIGHT_VALLEY.html').read_text();metadata={'build_sha256':hashlib.sha256(HTML.encode()).hexdigest(),'method':__doc__,'images':[]}
with sync_playwright() as pw:
 b=pw.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=gl-egl','--enable-webgl','--ignore-gpu-blocklist','--disable-gpu-sandbox'])
 c=b.new_context(viewport={'width':1600,'height':1000},offline=True);p=c.new_page();errors=[];p.on('pageerror',lambda e:errors.append(str(e)));s=json.loads((R/'evidence10/journey/HOME_AFTER_BELL_EARNED.json').read_text())
 p.evaluate('''s=>{window.__ETERNITIES_TEST_MODE=true;window.__ETERNITIES_CAPTURE_MODE=true;let m=new Map([['eternities.realm10.save.v9',JSON.stringify(s)]]);Object.defineProperty(window,'localStorage',{value:{getItem:k=>m.get(k)||null,setItem:(k,v)=>m.set(k,v),removeItem:k=>m.delete(k)}})}''',s)
 p.set_content(HTML,wait_until='load');p.wait_for_function('window.Realm');p.evaluate('Realm.test.quality("low");Realm.test.adventure("capture-cross","waystone-travel",{id:"bellweather"});Realm.test.move(1,10);for(let i=0;i<6000&&Realm.test.path.length;i++)Realm.test.step(.05);Realm.test.setTime(17.4);Realm.test.view({half:20,yaw:.45,elevation:.86,overview:false})');p.wait_for_timeout(4500);p.evaluate('Realm.test.quality("balanced");Realm.test.render()');p.screenshot(path=str(O/'FIRSTLIGHT_10_Bellweather.png'));metadata['images'].append({'file':'FIRSTLIGHT_10_Bellweather.png','source':'evidence10/journey/HOME_AFTER_BELL_EARNED.json','scene':'crossing','hour':17.4})
 p.keyboard.press('m');p.evaluate('Realm.test.render()');p.screenshot(path=str(O/'FIRSTLIGHT_10_Map.png'));metadata['images'].append({'file':'FIRSTLIGHT_10_Map.png','scene':'crossing','ui':'actual Map workspace'});p.click('#rpg-close')
 p.evaluate('Realm.test.quality("low");Realm.test.move(0,-18);for(let i=0;i<6000&&Realm.test.path.length;i++)Realm.test.step(.05);Realm.test.view({half:15,yaw:.48,elevation:.96,overview:false})');p.wait_for_timeout(4500);p.evaluate('Realm.test.quality("balanced");Realm.test.render()');p.screenshot(path=str(O/'FIRSTLIGHT_10_Bell-Court.png'));metadata['images'].append({'file':'FIRSTLIGHT_10_Bell-Court.png','scene':'crossing','progress':'command-earned completed bell, not planted reward'})
 b.close();metadata['browser_errors']=errors;assert not errors
(O/'CAPTURE_RECORD.json').write_text(json.dumps(metadata,indent=2));print(json.dumps(metadata,indent=2))

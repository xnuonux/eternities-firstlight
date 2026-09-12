"""Capture actual game frames offline. Not a real-time performance benchmark.
Requires Playwright and Chromium; uses the exact HTML and an earned saved fixture.
No navigation-policy changes, internet, or injected item/position grants.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright
import json, subprocess, hashlib
R=Path(__file__).resolve().parents[1];O=R/'evidence08';F=O/'preview-frames';F.mkdir(exist_ok=True)
html=(R/'FIRSTLIGHT_VALLEY.html').read_text()
start=json.loads((O/'RANGE_READY_EARNED.json').read_text())
with sync_playwright() as pw:
 b=pw.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=gl-egl','--enable-webgl','--ignore-gpu-blocklist','--disable-gpu-sandbox'])
 c=b.new_context(viewport={'width':1280,'height':800},offline=True);p=c.new_page()
 p.evaluate('''s=>{window.__ETERNITIES_TEST_MODE=true;window.__ETERNITIES_CAPTURE_MODE=true;const mem=new Map([['eternities.realm08.save.v7',JSON.stringify(s)]]);Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>mem.get(k)||null,setItem:(k,v)=>mem.set(k,v),removeItem:k=>mem.delete(k)}})}''',start)
 p.set_content(html);p.wait_for_function('window.Realm');p.wait_for_timeout(600)
 assert p.evaluate('Realm.test.adventure("preview-enter","range-enter",{}).ok')
 assert p.evaluate('Realm.test.move(0,-3).ok')
 p.evaluate('Realm.test.step(20);Realm.test.quality("balanced");Realm.test.view({overview:false,half:12});Realm.test.render()');p.wait_for_timeout(4500)
 assert p.evaluate('Realm.test.adventure("preview-round","range-start",{}).ok')
 for i in range(90):
  p.evaluate('''i=>{let d=Realm.diagnostics.adventure;let e=d.enemies.find(e=>(d.range.hits[e.id]||0)<2);if(e&&i%9===0)Realm.test.adventure("preview-shot-"+i,"attack",{target:e.id});Realm.test.step(.1);Realm.test.render()}''',i)
  p.screenshot(path=str(F/f'{i:04d}.jpg'),type='jpeg',quality=88)
 result=p.evaluate('Realm.diagnostics.adventure.range');b.close()
subprocess.run(['ffmpeg','-y','-hide_banner','-loglevel','error','-framerate','10','-i',str(F/'%04d.jpg'),'-c:v','libx264','-pix_fmt','yuv420p','-movflags','+faststart',str(O/'Firstlight08-Archery-preview.mp4')],check=True)
(O/'PREVIEW_RECORD.json').write_text(json.dumps({'status':'captured','method':__doc__,'build_sha256':hashlib.sha256(html.encode()).hexdigest(),'frames':90,'encoded_fps':10,'simulation_step_seconds':.1,'audio':False,'real_time_benchmark':False,'range':result},indent=2))
print('Captured',result,flush=True)

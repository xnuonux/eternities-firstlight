# Historical optional preview helper; not used to qualify Realm07. Use capture_road_preview.py.
"""Capture actual rendered frames. Optional homestead is a labeled layout fixture, not a player save."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import json,hashlib,base64,subprocess,shutil
R=Path(__file__).resolve().parents[1]; O=R/'artifacts'; HTML=(R/'FIRSTLIGHT_VALLEY.html').read_text()
ARGS=['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=gl-egl','--enable-webgl','--ignore-gpu-blocklist','--disable-gpu-sandbox']
with sync_playwright() as pw:
 b=pw.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=ARGS)
 c=b.new_context(viewport={'width':1440,'height':960},offline=True)
 p=c.new_page();errors=[];p.on('pageerror',lambda e:errors.append(str(e)))
 p.evaluate('''window.__ETERNITIES_TEST_MODE=true;window.__ETERNITIES_CAPTURE_MODE=true;window.ST=new Map();Object.defineProperty(window,'localStorage',{value:{getItem:k=>ST.get(k)||null,setItem:(k,v)=>ST.set(k,String(v)),removeItem:k=>ST.delete(k)}})''')
 p.set_content(HTML,wait_until='load');p.wait_for_function('window.Realm');p.wait_for_timeout(1600)
 p.evaluate('Realm.test.quality("high");Realm.test.pause(true);Realm.test.setTime(17.2);Realm.test.view({overview:true});Realm.test.render()')
 p.wait_for_timeout(1200);p.screenshot(path=str(O/'05-three-islands.png'))
 print('Overview captured',flush=True)
 state=json.loads((O/'OPTIONAL_HOMESTEAD_SAVE.json').read_text());state['player']={'x':0,'z':-39.2,'yaw':3.14}
 p.evaluate('(s)=>Realm.test.replace(s)',state)
 p.evaluate('Realm.test.pause(true);Realm.test.quality("high");Realm.test.view({overview:false,half:14,yaw:.65});Realm.test.render()')
 p.wait_for_timeout(4300);p.screenshot(path=str(O/'05-wildwood-homestead.png'))
 print('Homestead captured',flush=True)
 p.evaluate('Realm.test.pause(false);Realm.test.openPanel("build")');p.wait_for_timeout(550)
 # A valid stock deck is chosen through the real interface.
 p.locator('[data-action="sb-build"][data-id="floor"]').click();p.wait_for_timeout(400)
 q=p.evaluate('(()=>{let c=RealmSandbox.worldCell(0,1);return Realm.project(c.x,1.3,c.z)})()');p.mouse.move(q['x'],q['y']);p.evaluate('Realm.test.render()')
 p.screenshot(path=str(O/'05-build-your-world.png'))
 p.keyboard.press('Escape');p.evaluate('Realm.test.openPanel("craft")');p.wait_for_timeout(650);p.screenshot(path=str(O/'05-crafting-desk.png'))
 p.keyboard.press('Escape');p.evaluate('Realm.test.setTime(21);Realm.test.render()');p.wait_for_timeout(400);p.screenshot(path=str(O/'05-wildwood-night.png'))
 print('Build, crafting, night captured',flush=True)
 # A short offline orbit of the example homestead; never used as FPS evidence.
 frames=O/'_preview05';frames.mkdir(exist_ok=False)
 try:
  p.evaluate('Realm.test.setTime(17.2);Realm.test.pause(true);Realm.test.view({overview:false,half:14});Realm.test.render()')
  for i in range(40):
   dat=p.evaluate('(i)=>Realm.test.captureFrame(i/8,.5+i*.007)',i)
   (frames/f'{i:04d}.png').write_bytes(base64.b64decode(dat.split(',')[1]))
  subprocess.run(['ffmpeg','-y','-loglevel','error','-framerate','8','-i',str(frames/'%04d.png'),'-t','5','-c:v','libx264','-preset','fast','-crf','21','-pix_fmt','yuv420p','-movflags','+faststart',str(O/'Firstlight-05-Wildwood-preview.mp4')],check=True,timeout=45)
 finally:shutil.rmtree(frames)
 report={'build_sha256':hashlib.sha256(HTML.encode()).hexdigest(),'screenshots':'Actual WebGL2 output of delivered standalone HTML. Homestead is the optional command-built fixture with a repositioned visitor. No painted background or concept image. Map-backed storage fixture.','movie':'40 actual frames rendered offline and encoded at 8fps, 5 seconds, no live frame-rate claim.','errors':errors,'graphics':p.evaluate('Realm.diagnostics')}
 (O/'CAPTURE_REPORT.json').write_text(json.dumps(report,indent=2));b.close()
 if errors:raise RuntimeError(errors)
 print('Finished captures',flush=True)

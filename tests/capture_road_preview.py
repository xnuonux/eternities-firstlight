"""Capture actual application frames from an earned completed chapter.
Offline rendering and camera cuts are a visual preview, NOT a real-time FPS test.
This does not claim to complete the quest: road_journey.cjs provides that evidence.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright
import json,hashlib,math,subprocess,os
R=Path(__file__).resolve().parents[1];O=R/'evidence07';F=O/'_frames07';F.mkdir(exist_ok=True)
html=(R/'FIRSTLIGHT_VALLEY.html').read_text();save=json.loads((O/'CHAPTER_II_COMPLETE_EARNED.json').read_text());errors=[]
with sync_playwright() as pw:
 b=pw.chromium.launch(executable_path=os.getenv('FIRSTLIGHT_CHROMIUM','/usr/bin/chromium'),headless=True,args=['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=gl-egl','--enable-webgl','--ignore-gpu-blocklist','--disable-gpu-sandbox'])
 ctx=b.new_context(viewport={'width':1280,'height':720},offline=True);p=ctx.new_page();p.on('pageerror',lambda e:errors.append(str(e)))
 p.evaluate('''s=>{window.__ETERNITIES_CAPTURE_MODE=true;window.__ETERNITIES_TEST_MODE=true;const map=new Map([['eternities.realm07.save.v6',JSON.stringify(s)]]);Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>map.get(k)||null,setItem:(k,v)=>map.set(k,v),removeItem:k=>map.delete(k)}})}''',save)
 p.set_content(html,wait_until='load');p.wait_for_function('window.Realm');p.evaluate('Realm.test.move(44,6);Realm.test.step(40)')
 entry=p.evaluate('Realm.test.adventure("preview-enter","road-enter")');assert entry['ok']
 p.evaluate('Realm.test.quality("balanced");Realm.test.move(-9,12);Realm.test.step(12);Realm.test.setTime(17.3);Realm.test.render()')
 p.keyboard.press('h')
 p.evaluate('''()=>{const label=document.createElement('div');label.textContent='FIRSTLIGHT 07  /  THE SUNWARD ROAD  ·  OFFLINE RENDERED PREVIEW';Object.assign(label.style,{position:'fixed',bottom:'20px',left:'24px',font:'11px system-ui',letterSpacing:'.16em',color:'#f1e5cd',background:'#112c32aa',padding:'10px 14px',borderRadius:'5px',zIndex:'100',pointerEvents:'none'});document.body.append(label);}''')
 for i in range(108):
  u=i/107
  if i==78:
   assert p.evaluate('Realm.test.move(0,-24).ok')
   p.evaluate('Realm.test.step(30)')
  if i<42:
   q=i/41;center=[0,1.7,-3];half=29-q*2;yaw=.64+q*.24;t=17.3
  elif i<78:
   q=(i-42)/35;center=[-9,1.9,10];half=12;yaw=.7+q*.3;t=17.4
  else:
   q=(i-78)/29;center=[0,2,-21];half=13;yaw=.75+q*.25;t=19.5
  p.evaluate('v=>{Realm.test.step(1/12);Realm.test.setTime(v.t);Realm.test.view({overview:v.overview,center:v.center,half:v.half,yaw:v.yaw});Realm.test.render()}',{'overview':i<42,'t':t,'center':center,'half':half,'yaw':yaw})
  p.screenshot(path=str(F/f'frame-{i:04d}.png'))
 b.close()
assert not errors,errors
out=O/'FIRSTLIGHT_07_Preview.mp4'
subprocess.run(['ffmpeg','-y','-loglevel','error','-framerate','12','-i',str(F/'frame-%04d.png'),'-c:v','libx264','-crf','22','-pix_fmt','yuv420p','-movflags','+faststart',str(out)],check=True,timeout=45)
(O/'PREVIEW_CAPTURE.json').write_text(json.dumps({'status':'rendered','frames':108,'encoded_fps':12,'duration_seconds':9,'width':1280,'height':720,'real_time_performance_claim':False,'method':__doc__,'build_sha256':hashlib.sha256(html.encode()).hexdigest(),'output_sha256':hashlib.sha256(out.read_bytes()).hexdigest(),'browser_errors':errors},indent=2))
print(out, out.stat().st_size)

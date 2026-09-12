# Historical optional preview helper; not used to qualify Realm07. Use capture_road_preview.py.
#!/usr/bin/env python3
"""Render a short three-chapter movie from actual local WebGL frames.
Frames are rendered offline and encoded at 8 fps; this is NOT a frame-rate benchmark.
Uses owned HTML at about:blank without altering managed browser navigation policies.
Requires Python Playwright, Chromium and ffmpeg only for this optional preview.
"""
from pathlib import Path
import base64, hashlib, json, subprocess, shutil
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'artifacts'
ARGS=['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=gl-egl','--enable-webgl','--ignore-gpu-blocklist','--disable-gpu-sandbox']

def main():
    frames=OUT/'_preview_frames'
    if frames.exists():
        raise RuntimeError('Preview staging directory already exists; inspect it first.')
    frames.mkdir()
    try:
        with sync_playwright() as p:
            browser=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=ARGS)
            context=browser.new_context(viewport={'width':1200,'height':750},offline=True)
            page=context.new_page()
            page.evaluate('window.__ETERNITIES_TEST_MODE=true;window.__ETERNITIES_CAPTURE_MODE=true')
            page.set_content((ROOT/'FIRSTLIGHT_VALLEY.html').read_text(),wait_until='load',timeout=30000)
            page.wait_for_function('window.Realm && Realm.diagnostics.mode==="webgl2"',timeout=20000)
            page.evaluate('Realm.test.setTime(18.4);Realm.test.pause(true);Realm.test.quality("balanced")')
            n=0
            for chapter in range(3):
                if chapter==1:
                    page.evaluate('Realm.navigate("retreat");Realm.test.step(80);Realm.test.pause(true)')
                if chapter==2:
                    page.evaluate('''(()=>{Realm.test.enter('retreat');let h=Realm.state.retreat;h.wall='rose';h.floor='walnut';Realm.test.act('preview-home','decorate',{expectedRevision:h.revision,home:h});Realm.test.render()})()''')
                for i in range(24):
                    data=page.evaluate('(p)=>Realm.test.captureFrame(p.t,p.yaw)',{'t':(chapter*24+i)/8,'yaw':.7+i*.009 if chapter<2 else .72+i*.003})
                    (frames/f'{n:04d}.png').write_bytes(base64.b64decode(data.split(',',1)[1]));n+=1
                print('Rendered chapter',chapter+1,flush=True)
            graphics=page.evaluate('Realm.diagnostics');browser.close()
        audio=OUT/'My-Firstlight-Piece.wav'
        command=['ffmpeg','-y','-loglevel','error','-framerate','8','-i',str(frames/'%04d.png')]
        if audio.exists():command+=['-i',str(audio),'-af','afade=t=out:st=8:d=1','-c:a','aac','-b:a','160k']
        command+=['-t','9','-c:v','libx264','-preset','medium','-crf','19','-pix_fmt','yuv420p','-movflags','+faststart',str(OUT/'Firstlight-Valley-03-preview.mp4')]
        subprocess.run(command,check=True,timeout=80)
        report={'build_sha256':hashlib.sha256((ROOT/'FIRSTLIGHT_VALLEY.html').read_bytes()).hexdigest(),'frames':72,'fps_encoded':8,'duration_seconds':9,'capture':'Actual canvas frames rendered offline with simulation/camera hooks; not a real-time performance benchmark; three cuts: valley, blossom island, retreat.','audio':'Actual composition WAV exported by the browser acceptance test; manually edited authored preset, not AI or a resident performance.','graphics':graphics}
        (OUT/'PREVIEW_RENDER.json').write_text(json.dumps(report,indent=2))
    finally:shutil.rmtree(frames,ignore_errors=True)

if __name__=='__main__':main()

"""Capture the actual Realm09 character UI from a labelled earned checkpoint.
Offline document + explicit Map-backed storage fixture. No performance assertion.
"""
from pathlib import Path
import hashlib,json
from playwright.sync_api import sync_playwright
R=Path(__file__).resolve().parents[1]; O=R/'evidence09'; O.mkdir(exist_ok=True)
html=(R/'FIRSTLIGHT_VALLEY.html').read_text()
save=json.loads((R/'examples/REALM09_ARMORY_COMPLETE_EARNED.json').read_text())
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=gl-egl','--enable-webgl','--ignore-gpu-blocklist','--disable-gpu-sandbox'])
    ctx=b.new_context(viewport={'width':1600,'height':1120},offline=True)
    q=ctx.new_page(); errors=[];q.on('pageerror',lambda e:errors.append(str(e)))
    q.evaluate('''s=>{window.__ETERNITIES_TEST_MODE=true;window.__ETERNITIES_CAPTURE_MODE=true;const m=new Map([['eternities.realm08.save.v7',JSON.stringify(s)]]);Object.defineProperty(window,'localStorage',{value:{getItem:k=>m.get(k)||null,setItem:(k,v)=>m.set(k,v),removeItem:k=>m.delete(k)},configurable:true})}''',save)
    q.set_content(html,wait_until='load');q.wait_for_function('window.Realm');q.wait_for_timeout(1200)
    q.keyboard.press('c');q.evaluate('Realm.test.render()');q.wait_for_timeout(500)
    q.locator('[data-rpg="item"][data-id="gear:copper_bow"]').first.click()
    q.evaluate('document.querySelector("#rpg-content").scrollTop=0;Realm.test.render()');q.wait_for_timeout(500)
    q.screenshot(path=str(O/'09-character-hero.png'))
    assert not errors, errors
    b.close()
(O/'CAPTURE_RECORD.json').write_text(json.dumps({'method':__doc__,'html_sha256':hashlib.sha256(html.encode()).hexdigest(),'source_checkpoint':'examples/REALM09_ARMORY_COMPLETE_EARNED.json','image':'09-character-hero.png','viewport':[1600,1120],'page_errors':errors},indent=2)+'\n')

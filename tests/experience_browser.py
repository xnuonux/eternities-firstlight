"""Offline Chromium acceptance for Realm 03's creative journeys.
The exact built HTML is injected at about:blank; local file navigation is blocked by the environment. Storage is a labeled in-memory test fixture, not browser persistence. Test controls only
advance the local simulation and render snapshots; normal clicks edit artifacts.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright
import hashlib, json, traceback, wave, io, time
ROOT=Path(__file__).resolve().parents[1]; OUT=ROOT/'evidence07'/'regression'; HTML=ROOT/'FIRSTLIGHT_VALLEY.html'
OUT.mkdir(parents=True,exist_ok=True)
REPORT={'build_sha256':hashlib.sha256(HTML.read_bytes()).hexdigest(),'mode':'Exact HTML via set_content at about:blank, offline, capture-mode, injected Map storage fixture; normal UI clicks. File navigation blocked by administrator policy.','checks':[],'errors':[]}
def check(label,value):
 REPORT['checks'].append({'check':label,'passed':bool(value)})
 print(('PASS ' if value else 'FAIL ')+label,flush=True)
 if not value: raise AssertionError(label)
ARGS=['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=gl-egl','--enable-webgl','--ignore-gpu-blocklist','--disable-gpu-sandbox']
try:
 with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=ARGS)
  ctx=b.new_context(viewport={'width':1440,'height':900},offline=True,accept_downloads=True)
  errs=[];requests=[]
  def spawn(context, data=None):
   q=context.new_page();q.on('pageerror',lambda e:errs.append(str(e)));q.on('request',lambda r:requests.append(r.url))
   q.evaluate('''(data)=>{window.__ETERNITIES_TEST_MODE=true;window.__ETERNITIES_CAPTURE_MODE=true;window.__testStorage=new Map(Object.entries(data||{}));Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>window.__testStorage.get(k)||null,setItem:(k,v)=>window.__testStorage.set(k,String(v)),removeItem:k=>window.__testStorage.delete(k)}});}''',data or {})
   q.set_content(HTML.read_text(),wait_until='load',timeout=30000);q.wait_for_function('window.Realm',timeout=20000);q.wait_for_timeout(1400)
   return q
  page=spawn(ctx)
  check('Exact standalone document initializes WebGL2 offline',page.evaluate('Realm.diagnostics.mode')=='webgl2')
  check('Storage adapter displays success after the fixture acknowledges its write',page.evaluate('Realm.diagnostics.saveState')=='saved')
  check('No audio before a gesture',page.evaluate('Realm.diagnostics.audio.state')=='not-created')
  page.evaluate('Realm.test.pause(true); Realm.test.render()');page.screenshot(path=str(OUT/'01-valley-and-blossom-island.png'),timeout=30000)
  # A real score, edited by UI, not a rendered facsimile.
  page.click('#studio-open');check('Music editor opens 192 interactive cells',page.locator('.note-cell').count()==192)
  page.fill('#score-title','My Firstlight Piece');page.fill('#score-tempo','96');page.locator('#score-title').click()
  check('Score name and tempo change accepted state',page.evaluate('Realm.state.score.title')=='My Firstlight Piece' and page.evaluate('Realm.state.score.bpm')==96)
  before=page.evaluate('Realm.state.score.melody[0][0]');page.click('[data-music="cell"][data-row="0"][data-col="0"]')
  check('Grid click changes an actual note and revision',page.evaluate('Realm.state.score.melody[0][0]')==1-before and page.evaluate('Realm.state.scoreRevision')>0)
  cell=page.locator('[data-index="0"]');cell.focus();page.keyboard.press('ArrowRight');page.keyboard.press('Space')
  check('Keyboard grid navigation and toggling work',page.evaluate('Realm.state.score.melody[0][1]')==1)
  page.click('#music-play');page.wait_for_timeout(450);page.evaluate('Realm.test.render()')
  check('Music playback starts from a deliberate gesture',page.evaluate('Realm.diagnostics.music.playing') and page.evaluate('Realm.diagnostics.audio.state')=='running')
  oldrev=page.evaluate('Realm.diagnostics.music.playingRevision');page.click('[data-music="cell"][data-row="2"][data-col="9"]')
  check('An edited score updates the live sound revision',page.evaluate('Realm.diagnostics.music.playingRevision')>oldrev)
  page.evaluate('Realm.test.render()');page.screenshot(path=str(OUT/'02-working-music-desk.png'),timeout=30000)
  with page.expect_download(timeout=15000) as di:page.click('[data-music="wav"]')
  wavbytes=Path(di.value.path()).read_bytes();(OUT/'My-Firstlight-Piece.wav').write_bytes(wavbytes)
  with wave.open(io.BytesIO(wavbytes)) as wav:
   check('WAV export is actual stereo 44.1kHz PCM16',wav.getnchannels()==2 and wav.getframerate()==44100 and wav.getsampwidth()==2)
   check('WAV duration matches two repetitions plus tail',abs(wav.getnframes()/wav.getframerate()-(2*480/96+.8))<.01)
   frames=wav.readframes(wav.getnframes());check('WAV contains nonzero audio samples',any(frames))
  with page.expect_download(timeout=15000) as di:page.click('[data-music="midi"]')
  mid=Path(di.value.path()).read_bytes();(OUT/'My-Firstlight-Piece.mid').write_bytes(mid)
  check('MIDI export has a real MIDI header and track',mid[:4]==b'MThd' and mid[14:18]==b'MTrk')
  with page.expect_download(timeout=15000) as di:page.click('[data-music="json"]')
  scorejson=Path(di.value.path()).read_text();(OUT/'My-Firstlight-Piece.score.json').write_text(scorejson)
  check('Editable score export matches the accepted composition',json.loads(scorejson)==page.evaluate('Realm.state.score'))
  page.click('[data-music="undo"]');check('Score undo is a new accepted revision',page.evaluate('Realm.state.score.melody[2][9]')==0)
  page.click('[data-music="redo"]');check('Score redo restores the note',page.evaluate('Realm.state.score.melody[2][9]')==1)
  # Invalid import cannot replace the current score.
  scorebefore=page.evaluate('JSON.stringify(Realm.state.score)')
  page.set_input_files('#score-import',{'name':'bad.json','mimeType':'application/json','buffer':b'{"format":"wrong"}'})
  page.wait_for_timeout(150);check('Invalid score import is refused without mutation',page.evaluate('JSON.stringify(Realm.state.score)')==scorebefore)
  page.click('#music-play');check('Transport stops audio',not page.evaluate('Realm.diagnostics.music.playing'))
  page.click('#studio-close');check('Music dialog can close and restores the view',not page.locator('#studio-dialog').is_visible())
  # Caller can inspect/import old saves independently of the UI version.
  page.evaluate('Realm.navigate("retreat"); Realm.test.step(80); Realm.test.render()')
  check('Click-path navigation reaches the new connected island',page.evaluate('Math.hypot(Realm.state.player.x-37,Realm.state.player.z)<.1'))
  page.click('#interact');page.evaluate('Realm.test.render()');check('The fourth rendered interior opens',page.evaluate('Realm.diagnostics.scene')=='retreat')
  page.screenshot(path=str(OUT/'03-retreat-before.png'),timeout=30000)
  page.keyboard.press('5');page.click('[data-action="slot"][data-id="ne"]');page.click('[data-action="furnish"][data-kind="easel"]');page.click('[data-action="wall"][data-value="rose"]');page.click('[data-action="floor"][data-value="walnut"]');page.evaluate('Realm.test.render()')
  check('Furniture selection changes the actual saved layout',page.evaluate('Realm.state.retreat.items.find(i=>i.slot==="ne").kind')=='easel')
  check('Wall and floor palettes are persistent state',page.evaluate('Realm.state.retreat.wall')=='rose' and page.evaluate('Realm.state.retreat.floor')=='walnut')
  page.screenshot(path=str(OUT/'04-retreat-decorating.png'),timeout=30000)
  page.click('[data-action="layout-undo"]');check('Layout undo works through the UI',page.evaluate('Realm.state.retreat.floor')=='oak')
  page.click('[data-action="layout-redo"]');check('Layout redo works through the UI',page.evaluate('Realm.state.retreat.floor')=='walnut')
  page.click('#close-panel');page.wait_for_timeout(400);page.evaluate('Realm.test.render()');page.screenshot(path=str(OUT/'05-retreat-finished.png'),timeout=30000)
  page.keyboard.press('Escape');check('Retreat exit returns to outside door, not another building',page.evaluate('Realm.diagnostics.scene')=='valley' and page.evaluate('Math.hypot(Realm.state.player.x-37,Realm.state.player.z)<.1'))
  page.keyboard.press('6');page.fill('#visitor-name','Evening guest');page.click('[data-action="visitor-color"][data-field="cloak"][data-value="1"]');page.click('[data-action="visitor-color"][data-field="skin"][data-value="3"]');page.click('#close-panel')
  check('Visitor styling and name persist',page.evaluate('Realm.state.visitor.name')=='Evening guest' and page.evaluate('Realm.state.visitor.cloak')==1)
  # Save/reload must restore real data and leave audio silent.
  saved=page.evaluate('Realm.state');saved_storage=page.evaluate('Object.fromEntries(window.__testStorage)');page.close();page=spawn(ctx,saved_storage)
  restored=page.evaluate('Realm.state')
  check('New browser page with preserved storage fixture restores creative state',all(saved[k]==restored[k] for k in ['score','scoreRevision','retreat','visitor']))
  check('Cold reopen never resumes audio automatically',page.evaluate('Realm.diagnostics.audio.state')=='not-created' and not page.evaluate('Realm.diagnostics.music.playing'))
  # Preserve legacy data without writing its key.
  old=page.evaluate('(()=>{let s=RealmCore.fresh();s.version=2;delete s.score;delete s.scoreRevision;delete s.retreat;delete s.visitor;s.notes=[{text:"A note from Realm 02",day:1}];s.flowers=[{x:-8.4,z:14.5,color:2}];return JSON.stringify(s)})()')
  page.evaluate('(old)=>{localStorage.removeItem(RealmCore.KEY);localStorage.setItem(RealmCore.LEGACY_KEY,old)}',old)
  saved_storage=page.evaluate('Object.fromEntries(window.__testStorage)');page.close();page=spawn(ctx,saved_storage)
  check('Realm 02 storage migrates notes and flowers',page.evaluate('Realm.state.notes[0].text')=='A note from Realm 02' and page.evaluate('Realm.state.flowers.length')==1)
  check('Original Realm 02 storage key remains byte-for-byte unchanged',page.evaluate('localStorage.getItem(RealmCore.LEGACY_KEY)')==old)
  check('Migration writes the current format to a separate key',page.evaluate('JSON.parse(localStorage.getItem(RealmCore.KEY)).version')==page.evaluate('RealmCore.VERSION'))
  # Actual gathering uses paths and no instantaneous actor relocation.
  page.evaluate('Realm.navigate("stage");Realm.test.step(75);Realm.test.render()');before=page.evaluate('Realm.state.residents')
  page.click('#interact');check('Stage action invites a local gathering',page.evaluate('Realm.diagnostics.gathering !== null'))
  check('Invitation does not teleport inhabitants',before==page.evaluate('Realm.state.residents'))
  page.evaluate('Realm.test.step(100);Realm.test.render()');check('Family reaches the stage through simulation',page.evaluate('Realm.state.residents.every(r=>r.z<-8&&r.z>-11)'))
  page.evaluate('Realm.test.setTime(20.5);Realm.test.weather("clear");Realm.test.render()');page.screenshot(path=str(OUT/'06-stage-gathering.png'),timeout=30000)
  page.click('#sound');check('Global sound control stops composition as well as ambience',not page.evaluate('Realm.diagnostics.music.playing') and not page.evaluate('Realm.diagnostics.audio.enabled'))
  page.click('#tour');page.evaluate('Realm.test.render()');check('Cinematic camera tour is explicitly enabled',page.evaluate('Realm.diagnostics.camera.tour') is True)
  page.mouse.move(700,350);page.mouse.down();page.mouse.move(770,350);page.mouse.up();check('Manual camera gesture stops the tour',page.evaluate('Realm.diagnostics.camera.tour') is False)
  check('No external requests during all creative actions',not any(x.startswith(('http:','https:')) for x in requests))
  check('No unhandled browser errors',not errs);REPORT['browser_errors']=errs;REPORT['graphics']=page.evaluate('Realm.diagnostics');ctx.close()
  # A separate touch-sized offline context. Tests a Chromium viewport, not physical iOS.
  mob=b.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,offline=True)
  pg=spawn(mob)
  check('Touch-sized viewport opens WebGL2',pg.evaluate('Realm.diagnostics.mode')=='webgl2')
  check('Mobile viewport has no page-level horizontal overflow',pg.evaluate('document.documentElement.scrollWidth<=innerWidth'))
  for sel in ['#explore','#pack-open','#craft-open','#build-open','#studio-open','#interact']:
   box=pg.locator(sel).bounding_box();check('Mobile main control stays on-screen: '+sel,box and box['x']>=0 and box['x']+box['width']<=391)
  pg.screenshot(path=str(OUT/'07-mobile-valley.png'),timeout=30000)
  pg.click('#studio-open');box=pg.locator('#studio-dialog').bounding_box()
  check('Mobile composer fits viewport',box and box['x']>=0 and box['x']+box['width']<=390 and box['height']<=844)
  check('Musical grid scrolls internally instead of breaking the page',pg.locator('.score-scroll').evaluate('(x)=>x.scrollWidth>x.clientWidth') and pg.evaluate('document.documentElement.scrollWidth<=innerWidth'))
  pg.click('[data-music="cell"][data-index="0"]');check('Mobile touch edits score',pg.evaluate('Realm.state.score.melody[0][0]')==1)
  pg.screenshot(path=str(OUT/'08-mobile-composer.png'),timeout=30000);pg.click('#studio-close');pg.click('#settings');pg.click('[data-action="open-visitor"]')
  check('Visitor editor remains accessible on small screens',pg.locator('#visitor-name').is_visible());mob.close()
  b.close()
except Exception as e:
 REPORT['errors'].append(str(e));REPORT['traceback']=traceback.format_exc();print(REPORT['traceback'],flush=True)
finally:
 REPORT['passed']=not REPORT['errors'] and all(c['passed'] for c in REPORT['checks']);REPORT['checks_passed']=sum(c['passed'] for c in REPORT['checks'])
 (OUT/'EXPERIENCE_BROWSER_TEST_REPORT.json').write_text(json.dumps(REPORT,indent=2))
 print(json.dumps({'passed':REPORT['passed'],'checks':REPORT['checks_passed'],'errors':REPORT['errors']},indent=2),flush=True)

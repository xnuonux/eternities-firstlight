"""Bind current Firstlight10 reports to delivered HTML/source. Does not run tests."""
from pathlib import Path
import hashlib,json,re
R=Path(__file__).resolve().parents[1];O=R/'evidence10'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def load(p):return json.loads((R/p).read_text())
digest=sha(R/'FIRSTLIGHT_VALLEY.html');assert digest==sha(R/'index.html')
browsers=[]
for name in ['evidence10/browser/CROSSING_BROWSER_REPORT.json','evidence10/regression09/RPG_BROWSER_REPORT.json']:
 d=load(name);assert d['passed'] and d['build_sha256']==digest,(name,'not a completed test of these bytes');assert not d['errors'] and not d.get('browser_errors');assert all(c['passed'] for c in d['checks']);browsers.append({'report':name,'checks':len(d['checks']),'sha256':sha(R/name)})
tap=(O/'ALL_RULES.tap').read_text();passed=int(re.search(r'^# pass (\d+)$',tap,re.M)[1]);assert int(re.search(r'^# fail (\d+)$',tap,re.M)[1])==0
syntax=load('evidence10/SYNTAX_REPORT.json');assert syntax['passed']
for c in syntax['checks']:assert c['passed'] and sha(R/c['path'])==c['sha256'],c['path']
engine=sha(R/'src/engine.js');framebuffers=[]
for name in ['REFLECTION_TEST_REPORT.json','CUTAWAY_BROWSER_REPORT.json']:
 d=load('evidence10/'+name);assert d['passed'] and d['engine_sha256']==engine;assert all(c['passed'] for c in d['checks']);framebuffers.append({'report':'evidence10/'+name,'checks':len(d['checks']),'sha256':sha(O/name)})
tools=(O/'PUBLICATION_TOOLS_TESTS.log').read_text();assert tools.rstrip().endswith('OK');ntools=int(re.search(r'Ran (\d+) tests',tools)[1]);journeys=[]
for rel in ['inherited-journeys/CHAPTER_JOURNEY_REPORT.json','inherited-journeys/ROAD_JOURNEY_REPORT.json','inherited-journeys/ARSENAL_JOURNEY_REPORT.json','inherited-journeys/BOW_ROAD_JOURNEY_REPORT.json','journeys/radiant/BEACON_JOURNEY.json','journeys/mortal/BEACON_JOURNEY.json','journeys/bow/BEACON_JOURNEY.json','journey/CROSSING_JOURNEY.json','journey-bow/CROSSING_JOURNEY.json']:
 d=load('evidence10/'+rel);assert d.get('status',d.get('result'))=='passed',(rel,d);journeys.append({'report':'evidence10/'+rel,'sha256':sha(O/rel)})
native=load('evidence10/NATIVE_ORIGIN_REPORT.json');assert native['build_sha256']==digest
result={'version':'10.0.0','title':'Firstlight10 — Bellweather Crossing','html_bytes':(R/'FIRSTLIGHT_VALLEY.html').stat().st_size,'html_sha256':digest,'rule_tests':{'passed':passed,'failed':0},'browser_ui':{'passed':sum(r['checks'] for r in browsers),'reports':browsers},'framebuffer_tests':framebuffers,'syntax_files':len(syntax['checks']),'local_import_tool_tests':ntools,'journeys':journeys,'native_navigation':native['origins'],'limits':['Local single-player only. No source push or deployment this turn.','Software-rendered Chromium; no physical GPU/phone, Firefox/Safari or 60-FPS qualification.','Explicit storage fixtures; native file and loopback navigation blocked by administrator policy.','Accelerated automated tactics are not a human pacing/balance trial.','Commission browser stock is a labelled known-answer fixture, not command-earned inventory.','Earlier09 evidence is historical, not added to current test counts.','New interiors, regional anchors, multiplayer and Unreal remain undelivered.']}
(O/'VALIDATION_SUMMARY.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps({'rules':passed,'browser_ui':result['browser_ui']['passed'],'framebuffer':sum(r['checks'] for r in framebuffers),'journeys':len(journeys),'html_sha256':digest},indent=2))

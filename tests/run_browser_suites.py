"""Independent browser suites sequentially; result JSON is authoritative, not process code."""
from pathlib import Path
import subprocess,json,time
R=Path(__file__).resolve().parents[1];O=R/'evidence08';O.mkdir(exist_ok=True)
result=[]
for name in ['arsenal_browser.py','road_browser.py','browser_test.py','experience_browser.py','sandbox_browser.py','adventure_browser.py','reflection_browser.py','native_browser.py']:
 start=time.monotonic()
 with (O/(name+'.log')).open('w') as f:
  try:
   x=subprocess.run(['python',str(R/'tests'/name)],cwd=R,stdout=f,stderr=subprocess.STDOUT,timeout=300);item={'suite':name,'returncode':x.returncode,'seconds':round(time.monotonic()-start,2)}
  except subprocess.TimeoutExpired:item={'suite':name,'timeout':True,'seconds':round(time.monotonic()-start,2)}
 result.append(item);(O/'BROWSER_SUITE_RUNS.json').write_text(json.dumps(result,indent=2));print(item,flush=True)

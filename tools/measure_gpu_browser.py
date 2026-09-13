"""Measure browser frame intervals with renderer provenance.

This reports frame times, never inferred FPS. It uses an isolated context and
loopback origin; set FIRSTLIGHT_CHROMIUM_EXECUTABLE to choose Chrome or Edge.
"""
from pathlib import Path
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
import argparse, hashlib, json, threading, time
from playwright.sync_api import sync_playwright
from browser_support import launch_kwargs

ROOT = Path(__file__).resolve().parents[1]
class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs): super().__init__(*args, directory=str(ROOT), **kwargs)
    def log_message(self, *_args): pass

def main():
    ap = argparse.ArgumentParser(); ap.add_argument("--frames", type=int, default=600); ap.add_argument("--quality", default="balanced"); ap.add_argument("--renderer", choices=("software", "hardware"), default="software"); ap.add_argument("--scenes", type=Path, help="JSON list of {name,expression} setup snippets"); ap.add_argument("--output", type=Path, default=Path("evidence10/gpu-frame-report.json")); args=ap.parse_args()
    html = ROOT / "FIRSTLIGHT_VALLEY.html"; expected = hashlib.sha256(html.read_bytes()).hexdigest()
    server = ThreadingHTTPServer(("127.0.0.1", 0), Handler); threading.Thread(target=server.serve_forever, daemon=True).start()
    result = {"html_sha256": expected, "origin": f"http://127.0.0.1:{server.server_port}/FIRSTLIGHT_VALLEY.html", "quality": args.quality, "renderer_requested": args.renderer, "frames_requested": args.frames}
    try:
        with sync_playwright() as pw:
            browser = pw.chromium.launch(**launch_kwargs(args.renderer)); result["browser_version"] = browser.version
            cdp = browser.new_browser_cdp_session(); result["cdp_system_info"] = cdp.send("SystemInfo.getInfo")
            page = browser.new_page(viewport={"width": 1280, "height": 720}); page.add_init_script("window.__ETERNITIES_TEST_MODE=true;"); response = page.goto(result["origin"], wait_until="load"); result["response_sha256"] = hashlib.sha256(response.body()).hexdigest()
            page.wait_for_function("window.Realm"); page.evaluate(f'Realm.test.quality({json.dumps(args.quality)});Realm.test.render()')
            result["webgl"] = page.evaluate("""()=>{const c=document.querySelector('canvas'),g=c&&c.getContext('webgl2');return g?{renderer:g.getExtension('WEBGL_debug_renderer_info')?g.getParameter(g.getExtension('WEBGL_debug_renderer_info').UNMASKED_RENDERER_WEBGL):'unavailable',vendor:g.getExtension('WEBGL_debug_renderer_info')?g.getParameter(g.getExtension('WEBGL_debug_renderer_info').UNMASKED_VENDOR_WEBGL):'unavailable',mode:Realm.diagnostics.mode}: {mode:'unavailable'} }""")
            result["hardware_renderer"] = not any(x in result["webgl"].get("renderer", "").lower() for x in ("swiftshader", "llvmpipe", "software"))
            scenes = json.loads(args.scenes.read_text(encoding="utf-8")) if args.scenes else [{"name": page.evaluate("Realm.diagnostics.scene"), "expression": "Realm.test.render()"}]
            result["scenes"] = []
            for scene in scenes:
                page.evaluate(scene["expression"]); intervals = page.evaluate("""(n)=>new Promise(resolve=>{let a=[],last;function f(t){if(last!==undefined)a.push(t-last);last=t;if(a.length<n)requestAnimationFrame(f);else resolve(a)}requestAnimationFrame(f)})""", args.frames)
                intervals.sort(); pct=lambda p: intervals[min(len(intervals)-1, int(len(intervals)*p))]
                result["scenes"].append({"name":scene["name"],"frame_time_ms":{"p50":pct(.5),"p95":pct(.95),"p99":pct(.99),"max":max(intervals)},"stutter_over_33ms":sum(x>33.333 for x in intervals),"stutter_over_50ms":sum(x>50 for x in intervals)})
            browser.close()
    finally:
        server.shutdown(); args.output.parent.mkdir(parents=True, exist_ok=True); args.output.write_text(json.dumps(result, indent=2), encoding="utf-8")
    print(json.dumps(result, indent=2)); return 0
if __name__ == '__main__': raise SystemExit(main())

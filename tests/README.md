# Test entrypoints for Firstlight 10

Run `python tools/verify.py` from the repository root in any shell. It enumerates test files without shell globs, rebuilds both HTML outputs, rejects stale checked-in builds, checks every JavaScript module, runs the Node rules and Python helper suite, and runs Chapter IV with blade and bow. Logs go to ignored `verification/`; journeys write labelled generated fixtures under ignored `evidence10/`. `--output <directory>` changes the log location.

The original source has 399 rule tests. Report the count actually printed. On a Windows account without symlink privilege, one helper case is explicitly skipped; Linux CI exercises it. A skip is not a pass. Helper cases test local importer/publication refusals, not a GitHub push.

Optional browser development environment:

```text
python -m venv .venv
# Windows:
.venv\Scripts\python -m pip install -r requirements-dev.txt
.venv\Scripts\python -m playwright install chromium
.venv\Scripts\python tools/verify.py --browser
# Linux/macOS: use .venv/bin/python for the same commands.
# Linux CI installs OS dependencies with: python -m playwright install --with-deps chromium
```

Current UI gates are `crossing_browser.py` and `regression09_browser.py`. The latter runs earlier gameplay through the current HTML. `cutaway_browser.py` and `reflection_browser.py` independently verify rendered framebuffer behavior. `browser_support.py` defaults to Playwright-installed Chromium and supports `FIRSTLIGHT_CHROMIUM_EXECUTABLE`. Source reads explicitly use UTF-8 and renderer checks use software WebGL.

UI tests use isolated contexts and labelled Map-backed storage fixtures. Automated tactics, accelerated time and touch-sized emulation do not qualify human balance, native saves, GPU performance or physical phones. Original delivery browser totals remain historical unless rerun.

`--browser` also runs `native_origin_browser.py`: an ephemeral loopback server and temporary persistent Chromium profile exercise real navigation and localStorage. A labelled notebook command goes through the production save path; after the whole browser closes and relaunches, both storage and loaded game state must retain its exact text. This uses no personal browser profile or save. It qualifies this controlled HTTP-origin restart, not file-origin storage or every gameplay migration.

`chapter_journey.cjs`, `road_journey.cjs`, `arsenal_journey.cjs`, `ranged_road_journey.cjs` and `beacon_journey.cjs` remain additional command journeys. The default gate runs the two current Chapter IV journeys; do not add unexecuted totals. Older browser drivers, including `rpg_browser.py` and `run_browser_suites.py`, remain historical and may target obsolete UI.

`verify_package.py` and `tools/summarize_validation.py` validate the original delivery manifest/report set. They are archive checks, not fresh-clone CI entrypoints or new test runs. Full immutable input archives remain outside the checkout, with metadata and source history in `docs/provenance/2026-09-12/`.


## Starter-region gates

The verifier additionally runs `starter_journey.cjs` for fresh blade and command-crafted bow, then `starter_veteran.cjs`. The latter regenerates four chapters with the explicit Dawn's edge choice, earns keeper coat/chime clasp, and checks finite 42→44 temper. Its labelled migration boundary represents the earned campaign data as adventure 5 without starter state; it never grants ownership or objective flags.

`starter_browser.py` serves actual HTML on isolated loopback HTTP, covering visible acceptance/route/combat/claim/equip, native reloads, both weapon families, veteran temper and a separately labelled synthetic currency-capacity boundary. No personal profile/save. Current counts are 432 rules and 147 starter UI checks; report fresh outputs.

`tools/record_browser_gameplay.py --fixture <earned.json> --actions <actions.json> --output <directory>` records normal RAF with accepted commands/UI and an engineering label. `tools/measure_gpu_browser.py --renderer hardware --frames 600 --quality balanced --scenes <json>` records 1920×1080 CDP/WebGL provenance and per-scene interval distributions. Set `FIRSTLIGHT_CHROMIUM_EXECUTABLE` to installed Chrome for hardware tools. This headless GPU evidence is separate from software CI, human pacing and Unreal qualification.

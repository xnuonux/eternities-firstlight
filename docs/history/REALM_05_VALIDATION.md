# Firstlight 05 — validation record

## Delivered build identity

`FIRSTLIGHT_VALLEY.html` and `index.html` are byte-identical, self-contained outputs of `python build.py`.

SHA-256: `eccc3b067730f8ea780ecf0c596f56e23676cfd6506cf2d88c805a66bb6e922a`.

Size: 204,256 bytes. Changing source requires rebuilding and repeating relevant checks; this report does not certify future commits.

## Executed checks

| Suite | Passed | Failed | Evidence |
|---|---:|---:|---|
| Node simulation, creative, reflection math and sandbox | 124 | 0 | `artifacts/CORE_TEST_REPORT.tap` |
| Baseline offline browser | 38 | 0 | `artifacts/BASELINE_BROWSER_TEST_REPORT.json` |
| Creative/retreat/visitor offline browser | 52 | 0 | `artifacts/EXPERIENCE_BROWSER_TEST_REPORT.json` |
| New sandbox offline browser | 60 | 0 | `artifacts/SANDBOX_BROWSER_REPORT.json` |
| Asymmetric reflection framebuffer samples | 8 | 0 | `artifacts/REFLECTION_TEST_REPORT.json` |

The 124 Node tests include 78 prior tests, 42 new sandbox cases and four presentation-ownership regression cases. Earlier migration assertions were updated to the new enclosing world version; no prior test was removed. Browser totals are 150 functional checks plus eight reflection samples, not 158 independent clinical or scientific experiments.

## Sandbox journey actually tested

Starting with zero timber/stone/fibre/crystal and four seeds, the browser harness used resource buttons and accepted gameplay actions to gather materials, reach Oren's workbench, craft both tools and components, pay for the bridge, walk onto Wildwood, mine crystal, craft and place a lantern, place deck/bed, plant, water, wait through the actual simulation clock and collect berries. It stacked and reclaimed masonry, reached all six milestones, exported a JSON save, rejected a corrupt import and restored the valid world.

No inventory grants or direct world editing were used in that acceptance journey. The harness uses `Realm.test.step` to advance simulation time, not real-time waits for walking/crop growth. This establishes state-machine behavior, not timing accuracy or physical-device performance. A separate optional homestead showcase uses visitor repositioning and accepted commands; it is clearly labeled and is not the acceptance journey.

## Regression coverage

The baseline covers WebGL creation, movement, drag-versus-click distinction, zoom, NPC interaction, notes as inert text, planting, weather/time, interiors, PNG capture, touch-sized layouts, pinch and the map fallback. The experience suite covers real music grid edits, WAV/MIDI/JSON downloads, undo/redo, malformed score rejection, retreat layout and palette, visitor appearance, save migration, family stage gathering and camera controls. The same corrected reflection renderer is sampled at four camera angles with asymmetric colored landmarks.

## Environment and limitations

Tests used Chromium with ANGLE/Mesa llvmpipe software graphics. Browser pages contained the exact standalone HTML with network access disabled. Browser error logs were empty and tested pages made no external application requests. No physical GPU, phone, Safari or Firefox validation was performed; no 60 FPS or capacity promise follows.

The controlled browser environment has previously blocked ordinary local-file/server navigation. Functional tests use `set_content` rather than bypassing browser policy. Baseline storage failure uses the actual unavailable about:blank storage path. Save/reload tests in the experience and sandbox suites use an explicitly injected Map-backed storage fixture. They do not establish native `file://` origin storage behavior, cross-tab conflict handling or cloud durability.

The new gameplay has no online server, accounts, combat, live resident host or financial system. Local test IDs and editable JSON are not multiplayer security. No paid provider, external assets, private conversations, live Luna memory or real users' data were used.

## Reproduce

```bash
python build.py
node --test tests/*.test.cjs
python tests/browser_test.py
python tests/experience_browser.py
python tests/sandbox_browser.py
python tests/reflection_browser.py
```

Browser scripts need Python Playwright and a compatible Chromium binary (the captured environment used `/usr/bin/chromium`). Do not install packages from historical docs without reviewing current versions and licenses. No dependencies are needed for the production offline app or Node tests.

The optional capture script produces actual rendered stills and 40 offline frames encoded at 8 FPS. The five-second movie is not a real-time benchmark. The full delivery receipt separately records archive integrity, fresh extraction/build checks and any successful GitHub publication.

## Visual inspection regression fixed before delivery

Inspection of an actual build screenshot found that the preexisting creative/music presentation tick replaced the entire transient presentation object. That erased the sandbox blueprint and grid between frames even though clicks still committed correctly. The tick now updates only its owned fields, the sandbox reasserts its own build state, and confirmation is disabled before selecting a tile. Four unit tests and three browser assertions cover the integration; the final screenshots and build were regenerated after this fix.

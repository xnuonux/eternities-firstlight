# Test entrypoints for Realm09

`node --test tests/*.test.cjs` runs current rule assertions, including inherited mechanics and new combat/beacon cases. `chapter_journey.cjs`, `road_journey.cjs`, `arsenal_journey.cjs`, `ranged_road_journey.cjs` and `beacon_journey.cjs` run accepted-command journeys. Their simulated time advances faster than real time; they are not human playtests.

`rpg_browser.py` is the current browser UI acceptance suite (106 checks in the delivered run). It uses actual HTML, DOM actions and accepted game paths, with explicitly labelled earned checkpoints. `reflection_browser.py` independently reads the current renderer's reflection framebuffer at four camera angles. `capture09.py` makes an actual rendered character screenshot, not concept art.

The browser scripts require optional Playwright and Chromium and currently specify `/usr/bin/chromium`, as tested in this Linux environment. Adjust that executable path in a different developer environment. No browser automation dependency is required to open the finished HTML. The offline-content and Map-backed-storage test setup is explicitly not native file-origin qualification.

Other `*_browser.py` scripts and preview drivers are retained pre-09 regression material whose UI selectors may target old panels. `run_browser_suites.py` is a historical runner, not the current UI gate. Do not add old pass counts to the new report or assume these drivers all work unchanged with the redesigned interface.

`python -m unittest discover -s tests -p 'test_*.py'` exercises local publication/import refusal rules; it performs no network publication. `verify_package.py` checks the delivery manifest, not an authenticity signature.

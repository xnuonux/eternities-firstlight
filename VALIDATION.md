# Firstlight10 — validation and source custody

Edition **10.0.0 / Bellweather Crossing**, prepared 2026-09-12. Full integrated local prototype, continuing Firstlight09.

## Exact application

`FIRSTLIGHT_VALLEY.html` and `index.html` are identical: **489,117 bytes**.

SHA-256: `6b1905b62b321c6335a641257bacedc997e1272fa35671852a35d076300c921a`

The two current UI reports and native-navigation probe match these exact bytes. Both framebuffer reports match the current `src/engine.js`. The source syntax report binds each of the 24 JavaScript modules. Hashes are consistency checks, not authenticity signatures or a software-security certification.

## Current tests actually completed

| Test | Result | Scope |
|---|---:|---|
| All Node rule cases | **399 passed; zero failed** | 352 inherited cases and 47 crossing/migration/transaction/combat cases, all run against this code. |
| New Chapter IV browser acceptance | **115 passed** | Exact current HTML, real UI/keyboard, validated paths, quest, combat, map, services, saves and touch-sized presentation. |
| Prior RPG workflows on current HTML | **106 passed** | Current equipment/crafting/companion/soul, earlier combat/beacon, actual music exports, retained legacy controls, fallback and touch-sized UI. |
| Water-reflection orientation | **8 passed** | Asymmetric red/green landmark framebuffer samples at four camera orbits. |
| Main-image scenery cutaway | **6 passed** | Synthetic foreground occluder reveals the blue subject; reflection stays identical; unflagged/behind-focus geometry is unchanged; no GL errors. |
| Local import/publication helper cases | **20 passed** | Refusal/idempotency rules only; these tests do not push to GitHub. |
| Current JavaScript syntax | **24 modules passed** | `node --check` on every current source module. |
| Command-based journeys | **9 passed** | Earlier chapters/equipment and current Chapter IV with melee and bow. |

UI total: **221 assertions across two completed suites**, not including the independent framebuffer cases. Historical09 pass totals are not added to this number. All current UI reports contain no unhandled JavaScript errors and no external resource requests.

`evidence10/VALIDATION_SUMMARY.json` enumerates the exact reports and identities. `python tools/summarize_validation.py` checks that their hashes and pass states agree with the current source/build; it does not manufacture or rerun a test.

## Earned progression versus deliberate fixtures

The new domain driver starts with the frozen command-earned Chapter III checkpoint in `examples/REALM10_CHAPTER_III_BASE_EARNED.json`. Both variants walk/travel through accepted rules, enter the village, attune, meet/read/search, fight, collect caches and the clapper, repair/ring, claim/equip, purchase gear and return home. No positions, resources, defeats or story completion are directly granted. The bow variant crafts its bow from real gathering. Both observe the Keeper's inner and outer warnings.

The browser journey starts with an earned pre-Chapter-IV save. It uses the visible map/services, actual keyboard combat events, validated path commands and accelerated simulation; its completed output is `evidence10/browser/BROWSER_CHAPTER_IV_COMPLETE.json`. Its own combat, clapper recovery, bell sequence, purchase, reward and return are not planted victories.

The two common-works transactions are tested later in a **separately labeled material-stock fixture**. That fixture grants materials deliberately to isolate cost, reward, repeat refusal and visuals. It is not presented as an earned harvest or included as the optional chapter-start save. Unit cases also intentionally position characters/foes to test particular constraints; those are not full playthroughs.

Earlier domain journeys were rerun on current code: fresh Chapter I, Chapter II, bow/archery/gem creation, ranged Chapter II, and three Chapter III variants. Their generators retain old output-folder names; current reports are copied into `evidence10/inherited-journeys` and `evidence10/journeys`. Those folder names are not claims that earlier code was substituted.

## UI and visual qualification

Current new coverage includes meaningful map size, actual coordinate destinations, discovered-versus-unavailable travel, local proximity, explicit Briar search, named clues, selectable gear with real comparisons, free rest, workbench access, three defeated encounters, both Keeper warning modes, a mistaken bell note, the completed sequence, single-claim rewards, durable restart and travel without healing or automatic attacks.

The touch-sized map test runs at 390 × 844 and checks dimensions, horizontal overflow, closing controls and automatic horizontal scrolling of the active Map tab into view. This is emulation, not a physical device playtest. Normal requestAnimationFrame pages test genuine map/character pause and resume separately from the accelerated stepper.

The independent cutaway specimen changed 10,200 main-image color channels and exposed 3,376 blue-subject pixels instead of zero. Its reflection framebuffer changed **zero** channels. The on/off comparison uses fixed camera/time and renders the same geometry; it does not merely inspect a matrix.

Delivery screenshots come from the real current WebGL application. `evidence10/captures/CAPTURE_RECORD.json` records earned source, chosen camera and aesthetic time of day. The new boss screenshot is captured during the browser's real keyboard-driven encounter. No concept painting is represented as gameplay.

## Known limits and non-passes

Native `file:` and loopback HTTP navigation were both attempted for the final HTML and blocked with **ERR_BLOCKED_BY_ADMINISTRATOR**. No bypass was attempted. They are recorded as unavailable/not passed in `NATIVE_ORIGIN_REPORT.json`, not counted as successful browser checks.

Successful browser tests use `page.set_content` with the exact document in an offline context and an explicitly injected Map-backed localStorage fixture. This proves application handling of the provided save and commands, not durable native storage on Dom's computer. Keep exported JSON backups and one active world tab.

Rendering uses software WebGL2/Chromium. No physical GPU/phone, Firefox, Safari, screen-reader completeness, controller, 60-FPS, human difficulty or reaction-time qualification is claimed. Automated tactics/time are not evidence of good human pacing. The procedural art remains a draft. The new village buildings have exterior service points; their interiors are not secretly playable.

No accounts, online multiplayer/invasion scaling, permanent server economy, new Heaven/Hell maps, complete soul/class trees, paid assets, Unreal client, live Luna/resident host, GitHub push or public deployment is delivered by this turn.

## Source and package

The unchanged input is `ETERNITIES_FIRSTLIGHT_09_REPOSITORY.zip`, SHA-256 `e52b8833a177e6c6216a4ebc0a41e3c99f9c276f4d8350371c7c0b4e4992d660`.

The inherited local source commit is `8b7db2d406d68049e8bc7f02d936a9323c5f84ca`. Current local source history, source manifest and package hashes are recorded in `BUILD_PROVENANCE.json` and the external delivery receipt. The source-only bundle is not a claim of a remote commit. This turn did not reread or change GitHub; reconcile current remote work before publication.

The release ZIP and source bundle are verified through separate fresh restores and identical rebuilds. See the external `FIRSTLIGHT_10_DELIVERY.json` for the completed restoration results; do not treat this sentence alone as the machine receipt.

## Reproduce

```
python build.py
node --test tests/*.test.cjs
node tests/crossing_journey.cjs
node tests/crossing_journey.cjs --bow
python -m unittest discover -s tests -p 'test_*.py'
python tests/regression09_browser.py
python tests/crossing_browser.py
python tests/cutaway_browser.py
python tests/reflection_browser.py
```

The optional browser scripts need Playwright and Chromium. Older journey generation is described in README and source comments. The reflection driver writes under `evidence07/regression`; copy its current JSON to evidence10 before aggregation. Read-only package verification: `python tests/verify_package.py`. Running generators afterward can change evidence; keep the untouched original ZIP for custody.

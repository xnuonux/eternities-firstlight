# Firstlight07 validation

**Executed in this session, 2026-09-11.** Earlier reports retained under `docs/history` describe earlier editions; they are not counted as evidence for this build.

## Exact build

- Version7.0.0; world6; adventure2; road1.
- Standalone HTML: **291,385 bytes**.
- SHA-256: `45154024be410b799dd5889c2c49b0206d600fd1941b045ac6927f4de406e584`.
- `FIRSTLIGHT_VALLEY.html` and `index.html` are identical outputs of `python build.py`.
- Source archive baseline: Realm06, SHA-256 `20ce77c8ee972c0e68a658549d41b24d9275982d251c8da5acb352956d3478fa`.

## Local rules

`node --test tests/*.test.cjs`: **240 passed,0failed**. Includes the previous190 and50 new route/domain cases. Rules cover geometry, river/bridge, gates, migration, discoveries, collision/visibility, trade capacities/funds/retries, pause, charge locking/sweeping, path recovery, reports, equipment, and earlier gameplay.

Unit fixtures intentionally place known states to exercise rejection/edge cases. Those fixtures do not establish naturally earned gameplay. See `evidence07/CORE_TESTS.tap`.

## Actual end-to-end domain journey

`node tests/road_journey.cjs` first runs the original fresh-world chapter-I journey, then continues through the new road. **No inventory grants, player-position edits, or planted defeats** occur in the journeys. It gathers/crafts/pays/opens the original chapter, rescues Briar, receives the first gift, walks to the gate, clears encounters, follows/collects discoveries, repairs/trades/equips, lights the beacon, returns, reports, equips and rests.

Chapter-I log:77 accepted commands. Road continuation:33 accepted commands. Command counts include automated choices, not distinct player features. Both use accelerated50ms simulation steps and tactical automation; they do not certify human difficulty or completion time.

`evidence07/chapter1/CHAPTER_JOURNEY_REPORT.json` and `evidence07/ROAD_JOURNEY_REPORT.json` record outcomes. The portable chapter-II start is an earned intermediate checkpoint, not a fresh account or trusted online achievement.

## Browser checks

| Suite | Passed |
|---|---:|
| Original-world smoke, controls, layout, persistence fixtures |38|
| Creative tools, score/audio/export, retreat and related journeys |52|
| Gathering, crafting, bridge, building, crops and previous sandbox |60|
| Chapter-I mine, combat, rescue, gear, story and reload |77|
| Road, merchant, discoveries, charge, return, cross-scene loot and touch/fallback |82|
| **Total** |**309**|

Every integrated report matches the exact HTML hash above. All suites report no page errors. The road suite also reports no external network requests. Reports/logs are under `evidence07/`, with older-feature runs in `regression/` and `chapter1/`.

The road browser run starts at the earned chapter-II checkpoint and uses visible UI for combat, panel Seek, pickup, cart repair, trades, equipment and report. Some long navigation/time uses the app's actual pathfinding/simulation API, not raw position changes. It creates an unclaimed road encounter cache, reloads, walks back into the mine, and checks that mine UI cannot crash or collect the out-of-scene cache.

The390×844 touch-sized run checks control bounds and no horizontal page overflow; it is not a physical Android/iOS test. The no-WebGL map run uses the same chapter rules.

## Reflections

**Eight actual framebuffer landmark samples passed**: asymmetric red and green fixtures at four camera angles. The report's engine hash matches the delivered engine. Existing mathematical reflection tests also run in the Node suite. These establish orientation, not universal photorealism or every driver combination.

## Native-origin limitation

`tests/native_browser.py` attempted ordinary `file://` and loopback HTTP navigation without replacing storage. Both returned `ERR_BLOCKED_BY_ADMINISTRATOR` in this environment. They are **blocked/unverified, not passes**, and no browser policy was bypassed.

Successful browser runs load the exact owned HTML via `set_content` in an offline page. Persistence tests explicitly use a Map-backed storage fixture. That verifies the application's serialization/migration/acknowledgment logic; it does **not** certify native file-origin or HTTP-origin localStorage. Physical phones, Firefox/Safari and user-specific file-opening behavior remain untested here.

Rendering used software graphics (ANGLE/Mesa llvmpipe), not Dom's GPU. There is no60FPS claim. The optional preview is a nine-second sequence of actual application frames rendered offline and encoded at12FPS, with camera cuts and an already-earned state. Encoded playback rate is not measured runtime performance.

## Source and archive checks

The package includes read-only verification tools and an additive checkout importer. Their executed results and fresh-extraction/source-bundle rebuild receipts are in `evidence07/` and the final external delivery JSON. Hash manifests detect changes; they are not authenticity signatures or a production security audit.

Current GitHub scope is recorded separately in GITHUB_STATUS.json. Partial module publication does not make that remote branch a complete runnable game. No deployment, paid service, live Luna changes, private history, multiplayer or real economy was exercised.

# Firstlight08 — validation actually performed

Prepared 2026-09-11. **Local playable prototype**, not a deployed MMO. Version 8.0.0.

## Exact build

Both `FIRSTLIGHT_VALLEY.html` and `index.html` are 323,150-byte, fully embedded documents.

SHA-256: `90922339441f53165c5b24cb6f68bcf061d7f7f2be736ad4578ed687315340cf`.

The build derives from the recovered Firstlight07 archive, SHA-256 `3d667134d1438b82991ca321eb34ccbc1166a7585eff9d392f4909f0fc2ce3ab`, local source commit `ea2219f799690e72dea7a57ae989347915ed1e7d`. The new source adds bows, swept projectiles, the practice court, and removable weapon sockets. No original prototype is silently replaced by an unrelated demo.

## Measured results

| Check | Result | Evidence |
|---|---:|---|
| Node rule tests | **299 passed, 0 failed** | `evidence08/ALL_RULES.tap` |
| New arsenal browser checks | **57 passed** | `evidence08/ARSENAL_BROWSER_REPORT.json` |
| Chapter II browser checks | **82 passed** | `evidence07/ROAD_BROWSER_REPORT.json` |
| Original-world browser checks | **38 passed** | `evidence07/regression/BASELINE_BROWSER_TEST_REPORT.json` |
| Creative tools browser checks | **52 passed** | `evidence07/regression/EXPERIENCE_BROWSER_TEST_REPORT.json` |
| Sandbox browser checks | **60 passed** | `evidence07/regression/SANDBOX_BROWSER_REPORT.json` |
| Chapter I browser checks | **77 passed** | `evidence07/chapter1/ADVENTURE_BROWSER_REPORT.json` |
| Rendered reflection landmarks | **8 passed** | `evidence07/regression/REFLECTION_TEST_REPORT.json` |
| Local publication/importer guards | **20 passed** | `evidence08/PUBLICATION_TOOLS_TESTS.log` |

**366 browser checks** in total, separate from the eight framebuffer reflection samples and 299 rule tests. These are assertions across existing and new functionality, not366 distinct features. The 299 rule cases include 59 new arsenal cases plus 240 previous cases.

Every listed integrated browser report matches the exact final HTML hash above. The shader fixture tests the delivered engine, whose hash is separately recorded in `evidence08/VALIDATION_SUMMARY.json`. It checks red/green asymmetric landmarks at four camera angles; no compensating reflection-axis flip was introduced.

Despite their older directory name, the listed `evidence07` reports were rerun against Realm08. Earlier design/validation documents in `docs/*HISTORICAL*` remain clearly dated source records, not additional current executions.

## Earned gameplay, separately from synthetic fixtures

The original domain journey completes chapter I from a fresh world through accepted movement, gathering, crafting, excavation, combat, loot, and story commands. The original road journey then completes the second chapter, including the fox's actual discovery, cart repair, local trade, enemies, beacon, and return reward.

`tests/arsenal_journey.cjs` starts with an earned chapter-I state, harvests real resources, crafts/equips the bow, launches six travelling arrows to hit the court's targets twice each, earns the first medal, fits the returned amber, mines additional ore, makes the longbow/ruby/moonstone, and swaps sockets. It uses 42 accepted discrete commands after the chapter start, no position or inventory grants, no directly set practice hits, and no planted medal.

`tests/ranged_road_journey.cjs` independently takes the earned trail-bow/amber checkpoint through the entire Sunward Road using the actual ranged combat rules. It succeeds with 36 accepted adventure commands. The existing blade journey was rerun after the test harness was generalized and still passes. Starting away from the spring and aiming from directly on top of an enemy were corrected in the automated tactic sequence, not papered over by changing game validation.

These journeys accelerate 50-ms simulation steps and use automated choices. They establish connected local rules, not human difficulty, manual completion time, latency tolerance, or an online economy. The practice record is not a human timing benchmark.

## Browser method and limitations

Chromium at `/usr/bin/chromium`, Python 3.13.5, Node 22.16.0, and Mesa/ANGLE llvmpipe software graphics were used. Tests load the exact standalone document with network disabled. The new browser journey uses earned save checkpoints, real clicks/selects/buttons, projected-world target selection, accepted navigation, and accelerated time. Death and refusal fixtures elsewhere are explicitly separate synthetic tests.

The storage adapter in successful browser tests is an explicitly injected Map-backed fixture. **Native file and loopback HTTP navigation both returned `ERR_BLOCKED_BY_ADMINISTRATOR`** in the independent probe. This restriction was not bypassed. The native-origin probe is not counted as a pass merely because its process finishes. Real native storage and local-origin reload remain unqualified here.

Touch tests use a 390×844 Chromium emulation. No physical phone, Firefox, Safari, human accessibility audit, GPU performance threshold, sustained frame rate, multiplayer concurrency, or native-origin storage guarantee is asserted.

The playable app itself uses actual localStorage where available and reports memory-only failures. Exported JSON is the portable backup. The test fixture is not included as the application's normal persistence mechanism.

## Reproduction

```sh
python build.py
node --test tests/*.test.cjs
node tests/road_journey.cjs
node tests/arsenal_journey.cjs
node tests/ranged_road_journey.cjs
python -m unittest discover -s tests -p 'test_*.py'
python tests/run_browser_suites.py
python tools/summarize_validation.py
```

Browser scripts require the documented development tools; the playable HTML itself does not. Browser results must be read, not inferred from process return codes. Do not automatically install an unpinned replacement or change platform policies merely to produce a green report.

`tools/capture_preview.py` encodes 90 actual rendered frames at 10 frames/second. It advances simulation deterministically between captures. The nine-second silent preview is **not a real-time performance benchmark**; its report identifies the exact build and successful six-arrow range sequence.

## Publication and package integrity

No new GitHub write, deployment, paid service, model call, private resident data, or Heaven merge occurred. `GITHUB_STATUS.json` records the current remote/main and prior partial PR observations.

The delivery process separately records fresh extraction, file-manifest checks, reproducible HTML rebuilding, local Git bundle restoration, and rule/journey reruns in the top-level delivery receipt. File hashes detect accidental changes; they are not authenticity signatures or a complete software security audit. A local Git commit does not imply a successful remote push.

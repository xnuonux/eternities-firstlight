# Firstlight 06 — validation record

Prepared 2026-09-11. Runtime 6.0.0; world save format 5; adventure format 1.

## Actual completed checks

| Check | Result | Evidence |
|---|---:|---|
| Existing local rules + new adventure tests | 190 passed, 0 failed | `artifacts06/CORE_TEST_REPORT.tap` |
| Fresh-world command-level chapter journey | Passed | `artifacts06/CHAPTER_JOURNEY_REPORT.json` |
| Original world browser interactions | 38 passed | `artifacts06/regression/BASELINE_BROWSER_TEST_REPORT.json` |
| Music, decorating, visitor, migration browser checks | 52 passed | `artifacts06/regression/EXPERIENCE_BROWSER_TEST_REPORT.json` |
| Gathering, crafting, construction and crops | 60 passed | `artifacts06/regression/SANDBOX_BROWSER_REPORT.json` |
| New adventure browser checks | 77 passed | `artifacts06/ADVENTURE_BROWSER_REPORT.json` |
| Rendered water orientation landmark samples | 8 passed | `artifacts06/regression/REFLECTION_TEST_REPORT.json` |

There are 227 ordinary browser checks across four suites, plus eight reflection framebuffer samples. Counts are case/assertion counts, not independent users, performance trials, lines covered, or production-security claims. Original edition reports in `artifacts/` or `docs/history/` are historical and are not added to these counts.

All four integrated browser reports name the same exact standalone HTML SHA-256:

`d71cf0dfac579132229e66f205393fc9955cdf90308b0b695362313c5b20bc77`

The reflection report names engine SHA-256:

`67818d1ce4b00205c006f2250f5ff527db8496a017fe36224ea5e38637fd5702`

## What the journey actually did

The domain journey starts from `new Simulation()` with no material grants, no player-position edits, no planted defeats, and no directly set story flags. It uses accepted pathfinding/gathering/crafting/bridge commands, takes supplies, enters, chips two walls, defeats four encounters, collects caches, rescues the fox, equips armor, obtains the relic, returns, forges/equips a blade, rests, meets the envoy and chooses/equips the endurance gift.

It made 78 accepted commands and completed in approximately 130.4 simulated seconds with automated tactical choices, no deaths, and a cold state roundtrip. That time is not a predicted human playtime: the harness advances local time in 50-ms steps and chooses attacks/healing programmatically.

The browser journey begins at the *earned* pre-mine checkpoint from that run. It does not grant new inventory, defeats or story progression. It uses actual UI interactions and world clicks; between some checkpoints it calls the same validated walking API the client uses. Simulation time is advanced through the explicit test hook. Separate isolated fixtures exercise zero-HP recovery and malformed import; those are not represented as organic achievements.

The browser completed the mine, companion controls, loot/equipment, forge, story pages and single reward. It also checked text safety, invalid-save nonmutation, exact cold restore, touch-sized controls, and the fallback map. No unhandled JS errors or external requests were recorded in that suite.

## Native navigation is NOT qualified here

`tests/native_browser.py` attempted the exact standalone document using `file://` and a loopback HTTP server in the unmodified Chromium environment. Both returned `ERR_BLOCKED_BY_ADMINISTRATOR`. No policy was changed or bypassed. These are recorded failures to qualify those origins—not gameplay failures and not passes.

Successful browser tests load the exact owned HTML with `set_content` into an offline page. Tests of durable-looking storage inject an explicitly labeled Map-backed fixture. This verifies save semantics and restoration through a new page, but not actual native file-origin persistence. Browser storage denial is separately exercised and surfaced as memory-only operation.

Test artifacts were produced by Chromium on a software renderer (Mesa llvmpipe). This is not a GPU benchmark and does not establish 60 FPS. Touch-sized Chromium is not a physical-phone/Safari test. No Firefox certification, server load test, concurrent multiuser play, anti-cheat, online economy, paid deployment, or live Luna operation occurred.

## Preservation and package verification

The source build is dependency-free and deterministic for these bytes. The final delivery receipt records the fresh-extraction SHA-256 verification, rebuild identity, local tests, and Git bundle restoration performed during final packaging. A matching manifest is an integrity check, not a trusted external signature or proof that the application is secure.

Screenshots in `artifacts06/` are actual application renders. The chapter-start example is an optional earned fixture and replaces the active world on import; export your own world first. No user's private save, pregnancy/family information, credentials, or old intimate Raven conversations are present.

## Important unfinished capabilities

Native storage and real-device performance; human balancing; networked play; authentication; live trade; randomized item instances; class systems; multiple companion species/evolution; mounts/flight; further realm maps; camera-controlled fully 3D terrain; resident-host connections. The GDD records these as future work rather than demonstrated capabilities.

## Publication/import tooling

Ten local refusal/idempotency tests of the additive checkout importer passed. They use temporary Git checkouts without network calls. Current textual reports also appear under `evidence/realm06/` for source-only Git consumers; full screenshots remain in the delivery ZIP.

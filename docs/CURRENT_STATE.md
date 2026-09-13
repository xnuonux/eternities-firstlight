# Current gameplay checkpoint: starter riverbank outing

Updated 2026-09-12. `gameplay/starter-region-progression` is stacked on PR #4's reviewed import head `aa4e21056219768b24b3f36d2f60671a6a831fb6`. Gameplay/UI implementation checkpoint: `6c23d4730b265df0bc008e472f02d868aae3c5fb`. Read the implementation PR for final pushed head, fresh clone and CI results. Main remains unmerged. [Implementation results](development/STARTER_REGION_RESULTS_2026-09-12.md) distinguish evidence and limits.

Oren now offers an optional nearby riverbank outing immediately after the initial expedition kit. Recover three separately identified bundles and drive away Old Bristle along one route, with two ordinary skitters. Return for six sunmarks, 25 XP and an explicit choice: a fixed early blade, a fixed early bow, or one finite +2 temper on one owned weapon. New weapons require deliberate equipping. Recovered supplies persist beside the workshop.

Tab/click selection and stationary autoattack are explicit. Click no longer forces pursuit; movement remains the player's choice. The real blade/bow cooldowns govern 0.12-second anticipation and recovery. Facing, confirmed-hit feedback, weapon materials and the named warning/opening are visible. Reduced motion suppresses added displacement; no camera shake or renderer replacement was introduced.

World schema/key remain **9 / eternities.realm10.save.v9**. Adventure **6** adds nested starter **1**: accepted flag, unique supply IDs and one nullable reward record. Adventure 5 migrates to a fresh quest; older migrations still chain. Levels remain **1–5** at 30/80/150/260 XP, with all banked XP through 9999 retained. Creative work, home/build/crops, equipment/sockets, companion, completed chapters and soul choices remain preserved. Unresolved fights restart at the existing safe exterior checkpoint; completed objectives and rewards persist. No scaling or repeat temper economy.

Launch from this checkout with `OPEN_REALM_WINDOWS.cmd`, or `python -m http.server 8766 --bind 127.0.0.1` and visit `http://127.0.0.1:8766/`. Walk to Oren, E for the kit, E again to review/accept. The sign east of Oren enters the nearby riverbank. M maps the route; J lists objectives; E collects/returns; Tab/click selects; 1 toggles stationary attacks; 3 braces. Return to choose, use C to inspect/equip, then try the practice bundle by the riverbank entrance.

For personal play, export your existing world and keep its backup outside Git. Imports replace the active world. The labelled [fresh-kit](evidence/starter-region/FRESH_KIT_EARNED.json) and [returning campaign](evidence/starter-region/VETERAN_CAMPAIGN_EARNED.json) fixtures are command-earned test worlds. Use a separate browser profile/origin for these. No personal save was read or changed.

Run `python tools/verify.py` or `python tools/verify.py --browser` with [optional dependencies](../tests/README.md). The latter runs six software-Chromium suites. Current code covers 432 rules, fresh starter blade/bow and a newly earned four-chapter strongest veteran route. Always report freshly printed counts. Human enjoyment/pacing, personal saves, file-origin migration, physical phones and Unreal remain unqualified. [NEXT_TASK.md](NEXT_TASK.md) now calls for Dom's fresh/returning playtest and Astra's diff review.

---

The following is the preserved **historical bootstrap checkpoint**, superseded by the gameplay state above. Its schema, counts and unbuilt-task descriptions describe the import only.

# Current Firstlight development state

Updated 2026-09-12. Start here, then read [NEXT_TASK.md](NEXT_TASK.md), [PLAYTEST_NOTES.md](PLAYTEST_NOTES.md) and [DECISIONS.md](DECISIONS.md).

## Playable source and repository

Firstlight 10.0.0, Bellweather Crossing, is the complete offline browser baseline. It is a custom WebGL2/JavaScript game assembled by Python. Four chapters, homestead/building/decor tools, music/export tools, Briar companion, swords/bows, sockets, character/equipment workspace, map and waystones are integrated.

Verified import-only commit: `d7c57ee47833dad4fb9ec3332d352468abf32109`. All 133 source-manifest files match the supplied ZIP byte for byte at that commit. Both generated HTML files are 489,117 bytes, SHA-256 `6b1905b62b321c6335a641257bacedc997e1272fa35671852a35d076300c921a`. Later bootstrap commits add tooling and records; runtime source and HTML remain unchanged.

Review branch: `import/firstlight10-bootstrap-20260912`, based on observed `main` at `1aae2f14f2b2ab0ba54a5bf8571bd45bbf32ab46`, with PR #3's handoff preserved. Main is not merged by this bootstrap. Use `git log -1 --format=%H` and `git status --short` for the current checkout; fetch before deciding what is current remotely. See [bootstrap results](development/BOOTSTRAP_RESULTS_2026-09-12.md) for fresh evidence and limits.

Verified remote code/tooling checkpoint: `ff4af83983dd73ec7ae43a6182d76fbd6ca787ea`, rebuilt/tested from a fresh GitHub clone; the full browser command also passed from a clone at `1fb9ad5b9018012f92882292bc88c05cec902b25`. Later bootstrap changes split the hosted browser suites and adjust execution bounds after a documented CI timeout. [Source-import PR #4](https://github.com/xnuonux/eternities-firstlight/pull/4) carries final-head and CI readback. Controlled native loopback-origin persistence passes with an isolated profile and accepted synthetic notebook entry. Personal saves and file-origin storage were not tested.

## Launch and verify

Open `FIRSTLIGHT_VALLEY.html` in a browser, or run `OPEN_REALM_WINDOWS.cmd` on Windows. No runtime package install, account or CDN is required. An optional stable local origin is `python -m http.server 8000 --bind 127.0.0.1`; visit `http://127.0.0.1:8000/`. File origins and different HTTP ports have separate browser storage.

Before continuing a personal world, export its JSON from the existing game, keep the untouched backup outside the repository, then import through **More → Import a saved world**. Example imports replace the currently loaded world. Keep one active world tab; there is no conflict merge or cloud backup.

Development requires Python and Node.js. The host verification uses Python 3.13 and Node 24. Run `python tools/verify.py`; optional browser dependencies and commands are documented in [tests/README.md](../tests/README.md). Logs go to ignored `verification/`. CI rebuilds/tests on Windows and Linux and runs current Chromium browser checks on Linux with read-only repository permission.

## Save contract and implemented limits

- World schema 9; key `eternities.realm10.save.v9`. Earlier world schemas 2–8 migrate, with earlier storage keys read but not overwritten. Current schema 9 loads directly (`src/core.js`).
- Adventure schema 5; versions 1–4 migrate with defaults for newer subsystems. Crossing schema 1 holds durable chapter flags and one-time project/reward state (`src/adventure.js`, `src/crossing.js`).
- Owned/equipped gear, XP, coins, quest outcomes, soul choices, companion state and creative work persist. Expeditions restart at a safe exterior checkpoint. Partial enemy damage, targeting, current attack/bell sequences and exact NPC positions are transient.
- Levels 1–5 use XP thresholds 30, 80, 150 and 260. XP keeps accumulating up to 9999; level remains capped at five. Changing that curve requires an explicit old-save policy (`src/adventure.js:39,82`).
- Gear has weapon, armor and charm slots, with eight defined item IDs. Chapter IV supplies fixed encounters/caches, a shop coat, a reward charm and two one-time material commissions. A broader scalable quest/reward progression system is not implemented.

Unbuilt: the proposed starter quest chain and 1–10 curve, new village interiors, wider regions/realms, online accounts/economy/multiplayer, and an Unreal production client. Human combat feel remains an open playtest issue. The protected resident sanctuary and Heaven repository remain separate.

Historical evidence stays in the supplied archive and [dated provenance](provenance/2026-09-12/README.md). Original delivery claims in `VALIDATION.md`, `GITHUB_STATUS.json` and old handoffs describe their own preparation time, not the current remote state.

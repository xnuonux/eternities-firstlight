# Firstlight engineering constraints

Current complete local release: **Realm10 /10.0.0 — Bellweather Crossing**. Browser offline custom WebGL2 prototype; Unreal is later. Preserve all three earlier chapters, music exports, construction, decoration, companion and saved data. Do not regress to Shared Commons07.

Read README.md, VALIDATION.md, docs/BELLWEATHER_CROSSING.md and docs/NEXT_SESSION.md. Source facts are the files, not previous confident prose. `python build.py` and `node --test tests/*.test.cjs` are the default gates. Current browser acceptance: tests/crossing_browser.py and tests/regression09_browser.py. Historical browser scripts may target hidden old controls; do not claim they passed this UI.

Keep rules separate from art/UI. Validate before mutation. No duplicate loot, hidden inventory grants, offline saves treated as online authority, destructive reset on migration or silent unbounded currency. Targets and fight runtime are transient; durable chapter checkpoints are explicit. Space/1–6 are combat, C/I/K/J/M menus; modal text must never leak into game input.

Use actual browser screenshots, never concept art presented as gameplay. Distinguish automated tactics/time and storage fixtures from human/device testing. No FPS, production multiplayer, consciousness, completed remote import or deployment claims without evidence. No API keys or paid infrastructure in the offline build. No public license, Heaven merge or protected-resident changes without founder direction.

## Continuous development (2026-09-12)

Start at `docs/CURRENT_STATE.md`, then `docs/NEXT_TASK.md`, `docs/PLAYTEST_NOTES.md` and `docs/DECISIONS.md`. The founder charter preserves direction; its recommendations remain proposals. The later bootstrap handoff takes priority over the archived edition's old task ordering. Source facts and fresh tests take priority over historical pass counts.

Dom directs taste, names and human playtesting. ChatGPT supplies strategy, design, prototypes and review. Codex owns the primary integration checkout and build/test verification. This is a repository handoff protocol, not an automatic live connection between sessions.

Use one bounded task branch from an explicit base commit. Inspect status, fetch origin, compare newer work, and preserve concurrent edits. Separate agents use separate worktrees. Every handoff names base/head, changed files, save migrations, commands actually run, failures and next acceptance condition. Never replace a newer tree wholesale with a chat ZIP. Keep personal save exports outside Git; use only labelled synthetic or command-earned fixtures for automation.

Run `python tools/verify.py` for build identity, syntax, rules, helper cases and both Chapter IV journeys. Use `python tools/verify.py --browser` with the optional development dependencies for the current browser suites; the latest extension below names the current gates. Record skips separately from passes. A fresh clone of the pushed branch must reproduce the build and tests before reporting a complete source import. Root `VALIDATION.md`, `GITHUB_STATUS.json` and dated provenance describe the original delivery, not fresh runs.

The bootstrap authorizes source import, separate portable tooling/CI, continuity records, pushing a review branch and opening its PR. It does not authorize merging main, tagging a release, deploying publicly or activating `.import/READY.json` / the old `import-source.yml` workflow. Keep that historical workflow dormant. The next gameplay priority is starter-region questing, leveling, loot, visible equipment progression and combat feel. A new realm or Unreal rewrite is outside that milestone.


## Starter progression extension

The riverbank is owned by `starter.js`, `starter-ui.js`, `starter-art.js`; generic adventure/combat/arsenal/core dispatch remains authoritative. Read the dated task/results notes. Preserve stable IDs, adventure-6/starter-1 migration, the 1–5 curve, atomic single reward, weapon identity/socket and existing browser keys.

The current portable verifier includes fresh starter blade/bow and a newly earned four-chapter strongest veteran journey. `--browser` runs six suites including native persistence and starter UI. Report actual counts (432 rules / 147 starter UI checks at this checkpoint). Record real browser footage with fixture/hash/renderer provenance; no concept art or animation substitute. Human feedback remains a separate acceptance step.

## Perspective camera extension

Read the 2026-09-13 task/results notes. Adventure is true perspective; Follow/Tactical/Wide retain orthographic contracts. Preserve inverse ground picking, behind-eye/sky rejection, visible-body selection, camera-relative movement, text/menu input boundaries and stationary attacks. Camera mode/FOV are optional world9 preferences; no progression migration.

Static opaque shapes block camera clearance by default; dynamic construction/mine solids opt in with `cameraSolid`. Exclude actors, effects, ghosts and wind foliage. The camera browser gate belongs in the portable verifier and CI. Actual footage/desktop measurements remain distinct from software WebGL tests and human comfort. Extend the current branch without reimporting archives or merging/deploying automatically.

## Interchangeable views

Dom wants both diorama and third person retained. V swaps styles; R resets the current mode. Optional `cameraViews` version 1 holds per-mode framing. Keep orthographic user zoom separate from the fitted scene half-width so interior/viewport limits never overwrite outdoor framing. Preserve the internal mode IDs and world9/adventure6/starter1 contracts. Validate older/invalid preferences without discarding game state. The 51-case camera browser gate includes switching/reload, scene clamps, live combat intent and actual notebook/menu input; current rules total 444. Report fresh results, not these counts alone.

## Equipment pursuit extension

Read `docs/development/UPGRADE_HUNT_TASK_2026-09-14.md` and its results. `pursuit.js` owns versioned survey/claim/fitting rules; `pursuit-ui.js` projects real catalogue/recipes. `starter` owns the shared riverbank scene; active surveys temporarily select their own encounter/objective IDs. Art never creates quest or payout state.

Preserve optional pursuit version 1 on adventure 6. A complete unclaimed run is valid durable state. Exact run identity and observed prior claim counter survive request-receipt eviction; individual survey enemies never enter legacy defeated/drop rewards. Capacity/cost refusal must leave all ownership, balances and entitlement unchanged. The two fitting steps retain identity, socket and separate Oren temper. Never auto-equip, assign classes, raise the cap or discard stored XP.

The current verifier has 29 source syntax checks, 462 rules, eight command journeys and eight browser suites, including `pursuit_browser.py`. Historical counts above describe their checkpoints only. Fresh verification and exact pushed-head clone evidence are required for delivery. The new source/browser CI matrix has ten jobs. Preserve both cameras and all creative/campaign checks; gameplay footage and human acceptance remain distinct.

## Independent character extension

Read the dated character task/results notes. `characters.js` stores 1–3 complete canonical worlds in the optional `eternities.realm10.characters.v1` envelope. The same write commits outgoing state and active selection. Never use `Simulation.save()` directly for managed app saves, split identity/payload into uncoordinated keys, reuse deleted IDs, or replace existing slots during import. A Web Lock and exact source bytes protect managed writes. Legacy recovery keys stay present.

Switch only after persistence succeeds, through the full app restore path. Clear transient combat/input/music/UI state, and use the validated simulation state after migration. Pending file/audio operations must retain their starting character identity. World9/adventure6/starter1/pursuit1/cameraViews1 and XP1–5 rules remain unchanged; classes stay unassigned. The verifier adds the roster journey/browser gate; use fresh exact-head evidence and keep human playtesting distinct.

## Chosen class extension

Read the dated class task/results. `classes.js` owns explicit choice and technique rules; adventure schema7 requires classPathv1 and migrates earlier worlds to unassigned without changing XP or history. `damageEnemy` accepts an explicit source label; only player blade attacks and actual arrow collisions may consume Hunter's transient mark. Companion/soul/spell/default damage must retain their source distinction. Class cooldown persists, mark does not. Do not turn class choice into gear replacement, profession, morality or an implicit respec rule.

`classes-ui.js` uses canonical definitions/stats and production commands. X adds one optional technique; all prior controls and modal input boundaries remain. Timed archery medals exclude class techniques. The verifier adds the complete class survey journey and `classes_browser.py` to the previous gates. Report exact-head fresh source/browser evidence and actual footage separately from founder enjoyment.

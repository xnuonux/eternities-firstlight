# Firstlight engineering constraints

Current complete local release: **Realm10 /10.0.0 — Bellweather Crossing**. Browser offline custom WebGL2 prototype; Unreal is later. Preserve all three earlier chapters, music exports, construction, decoration, companion and saved data. Do not regress to Shared Commons07.

Read README.md, VALIDATION.md, docs/BELLWEATHER_CROSSING.md and docs/NEXT_SESSION.md. Source facts are the files, not previous confident prose. `python build.py` and `node --test tests/*.test.cjs` are the default gates. Current browser acceptance: tests/crossing_browser.py and tests/regression09_browser.py. Historical browser scripts may target hidden old controls; do not claim they passed this UI.

Keep rules separate from art/UI. Validate before mutation. No duplicate loot, hidden inventory grants, offline saves treated as online authority, destructive reset on migration or silent unbounded currency. Targets and fight runtime are transient; durable chapter checkpoints are explicit. Space/1–6 are combat, C/I/K/J/M menus; modal text must never leak into game input.

Use actual browser screenshots, never concept art presented as gameplay. Distinguish automated tactics/time and storage fixtures from human/device testing. No FPS, production multiplayer, consciousness, completed remote import or deployment claims without evidence. No API keys or paid infrastructure in the offline build. No public license, Heaven merge or protected-resident changes without founder direction.

## Continuous development (2026-09-12)

Start at `docs/CURRENT_STATE.md`, then `docs/NEXT_TASK.md`, `docs/PLAYTEST_NOTES.md` and `docs/DECISIONS.md`. The founder charter preserves direction; its recommendations remain proposals. The later bootstrap handoff takes priority over the archived edition's old task ordering. Source facts and fresh tests take priority over historical pass counts.

Dom directs taste, names and human playtesting. ChatGPT supplies strategy, design, prototypes and review. Codex owns the primary integration checkout and build/test verification. This is a repository handoff protocol, not an automatic live connection between sessions.

Use one bounded task branch from an explicit base commit. Inspect status, fetch origin, compare newer work, and preserve concurrent edits. Separate agents use separate worktrees. Every handoff names base/head, changed files, save migrations, commands actually run, failures and next acceptance condition. Never replace a newer tree wholesale with a chat ZIP. Keep personal save exports outside Git; use only labelled synthetic or command-earned fixtures for automation.

Run `python tools/verify.py` for build identity, syntax, rules, helper cases and both Chapter IV journeys. Use `python tools/verify.py --browser` with the optional development dependencies for the four current browser suites. Record skips separately from passes. A fresh clone of the pushed branch must reproduce the build and tests before reporting a complete source import. Root `VALIDATION.md`, `GITHUB_STATUS.json` and dated provenance describe the original delivery, not fresh runs.

The bootstrap authorizes source import, separate portable tooling/CI, continuity records, pushing a review branch and opening its PR. It does not authorize merging main, tagging a release, deploying publicly or activating `.import/READY.json` / the old `import-source.yml` workflow. Keep that historical workflow dormant. The next gameplay priority is starter-region questing, leveling, loot, visible equipment progression and combat feel. A new realm or Unreal rewrite is outside that milestone.


## Starter progression extension

The riverbank is owned by `starter.js`, `starter-ui.js`, `starter-art.js`; generic adventure/combat/arsenal/core dispatch remains authoritative. Read the dated task/results notes. Preserve stable IDs, adventure-6/starter-1 migration, the 1–5 curve, atomic single reward, weapon identity/socket and existing browser keys.

The current portable verifier includes fresh starter blade/bow and a newly earned four-chapter strongest veteran journey. `--browser` runs six suites including native persistence and starter UI. Report actual counts (432 rules / 147 starter UI checks at this checkpoint). Record real browser footage with fixture/hash/renderer provenance; no concept art or animation substitute. Human feedback remains a separate acceptance step.

## Perspective camera extension

Read the 2026-09-13 task/results notes. Adventure is true perspective; Follow/Tactical/Wide retain orthographic contracts. Preserve inverse ground picking, behind-eye/sky rejection, visible-body selection, camera-relative movement, text/menu input boundaries and stationary attacks. Camera mode/FOV are optional world9 preferences; no progression migration.

Static opaque shapes block camera clearance by default; dynamic construction/mine solids opt in with `cameraSolid`. Exclude actors, effects, ghosts and wind foliage. The camera browser gate belongs in the portable verifier and CI. Actual footage/desktop measurements remain distinct from software WebGL tests and human comfort. Extend the current branch without reimporting archives or merging/deploying automatically.

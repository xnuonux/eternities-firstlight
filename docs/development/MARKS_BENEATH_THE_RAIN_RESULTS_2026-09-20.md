# Marks Beneath the Rain — implementation and evidence

Base: PR #18, **4e57ad6028bc30b0c52b43de9ddf679bf373fbbf**. Branch: `gameplay/marks-beneath-the-rain`, stacked on `gameplay/road-after-rain`. The PR records exact final pushed commit, subsequent independent remote-clone result and hosted checks. These post-push events are not pre-claimed by this pre-push document.

## Playable behavior and canon

The recovered Earth prototype specification proposes Mara noticing old flood marks after Fenna's practical delivery resolves. This branch turns that small seed into an optional investigation: an invitation at the existing observatory table, three identified stones on the existing western Hearthwater track, collected rubbings, an interactive tracing comparison and one recorded hypothesis. Both north and south describe the same axis. The completed chart stays on the observatory wall; the desk retains the rubbings.

Mara separates observed alignment from possible old-road or waterworks explanations. The Roads of Light remain a possibility to investigate, not a newly established fact. No Beacon becomes a source of the uncreated First Light. Dialogue, puzzle and exact geometry are Codex-authored adaptations, not quoted novel text or founder-approved new canon. No unrelated resident/family/product material was imported. The [task note](MARKS_BENEATH_THE_RAIN_TASK_2026-09-20.md) records the bounded GitHub/Drive/Downloads intake and source links.

The follow-up requires confirmed delivery arrival, not payment or campaign completion. Fresh blade, bow and strongest returning characters have the same route. The declared reward is the discovery and chart, with no item, material, currency or XP mutation. There is no forced fight, timer, new power tier or optional-story bypass. The field table remains usable while Mara follows her existing schedule elsewhere.

## State and compatibility

Adventure8 → **9** adds required **earthNotes1**, empty and unaccepted. World/key9, earthStory1 and all earlier nested versions remain. XP0–9999 and levels1–5 remain. Migration preserves all older canonical fields including unpaid Fenna delivery; current missing/inconsistent/future notes refuse. Older adventure8 writers refuse schema9 rather than erasing it. Whole-world character ownership remains authoritative.

`earth-notes.js` owns accepted observations, comparison and one hypothesis. Commands validate scene, walkable proximity, line of sight and prerequisites before mutation. Read/rotate and rejected comparison make no progress. Changed requests, reload, repeated visits and receipt eviction cannot repeat completion. String IDs are validated without array coercion. UI bearing is transient and reset on character restore. Art reads state only. No personal notebook, score, housing, companion, socket/fitting, reward history or explicit choice is overwritten.

## Actual local verification

Python3.13.15 / Node24.18.0. Commands executed:

```text
python build.py
node --test tests/earth-notes.test.cjs
node --test tests/*.test.cjs
node tests/earth_notes_journey.cjs --sources-ready
node tests/earth_notes_journey.cjs --bow --sources-ready
node tests/earth_notes_journey.cjs --veteran --sources-ready
python tests/earth_notes_browser.py
python tools/verify.py --browser
```

The full verifier passed against frozen identical checked-in HTML: **712134bytes**, SHA256 **14c79b47648e13764fbe4d623d4835ebe0089a54f37bc48d8d6fa7bccc2a8750**. No runtime changes occurred during that run.

- **44** JavaScript syntax checks.
- **542/542** Node tests; no failures/skips.
- **27** Python cases discovered: **26 passed, 1 Windows symlink capability skip**.
- **21** command-earned journeys, including three new continuations from fresh blade, fresh bow and fully equipped four-chapter veteran unpaid deliveries. No position edits, resource grants or planted objectives.
- **14** browser suites / **1142** assertions: Crossing115, prior gameplay/creative107, cutaway6, reflection8, native persistence11, starter147, camera51, pursuit145, characters67, classes45, Cosmos75, Earth89, Earth story142, field notes134. No browser/runtime errors in the new suite.

Coverage includes accepted/partial/complete/compared/recorded reload stages, wrong alignment refusing atomically, both correct bearings, both hypotheses, unpaid entitlement, no economic or creative mutation, usable tracing dimensions, narrow viewport, both camera presets, modal shortcut boundaries and independent character ownership. Full existing campaign, combat, companion, construction, exports, reflections and soul-choice gates remain.

Failures retained: initial expected missing-module red; a boundary fixture used an invalid outdoor position; seven old tests expected schema8 rather than9; the first journey assertion incorrectly froze the naturally advancing sandbox clock; the first browser draw used a scalar rotation instead of the renderer's three-axis array; camera assertions read nonexistent `mode` instead of `preset`; screenshot inspection exposed shared SVG icon sizing. These were corrected without weakening game rules or injecting earned progress. A separate inspection caught array-coercible interpretation IDs; strict string checks and regression coverage now reject them. Final full verification passed.

## Actual gameplay and remaining limits

[Recording and provenance](../evidence/marks-beneath-the-rain/README.md): **82.72seconds**, silent1280×720, 42 automated UI/accepted movement actions under normal RAF, Chrome153.0.8010.52, RTX3080 ANGLE/D3D11, driver610.74, balanced quality. The25fps encoding and instantaneous HUD are not performance measurements. The command-earned video source starts after delivery, not character creation. The final chart is earned and delivery remains unpaid.

Human questions remain pending: did the clues make sense, did alignment feel like discovery, and did Mara's answer create curiosity? Cardinal guidance may be too simple; no enjoyment/duration claim is made. The scene remains a procedural browser prototype with disclosed travel checkpoints, not a seamless province or full cosmology implementation.

The old port8780 preview remains unchanged: automatic approval review previously rejected restarting that task-owned process, with only “blocked by policy” supplied. The launcher correctly refuses a different build there; no alternative personal-save origin was selected. New source/HTML and the recording are delivered for review. No main merge, tag, public deployment, paid service or scheduled execution.

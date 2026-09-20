# Marks Beneath the Rain — bounded creative continuation

Base: `4e57ad6028bc30b0c52b43de9ddf679bf373fbbf`, PR #18, on `gameplay/marks-beneath-the-rain`. Dom explicitly requested creative continuation from his canon. This note records implementation choices, not new founder-approved mythology.

## Intake and source boundary

Fetched origin and read PR #18 status/comments/reviews and current continuity. No newer gameplay head or comments were present. The recovered archive remains `799a0a467dd11b50742c3b441c45e807e4454443` (PR #14). Inspected Downloads and connected Drive's Firstlight archive, reading copies and newer matching metadata; no newer relevant game-canon upload was found in this bounded search. Recent changes in the broader private Eternities hub concern other projects, not additions to Firstlight mythology.

Sources: [complete story bible](https://drive.google.com/file/d/1BJCoMAOkclSsEFEEtsVIYngumg6Op46M/view), [founder request excerpts](https://drive.google.com/file/d/1DgAk43F-PNH3Z4cxa9HaAhU_ecrsoNTL/view), the recovered founder answers/Living Canticle, mythology bridge, and the full Earth prototype specification indexed in `docs/design/COMPREHENSIVE_VISION_INDEX.md`. Earth specification's optional post-delivery clue says Mara notices old flood marks aligning with an ancient route after practical work resolves. These are design sources; this branch does not implement every realm package or resolve the saga.

## Playable contract

- After `earthStory.arrived`, a note at Mara's observatory field table offers an optional investigation. Payment is not required. Read first; explicitly accept. No chapter/class/companion requirement and no hidden earlier-pickup backfill.
- Stable quest ID `marks-beneath-the-rain`; mark IDs `orchard-stone`, `bank-footing`, `shelter-mark`. Three physical stones on existing Earth ground at (-13,-6), (-13,-16), (-13,-21); compare at the observatory table approach (-2,0). Validate ground, proximity and line of sight. All marks can be observed in any order once accepted.
- Return with three rubbings. Rotate a visible tracing in 15-degree increments and compare it to their north/south alignment. Both 0 and 180 degrees describe the same axis. Incorrect comparison refuses without durable mutation. Accessible text describes bearings; no audio, reflex or colour-only requirement.
- Record either `old-road` or `waterworks` as a tentative interpretation. The matching incisions and shared axis are observations; ancient road and water management are hypotheses. No claim that this proves a Road of Light, no portal or divine source created.
- The completed chart remains in the observatory. Reward is the discovery and durable chart, explicitly no items, materials, currency or XP. No auto-equip, socket/fitting change, notebook overwrite or personal score edit. No new combat or economy.

## Ownership and migration

`earth-notes.js` owns definitions/state/commands; `earth-notes-ui.js` owns projected interaction and transient tracing angle; `earth-notes-art.js` reads rules for stones/chart. Existing Earth UI dispatch integrates them. Adventure 8 → 9 adds required `earthNotes` version 1, fresh and unaccepted, preserving every prior field, including unpaid delivery. World/schema/key 9 and other nested versions remain unchanged. Invalid/future states refuse; migration never infers acceptance.

Game dialogue, names of the individual marks, puzzle and exact geometry are Codex-authored adaptations of the cited clue, subject to Dom's taste. Mara's existing schedule and family roles remain intact; the field note is usable while she is elsewhere.

## Evidence required

Rules for eligibility, proximity/line, idempotency, both valid bearings, malformed input, all reload stages, old-save preservation and no economic mutation; command-earned fresh blade/bow and veteran journeys; production UI both cameras, reload, character ownership, compact layout, keyboard/input boundaries and persistent art. Regenerate identical HTML, run full verifier and browser gates, record actual normal-time gameplay, push a stacked review PR, reproduce exact pushed head in a fresh independent clone. Human questions: did the clues make sense, did aligning the tracing feel like discovery, and did Mara's answer make you curious? No automatic merge/deployment.

# Starter-region evidence

These are labelled engineering artifacts, not personal saves or human playtests.

- `starter-outing.webm`: actual normal-RAF Chrome/RTX recording, 46.8 s, 1280×720 silent VP8, 25 fps encoding. Source/fixture hashes and final state are in `GAMEPLAY_RECORDING.json`; `recording-actions.json` records accepted automation inputs.
- `GPU_DESKTOP_REPORT.json`: independent 1920×1080 balanced hardware-ANGLE sample, 600 frame intervals in each of three observed scenes. Distinct from software CI and video encoding rate.
- `FRESH_KIT_EARNED.json`: fresh command-earned initial kit at Oren, before optional acceptance. Producer: `node tests/starter_journey.cjs`.
- `VETERAN_CAMPAIGN_EARNED.json`: newly earned four-chapter Dawn's edge, keeper coat, chime clasp world, before starter acceptance. Producer: `node tests/starter_veteran.cjs`. The additional migration boundary in that test represents these earned fields as old adventure schema 5; this stored fixture retains its actual current schema.
- PNGs are actual rendered frames/equipment screens. Some UI stills precede the final formatting-only HTML rebuild; the gameplay recording and GPU report identify the final HTML hash.
- `IMPLEMENTATION_EVIDENCE.json` summarizes the code checkpoint and gates. The PR receipt names the exact final pushed head and clean remote clone results.

Importing either fixture replaces the active world. Use a separate test profile/origin, preserve your own exported backup outside Git, and never copy a test fixture over a personal save. No personal save was needed for these tests.

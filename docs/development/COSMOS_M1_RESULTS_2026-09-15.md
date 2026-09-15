# Near Expanse M1: implementation and evidence, 2026-09-15

The browser prototype now has an optional complete walk from the valley into the Near Expanse and home. Two connected ground approaches pass Teren's Three Lamps and a roofed refuge, climb to Anik's occupied observatory, and return without granting or replaying rewards. Third person and diorama remain interchangeable. The scene replaces the first bare platforms with supported cliffs, stone paths, softer ridge geometry, an arched observatory, an armillary and a fixed moon under world-space stars.

Base: **bdad75b70b7762f6ef89fe0982ebc07cd4ddef0c**, PR #13, `gameplay/outing-readability`. Review branch: `gameplay/cosmos-near-expanse`, explicitly stacked against that base branch. Archive input: PR #14 at **799a0a467dd11b50742c3b441c45e807e4454443**. A fresh fetch before delivery found no newer gameplay head or archive comments. The final PR body records the exact pushed head and remote-clone verification receipt; no self-referential commit hash is embedded in this document.

## What changed and why

- `cosmos.js` defines ground rectangles, a continuous 3.2-unit rise, solid footprints, landmark IDs, transient travel tickets, ray picking and recovery. Existing core movement/pathfinding dispatches to it, including full segment checks at route corners. A central ridge is impassable, rather than an invisible shortcut between approaches.
- `cosmos-art.js` and `cosmos-ui.js` render those definitions and use the existing paused workspace for invitation, conversations, atlas and return. Scene height is used by the player, companion, gear, labels and both camera styles. App storage identity remains the authority for travel.
- The renderer has scoped Cosmos atmosphere, no water/reflection plane in this scene, and instance flags for sky imagery and terrain variation. Sky instances cast no shadows and block neither camera nor walking picks. Existing reflections, cutaway and camera callers retain their checks.
- `cosmos_journey.cjs`, `cosmos.test.cjs` and `cosmos_browser.py` cover production traversal, source checkpoints, storage refusal, construction rollback, native reopening, both cameras, input, returning equipment and character isolation. The portable verifier and hosted browser matrix include the new journey/suite.
- The complete Earth, Heaven, Hell, Atlantis and Cosmos design intake is linked in the [vision index](../design/COMPREHENSIVE_VISION_INDEX.md). These packages are not gameplay imports. Earth remains the home anchor and the next connected-geography candidate.

## Fresh local verification

Executed from the implementation checkout with Python **3.13.15**, Node **24.18.0**, isolated Chromium profiles and loopback servers:

```text
python build.py
node --test tests/cosmos.test.cjs
node tests/cosmos_journey.cjs
python tests/cosmos_browser.py
python tools/verify.py --browser --output verification/cosmos-release
```

The Python executable for browser commands was `C:/dev/firstlight-artifacts/bootstrap-2026-09-12/browser-env/Scripts/python.exe`. The full command includes all source checks and command journeys before the browser suites. No personal save or default browser profile was used.

| Gate | Actual result |
|---|---:|
| Regenerated checked-in HTML identity | Both outputs identical, 641,642 bytes |
| Source JS syntax | 36 passed |
| Node rules | 497 passed, 0 failed, 0 skipped |
| Python helper tests | 26 passed, 1 Windows symlink skip |
| Production command journeys | 11 passed |
| Browser assertions | 776 passed across 11 suites |

The portable Cosmos interaction suite explicitly uses low quality on software WebGL, matching the existing camera suite's interaction setup. Balanced rendering is covered separately by the actual desktop screenshots/video/measurement below.

Browser breakdown: Crossing **115**, earlier gameplay/creative regression **107**, cutaway **6**, reflection **8**, native-origin persistence **11**, starter **147**, camera **51**, pursuit **145**, characters **67**, classes **45**, Cosmos **74**. Runtime browser errors: **0**. Full-run command exit: **0**. Logs are under `verification/cosmos-release`; CI uploads its independent logs/artifacts.

Build SHA-256: **64610ac470827b48c587f06875b42b475969641dedd796714165c35e5eb956c7**. Both `index.html` and `FIRSTLIGHT_VALLEY.html` contain the same bytes.

The Cosmos journey freshly consumes the current campaign-earned veteran produced by `pursuit_journey.cjs --veteran` after the starter veteran journey. It walks both full approaches through production ticks and segment validation, preserves equipment/sockets/fittings/XP/story/ownership, exercises follow/stay commands and refuses stale identities/revisions, failed writes and scene construction. In a clean checkout the source chain is regenerated. The checked-in browser veteran fixture has matching SHA **56e09068038bc92bd51d9f98a3636668005fb296743875db0359a677ae3696fd**. The separate existing bow fixture remains separately labelled.

Failures kept visible: an early corner-grazing path exposed a gap in sampled segment validation; exact union/solid segment checks replaced that path in Cosmos. A later test incorrectly equated passage of time with immutable sandbox state; the assertion now excludes only its elapsed clock while retaining ownership/history comparisons. The browser returning-bow fixture did not contain a rescued companion; it remains a bow case and the command-earned veteran supplies the separate companion case. A first hosted Ubuntu run at `b0ff2e8` passed its first nine Cosmos assertions but hit Playwright's 30-second timeout taking the balanced-quality arrival screenshot; its earlier valley steps were also slow on the hosted software renderer. The portable interaction gate was changed to explicit low quality while retaining every assertion and screenshot. Hosted rerun status is recorded in the final PR body. None of the earlier local failures remains in the full local run. No runtime behavior was weakened to satisfy a fixture assumption.

## Gameplay and desktop measurement

[Actual gameplay MP4](../evidence/cosmos/NEAR_EXPANSE_GAMEPLAY.mp4): **83.64 seconds**, 1280 × 720, 25 encoded frames/second, silent Playwright capture. All 32 scripted actions completed through real UI and normal-time walking. The clip includes the invitation, refuge, both approaches, camera swaps, inhabitants, Briar and the return. No accelerated simulation ticks, cuts, generated frames or post-added scenery. The final action verified unchanged equipment and progression. [Media receipt](../evidence/cosmos/MEDIA_RECEIPT.json) records hashes, source fixture and renderer. Video encoding rate is not a gameplay-performance claim.

A separate measurement ran after the software suites and video conversion completed. Chrome **153.0.8010.36**, NVIDIA driver **610.74**, **RTX 3080 10 GB**, ANGLE D3D11; WebGL and GPU compositing were enabled. Viewport and actual drawing buffer were **1920 × 1080**, device scale 1, balanced quality, isolated headless Chrome. Six scenes covered valley third person, Cosmos arrival, movement along the open road, observatory third person, observatory diorama and the valley after return. There were **240 normal-RAF intervals per scene**, 1,440 total, with a 1.5-second setup warmup excluded.

Across those samples, p50 was **6.9 ms**, p95 **7.0 ms**, p99 **7.1 ms**. Largest sampled interval: **7.6 ms** in the valley; no sampled interval exceeded 33.333 ms or 50 ms. [Raw measurement](../evidence/cosmos/RTX_3080_REPORT.json) includes per-scene intervals, scene setup and CDP hardware evidence. These are short browser callback measurements, not GPU render duration, monitor presentation timing, long-session stutter qualification or a human comfort result. No inferred FPS or Unreal performance claim is made.

## Save contract and limits

No migration: world/key **9**, adventure **7**, and classPath/character envelope/starter/pursuit/arsenal/cameraViews **1** are unchanged. Level curve **1–5**, stored XP **0–9999**, ownership, sockets, temper, fittings, story and consent remain. Cosmos has no durable visit or reward state. Entry saves the valley side; save/reopen/switch returns there. This boundary is stated before acceptance. Failed entry is atomic, and normal return requires no payment or combat.

This is M1 geography and safe travel. It has no Cosmos quest, Glassjaw encounter, contract, loot, faction choice, resource sink or new campaign chapter. Names and scale are provisional. The full realm catalogue, Heaven source recovery, Hell road, Atlantis swimming and Earth province connection are separate future gates. Low/reduced-motion and 720 × 740 atlas coverage passed; all possible hardware/viewports have not been tested.

Human playtesting is pending. Dom should try one fresh and one returning case: was the route and return clear; was the horizon inviting; did either camera hide the path or feel uncomfortable? The ordinary fight/equipment questions remain separate. No main merge, tag, public deployment, paid infrastructure or automatic continuation was performed.

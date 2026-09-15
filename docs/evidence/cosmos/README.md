# Near Expanse M1 evidence

All fixtures are labelled automation worlds. Personal saves are not present.

- `VETERAN_SOURCE.json` is the unchanged output of the command-earned starter veteran → pursuit veteran journey, after two finite fittings and actual practice. The full verifier regenerates it independently under evidence10; the browser gate uses this pinned copy. SHA-256: `56e09068038bc92bd51d9f98a3636668005fb296743875db0359a677ae3696fd`.
- `BROWSER_REPORT.json` records 74 production UI/input/storage/character checks. Screenshots are actual rendered Chromium frames. Browser source fixture overrides set reduced motion, and the portable interaction gate selects low rendering quality. The checked-in showcase screenshots were captured separately at balanced quality before that harness refinement; their HTML source hash is identical.
- `JOURNEY_REPORT.json` records the actual veteran rules journey and its source hash. It does not measure human pacing.
- `COSMOS_VIDEO_ACTIONS.json` drives the uncut normal-time recording with the existing video tool. `NEAR_EXPANSE_GAMEPLAY.mp4` is silent captured gameplay, 83.64 seconds. The encoding uses 25 frames/second; that is not a game FPS measurement. `MEDIA_RECEIPT.json` records provenance and conversion.
- `COSMOS_GPU_SCENES.json` supplies explicit setup for the existing measurement tool. `RTX_3080_REPORT.json` reports 240 normal browser RAF intervals in each of six scenes on the actual desktop GPU. It is separate from software WebGL CI and from the video.

Commands are in the dated M1 results. Source/build identity is SHA-256 `64610ac470827b48c587f06875b42b475969641dedd796714165c35e5eb956c7`. The final PR body and external clone receipt identify the exact pushed Git head, avoiding a recursive self-hash inside a commit.

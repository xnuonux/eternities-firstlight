# Both camera styles on the same outing

[Actual gameplay recording](camera-styles.webm), 32.84 seconds, 1280×720 VP8 at 25 recorded frames/second, silent. Captured from source commit `094047f4c43164068232b7c28bff6fd7060adfa7`; generated HTML SHA-256 `af67dcc6fb9e68cc1d5c21489d696961da2bbf0ce0f07dd8462805cc827e75ca`.

This is normal-RAF Chrome gameplay using the [existing command-earned kit](../starter-region/FRESH_KIT_EARNED.json), accepted movement/combat commands, visible quest UI and real V key presses. [The action list](recording-actions.json) records the camera setup and interactions. Both styles show the village and riverbank; the player accepts the optional quest, collects two bundles and fights the two ordinary creatures, switching views along the way. This short comparison does not complete the whole quest. The earlier full outing recording remains in [third-person evidence](../third-person/README.md).

[REPORT.json](REPORT.json) records the fixture/hash, final quest/camera state, accepted fights and renderer: Chrome `153.0.8010.36`, NVIDIA RTX 3080 via ANGLE D3D11, balanced quality. There were no unhandled browser errors. Video SHA-256: `6a07ab464208e1db7978ff9615733a9c486be0452a39a4ded3f182e5b3af36bb`. This headless desktop recording is not a frame-time benchmark or human playtest; the HUD's transient FPS number is not a performance guarantee. The existing hardware measurement retains its separate source and conditions.

Inspected frames extracted from the recording:

| Frame | Video time | Observed content |
|---|---:|---|
| [Village diorama](01-diorama.png) | 2.8 s | Orthographic village with Diorama selected |
| [Village third person](02-third-person.png) | 5.0 s | Restored closer view at Oren's workshop |
| [Riverbank third person](03-riverbank.png) | 22.0 s | Character, nearby objectives and route |
| [Third-person combat](04-combat.png) | 27.0 s | Selected Reed skitter and confirmed damage feedback |
| [Diorama combat](05-riverbank-diorama.png) | 19.0 s | Selected Riverbank skitter, attack recovery and confirmed hit |

All media is actual procedural game rendering, not concept art. Isolated origins and labelled fixtures leave personal browser saves untouched.

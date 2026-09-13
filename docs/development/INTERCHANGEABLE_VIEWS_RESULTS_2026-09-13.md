# Interchangeable camera results

Base: `117ec56c9cd8b24b1f81f43e38422d49c3db6880`, open PR #6 (`gameplay/third-person-visual-polish`). Branch: `gameplay/interchangeable-views`. Runtime/test implementation: `094047f4c43164068232b7c28bff6fd7060adfa7`. Later evidence and continuity changes do not alter runtime, tests or generated HTML. The implementation PR carries the exact pushed head and final remote-clone receipt. No main merge, tag, deployment, import-workflow activation or background automation.

## Player behavior

V swaps third person and the last chosen diorama variant. The four visible choices are 3rd person, Diorama, Tactical and Wide. R resets the current view. Each mode preserves orbit/pitch and its own distance or zoom across switching and reload. Third-person FOV stays independent and its slider is disabled in orthographic modes. Interior/viewport fitting retains the user's scene-relative zoom intent, so the home's minimum width does not change the outdoor framing on return.

Camera changes preserve selected targets, stationary attack intent, equipment, quest and creative state. Input is blocked by settings/equipment dialogs and stays in the notebook's real text field. Existing camera-relative WASD, mouse orbit, picking, collision clearance, reduced motion, labels, mobile-sized layouts and scene transitions keep their checks.

## Source and compatibility

`src/core.js` validates optional `cameraViews` version 1; `src/app.js` captures/restores camera framing and handles switching/reset; `src/rpg-ui.js` labels the styles and routes controls. New rule tests cover valid roundtrip, older saves, invalid independent profiles and unknown preference versions. Camera browser coverage grows from 36 to 51; prior-gameplay has one changed reset assertion and one added V assertion, 107 in total. Both generated HTML files are checked in identically: **535,708 bytes**, SHA-256 **`af67dcc6fb9e68cc1d5c21489d696961da2bbf0ce0f07dd8462805cc827e75ca`**.

World schema/key **9 / eternities.realm10.save.v9**, adventure **6**, starter **1** and level curve **1–5** remain unchanged. Older saves receive empty view profiles and retain their selected mode/FOV. Invalid optional profiles fall back independently. Camera clearance remains transient. No gameplay catalogue, XP, inventory, equipment, sockets, reward, companion, creative/home/crop, notebook or explicit soul-choice rules changed. Personal saves were not read or overwritten.

## Fresh local verification

`python tools/verify.py --browser --output C:/dev/firstlight-artifacts/camera-switch-2026-09-13/verification-worktree` passed at the implementation source above. It includes an identical rebuild, **27 syntax checks, 444 Node cases, 19 passing Python helpers plus one explicit Windows symlink-permission skip**, both Chapter IV blade/bow journeys, fresh starter blade/bow, and a freshly command-earned four-chapter strongest veteran journey.

| Browser suite | Passed checks |
|---|---:|
| Crossing | 115 |
| Prior gameplay / creative / exports | 107 |
| Cutaway | 6 |
| Reflections | 8 |
| Native-origin browser restart | 11 |
| Starter-region UI | 147 |
| Camera / interchangeable views | 51 |
| Total | **445** |

All seven suites exited successfully, with no unhandled browser errors. The isolated Chromium software renderer is separate from desktop GPU and human testing. Detailed command logs remain outside Git at the output path above. A compact verified receipt accompanies this evidence.

Development failures remain explicit: the four new preference tests first failed against the old validator; old V behavior failed the requested switch. Comparing raw yaw values initially treated equivalent whole turns as different, so the assertion now compares angular distance. Actual reload then exposed a startup yaw override, which was fixed. The interior check exposed the six-unit minimum and a resulting zoom-intent drift; rendering now retains the independent zoom factor and the test asserts both the minimum and exact outdoor restoration. Final runs pass without weakening input, save, combat or scene rules.

## Delivery evidence and open observations

The [32.84-second real-time recording](../evidence/interchangeable-views/README.md) shows the same route and two ordinary fights across both styles on actual RTX 3080 / D3D11 Chrome. Five extracted frames were visually inspected. No new benchmark was needed for this preference/control-only change; the previous graphics milestone's GPU sample retains its own provenance and limitations.

Fresh remote-clone verification and hosted status are recorded in the implementation PR at its exact head. The previous PR6 run `34748621244` was still queued with zero jobs assigned on 2026-09-13; it is not a passing run and was not duplicated or cancelled. Review current hosted results before integration.

Dom's visual approval and camera-choice request are recorded in PLAYTEST_NOTES. Fresh/returning route clarity, combat enjoyment, useful rewards, comfortable framing and human pacing still need his playtest. Astra's source review remains pending. Physical phones, personal/file-origin saves and Unreal performance are not qualified by these checks.

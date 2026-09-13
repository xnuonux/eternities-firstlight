# Third-person camera and geometry results

Base: `0c631de39d1fb7626c94720ae1f3e2ad1c88c170`, open PR #5. Branch: `gameplay/third-person-visual-polish`, explicitly stacked on `gameplay/starter-region-progression`. Work began in a clean separate worktree after inspecting remote/local state. The final fetch still found PR #5 at that head with no comments, and PR #4 at `aa4e21056219768b24b3f36d2f60671a6a831fb6`.

Source commits:

- `a9d557a`: initial isolated character/shore contribution, independently inspected and refined during integration.
- `0693969018c9764d3954973b3862b5b1a23aab9a`: perspective projection, inverse picking/body selection, clearance, FOV/mode preferences, articulated forms, terrain/shadows and camera-facing health indicators.
- `3b30949682eed0723bb517772a7898b4f5125c0d`: final cloak/creature shapes and nearby label decluttering after actual footage inspection.

Final HTML outputs are identical: **533,380 bytes**, SHA-256 **`7d7084fffddf9ad5a2ac657627a2545f3c75345aef27b43c9342ced0840f6bd8`**. Later evidence/continuity commits do not change runtime source or HTML. The implementation PR carries the final pushed head, fresh remote-clone receipt and hosted checks.

## Playable behavior

Adventure is a real perspective view following the character. Default vertical FOV 60 degrees is about 91.5 horizontal at 16:9; the visible setting spans 45–80. Wheel/pinch changes distance from 3.5 to 20 world units without pumping FOV. R faces the view along the character's heading; left/right drag orbits; WASD remains camera-relative. Follow, Tactical and Wide preserve orthographic framing/picking.

The camera immediately shortens before opaque scenery, then eases back after clearance. Static shapes participate by default; wind-driven foliage and low ground are excluded. Dynamic construction/mine solids opt in so actors, effects and ghost previews cannot move the camera. Bounds are deliberately conservative. Reduced motion removes camera interpolation and retains existing environmental reductions. No shake or automatic orbit.

Picking rejects points/rays behind the eye and above the horizon and supports the visible body of an enemy. Targeting, stationary attacks, range/line-of-sight, damage, quests and rewards keep their existing rules. Small camera-facing health bars replace edge-on world bars in perspective. Nearby quest labels avoid overlap and obey the label setting; the map/journal retain every objective.

Original procedural art adds connected rounded bodies, simple faces/hair, cloak/shoulder/boot silhouettes, smoother skitters, terrain mottling, shore detail and a bounded distant treeline. Object/navigation coordinates and authored palettes remain. Near scenery gets finer focused shadows. The same dependency-free WebGL2 renderer remains in use.

## Compatibility and ownership

World schema/key **9**, adventure **6**, starter **1** remain unchanged. Optional validated `cameraMode`/`cameraFov` preferences default to Adventure/60 when absent or invalid. Orbit and clearance are transient. No XP, inventory, reward, chapter, creative, building, companion or consent migration was introduced. Levels remain 1–5 and banked XP is retained. No personal save/profile was accessed.

Source owners: `engine.js` projection/picking/clearance/mesh/shading; `app.js` controls/settings/camera; `core.js` preference validation; `world.js` character/tree forms; `starter-art.js` scenery; adventure/beacon/crossing art for perspective health presentation; sandbox/adventure art for dynamic solids; RPG/adventure/starter UI for selection/indicators. Tests and portable CI add the camera gate. No model download, renderer dependency or network service.

## Verification

`python tools/verify.py --browser --output ../verification-integration` passed at the main implementation checkpoint: **27 syntax checks, 440 Node cases, 19 Windows Python helpers plus one explicit symlink-permission skip**, both Chapter IV journeys, fresh starter blade/bow and a regenerated four-chapter strongest veteran journey. Browser suites passed **115 Crossing, 106 prior-gameplay, 6 cutaway, 8 reflection, 11 native-origin, 147 starter and 34 initial camera checks**. No unhandled errors.

After the final visual refinement, the targeted camera/geometry cases passed and `tests/camera_browser.py` passed **36 checks**, including two additional label cases. The final remote-clone run and hosted checks in the implementation PR are the final integration receipt at its exact head. The complete current browser gate totals **429 checks** across seven suites when all pass.

Initial camera unit tests demonstrated four intended failures before implementation. During browser development, a supposed clear direction actually faced another building, and a paused fixture correctly refused quest entry. The tests now use an observed clear direction and resume before gameplay actions; no collision or pause rule was bypassed. A renderer review proposed opt-in for all static geometry; that would disable existing building clearance, so the deliberate static/default and dynamic/opt-in distinction was documented instead.

The first pushed head `a78b9477ee61dcc4552ee0881f0058312d51abb4` passed its entire fresh remote-clone gate, but hosted run `34748091961` exposed a camera-test timing assumption: a fixed 480 ms key hold could contain no movement frame on slow software rendering. A labelled local reproduction delaying RAF scheduling by 1000 ms observed zero movement with the old hold and 0.32 units with a condition-based hold. The test now holds a real keyboard key until at least 0.3 units of movement is observed, bounded at 30 seconds, records elapsed time/frame count, and keeps the original direction assertions. Production RAF/movement, source and footage are unchanged. The final PR receipt records the subsequent fresh-clone and hosted outcomes, without hiding the first failure.

See [actual footage, frames and provenance](../evidence/third-person/README.md). The recording uses normal RAF, accepted commands and visible UI on a command-earned fresh-kit world. Camera choices are scripted. It is an engineering playthrough, not a human pacing/comfort test.

## Desktop sample

Chrome **153.0.8010.36**, RTX **3080**, ANGLE **D3D11**, driver **32.0.16.1074**, **1920×1080**, balanced quality. Each scene recorded **900 RAF intervals** after a 1.5-second warmup. All reported p50 **6.9 ms**, p95 **7.0 ms**, p99/max **7.1 ms**, and zero intervals over 33.3 ms. This short headless interval sample is distinct from GPU rendering duration, software CI and a general FPS guarantee.

| Scene | Instances | Triangles |
|---|---:|---:|
| Village third person | 6,145 | 159,548 |
| Riverbank third person | 946 | 88,884 |
| Riverbank wide FOV / walking | 988 | 89,364 |

Human camera comfort/taste, fresh/returning enjoyment and pacing, personal saves/file-origin behavior and physical mobile devices need their own observations. Art remains procedural prototype geometry; interiors retain authored cutaway construction. No Unreal qualification, main merge, public deployment, tag or recurring automation occurred.

# Current checkpoint: third-person Adventure view

Updated 2026-09-13. Branch: `gameplay/third-person-visual-polish`, stacked against open PR #5 (`gameplay/starter-region-progression`) at `0c631de39d1fb7626c94720ae1f3e2ad1c88c170`. Camera implementation: `0693969018c9764d3954973b3862b5b1a23aab9a`; final visual refinement: `3b30949682eed0723bb517772a7898b4f5125c0d`. The implementation PR carries the exact final pushed head, fresh remote-clone receipt and hosted checks. Main remains unmerged.

Start with [current results and evidence](development/THIRD_PERSON_RESULTS_2026-09-13.md), then [NEXT_TASK](NEXT_TASK.md), [PLAYTEST_NOTES](PLAYTEST_NOTES.md) and [DECISIONS](DECISIONS.md). The [founder charter](../design/FIRSTLIGHT_REALM_CHARTER_2026-09-11.md) governs the world's direction. Earlier starter/import checkpoints remain in their dated development/provenance records and Git history.

**Play now:** run `python -m http.server 8780 --bind 127.0.0.1` from this checkout, then open `http://127.0.0.1:8780/`. This local origin is separate from the previous 8766 playtest origin. `OPEN_REALM_WINDOWS.cmd` still opens the offline file; file-origin persistence remains separately unqualified.

- **Adventure** is the default true perspective camera. R brings it behind the character; left/right drag orbits; wheel/pinch changes distance; WASD follows the camera direction. Settings exposes 45–80 degree vertical FOV, default 60 (about 91.5 horizontal at 16:9).
- Follow, Tactical and Wide remain available. Static scenery, dynamic masonry/walls and mine blocks shorten the camera arm; it eases back after clearance. Reduced motion removes camera smoothing. No shake or automatic orbit.
- Rounded articulated characters and creatures, quieter cloth forms, softened riverbank ground/rocks, shore detail and a bounded far treeline refine the coarse forms. World health indicators face the camera. Nearby quest labels avoid overlap; map/journal retain all objectives.

The ordinary outing remains playable: E at Oren's workshop for the kit, E again to accept the optional riverbank quest. The sign east of Oren enters the route. M maps it; J tracks objectives; E recovers bundles; Tab/click selects; 1 toggles stationary attacks; 3 braces. Return three supplies and drive away Old Bristle, then deliberately choose/equip a blade, bow or finite temper. [Starter results](development/STARTER_REGION_RESULTS_2026-09-12.md) retain the IDs, reward matrix and progression evidence.

**Compatibility:** world schema/key **9 / eternities.realm10.save.v9**, adventure **6**, starter **1**, levels **1–5**. Optional validated preferences `cameraMode` and `cameraFov` default safely on older saves. Orbit/clearance are transient. XP, ownership/equipment, sockets, reward history, companion, creative work, home/build/crops, notes and explicit soul choices keep their existing rules. Personal saves and browser keys were not accessed or reset.

`python tools/verify.py --browser` covers source identity, 27 syntax checks, 440 rule cases, Python helpers, five journey commands and seven browser suites. Read the actual final run in the implementation PR; counts are not proof of human comfort or taste. [Optional test setup](../tests/README.md) is portable. The final camera gate has 36 checks, including real WASD/drag, save/reload, obstruction, interiors, menus, combat and narrow viewports.

Actual footage, screenshot frames and an RTX 3080 measurement live in [docs/evidence/third-person](evidence/third-person/README.md). Dom's fresh/returning playtest and Astra's review are pending. This remains a browser prototype with procedural art; physical phones, personal saves, human pacing and Unreal performance remain unqualified.

# Third-person view and procedural geometry pass

Dom requested continued graphics refinement, a Dragon's Dogma / third-person WoW / GW2 style point of view, and consideration of wider FOV. Those are camera references; all content remains original procedural Firstlight art.

Base: `0c631de39d1fb7626c94720ae1f3e2ad1c88c170`, open draft PR #5, `gameplay/starter-region-progression`. Worktree: `third-person-2026-09-13/gameplay`; branch: `gameplay/third-person-visual-polish`. Stack review against #5 while unmerged. No merge, deploy, archive replacement, personal-save access or Unreal rewrite.

## Bounded design

- Add a real perspective **Adventure** camera as the default, with player-relative orbit, scroll distance and a 45–80 degree vertical FOV control (60 degree starting value). Preserve Follow, Tactical and Wide orthographic views. R returns to Adventure. Left/touch drag and right drag orbit; stationary click/Tab combat and camera-relative WASD remain intact.
- Keep the player in the lower center of the frame, with a useful view ahead. Pull the camera forward when static solid scenery intervenes; handle near-plane, behind-camera labels and sky clicks explicitly. Preserve map fallback, scene transitions, interiors, building and text/menu input boundaries.
- Replace block character forms with a rounded, readable adventurer silhouette. Refine vegetation, ground patches, path edges and shore silhouettes without changing navigable geography, obstacle rules or scene ownership. Keep distant scenery bounded and original. No new quest, realm, animation dependency or imported asset pipeline.
- No head bob, shake, automatic orbit or speed-dependent FOV. Reduced motion disables camera smoothing as well as existing environmental effects. Measure actual render cost separately from software CI.

## Ownership and compatibility

Parent owns engine camera/picking/collision math, mesh quality, app controls, settings, browser verification and integration. The isolated geometry assignment owns `world.js` and `starter-art.js`. Adventure/combat/quest/equipment rules remain authoritative.

World schema/key 9 and adventure 6/starter 1 remain unchanged. Optional validated presentation settings `cameraMode` and `cameraFov` are additive: absent or invalid preferences default safely, and all progression, creative work, construction, notes, inventories and explicit choices retain existing validation. Camera distance/orbit and obstruction response are transient.

## Acceptance evidence

Test actual perspective projection and inverse ground picking at multiple yaw/FOV/aspect values; reject rays above the horizon/behind the eye and labels behind the camera. Check obstruction pull-in/return, mode and FOV save/reload, camera-relative walking, right drag without movement commands, target selection/attack, indoors/building, reduced motion and narrow-screen layout. Inspect rendered before/after scenes and record actual browser footage. Run the portable verifier and existing browser regressions at integration, then verify a fresh remote clone at the final pushed revision. Report real counts, failures/skips, geometry cost and bounded desktop measurements. Human camera comfort and aesthetic approval remain Dom's call.

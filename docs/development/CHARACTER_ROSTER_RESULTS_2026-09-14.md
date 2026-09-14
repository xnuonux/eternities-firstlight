# Separate character lives: implementation evidence

Implementation branch `gameplay/character-roster`; base PR #10 at `af332a2dcc1affa35aaf0efd7cdcdd5086fc8054`. Prepared during Dom's bounded autonomous window ending 07:00 Central, 2026-09-14. The PR delivery receipt records the exact pushed head and fresh remote-clone results.

## Implemented behavior

Three complete independent local character worlds, explicit name/palette creation, safe checkpoint switching, per-character plain JSON exports, staged new-slot imports, inactive exact-name deletion, monotonic IDs, one-envelope atomic commits, native Web Lock ownership, source-byte conflict detection, and recovery export without overwriting unreadable data. No class, level, gear, or story reassignment.

`characters.js` owns the version-1 envelope and storage transaction. `characters-ui.js`/CSS project real state. App and RPG UI own switching/cleanup, while `core.js` remains the canonical complete-world validator. World9/adventure6/starter1/pursuit1/cameraViews1 are unchanged. Stored XP and explicit soul choices remain intact. Older keys stay present; managed saves use only the new character key. The envelope is bounded to three worlds and 1,500,000 JavaScript string characters, not an exact browser byte quota.

## Failures found and corrected during development

- Initial UI review caught a self-referencing slot list, incorrect derived level/equipment presentation, invented palette colors, and live-button eligibility errors before adoption. Real catalogue/stats/appearance definitions now drive the view. Rendered inspection also corrected inherited dark heading text and stale menu scroll position. Video inspection exposed a more specific shared button style masking the palette swatches; the palette controls now retain their actual cloak colors.
- A targeted failing rule case showed a legacy tab could migrate an obsolete snapshot after another tab changed the old world. Exact legacy-source comparison now refuses stale save, migration, and explicit replacement.
- Delayed real-browser file-read and export-timer cases reproduced cross-character music imports/exports. Both operations now retain the starting simulation identity; score import also checks its original revision. A character change refuses the delayed operation instead of touching the newly selected character.
- The full prior-gameplay suite found the new tracker reset reading the old pre-migration save object. The restore path now uses the canonical state produced by `Simulation` for tracker and camera defaults.
- The prior-gameplay fixture also exposed explicit legacy import being incorrectly gated on Web Locks. Legacy import/reset retain their original explicit replacement flow with source-byte checks; managed roster writes still always require a lock.
- Test-harness-only corrections: the initial expected weapon name was inaccurate; a later export assertion incorrectly demanded unchanged combat-clock/receipt metadata after actually entering a fight. Assertions now verify the intended persistent ownership/quest fields while allowing legitimate elapsed combat state.

## Fresh verification

The complete local verifier passed all nine browser suites: Crossing 115, prior gameplay/creative 107, cutaway 6, reflections 8, native-origin restart 11, starter 147, cameras 51, equipment pursuit 142, and characters 63: **650 browser assertions**, no failures. The source gate passed **31 syntax checks, 474 Node rules, 19 Python helper tests, one explicit Windows symlink-privilege skip, and nine command journeys**.

That complete run used HTML SHA-256 `895ae870b3ee340175c327d09b699b3adf6a9d6eec096c96fe2ecda2ea270921`. Rendered video inspection then produced one CSS-only palette-selector correction. The final build is **594,063 bytes**, identical in both checked-in HTML outputs, SHA-256 `0848c3402c37a534e0cc0fceba3e23637f0ef83ac7d6af769a32319b487bdfa7`. The final source gate and all **63 character browser assertions** passed again on that build. The required exact-head fresh remote clone runs the entire verifier after pushing; its result belongs in the PR delivery receipt rather than being inferred from these earlier local runs.

Commands actually run: `python tools/verify.py`; the development Python environment ran `python tools/verify.py --browser` and the final `python tests/characters_browser.py`. Local logs are under `C:/dev/firstlight-artifacts/character-roster-2026-09-14/`. Browser tests use labelled isolated storage and software WebGL, not personal saves.

The earned roster journey imports independently command-earned blade/bow run-one completion checkpoints. Both characters own and claim `riverbank-survey/1` separately, each receiving exactly 3 ore; retries do not repay. Notes, score, appearance, home decoration, and retained fresh-character state are checked through accepted commands. A command-earned strongest veteran is also imported and restored unchanged, including Dawn's edge, fittings/socket, 563 stored XP, and explicit campaign history. This is labelled an import-based earned journey, not a claim that all three campaigns were played manually inside the character UI.

## Actual footage

[Separate character lives](../evidence/characters/separate-character-lives.mp4) is **27.88 seconds** of the actual game at 1280 × 720 in Chrome **153.0.8010.36**, normal animation frames, using the detected **RTX 3080 / ANGLE D3D11** renderer. It shows deliberate creation, obtaining the original expedition kit, confirmed practice-target impacts, both cameras, and restoration of the original character's unfinished equipment outing. The initial Iris world is the labelled command-earned `run5_02_PARTIAL.json` fixture. Inputs are scripted and some setup/target selection uses accepted production commands; this is engineering evidence, not a human playtest. The recording is silent and makes no frame-rate claim. [Receipt and reproducible actions](../evidence/characters/README.md).

## Remaining acceptance and limits

Dom's fresh/returning enjoyment, camera comfort, and character-flow playtest remain pending. Astra's review of the final PR remains pending. Local prototype worlds are independent snapshots; they do not share a town or server inventory. Three slots and the memory bound are prototype choices. Managed writing needs Web Locks on the origin; unsupported browsers retain legacy play/saving and refuse character creation. Native HTTP persistence is tested separately from file-origin behavior. Delayed audio exports cancelled by a character switch can be started again from the original character's music desk. No main merge/deployment, personal-save access, or Unreal qualification occurs here.

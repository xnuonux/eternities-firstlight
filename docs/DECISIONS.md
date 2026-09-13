# Firstlight decisions

| Date | Status | Decision and reason | Source |
|---|---|---|---|
| 2026-09-11 | Accepted founder direction | Preserve Heaven's white/gold/ruby/dawn identity, Earth's ordinary living world and Hell's oppressive darkness. Cosmic/oceanic directions remain available. Detailed numeric/system recommendations remain proposals. | `design/FIRSTLIGHT_REALM_CHARTER_2026-09-11.md` |
| 2026-09-12 | Authorized bootstrap scope | Import exact Firstlight10 source into the existing private repository on a review branch. Preserve charter, newer work and saves. Separate baseline import from tooling. Push and verify a fresh clone; do not merge main or deploy. | Dom's setup request and bootstrap handoff |
| 2026-09-12 | Accepted roles | Dom: direction/taste/names/playtesting. ChatGPT: strategy/design/prototypes/review. Codex: integration/implementation/desktop verification. Handoffs name base/head commits. | Handoff section 3 |
| 2026-09-12 | Accepted priority | Starter-region questing, leveling, loot, equipment progression and combat feel come next. Preserve original tab/skill combat and optional story/choices. | Dom's request and handoff sections 4–5 |
| 2026-09-12 | Proposed, not implemented | One optional compact quest chain with reward preview, two compatible objectives, an ordinary enemy and a named variation, useful sword/bow reward and a satisfying return. Final names/layout/rewards remain proposals. | Handoff section 5; `NEXT_TASK.md` |
| 2026-09-12 | Proposed, not adopted | Evaluate a 1–10 early curve only after auditing stored XP, unlocks, economy and old level-five saves. No cap/stat change belongs in source import. | Handoff section 5 |
| 2026-09-12 | Accepted boundary | Browser remains the gameplay laboratory; Unreal is a later production-client direction. Shared Commons, the resident sanctuary and Heaven repository remain separate. | Founder direction and handoff sections 1, 6 |

Local implementation choice: `C:\dev\eternities-firstlight` is the integration checkout; original extraction/evidence stays under `C:\dev\firstlight-artifacts\bootstrap-2026-09-12`; delegated edits use separate worktrees. This is workspace configuration, not a design lock or permission to replace other work.

## Implemented starter milestone, 2026-09-12

Dom explicitly accepted Astra's PR #4 assignment from reviewed base `aa4e21056219768b24b3f36d2f60671a6a831fb6`. The [pre-implementation note](development/STARTER_REGION_TASK_2026-09-12.md) records fixed IDs, entry state, reward matrix, ownership and migration before coding.

- One nearby riverbank pocket reuses engine, navigation, combat and saves; initial kit only, original story order retained.
- Three unique bundles and one named encounter progress after visible acceptance. Normal inventory is untouched. Turn-in validates atomically and pays once, including across reload/new request IDs.
- Fixed early blade/bow or exactly one +2 temper on an explicitly selected owned weapon. Identity/socket/cadence/reach/stamina remain unchanged; no automatic equip, repeat upgrade or equipped-power scaling.
- Adventure 6/starter 1; world schema/key 9 and level 1–5 curve unchanged. Retain banked XP and old consent/reward history.
- Autoattack anticipation occupies the final 0.12 seconds before a legal strike; authoritative cooldown is not shortened. Hit feedback follows actual damage. Old Bristle locks a 1.8-radius strike for 1.25 seconds, with 1.8-second recovery; brace and movement both work.
- Click selects stationary autoattack without forcing pursuit. Reduced motion suppresses added recoil, weapon displacement and number drift. No camera shake.

Names/dialogue/art/tuning and 10–20 minute pacing remain provisional for founder playtest. Main stays unmerged; no public deployment or background automation.

## Third-person view, 2026-09-13

Dom's new request authorizes a bounded camera/graphics pass from PR #5, without waiting for another archive. `gameplay/third-person-visual-polish` remains stacked against the unmerged gameplay branch.

- Adventure uses true perspective, default 60 vertical FOV with a visible 45–80 control. Follow/Tactical/Wide remain orthographic. R resets behind the character. These numeric/art choices are Codex implementation choices for founder playtest.
- The same WebGL2 renderer, scene geometry ownership, combat and save authority remain. Rounded original procedural forms serve the closer view; no downloaded model pipeline or new playable region was introduced.
- Static opaque geometry blocks the camera by default, with explicit opt-out; dynamic construction and mine blocks opt in. Animated foliage cuts away. Conservative bounds may shorten the view earlier than an exact mesh intersection.
- Camera preferences are optional presentation data on world schema/key9; no adventure/quest/XP/ownership migration. Reduced motion disables camera smoothing. No camera shake, automatic orbit or speed-dependent FOV.
- Media and GPU evidence must identify the rendered source hash, fixture, automation method and hardware. Human camera comfort and the earlier fresh/returning outing questions stay pending.

## Interchangeable styles, 2026-09-13

Dom explicitly wants both 2.5D diorama and third-person views available in this prototype. `gameplay/interchangeable-views` continues from PR #6 at `117ec56c9cd8b24b1f81f43e38422d49c3db6880`.

- V swaps third person and the last selected overhead variant; visible controls expose all four modes. R resets the current mode, replacing the prior always-third-person reset behavior. Menus and text input consume camera shortcuts.
- Each mode stores bounded orbit/pitch and distance or scene-relative zoom in optional `cameraViews` version 1. Rendering fits interior/viewport limits without changing the stored zoom intent. Unknown or invalid profiles safely fall back independently; save schemas and browser keys remain unchanged.
- Third-person FOV and diorama zoom remain distinct controls. Switching preserves combat intent and progression, and does not follow a new movement path or reset the quest.
- The user's visual approval authorizes this continuation. Fresh/returning enjoyment, comfortable framing and pacing still require human observations.

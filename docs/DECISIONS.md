# Decisions added 2026-09-15

- **Complete source intake, bounded implementation.** Dom requested the new Astra visions and confirmed the comprehensive realm collection. Full Earth, Heaven, Hell, Atlantis and Cosmos packages plus the expanded library were retrieved. Published hashes and reading/implementation boundaries are in the vision index. Archive text remains evidence; current user authorization and verified gameplay state govern changes.
- **Cosmos M1 first, Earth stays home.** The optional Near Expanse proves one connected ground scene, two routes, inhabited landmarks, a gentle rise and reversible travel. No M2 combat, reward, durable visit or campaign fact is inferred. The next shared spatial application is Earth E0/E1, subject to observed play and current source.
- **No migration without a durable need.** M1 uses existing transient-scene serialization. Before entry, save the source checkpoint and bind its preview to simulation, character, revision, position and destination. Reopen/switch resumes on the valley side. This choice is visible in the invitation. All existing save versions and XP stay unchanged.
- **Geometry and camera agree.** Cosmos ground and solids are rule definitions consumed by navigation and inverse picking. Manual movement checks complete segments at route corners. Remote sky images opt out of camera collision, shadow casting and surface targets; world-space stars stay fixed while orbiting. Terrain variation is presentation only. Existing scene consumers retain their defaults.
- **Separate future realms and unanswered economics.** Earth, Heaven, Hell, Atlantis and Cosmos may share proven technical primitives, never accidental quest/reward IDs, personal history or automatic progression. Paid power, offline loss, rare pets, construction scale, native engine and multiplayer decisions remain open. No protected resident/sanctuary source is imported.

---

# Firstlight decisions

## 2026-09-14: connect the implemented loop before adding another system

The final refinement in the timed window connects Oren, explicit class choice, real practice walking, equipment comparison and return guidance. Class names and rewards stay canonical; no new progression state or payout is introduced. Both camera styles remain first-class choices.

A read-only integration review exposed a delayed character-file preview crossing an active-character switch. A production-browser regression reproduced it. File completion now requires the original simulation/identity/revision and the latest selection token; superseded reads cannot clear a newer request. This extends the existing asynchronous-operation ownership rule to world imports without changing their explicit confirmation, storage locking or atomic write contract.

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

## An Upgrade Worth Hunting, 2026-09-14

Dom accepted the PR #9 Draft D assignment and requested implementation. The three requested archive files were read at `4f225b2ddce3a1fedafb3b97c92d6e58d8f7e952`; the actual gameplay base remains PR #7 at `932db44ebfd85bf52e8e165d899c7db48dec5ebd`. Archives were not overlaid onto gameplay. The [task note](development/UPGRADE_HUNT_TASK_2026-09-14.md) records the reward matrix, IDs, ownership and migration before implementation.

- One equipment project is pinnable; catalogue sources, costs and comparisons come from actual equipment and crafting rules. Existing owned story weapons may be fitted. Their once-only sources remain clearly labelled.
- The initial kit unlocks an explicitly accepted riverbank materials survey. Two identified skitters and two samples share the existing scene. Fixed reward: 3 ore, 4 sunmarks, 2 fibre, 0 XP. Oren's original supply objectives and rewards stay separate and resume after survey claim.
- Run identity `riverbank-survey/N`, terms version 1, exact observed prior claim number on acceptance, one outstanding run, and a contiguous paid sequence make repeats intentional while old claims cannot pay again. Completion and all three capacities are validated before mutation. No payout from individual survey enemies. Complete-but-unclaimed runs remain valid saved entitlements.
- Two fittings per owned weapon: step I costs 3 ore/4 sunmarks/2 fibre for +2 attack; step II costs 6/8/4 for another +2. This finite rule preserves weapon identity, socket and the existing separate Oren temper. Cadence, range, stamina, defense and health remain unchanged. No enemy scaling and no auto-equip.
- Optional `adventure.pursuit` version 1 is additive to adventure 6. Valid older saves receive an empty pursuit; malformed present records are rejected. World/key 9, starter 1, cameraViews 1, stored XP and the 1–5 curve remain unchanged. Personal saves were not needed for this work.
- Names, repetition, costs and pacing are prototype implementation choices for founder playtest. Two fittings are not a universal or endless upgrade economy. All actions are local, and the original game systems remain authoritative.

Roster/classes, rare collecting and real two-client play/trading are separate later milestones. Paid power, offline-loss severity, rare-pet allocation and construction scale remain unresolved founder decisions. No Unreal rewrite, live Luna, extracted proprietary assets, cash store, main merge or deployment was included.

## Independent local characters, 2026-09-14

Dom's timed autonomous request authorizes continued implementation through 07:00 Central. Draft D places independent roster/explicit classes after the equipment loop; this branch implements the roster as a bounded coherent milestone, leaving classes unassigned. Each of three slots owns an entire local world; there is no shared town/inventory fiction. New characters start empty. Three slots are a revisable prototype choice.

One version-1 character envelope atomically commits outgoing state and active selection. Existing world9/key9/adventure6/pursuit1/XP/story rules stay authoritative. The legacy key is retained, new IDs are monotonic, imports add rather than replace, and only an inactive exact-name-confirmed character can be removed. Browser Web Locks coordinate managed writes; exact source comparisons reject stale views. Corrupt/failed storage stays untouched and can be copied for repair. A source-byte check also protects legacy migration from an older open tab.

Async music imports/exports belong to the simulation that started them. Switching cancels a pending operation rather than transferring it to another character. Inactive worlds do not advance. Classes, paid power, offline-loss severity, rare-pet allocation, and construction scale remain unsettled or separate. No automatic main merge or public deployment.

## 2026-09-14: optional traditional class experiment

Following independent character lives, Dom's bounded autonomous direction covers one optional Hunter/Magician choice and one real technique each. Choice is explicit at Oren after the kit, once per character in this prototype; existing characters remain unassigned. Blade/bow, profession, companion, morality and soul history remain independent. Hunter marks the next actual weapon impact, not an input, and Magician resolves a visible targeted spell through authoritative damage. Exact provisional costs, cooldowns, ranges and damage are in the task note and UI. These choices do not establish a class tree, a final respec policy or founder-approved branding.

Adventure schema7 intentionally protects identity from older schema6 writers that would discard an unknown additive field. Migration preserves canonical data and stored XP, adding unassigned classPathv1 only. The character's cooldown is durable; the mark is tied to the transient enemy object/scene/run and expires without carrying across reload or character switch. The current save key is updated normally on saving; managed-library legacy recovery keys remain present. No new economic payout or equipment grant accompanies class choice.

## 2026-09-20: connect useful work to the Earth approach

Fetched newer PR #16 at 67b4eeb before editing. Its Hearthwater geography is the base; the older continuity documents were stale. Connect the orchard to the existing riverbank through a disclosed scene boundary, keeping both local coordinate spaces unscaled. A larger province transform/streaming framework is unnecessary for this link.

The initial kit gates the combat worksite. Accept work and claim rewards at Oren. Earth carries only a temporary orchard return nested under the saved valley checkpoint. Browser crossings bind identity/revision/source/destination, save first and roll back construction failures. The original workshop route retains its exit. Reload, character switching and death clear the temporary route while keeping earned objectives. No new durable schema, reward, class, enemy or XP rule.

Visual inspection caught scenery overlapping the footbridge, a raised watercourse surface and Cosmos labels leaking into foreign scenes. These presentation fixes are included with regression coverage for scene labels and scenery clearance. Human enjoyment remains unmeasured. Road After Rain E2 stays separate.

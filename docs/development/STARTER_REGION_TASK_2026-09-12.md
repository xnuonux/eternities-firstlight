# Starter-region outing implementation plan

> For agentic workers: use dispatching-parallel-agents for independent files; keep shared rule integration with the primary owner. Track the steps below.

Goal: one optional Oren outing with three supplies, a named river beast, useful deliberate equipment rewards, and readable combat.

Reference: Dom's implementation request and [Astra's PR #4 comment](https://github.com/xnuonux/eternities-firstlight/pull/4#issuecomment-5649865206), plus NEXT_TASK.md. Base: `aa4e21056219768b24b3f36d2f60671a6a831fb6`. Branch: `gameplay/starter-region-progression`; review will stack against the still-unmerged import branch. Names and balance are working proposals for human playtest.

Architecture: a small `starter.js` definition/state/command module beside existing adventure rules. One adjacent `riverbank` scene reuses the current engine, movement, targeting, skills, companion and loot. Dedicated presentation modules project accepted state; no UI grants progress. Python assembles the same offline browser application.

## Contract decided before implementation

- Entry requires the initial kit (`adventure.started`) only. Oren remains at the workshop service point `(11,9)`; the nearby route sign is `(15,7)`, verified walkable and reachable on the existing Commons. No existing building or resident path is relocated. Construction blocking is checked by ordinary navigation.
- Quest ID `oren_riverbank_supplies`; bundles `river-rope`, `river-tools`, `river-canvas`; enemies `river-skitter-west`, `river-skitter-east`, `river-old-bristle`. No shared campaign encounter identities. Before explicit acceptance the bundles cannot be collected and quest enemies are inactive, preventing pre-clear/backfill ambiguity.
- Scene entry `(0,12)`, practice target `(-5,10)`, bundles `(-7,3)`, `(5,-3)`, `(-5,-11)`, ordinary beasts `(-7,0)` and `(5,-6)`, named beast `(-4,-15)`. A bounded shore to the east, trees and rocks have common rule/art definitions. All objective and encounter routes must pass actual collision checks.
- Two ordinary skitters: 32 HP, 8 damage, 8 XP, one copper and two sunmarks each. Old Bristle: 90 HP, 18 damage, 20 XP, one copper and four sunmarks. Fixed stats, no equipped-power scaling. Named strike locks its aim, warns for 1.25 seconds and recovers for 1.8 seconds; guard halves the hit and moving out of the marked area avoids it.
- Three bundles are dedicated quest flags, not inventory materials. Either objective order is allowed. Return to Oren with all bundles and the named defeat; explicitly choose one reward. Turn-in grants 25 XP and six sunmarks, after all capacity/prerequisite checks. No automatic equipment change. One permanent stack of recovered supplies appears at Oren's workshop.
- Fixed rewards: `oren_sunblade` (+16 weapon attack) or `oren_reedbow` (+13). Alternative `temper`: choose one currently owned weapon for one permanent +2 attack. One reward overall, one selected weapon, no repeat applications or scaling. Its item ID, style, socket, cadence, stamina and reach remain intact. The temper applies immediately to the explicitly selected item; if already equipped, confirmation explains this. New items require deliberate equip.
- Keep levels 1–5 and every stored XP value unchanged on migration. World schema/key remains 9. Adventure becomes 6; adventure 5 migrates to a fresh version-1 `starter` record. The record holds accepted flag, unique bundle IDs and a nullable `{choice, weapon}` reward. Temper derives from that single claimed reward, avoiding an independent upgrade inventory/economy. Validate it before HP/stat validation; supported adventure 1–4 still chain through migration.
- Save all existing creative, campaign, companion, equipment/socket and soul state. Safe exterior reload behavior remains. Quest progress persists at acceptance, partial bundles, completed objectives, claimed reward and equip. Old browser keys and personal saves remain untouched.

## Reward matrix

Measured base catalogue through Node's actual exported rules; figures below compare at the same XP/equipment, without a gem. Fresh-kit totals use level 1 and travel coat. Existing earned Chapter IV checkpoints are additionally checked during journeys.

| Case | Before weapon / total attack | Offered weapon / total attack | Cadence / reach / stamina | Guard / HP / socket |
|---|---|---|---|---|
| Fresh blade | Trail blade 12 / 16 | Oren sunblade 16 / 20 | 0.52 s / 2.65 / 0 | 1 / 100 / one removable gem socket |
| Fresh bow | Trail bow 9 / 13 | Oren reedbow 13 / 17 | 0.75 s / 11 / 6 | 1 / 100 / one removable gem socket |
| Strongest chapter blade at level 5 | Dawn edge + keeper coat + chime clasp / 42 | Same weapon tempered / 44 | 0.52 s / 2.65 / 0 | 13 / 200 / existing socket retained |
| Strongest chapter bow at level 5 | Copper bow + keeper coat + chime clasp / 34 | Same weapon tempered / 36 | 0.75 s / 11 / 6 | 13 / 200 / existing socket retained |

Copper blade remains 19 attack, copper bow 17 and Dawn edge 25. The fixed early rewards do not displace those. Existing sockets add their own unchanged effects; moving a socket requires the existing explicit command. A newly owned weapon arrives unsocketed. No reward is advertised as strictly better when the full comparison says otherwise.

## Ownership and execution

- [x] Primary: add failing `tests/starter.test.cjs` cases through Simulation commands for eligibility, collision, objective IDs/order, atomic reward refusal/retry, duplicate/reload, migration/XP bounds, both weapon kinds, one temper and socket retention. Observe missing-feature failures before implementation.
- [x] Primary: implement `src/starter.js`; integrate adventure fresh/validation/stats/roster/commands/tick, arsenal canonical classification/projectile ground, core navigation and build/shell assembly. Re-run targeted rules, then existing source gates after integration.
- [x] Presentation owner: `starter-art.js`, `starter-ui.js`, `starter.css` plus agreed renderer/workspace hooks. Show exact comparisons at acceptance, map/journal route, bundles/tell/recovery, persistent worksite and real equipment colors. Primary reviews all production callers.
- [x] Combat: preserve stationary targeting and actual hit resolution. Add readable facing and autoattack anticipation/recovery, restrained confirmed hit response, and distinct weapon material. Missed/blocked projectiles produce no successful-hit feedback. Reduced motion suppresses prominent displacement; no compulsory camera shake.
- [x] Journeys: add accepted-command fresh blade/bow runs plus an earned Chapter IV veteran reward run. Browser test actual visible acceptance, map, pickup, combat, claim/equip, menus and save phases; extend the portable verifier and read-only CI with the new gates.
- [x] Evidence: capture actual gameplay, not concept art. Run a separate labelled hardware-accelerated measurement if available and report renderer, driver, resolution, quality, scenes, frame-time distribution and stutter. Keep software CI separate.
- [x] Delivery: independent diff review, regenerated identical HTML outputs, default/full browser gates, pushed stacked PR, final fresh clone and exact base/head. Update continuity records and give Dom fresh/veteran playtest instructions. No merge, deployment, release tag, force push or old import workflow activation.

Human questions remain: did you know where to go, did fights feel better, and did the reward make you want another outing? Automated passes do not settle pacing/enjoyment or prove a 10–20 minute session.

Execution checkpoint: implemented and independently reviewed; concrete results and actual footage are in STARTER_REGION_RESULTS_2026-09-12.md. The implementation PR receipt carries final-head remote-clone and hosted readback. Human playtest remains pending, as stated above.

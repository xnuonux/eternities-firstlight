# An Upgrade Worth Hunting: implementation and verification

Implemented 2026-09-14 on `gameplay/upgrade-worth-hunting`, stacked against `gameplay/interchangeable-views` (open PR #7) at **932db44ebfd85bf52e8e165d899c7db48dec5ebd**. Runtime implementation commit: **c3292c5943b581751ce1b753fd4040b4d096b551**. The implementation PR names its exact pushed head, clean-clone receipt and current hosted status. Main was not merged or deployed. Concurrent gameplay and the two design archives were inspected before branching; neither archive replaced runtime source.

## Delivered behavior

The field guide is a real projection of the weapon catalogue and existing recipes, with one persisted pin, material ownership/costs, prerequisites, route actions and equipped/selected/after comparisons. It links component crafting and gathering to the actual existing systems. Story-only gear is labelled honestly. A returning stronger character can improve an owned weapon rather than being offered compulsory weaker loot.

An explicitly accepted **Riverbank materials survey** reuses the local riverbank. Two identified skitters and two material samples pay **3 copper ore, 4 sunmarks and 2 meadow fibre**, once per completed run, on return to Oren. There is **no XP**, no individual enemy cache and no main-campaign requirement beyond the initial kit. The route, threats, fixed reward and reload behavior are disclosed before acceptance. Existing Oren supplies and once-only rewards keep their separate state; their scene resumes after the survey claim.

Every owned weapon can receive **River fitting I** (+2 attack for 3 ore/4 sunmarks/2 fibre), then **River fitting II** (another +2 for 6/8/4). Three surveys fund the two fittings from zero. A base craft may require additional materials, and the guide displays those real costs. Both stages add distinct copper/pale-metal bands to the equipped world model and preview. They retain identity, sockets and the separate Oren temper. Nothing auto-equips. Cadence, reach, stamina, health and defense stay unchanged.

The new rules live in `src/pursuit.js`, guide in `src/pursuit-ui.js`/CSS. Existing adventure command, save, roster, damage and stat consumers remain authoritative. Starter owns riverbank navigation/interactions/art; arsenal remains weapon authority. Shared forge costs are exported from their existing rule and consumed by the guide. Build includes the two new modules and regenerates both checked-in HTML files. The current verifier and portable CI include the new journeys/browser suite.

## Actual reward and journey matrix

[Pre-implementation matrix](UPGRADE_HUNT_TASK_2026-09-14.md) records the fixed design before coding. [Earned journey summaries](../evidence/upgrade-hunt/EARNED_JOURNEYS.json) retain command counts, provenance, costs and results. Damage below is confirmed against the practice target, using the fixture's current loadout with no new gem effect.

| Command-earned case | Runs | Commands | Before → final damage | Final cadence / reach / stamina per strike | Stored XP |
|---|---:|---:|---:|---|---:|
| Fresh kit blade → copper blade, two fittings | 5 | 88 | 16 → 27 | 0.52s / 2.65 / 0 | 0, unchanged |
| Fresh crafted trail bow → copper bow, two fittings | 5 | 113 | 13 → 25 | 0.75s / 11 / 6 | 0, unchanged |
| Strongest Chapter IV equipment, prior Oren temper → two Dawn's edge fittings | 3 | 58 | 44 → 48 | 0.52s / 2.65 / 0 | 563, unchanged |

The unfitted copper blade is 23 attack; its two steps are 25 and 27. Copper bow is 21, then 23 and 25. Fitting the initial blade directly instead gives 16→18→20; the fresh browser case proves that route through three visible surveys. The returning fixture retains 13 guard and 200 maximum health, all four chapters, companion, owned/equipped gear and prior Oren reward. A stronger equipped weapon is explicitly compared with weaker catalogue choices.

Fresh blade earns 15 ore/20 sunmarks/10 fibre from surveys; base craft plus fittings spend 13/16/6, leaving 2/4/4. Fresh bow uses legitimate timber/fibre/stone gathering and plank crafting; final balances after its recipes and fittings are 2 ore/2 sunmarks/6 fibre. The veteran earns and spends exactly 9 ore/12 sunmarks/6 fibre, with no net loss of prior balances. Each journey validates all recorded balance deltas and checks retry/reload claims. No position edits, inventory grants or planted defeats are used. Accelerated simulation is labelled and is not human pacing.

## Save and event contract

World schema/key remains **9 / eternities.realm10.save.v9**, adventure **6**, starter **1**, optional cameraViews **1**, level curve **1–5**. New optional `adventure.pursuit` version **1** contains a pin, integer contiguous paid-run sequence, one active run and per-weapon fitting steps. Older valid saves gain only an empty pursuit. Present malformed pursuit data is rejected rather than silently discarded. Tests preserve 0/29/30/79/80/149/150/259/260/9999 XP boundaries and old state. Existing valid adventure-5 migration still initializes the original starter extension before this additive record.

`riverbank-survey/N` identifies one accepted outing. Acceptance requires the observed prior paid-run counter. Claim requires that exact active run, both enemies and samples, Oren proximity and space for every reward. The contiguous counter means all earlier runs are paid; changed request IDs or an evicted generic receipt cannot duplicate them. An objectives-complete, unclaimed run is valid and retryable. Fitting requires the exact next step, owned weapon, workbench and every cost before mutation; each step stays once-only even after the generic request cache expires.

Each sample is recorded once without consuming ordinary inventory. Only actual authoritative enemy defeat adds an active-run objective, and no legacy XP/drop path runs for those encounters. Reload resumes objective flags while undefeated enemy health/positions remain transient. Saves keep their established safe outdoor checkpoint instead of persisting live combat-room coordinates. Personal browser profiles, notes or save files were not used or modified for verification.

## Fresh verification

Executed **`python tools/verify.py --browser`**, including the complete default verifier, against the final runtime/build in the integration worktree. Python **3.13.15**, Node **24.18.0**, Windows; Playwright Chromium with software WebGL and isolated storage. Both regenerated checked-in HTML outputs are identical: **564,819 bytes**, SHA-256 **d5d48c55290cf3e6a5d8fa7f5df135818d38cf97af68f7e7d35b0c72802b2e69**.

| Gate | Actual result |
|---|---|
| Source syntax | 29 passed |
| Node rules | 462 passed, 0 failed, 0 skipped |
| Python helpers | 19 passed, 0 failed, 1 explicit Windows symlink-privilege skip |
| Command journeys | 8 commands passed: Crossing blade/bow, starter blade/bow/veteran, pursuit blade/bow/veteran |
| Crossing browser | 115 passed |
| Prior campaign/creative/export browser | 107 passed |
| Cutaway / reflection | 6 / 8 passed |
| Native-origin browser restart | 11 passed |
| Original starter browser | 147 passed |
| Camera browser | 51 passed |
| New pursuit browser | 142 passed |
| Browser total | **587 passed**, 0 failed; no unhandled browser errors |

[Local receipt](../evidence/upgrade-hunt/LOCAL_VERIFICATION.json) and [new browser report](../evidence/upgrade-hunt/PURSUIT_BROWSER_REPORT.json) retain counts and source identity. The eight browser gates cover the existing campaign, music exports, housing/construction, companion, explicit soul choices, map, rendering, native persistence, both cameras and the new pursuit. New tests cover actual visible guide actions, partial and completed reload, repeated claims, explicit craft/fit/equip, blade and projectile practice damage, veteran comparisons and a 390px viewport. Capacity cases are explicitly synthetic, derived from completed earned runs, and separately check ore, sunmarks and fibre atomic refusal.

Development failures were kept distinct from this passing run: initial new rules exposed missing command dispatch; browser checks exposed the unwired project tracker/sample E action; these production integrations were fixed. Journey-driver assumptions about practice position, bow equip and planks were corrected to use legitimate paths and recipes. A map test initially counted both the SVG marker and the route button; its selector now checks the actual route list. The first recording script used an invalid practice ID; the final recording uses actual Tab selection. No failed test was waived, no existing gate removed, and no user save was substituted. A one-off log-summary parser failure did not affect verifier results.

The CI matrix has two source platforms and eight independent browser suites, retaining pinned actions and the dormant original import workflow. The implementation PR records **fresh remote clone verification at the exact final pushed head**, separate from this local receipt, and current hosted status. A green earlier PR run is not claimed as new-branch evidence.

## Footage, launch and acceptance limits

[Actual 46-second gameplay recording and provenance](../evidence/upgrade-hunt/README.md) show the earned fifth survey finishing, return and material claim, copper blade craft, both fittings, deliberate equip, both camera styles and confirmed 27-damage practice hits. Normal real-time Chrome 153.0.8010.36 on ANGLE/NVIDIA RTX 3080 Direct3D11 at 1280×720. The silent capture retains original pacing; it is neither a frame-time benchmark nor human playtest evidence.

Launch from this checkout with `python -m http.server 8780 --bind 127.0.0.1`, then open `http://127.0.0.1:8780/`. E at Oren gets the kit; Character → Field guide exposes the new loop. V swaps cameras. Preserve an existing character's origin; use another profile/origin for synthetic/fresh tests. See [CURRENT_STATE](../CURRENT_STATE.md) for the full play route.

The observable equipment loop is delivered; **Dom's fresh and returning playtests and Astra's targeted review remain pending**. Same-route repetition, the five-survey fresh craft path, relative blade/bow feel and whether +4 motivates another outing need human judgment. One compact survey and two fitting steps are finite prototype content, not an endgame. Classes/roster, rare collecting, real two-client play/trading and construction scale are not implemented here. Paid power, offline loss and rare-pet allocation remain unresolved. No new level cap, automatic class choice, Unreal rewrite, live Luna, public deployment or main merge occurred.

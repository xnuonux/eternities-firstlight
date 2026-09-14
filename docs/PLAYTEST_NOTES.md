# Firstlight playtest notes

## Founder report carried by the 2026-09-12 handoff

Source: [Codex bootstrap handoff, sections 4–5](development/CODEX_BOOTSTRAP_2026-09-12.md). These are paraphrased observations carried from Dom through ChatGPT, not a new Codex-observed play session or verbatim transcript.

- Dom completed the mine/road progression, beacon defense and Rowan's bell-restoration quest, then returned to the original village.
- He noticed the improved equipment interface, mappings and navigation.
- The fights work but are not thrilling.
- Briar's scent discovery was especially memorable. Earlier camera/menu/workbench friction was not.
- His desired experience recalls a familiar starter settlement, short increasingly broad outings, named local threats, leveling, useful loot and eagerly replacing weak equipment.

## Engineering interpretation

Build attachment and capability through useful local quests, rewards and returns. Combat feel needs readable targeting/autoattack/skill input and responsive reactions, while ordinary enemies can stay simple. Stronger boss mechanics alone will not produce the requested progression loop. Names, layouts, enemies, art and quest text must remain original.

## Next human playtest

After the bounded starter chain is implemented, ask a fresh and returning character to identify the goal/reward, complete the two compatible objectives, return, equip an upgrade and explain what changed. Try sword and bow. Record confusion, time spent finding targets/services, perceived impact, ordinary-fight enjoyment and whether the next outing feels desirable. Keep player observations separate from proposed fixes.

No new human playtest, RTX 3080 frame-rate benchmark or physical-device qualification occurred during repository bootstrap. Automated journeys/browser assertions are engineering evidence, recorded separately.

## Starter implementation evidence, 2026-09-12

No new Dom playtest has occurred. Fresh blade and command-crafted bow complete Oren's outing through accepted rules and visible UI. A newly earned four-chapter Dawn's edge + keeper coat + chime clasp loadout receives the finite 42→44 temper. These automated tactics do not establish enjoyment.

Use a separate test profile/origin and the labelled fixtures in CURRENT_STATE. Complete the two goals, return, deliberately choose/equip, then hit the practice bundle. For the returning case choose a temper on the existing weapon. Enemies do not scale to equipped power.

| Case | Did you know where to go? | Did fights feel better? | Did the reward make you want another outing? |
|---|---|---|---|
| Fresh kit | Pending Dom | Pending Dom | Pending Dom |
| Returning campaign | Pending Dom | Pending Dom | Pending Dom |

Real-time automated footage and the separate hardware report are linked from the implementation results. Software CI, GPU measurements, human enjoyment and personal saves remain different claims.

## Third-person direction, 2026-09-13

Dom requested continued graphics refinement, a third-person view recalling Dragon's Dogma / WoW / GW2, and consideration of wider FOV. This is a design request, not a reported playtest result. Codex implemented Adventure perspective and procedural shape/terrain refinements on a separate stacked branch.

Automated real input covers camera-relative walking, right-drag orbit, wheel distance, FOV persistence, house transitions, physical scenery clearance, body selection and combat, modal input, nearby labels and a 390×844 viewport. A new real-time Chrome recording completes the existing outing. These do not answer the pending human questions above. Record Dom's comfortable distance/FOV and any camera pull-in, unreadable shape or lost objective when he plays.

## Founder response and camera choice

Dom's direct response: "looks great, honestly, continue development". He then explicitly said he likes both the 2.5D diorama and third-person camera styles and wants them interchangeable for this prototype. Preserve both as first-class player choices. This confirms the visual direction; he has not yet supplied the fresh/returning route, combat, reward or pacing observations requested above.

## Equipment pursuit implementation, 2026-09-14

Dom explicitly accepted Astra's Draft D implementation prompt. No new human playtest result was supplied. The field guide, repeat materials survey and two finite fittings are now playable; [results](development/UPGRADE_HUNT_RESULTS_2026-09-14.md) separate automated evidence from founder acceptance.

Command-earned cases show fresh blade 16→27, fresh bow 13→25, and returning tempered Dawn's edge 44→48 confirmed practice damage. These comparisons include base crafting for the fresh cases and preserve other loadout effects. Surveys pay no XP and do not advance chapters. Browser tests use accelerated setup; the separately recorded clip uses normal real-time RAF on an isolated origin. Neither proves enjoyable repetition or a completion-time target.

| Case | Clear equipment goal and material route? | Fights and upgrade felt good? | Wanted another outing? |
|---|---|---|---|
| Fresh kit, blade or bow | Pending Dom | Pending Dom | Pending Dom |
| Returning strongest equipment | Pending Dom | Pending Dom | Pending Dom |

Watch whether five visits for a newly crafted, twice-fitted copper weapon feels excessive, whether one pinned project is legible, and whether returning through the same geography becomes dull. The prototype offers two fitting steps per owned weapon; it does not claim a finished endgame or long-term reward economy. Existing camera taste approval remains valid and distinct from these unanswered questions.

## Separate character lives, 2026-09-14

Dom is away during the timed development window. No new human playtest has occurred. Engineering checks exercise actual character creation/switching/import/export/deletion, isolated native storage, combat cleanup, per-character camera/music, delayed-file ownership, and failure refusal. These are not enjoyment or pacing observations.

Pending human check: keep the original character, create a fresh one, play an equipment outing, then return. Did the correct world, project, loadout, home, music, and view come back? Was it clear that deleting an inactive character removes that complete local world? The earlier fresh/returning reward questions remain unanswered.

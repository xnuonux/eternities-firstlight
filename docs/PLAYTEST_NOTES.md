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

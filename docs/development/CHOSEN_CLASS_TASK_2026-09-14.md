# Optional chosen-class experiment

Bounded continuation on 2026-09-14, from PR #11 `93cf94ec2327d700007534e458293aff408acf07`, branch `gameplay/chosen-class-experiment`. Dom authorized development until 07:00 Central. Draft D asks for independently chosen traditional classes following independent character lives. This is one playable technique per class, not a class tree, equipment restriction or morality system.

## Explicit design checkpoint

After the original expedition kit, a character may visit Oren and explicitly choose Hunter or Magician from a preview and confirmation. The choice is once per character in this prototype; the UI says so before confirmation. Existing and migrated characters remain unassigned. Choosing grants no equipment, materials, XP, profession, companion or soul history. Both blade and bow remain usable by either class. Original skills retain their keys; **X** invokes the chosen technique through one additional compact button.

- `hunter` / `quarry-mark`: 15 stamina, 8-second cooldown, selected visible target within 11 paces. Marks that encounter for 8 seconds. The next confirmed player weapon impact against it adds 50% of that impact's damage, rounded, capped at 24 extra. A miss, wall, different target, companion strike, soul technique or spell does not consume the mark. No damage is awarded merely for marking.
- `magician` / `arcane-flare`: 25 stamina, 10-second cooldown, selected visible target within 8 paces. Immediate targeted spell, damage `round(8 + current attack * 0.75)` through the authoritative damage path; it is not a travelling arrow. Original violet cast/impact geometry and confirmed-hit feedback distinguish it. The riverbank practice bundle supports both techniques; the separate timed archery medal court excludes class techniques.

These numeric choices are provisional measured prototype balance. At the initial blade's 16 attack, Hunter adds 8 to a confirmed 16 hit; Magician deals 20. At a fresh bow's 13 attack, Hunter adds 7 to a confirmed 13 hit; Magician deals 18. Strong equipment remains stronger; no enemy scaling is added. Return to the ordinary repeat survey to try either rhythm without advancing the campaign.

## Source ownership and migration

`classes.js` owns definitions, validation, command prerequisites, cooldown and transient mark. Adventure moves intentionally from schema 6 to **7** with nested `classPath` v1 `{version:1,choice:null|hunter|magician,readyAt:0}`. Migration copies existing state and preserves stored XP, rewards, sockets, fittings and explicit soul choices. Old versions reject the newer adventure instead of silently stripping identity. World/key9 and character-envelope1 stay unchanged, old keys remain present. The local library validates every world on migration, preserving each character independently. Character class cooldown uses adventure elapsed time and survives reload; the temporary encounter mark clears on scene/run/reload and cannot cross characters.

`adventure.js` dispatches class commands and labels actual weapon damage. `arsenal.js` labels confirmed arrow collision damage. `adventure-art.js` presents actual class state and effects. `classes-ui.js`/CSS plus `rpg-ui.js` display choice, exact technique data, confirmation and action/status. UI/art never award damage. Existing controls, menus, companion, creative exports, cameras and save writers retain their ownership.

## Acceptance

Rules first: version6 migration at all XP boundaries; invalid choice and repeated/new-ID choice refusal; no grant/history/equipment changes; missing target, wall, range, stamina, cooldown and practice-court refusal; actual blade and swept-arrow mark hits, miss/other-source/other-target exclusion, expiry, scene/run switch; magician actual confirmed damage; stored cooldown and independent character restoration. Add an accepted-command local outing for both choices using separately earned blade/bow worlds, with honest fixture provenance. Visible UI must explain choice before confirmation and survive reload; X must never escape text/menu focus. Regenerate identical HTML, run the portable verifier and existing browser suites, record actual gameplay, push a separate stacked draft PR and verify its exact remote clone. Stop new feature work in time for final checks before 07:00; human taste remains pending.

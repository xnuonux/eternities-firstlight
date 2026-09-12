# Firstlight10 implementation record

Date: 2026-09-12. Edition: **10.0.0 / Bellweather Crossing**. This is a local prototype, not a production MMORPG, device-performance qualification, new biblical claim or manuscript revision.

## Continuation, not replacement

The exact Firstlight09 ZIP is the source baseline. The integrated mine, Sunward Road, beacon defense, soul choices, weapon systems, music, homestead and unified RPG interface remain. New location names, dialogue, encounters and numerical balance are original working game proposals under the founder's approved direction; none are presented as recovered 2023 manuscript text.

Chapter IV follows the defended beacon. A traversable arch beside Sunward's northern beacon leads into one new bounded settlement scene. Bellweather is an Earth village: the first approach beyond the valley, not a completed major kingdom, Heaven map or all three projected regional routes. The player may still defer the adventure, return home or use the older creative systems.

## The Bell Road

Rowan explains that a road is open but the settlement's old watch bell has lost its voice. The inscription records an accessible order: **Leaf → Wave → Sun**. From the old charcoal track, the following fox can find a bronze clapper in disturbed roots. This is a real path-following search; the marker appears only after discovery. Close inspection is an alternative when Briar is set to Stay. It does not imply that the entire prior campaign can be completed without rescuing the fox.

Three authored encounters protect the route. Recover the clapper, clear them, repair the court mechanism and stand beside each named resonator to play the sequence. A wrong tone resets the sequence, not equipment or quest items. The sequence can be solved with sound muted: words and named markers supply the same essential information. Optional synthesized tones require the user's already-enabled audio context; no sound starts itself.

Restoration and reward are separate persistent events. Rowan grants **18 sunmarks and the Clasp of the answering bell**, once, at his actual location. Oren's home-world workshop gains visible hanging windbells. Those are a visual trophy; this release does not add a permanently ringing ambient composition at the workshop.

| Encounter | HP | Base hit | Cache |
|---|---:|---:|---|
| Briarback prowler | 110 | 17 | 2 copper, 6 sunmarks |
| Fractured tuner | 145 | 19 | 2 copper, 8 sunmarks |
| Hushbound Keeper | 410 | 30 | 3 copper, 15 sunmarks |

The first two reuse the established melee/ranged families. The Keeper has a new bronze-bell silhouette and alternating spatial rule. Its outer strike hits at distances greater than 2.1 and less than 6.2 units from its locked aim; its inner strike hits within 2.8. Outer windup is 1.7 seconds, inner 1.2, recovery 2.2. It must first approach a player outside its engagement range. Visibility, mitigation, health, projectiles, selection, autoattack and companion assistance remain shared with the existing combat code.

Defeated encounters stay defeated. Surviving enemies and in-flight attacks reset across scene reload; opening a menu pauses, it does not win a fight. The ordinary starter recovery still preserves belongings and persistent achievements. No repeatable high-value farm, new permanent-death rule or forced moral choice is introduced.

## A useful settlement

The five buildings have original procedural exterior geometry, door/service markers, window details, roofs and paths. **Their interiors are not playable yet.** Named service points are outside and reached on foot. Two additional townsfolk take authored local walks; this is not a simulated economy or mind host.

- Rowan: quest, explanation and final reward.
- Nella: free health/stamina/three-tonic rest on the inn porch, outside danger. Increasing equipped maximum health does not itself heal; the rest does.
- Edda: keeper's coat for 24 sunmarks, tonic for two (carried cap three), sells two copper for three sunmarks or two sunberries for one. The coat is unique. No buyback or player-to-player trading system is implied.
- Public forge: the real existing component, equipment and gem recipes; geographic station rules still apply. New construction or harvesting is not allowed to mutate protected town buildings.
- Common works: four planks and six stone fit market lamps for twelve sunmarks; four sunberries stock the pantry for one Ember ruby. Both are optional, one-time, capacity-checked transactions with persistent visible changes.

New equipment:

| Item | Slot | Effect |
|---|---|---|
| Bellweather keeper's coat | Armor | +9 guard, +30 maximum health |
| Clasp of the answering bell | Charm | +5 attack, +4 guard, +30 maximum health |

The character and compare UI read these actual definitions. No fictitious equipment slots, critical-stat system, random rarity generator or extra level tier is added. Character level remains capped at five; the new encounters award their defined XP without pretending a larger progression tree exists.

## Map and travel

M opens one map tab within the existing paused workspace. The local view has a player marker, enemy markers, numbered service/quest destinations, a north indicator and named route buttons. It is not fog-of-war cartography. The main map is a schematic of real scene coordinates, not a new unlimited movement surface. Clicking a place closes the workspace and submits a collision-checked walking path. A route hint names the destination and gives remaining straight-line distance. Manual movement still cancels walking.

The Commons and restored Sunward Beacon form the first discovered connection after the beacon defense. Bellweather must be entered and its waystone attuned before it joins. Travel requires physical proximity to a known origin anchor, a known destination and no nearby hostiles or active beacon event. It changes scenes/position only: no health, items, money, story reward or soul transformation. Combat intent and transient navigation are cleared. It is not unrestricted anywhere-to-anywhere teleportation.

Crossing has a narrow stream and one passable bridge. Collision prevents crossing elsewhere, while projectile geometry correctly allows an arrow to travel over water. Houses, tree trunks, rocks, pillars and the outer bounds stop movement or shots as specified. All services, bells and encounter homes have tested routes from the entrance.

## Camera cutaway

Static tall scenery is marked separately from dynamic actors. A main-image shader uses the eye-to-player axis and a small radius around it to dither an obstructing foreground surface. Only scenery in front of the focus is affected. Dynamic combatants do not vanish because they share the screen area. The preference is configurable and migrates enabled for old saves.

This is a targeted visibility cutaway, not an automatic camera collision solver, first-person controller or full renderer rewrite. The geometry still exists for collision, line of sight, shadow rendering and water reflection. The reflection transform remains world-plane `P × V × H`.

Independent rendered checks compare an obscuring red wall and blue subject with cutaway off/on. The main image gains subject pixels while the reflection framebuffer stays pixel-identical. Unflagged geometry and geometry behind the focus remain unchanged. The separate asymmetric reflection suite still tests four orbits.

## Source ownership

`crossing.js` owns durable quest validation, scene bounds/collision, waystone prerequisites, new transactions and Keeper mechanics. `crossing-art.js` creates geometry and visual effects. `crossing-ui.js` and `crossing.css` implement maps, contextual services, hints and the chapter journal. They submit accepted commands, not direct reward grants.

Integration touches `core.js` (schema/navigation), `adventure.js` (shared gear/encounters/commands), `arsenal.js` (projectiles/workbench), `sandbox.js` (forge crafting only), `world.js` (scene art/cutaway marking), `engine.js` (main-image cutaway/stream coast), `rpg-ui.js`, `app.js`, `shell.html` and `build.py`. Existing modules are not replaced by a second ad hoc simulation.

World schema is **9**, adventure schema **5**, crossing schema **1**. Schema8/adventure4 receives a fresh crossing record. Old source save examples remain old, unchanged examples. The new key is `eternities.realm10.save.v9`; earlier keys are read for migration but not overwritten. Boolean/enumerated prerequisites and one-time-reward flags are validated. This protects local consistency, not against deliberate editing of an offline save.

Saving inside Bellweather uses the inherited safe-exterior checkpoint behavior. The chapter, owned items, attunement and commissions persist; partial health of enemies, bell tones in progress, exact NPC/fox positions and targeting do not. Return through Sunward or a previously attuned waystone. There is no concurrent-tab conflict merge or automatic cloud backup.

## Scope and next iteration

This release emphasizes a second home-like place, clearer navigation, a companion-supported mystery and one new combat positioning rule. It does not implement multiplayer invasions, complete morality trees, guilds, voice dialogue, mounted/underwater travel, an auction house, full building interiors, a production 3D asset pipeline or Unreal. It makes no claim about the real player's spiritual status, behavior or private memories.

Next: human-playtest the arrival and Map discoverability, the fox-search hint, Keeper spacing with both weapon styles, pausing and service navigation. Improve storytelling and natural geography before multiplying realms. Add the first real regional route only after the current journey is understandable and worth repeating on a different build. Network work must continue as a separate authority/persistence spike; local saves cannot mint online gear.

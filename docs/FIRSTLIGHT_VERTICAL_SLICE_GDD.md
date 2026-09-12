# Firstlight — The Feather Beneath Wildwood
## Vertical-slice design and implementation contract

**Edition:** Realm 06 / application 6.0.0. **Date:** 2026-09-11.
**Project:** Firstlight, Eternities. **Format:** local, isometric/2.5D action/sandbox RPG.

This document distinguishes the founder's larger game intention, the actual chapter in this package, and proposed future work. Implemented means present in the supplied code and exercised by the accompanying tests—not publicly deployed, human-balanced, or MMO-qualified. All new character/location names and dialogue remain working creative choices for Dom to approve or revise.

## 1. The game and the promise

Build a home. Form a bond. Discover your power. Venture into other worlds—and bring something back that changes the life you are building.

Firstlight begins somewhere worth returning to. Combat and progression must add purpose to the existing valley, not replace gardening, music, construction, personal rooms, or quiet interaction. Its five pillars are wonder, adventure, progression, belonging, and transcendence. The orthographic, orbitable camera and readable 2.5D world remain the visual identity.

The founder's larger cosmology is Earth, Heaven, Hell, and eventual cosmic/oceanic regions. Earth is living greens, blues, wood, stone, ordinary life and mixed fortunes. Heaven is bone white, luminous gold, Burmese ruby, prismatic dawn colors, contemplation and inhabited paradise. Hell is coal, iron, smoke, ember red, fear, burden and harsh expeditions. These are future regional design commitments, not content present in this build. Generated concept illustrations are visual targets, not screenshots or game assets imported into this prototype.

Firstlight is a player-centered game. Its creatures and people are authored simulations. It is distinct from the protected resident-sanctuary project. Sharing a renderer in the future must not make protected residents lootable, tameable, tradeable, or resettable by game rules. This chapter uses no LLM, private Raven/Luna memories, live resident host, account credentials, or paid service.

## 2. The bounded playable slice

The new chapter extends the existing three-island sandbox with one mine, excavatable stone, four encounters across three enemy types, one fox companion, three equipment slots, six named items, levels 1–5, a relic, and a three-page angelic story meeting with one mutually exclusive reward.

The completion loop is preparation → enter → excavate → fight → rescue → acquire → defeat guardian → return → forge → meet envoy. The existing building field guide is parallel, not replaced. The player can continue building, composing, or gardening before or after this chapter.

### Beat A: leave prepared

Visit Oren's existing workshop at (11, 9). Interaction gives one expedition kit: a trail blade and travel coat, automatically equipped; a lantern rendered underground; a narrative salve for the rescue; and the initial allowance of three healing tonics. The kit can be claimed once.

The existing sandbox still supplies timber and stone. Craft the pickaxe and planks, pay the northern crossing's real repair cost, then cross into Wildwood. No free bridge or material grant is hidden in the story trigger.

### Beat B: a passage through stone

The new mine entrance is at (0, -48). Entry checks kit, pickaxe, repaired crossing, and physical proximity. Refused entry states the missing requirement. The doorway loads the Rootbound Underways and preserves an exterior return point.

The cave starts in a warm southern chamber. Its rails, old timber supports, roots, copper seams, pale crystals and distant anchor establish an underground place. A dark cutaway makes navigable ground visible rather than adding a ceiling that hides the player.

An exposed wall takes two strikes; a copper face takes three. Each successful hit updates persistent chip state. Breaking a cell changes both the drawn wall and the geometry used for navigation and line of sight. A copper cell yields one ore. Breaking either kind yields one XP. The outer boundary stays protected.

### Beat C: someone to come home with

An injured briarfox waits at (-8, 2). The Briar skitter near it must be defeated before the player approaches and helps it. Rescue happens once, awards ten XP, and enables naming and Follow/Stay commands.

The fox follows navigable routes and assists against engaged nearby enemies. It is an ordinary game creature, not a simulated claim of a conscious individual. This is one rescue-based bond, not a generic catch-anything, breeding or evolution system.

### Beat D: what the warnings mean

The Root prowler builds on the first melee threat. A Prism sentinel in the eastern chamber introduces a longer-range aimed impact. The Hollow Hart has a much larger violet danger circle and recovers faster below half health. Its branching antlers, four-legged silhouette and crystal growth distinguish the boss from a scaled-up humanoid.

Warnings lock an impact position when the windup starts. Moving away changes the result. The player can strike, sweep, dodge, heal, and accept help from the fox. The companion can make the encounter easier but does not erase collision or line-of-sight rules.

### Beat E: carry something back

Defeating the Hart allows collection of its feather at the dais and a separate loot cache. The player returns along their opened route to the southern lantern exit. Ordinary outdoor menu actions cannot silently skip the return by opening a house from inside the mine.

Back outside, copper and sunmarks can forge an improved weapon at a workbench. Resting at the spring restores health, stamina and three tonics. Bringing the feather there causes a white-winged, haloed envoy to appear and opens her dialogue.

The player chooses one gift: Dawn's edge for attack or the Warden's heartstone for endurance. The chapter ends here. Heaven is under attack within the fiction; the player has not unlocked a built Heaven region in this edition.

## 3. World and navigation

### Overworld continuity

Firstlight Valley, the blossom island, Wildwood Reach, bridges, four original interiors, household simulation, outdoor homestead, flower planting, crop system and music room remain intact. Public buildings are not destructible. The mine is another bounded scene, not a reset of the world.

### Cave topology

The displayed cave covers a 15 × 15 cell footprint. A protected outer ring leaves 13 × 13 editable interior cells. Each cell is two world units. Authored open corridors plus the save's excavated-cell list determine traversability.

The southern entry leads to a breakable central face, the western fox alcove, a north-running spine, another breakable barrier, the sentinel room, and the guardian's northeastern dais. This is one authored layout, not a procedural dungeon generator.

`initialFloor`, `isFloor`, `walkable` and `line` in `adventure.js` define the actual map. Corner samples prevent slipping through stone. Digging requires an exposed cardinal face, correct range and a recovered pickaxe swing. You cannot mine a diagonal shortcut through a sealed corner or dig the outer ring.

Pathfinding consumes the same floor rule as the collision system. Mine target buttons provide a readable alternative to precise scene clicks. The map fallback uses the same simulation and chapter actions rather than a separate imitation of progression.

## 4. Input and encounter rules

| Input | Delivered action |
|---|---|
| Click/tap ground | Follow a valid path. |
| WASD / arrows | Collision-checked direct movement; cancels automatic targeting. |
| Drag / scroll or pinch | Orbit and zoom. |
| Click an enemy | Approach a reachable point and repeatedly strike while eligible. |
| Click stone | Approach an exposed face and chip until open or refused. |
| F / Strike | Sunstrike, reach 2.65, 0.52-second cooldown, line of sight required. |
| Q / Sweep | Dawn sweep, radius 3.6, 30 stamina, 5.5-second cooldown, about 1.5× attack. |
| Space / Dodge | Wingstep, 22 stamina, 1.2-second cooldown, short collision-checked movement, 0.4-second avoidance. |
| G / Tonic | Heal up to 48 health, three-tonic maximum, 3-second cooldown. |
| E / Interact | Contextual entry, exit, dig, rescue, cache, relic, rest, or story. |
| 8 / U / Adventure | Chapter, route list, stats, equipment, forging and companion controls. |
| P | Pause actual simulation. |

Stamina recovers at 15 per active second. Healing at full health is refused without consuming a tonic. Invalid or cooling actions do not spend stamina. The renderer shows world health bars, windup rings, hit flashes and brief ability effects from actual state. A ring's dotted geometry and contracting indicator supplement its color.

The ordinary creatures pursue a visible nearby player; they do not have a sophisticated group-flanking planner. There is no giant-monster climbing, ballistic projectile simulation, elemental surface system, or networked combat in this chapter.

## 5. Enemy roster and progression rewards

These are current prototype values, not long-term balance promises.

| Encounter | Position | HP | Raw damage | XP | Cache |
|---|---|---:|---:|---:|---|
| Briar skitter | (-4, 2) | 35 | 9 | 20 | 1 copper, 3 sunmarks |
| Root prowler | (0, -3) | 48 | 11 | 25 | 1 copper, 4 sunmarks |
| Prism sentinel | (8, -3) | 70 | 13 | 35 | 2 copper, 6 sunmarks, guard vest |
| Hollow Hart | (8, -10) | 240 | 24 | 90 | 4 copper, 12 sunmarks |

Skitter warning time is approximately 0.75 seconds. Sentinel and Hart warnings last approximately 1.05 seconds. The Hart's ordinary 1.8-second recovery shortens to one second below half health. Its impact radius is 2.4 versus 1.05 for skitters and 1.2 for the sentinel. Guard reduces incoming damage, with a minimum effective hit.

Each enemy has a fixed chapter identity. Defeat records one completion and creates one cache at the authored encounter location. Cache collection separately checks range, visibility, capacity and unclaimed status. This avoids stranding loot at a transient chase coordinate and prevents repeated payout under new command IDs.

Defeated enemies stay defeated in that local save. Surviving encounters reset health when you re-enter; partial boss damage and in-flight attacks are not persisted as wins. This is a completable local chapter, not an endlessly farmable dungeon.

## 6. Equipment, levels, and crafting

Level thresholds are 30, 80, 150 and 260 XP, giving levels 1–5. Base attack begins at four and rises by two per additional level. Base maximum health begins at 100 and rises by ten per level. Equipped contributions are explicit.

| Item | Slot | Effects | Source |
|---|---|---|---|
| Trail blade | Weapon | +12 attack | Workshop kit |
| Travel coat | Armor | +1 guard | Workshop kit |
| Copper-edged blade | Weapon | +19 attack | Workbench, 4 copper + 4 sunmarks |
| Underway guard's vest | Armor | +4 guard, +15 max health | Sentinel cache |
| Dawn's edge | Weapon | +25 attack | Envoy choice |
| Warden's heartstone | Charm | +2 attack, +3 guard, +25 max health | Alternate envoy choice |

A prepared level-one character therefore has 16 attack and one guard. Equipping health capacity does not heal for free. Items must be owned and match their slots. The gathering pickaxe stays separate from the combat weapon slot.

The crafted blade charges materials once on success. Capacity or precondition failure leaves inventory and caches unchanged. A fresh command ID does not bypass single-claim rewards. The six-item catalogue is not an instance-level inventory economy: randomized affixes, rarity rolls, sockets, enchantments, merchants, trading and broad loot sets remain future systems.

The game's local JSON is intentionally portable and user-editable. It is not proof of legitimate online gear and must never mint trusted server rewards later.

## 7. Companion contract

Briar may be renamed with up to 24 characters. Text is rendered as text, including markup-like characters. Follow uses valid routes and assists against enemies already engaged near the player, with range/line-of-sight checks and a 1.5-second attack interval. Its assistance damage is five plus character level.

Stay stops movement and assistance. It leaves the fox in its current scene during the active session. Follow may recall it across a scene boundary; this is explicit game behavior, not a claim of simulated offscreen walking.

Bond, name and selected mode survive saving. Exact transient location does not: on reload it initializes beside the visitor. The fox cannot die, does not require food, and does not lose affection while the application is closed. It has no generated dialogue, evolutionary forms, additional training tree or mount role yet.

Next companion development should improve path reliability, command feedback and useful environmental assistance before adding a large collection of creatures.

## 8. Death, pauses, and recovery

At zero health, ordinary movement and combat stop. A recoverable overlay offers return to the Commons. Resurrection restores health, stamina and tonics while preserving the home, construction, score, notes, excavation, earned items, completed encounters and bond. There is no fee, corpse run, permanent death or inventory loss in this starter chapter.

Saving underground preserves a safe exterior restart position. The persistent chapter retains walls dug, chips on unfinished faces, defeats, unclaimed caches, owned/equipped items, HP and other progression. It does not pretend to save transient attack animations, enemies' partial damage, or exact fox whereabouts.

Pausing stops simulation clocks. Changing the aesthetic daylight setting cannot speed up combat cooldowns or crops. Closing the application produces no offline progress. The story modal pauses time while read and restores the preceding pause setting when closed.

Future severe Hell-expedition stakes need a separately declared loss contract; the founder's horror theme is not permission for surprise deletion of this ordinary save.

## 9. Narrative implemented

The envoy currently presents these three authored pages:

**A feather, carried home.**

“I was told I would find a fortress. An army. Someone prepared. Instead, I found someone who knows how to begin.”

**The light beyond the valley.**

“Heaven is under attack. Hell is breaking the passages between our worlds, and this land lies along their path. The anchor beneath your forest has answered you.”

**A life worth returning to.**

“Do not abandon what you have made here. It is why the journey matters. Others will bear this light as well. Choose a gift, and when the road is ready, we will walk it together.”

The multiple-bearer wording leaves room for future multiplayer protagonists. It is not an announcement that another region or multiplayer currently exists. After choosing a gift, a repeat meeting cannot claim the other gift. The envoy remains visibly present, but the introduction is a dialogue event, not a voiced motion-captured cinematic.

## 10. Rendering and audio

All new visual geometry is procedural: gate, rock faces, copper, roots, support beams, rails, crystals, dais, skitters, sentinel, antlered Hart, fox, feather, envoy, weapon, and lantern. The cave adds a warm, player-relative light contribution against a darker palette. It is a readable cutaway, not an implementation of volumetric global illumination.

The corrected reflection remains world-space `P × V × H` about the actual water height. No reversed texture workaround is reintroduced. Asymmetric red/green framebuffer tests at four camera angles check orientation independently from the artistic screenshots.

The title-card illustrations of huge celestial cities are not embedded and do not represent the prototype's current rendering fidelity. Screenshots and any preview in the delivery are produced by the actual browser application.

Optional action sounds use the existing synthesized audio engine and explicit user activation. There is no recorded dialogue, microphone, downloaded sample library, or automatic audio start after reload. Music exports still reflect the player's editable score, not an invented claim of NPC composition.

## 11. Code ownership and save migration

`adventure.js` owns chapter validation, authoritative local rules, collision/visibility, combat, rewards and story state. `adventure-art.js` reads it and builds geometry. `adventure-ui.js` renders interaction surfaces and submits bounded commands. `core.js` integrates navigation, simulation and migration; `app.js` handles input and transitions. The renderer does not decide quest rewards.

World format 5 includes adventure format 1. Supported earlier formats 2–4 migrate through defaults while retaining supported creative and sandbox state. The new storage key is `eternities.realm06.save.v5`; previous edition keys remain untouched. Exporting JSON before changing file locations or versions is the supported portable backup method.

Local storage status follows the actual storage adapter's acknowledgment. A denied read/write reports memory-only operation. This is not permanent hosting, cloud storage, encryption or multi-tab conflict resolution.

Successful commands retain up to 100 idempotency receipts. Changed content under an existing ID is refused. Persistent one-time facts prevent repeated claims after a receipt expires. These are local consistency safeguards, not server authorization or anti-cheat.

## 12. Acceptance evidence

`tests/chapter_journey.cjs` begins with a fresh world and uses accepted walking, gathering, crafting, bridge repair, excavation, combat, rescue, loot, forging and story commands. It grants no inventory, edits no position, plants no enemy defeat and directly sets no story completion flag. It advances the simulation in 50-ms steps and makes automated tactical decisions. It is not human balancing, a reaction-time study, or a wall-clock completion-time benchmark.

`tests/adventure_browser.py` loads the exact standalone HTML in an offline Chromium page. It starts at the legitimately earned pre-mine checkpoint from that journey, then exercises visible interaction, geometry clicks, route controls, combat buttons, companion naming/mode, equipment, dialogue, reward choice, export/import and reload. Movement between some checkpoints uses the application's real validated path command; simulation time is accelerated. Known-answer death and invalid-import fixtures are separate and labeled.

Browser persistence checks explicitly inject a Map-backed storage fixture. Attempts to navigate file and loopback HTTP origins in this environment were blocked by browser administrator policy; they are recorded as limitations, not passes. Physical phones, Firefox/Safari, native-origin storage and human controls/timing still need qualification.

Existing browser suites retest music/audio/export, room decoration, household routines, sandbox gathering/crafting/construction/crops, map fallback, touch-sized UI, and reflection orientation. `VALIDATION.md` and the machine-readable reports identify the actual counts and tested code hashes.

## 13. Next development, not delivered

First, play this on a real device and improve enemy/weapon facing, readable hit reaction, pursuit around obstacles, companion recovery from blocked paths, pacing, and the return journey. Add one short surface route with one new meaningful behavior before multiplying classes or regions.

An early, separate multiplayer proof should establish two clients, one server-owned room, movement, text conversation, one encounter outcome, disconnect/reconnect, and one atomic trade on synthetic server-owned inventory. It must not trust offline saves. Actual networking framework versions and licenses require qualification at implementation time.

After that: four-player expeditions, server-persisted characters, chosen disciplines, broader equipment, companion development, guild spaces, Earth regions, Heaven, a separate Hell expedition policy, mounts and flight, then cosmic/oceanic content. No automatic merge with `eternities-heaven` or the resident sanctuary is implied.

**Not in this build:** online hosting, accounts, multiplayer, player chat/trade, adaptive classes, sockets/enchantments, random loot economy, multiple tameable species, evolution, mounts/flight, additional realm maps, merchants, fully destructible terrain, voice acting, live Luna residents, or a 60-FPS performance guarantee.

This is a finished small chapter inside the existing prototype. The next engineer should extend this working code and its evidence rather than substitute another planning document for implementation.

# Realm 09 implementation record

Status: implemented local prototype; see VALIDATION.md for executed tests. This document is not an MMORPG-capacity or human balance claim.

## Source boundary

Base: complete Firstlight08 package, SHA-256 `6fbdeb6f0e19ad198e57abf1d349f8b574eb070c33c15c797ec88721814e6186`. Original archive unchanged. This branch does not import the separate Shared Commons07 runtime or substitute older ChapterI-only source for Realm08.

Story source: the conversation's *Firstlight Mythology Bridge*, particularly “The angel at the beacon,” “The first breach,” and “The First Beacon Network reveal.” Those passages propose arrival, distinct family contributions, the player as defender, and distant routes. New skill names, exact mechanics, numerical balance, cinder rules and procedural staging are editorial/gameplay additions, not quotations from the original 2023 manuscript or claims about scripture.

## Module ownership

`combat.js` owns selection, autoattack timing and the new skill rules. `beacon.js` owns chapter state, wave progression, event enemies, objective integrity, temporary supporting actors, explicit soul choices and one-time rewards. `rpg-ui.js` and `rpg.css` project those rules into one RPG workspace and combat HUD. `beacon-art.js` builds procedural event geometry. `core.js` performs simulation/migration; `adventure.js` retains shared combat interfaces and forwards new commands; `arsenal.js` still owns travelling projectiles. `app.js` connects input and camera presets.

The renderer does not grant loot or advance story. UI actions submit commands. The new system is locally authoritative only: user-editable JSON is deliberately not trusted online inventory.

## Input ownership and invariants

Selection and attack are distinct. Tab cycles nearby visible living candidates within 22 units; reverse order is supported. It does not start autoattack. Skill1 explicitly toggles repeated attacks using the existing weapon's range, cooldown, stamina and line-of-sight rules. No retarget-on-kill or autonomous path pursuit is added to this mode. Enemy clicking retains explicit approach behavior separately.

Autoattack commands run through the same validation/idempotency envelope as manual attacks. The target profile resets synchronously on scene change, before a new selection can be accepted. A regression test specifically covers selecting immediately after entering a room, which initially lost its selection at the next tick. Hit effects and damage numbers consume actual successful damage, not random presentation values.

Modal text entry, normal tab focus, movement, construction, camera and combat have explicit input priorities. Commands while the RPG workspace is open temporarily lift the pause only for their synchronous validation/mutation; they do not advance simulation. Closing restores the prior pause state. Movement keys and autoattack are cleared on focus loss. Escape cannot accidentally exit a combat area merely because no menu is open.

The game remains pointer + keyboard controlled. Gamepad, remappable keys, complete screen-reader navigation, first-person/third-person control and Unreal integration are not implemented by this increment.

## Skills

| Slot | Rule |
|---|---|
| 1 | Blade strike or actual arrow autoattack. Uses existing weapon values. |
| 2 | Existing radial blade sweep or penetrating bow arrow; 30 stamina / 5.5 s. |
| 3 | Brace: 20 stamina / 8 s cooldown; halves guarded incoming damage for 3 s. |
| 4 | Following Briar: reveal hidden nearby foes, expose selected/nearest foe for 6 s (+20% damage), interrupt a windup; 10 s cooldown. Outside a nearby fight, the road action remains scent seeking. |
| 5a | Aegis: chosen Grace, 25 stamina / 18 s; 35 barrier / 5 s; +8 ward within eight units during assault. |
| 5b | Cinder: accepted relic, 12 nonlethal health / 12 s; 2.3× attack; target must be visible, non-practice, within ten units. First invocation adds one history entry and current corruption, not every cast. |
| 6 | Existing tonic: up to48 health / 3 s cooldown, capped at3 carried. |
| Space | Existing collision-checked dodge, 22 stamina / 1.2 s. |

Brace is not a taunt or an unlimited shield. Cinder does not create a hidden elemental system. Expose does not stack multiplicatively with itself. Companion mode and scene residency remain prerequisites; selecting Stay denies the companion skill. No new XP rewards are assigned merely for using an ability.

## Beacon state machine

Persistent story: dormant → awakened → stable, with corrupted representing a failed initial defense. Persistent introduction and completion do not encode the current fight. Runtime: idle → arrival → ready → assault → intermission → subsequent assault → won/failed.

The first answer requires a physically nearby player, a lit beacon and repaired cart. It can settle the old ChapterII report once but never duplicates its reward. Arrival animates the envoy and advances three separate family paths from the road crossing. The assault does not begin until explicitly requested after their arrival.

Wave1: two 78-HP raiders. Wave2: a105-HP channeler, an80-HP cloaked desecrator and an85-HP raider. Wave3: the350-HP Chainbound Herald and90-HP attendant. The herald recovers more quickly below half health. Attack windups lock their target position/ward target. Ranged/channeling threats pressure the objective; close enemies can attack the player. Seven seconds separate completed waves.

Ward maximum100. Player repair adds15 for20 stamina with8-second recovery and physical proximity. Oren adds3 every4 seconds. Mara periodically reveals/exposes event foes; the hidden foe also becomes visible after12 seconds, so rescue/progression is not permanently blocked by missing one insight. Ilan periodically restores12 stamina to a nearby player. These supporting effects are authored event roles, not general autonomous work systems.

Initial failure is reclaimable and records an ordinary attempt/failure without deleting possessions or prior content. The one-time reward is15 sunmarks + moonstone; capacity is checked before either is changed. Event-enemy IDs never enter the old fixed encounter-drop/defeat lists. Repeated accepted request IDs are idempotent, and persistent flags block fresh-ID reward duplication too.

Voluntary repeat assaults retain completed story, grant no further rewards/XP, and never impose persistent corruption of the beacon. They let the player experiment with soul skills. Their lack of rewards is stated before starting. Cinder use remains a character choice even in a repeat.

## Soul history is a small explicit first version

Radiance and corruption are distinct counters generated only by accepted authored choices. The first Grace adds one Radiance. Accepted cinder grants access but no corruption. Its first use adds one corruption and `cinder-invoked`. Relinquishment changes relic to `renounced`, removes current corruption and infernal skill access, adds one Radiance and `cinder-renounced`; invocation history stays. Sealing is a separate exclusive choice that grants neither power nor corruption.

Strict save validation enforces those prerequisites, enums, bounded counters and scars. This does not prove the save was earned; editable offline files remain editable. There is no psychological inference, real-player religious rating, behavior surveillance, faction lock, automatic PvP or monetized purification.

## Presentation and accessibility pass

The visible item catalogue uses actual ownership and stat definitions. Three equipment slots, searchable/category-filtered grid, quantity badges, real compare values and a selected-weapon socket control replace textual piles of equip buttons. Procedural SVG icons are original UI code; no third-party game icons or generated production meshes were borrowed.

The portrait uses the same visitor/weapon geometry, with an independently sized WebGL viewport. Desktop and touch-size checks cover canvas fit; its underlying character art is still rough procedural art, not a rigged AAA character.

Crafting unifies five categories and real recipe costs, checks the actual outdoors station, and retains unique-item and capacity refusals. The character portrait is not a rotating per-recipe3D asset catalogue. Tessa's existing shop remains accessible after cart repair. Construction, music and decor still have some legacy interface patterns.

The left tracker shows one objective rather than several competing panels. The selected enemy and beacon integrity have separate displays. Combat labels are reduced during busy siege phases. Short cooldown numbers and symbolic outlines supplement colored states. Camera presets provide follow, tactical and wide framing; a true obstruction-avoidance camera is not included. A wall can still require an orbit in some views.

## Save and pause semantics

World schema8, adventure4, beacon1. Schemas2–7 migrate; the new save key is independent of earlier keys. Loading an interior/expedition restarts outside via a safe saved return point. Chapter outcomes, homes, construction, crops, music, notes, equipment and decisions persist. Wave health, timers, target/autoattack, projectiles, barriers and exact event actor location do not persist. Restart resumes a stable checkpoint, not a reconstructed half-complete siege.

The main RPG dialog pauses a local game; normal RAF pause/resume is tested separately from the accelerated test stepper, which intentionally advances time. Legacy drawers/music do not all pause. No online simulation can simply inherit this pause policy.

## Engineering gaps to retain honestly

No multiplayer invasion scaling, player trading, guild stewardship, global state propagation, territory destruction, public regional takeover, full holy/infernal skill trees, adaptive classes, additional playable regions, paid assets, full voice/cinematic system or Unreal client is delivered. Difficulty has automated command coverage but no new human-playthrough qualification. Architecture/camera/music/mesh refinement remain ongoing work.

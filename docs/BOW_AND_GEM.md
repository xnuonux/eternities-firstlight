# Firstlight 08 — The Bow & Gem

**Implemented local prototype, 2026-09-11.** This extends the complete recovered Firstlight 07 source, not just its partial GitHub handoff. All previous creative/sandbox systems and both adventure chapters remain. New creative names and balance values are provisional.

## A different way through the same world

The goal is a genuine weapon choice, not a permanent class assignment. Blades stay useful up close; bows provide reach but commit each arrow to a direction. The companion still contributes. One removable weapon gem allows a small, understandable build choice without adding a random-item economy.

This is ordinary authored game logic. It calls no model, consumes no private resident state, needs no account, and is not an online inventory authority.

## Access and complete loop

Go to Oren's workshop at `(11,9)`. Collect the existing expedition supplies first. The Armory menu can also request that kit when in range. Once prepared, E at the workshop opens the armory. **9** or the Armory button opens the panel elsewhere, but crafting and fitting still require an actual outdoor workbench.

Gather six timber, four meadow fibre, and two stone. Craft the Ashwood trail bow; explicitly equip it. Choose Enter practice court near Oren. A separate garden court loads while remembering the outdoor return position. Walk past the two central pillars to a clear firing position, begin a round, and hit each of three targets twice within 30 active seconds. The rightmost target moves.

The first successful round grants five sunmarks and one Wildwood amber. Later rounds improve the recorded best time, not the payout. A full currency/gem pouch causes the first prize to be refused as a whole; space must be freed before another qualifying round. Untimed practice remains possible and gives no XP or loot.

Return through the south gate to the workshop, fit the amber to a weapon, and take the bow into the original mine or the Sunward Road. Further excavation and gathering enable a longbow and other gems. The new activity is not gated by completing the two chapters; starter kit and a crafted bow suffice.

## Weapon mechanics

| Property | Blade | Bow |
|---|---:|---:|
| Primary reach | 2.65 world units | 11-unit targeting reach |
| Primary cooldown | 0.52 seconds | 0.75 seconds |
| Primary stamina | 0 | 6 |
| Secondary | Radial Dawn sweep | Piercing light |
| Secondary cost/cooldown | 30 stamina / 5.5 s | 30 stamina / 5.5 s |
| Outcome | Eligible close bodies | Bodies actually intersected by moving arrows |

The trail bow contributes +9 attack. The longbow contributes +17. Base character level, other equipped items, and the active gem still contribute normally. No ammunition inventory or durability system is introduced. Stamina regeneration remains 15 per active second.

An arrow travels at 22 world units/second, up to 13 units. Aim is fixed at release and damage snapshots the launch equipment; swapping items does not change an arrow already in flight. It has no homing or prediction. Moving targets can escape its path, and an intervening creature can absorb an arrow aimed at another target.

The primary stops at the first body. Piercing light deals rounded 1.65× current attack and may hit two distinct bodies, but still stops at stone. Each body is hit at most once by that projectile.

The target-selection interface chooses an enemy's current position. Free mouse-position aiming and ballistic/gravity arcs are not implemented. Targeting assistance automatically walks to a reachable point with clear aim, then fires while eligible. It waits for stamina and cooldown rather than cancelling the order for a temporary shortage. Manual movement or a new action hands control back.

## Collision model and limits

`arsenal.js` performs an analytic swept segment/circle test against horizontal body hit volumes, then sorts impacts by distance along the segment. World obstructions are sampled along that segment at no more than 0.08-unit intervals. This prevents skipping the supported authored obstacles at the current speed/tick rate, but is not continuous arbitrary-mesh physics or a proof for future thinner geometry.

Mine excavation and current wall state govern arrows. Road rocks, cart structures and trunks block them; the river does not, although it still blocks walking outside the bridge. The court's pillars, side trees, benches and gate posts participate in its collision rules. Decorative flowers do not obstruct movement.

This is a deliberately 2.5D, horizontal hit model: it does not yet model vertical shooting, crouched targets, elevated platforms, ricochets, or arbitrary mesh collision. The visual shaft is placed at the character's bow height. Future elevation work must extend the domain before pretending an animation establishes 3D physics.

Arrows are scoped to the current scene and disappear on leaving, death, or cold restart. At most 24 can exist at once. Commands refuse unavailable targets, excessive distance, insufficient stamina, cooldowns and invalid data without spending materials. The game remains local and editable; these consistency checks are not anti-cheat.

## The three gems

One gem fits each owned weapon, including the older blades. Only the currently equipped weapon's gem applies.

| Gem | Current effect | Recipe at workbench |
|---|---|---|
| Ember ruby | +4 attack | 1 moon crystal, 2 copper, 3 sunmarks |
| Pearl moonstone | +18 maximum health | 1 moon crystal, 2 fibre, 2 sunmarks |
| Wildwood amber | +3 to Briar's actual strikes | 2 timber, 3 fibre, 1 copper, 2 sunmarks |

These effects are intentionally plain. Ruby is not yet elemental fire damage; moonstone is not regeneration; amber does not evolve the companion or increase affection. The effect is visible on the weapon as a small gem, but the rules do not depend on seeing that cosmetic.

Fitting, exchanging, or removing requires a real outdoor workbench. Replaced gems return intact to the loose-gem pouch. Capacity is checked before either gem is consumed or returned. Removing maximum-health capacity clamps current health as necessary; adding capacity does not heal. There is no replacement fee or destruction roll.

The longbow requires ownership of the trail bow, two planks, four copper, and six sunmarks. Making it keeps the original bow and its separate socket. Each bow is unique in this bounded catalogue. There are no randomized equipment instances, gem tiers, armor sockets, merchants for gems, enchantment rolls, or player trade yet.

## The practice court

A bounded courtyard behind the workshop contains paving, a colonnade, gardens, lamps, benches, three target stands, and two central columns that make line-of-sight choices visible. The surrounding forest and aqueduct are scenery, not undisclosed playable geography.

The copper bell and moon disc stay fixed. The travelling sun moves sinusoidally along a horizontal rail. The three targets are practice objects with no XP, death, or enemy-cache semantics. They cannot hurt the player. Briar does not attack them.

Every round begins with empty counters and no in-flight arrows. Partial rounds do not persist. Pausing freezes movement, shots, stamina, and the timer. Changing the sky clock cannot advance the contest. Closing the app invents no offline progress. End round cancels the UI's firing intent and clears remaining arrows.

The record keeps one first-medal flag and a best time between zero and 30 seconds. A saved result is a local personal record, not an online achievement. There is no leaderboard, external clock, or server verification.

## UI and accessibility work

The new Armory panel provides recipe costs, actual balances, equipment status, loose gems, per-weapon sockets and explicit apply buttons. Text is used alongside gem colors and target colors. Named target buttons provide a way to choose each target without aiming at a tiny prop.

In a touch-sized view, the court overview includes all target centers; the round HUD does not cover the sound/settings toolbar. The panel scrolls and preserves existing minimum-size controls. Tests use an emulated Chromium viewport, not certification of a physical phone or every browser.

The fallback map displays the same court, pillars, moving targets, and projectiles. It sends commands into the same simulation. The browser can remain silent throughout. Existing synthesized sound remains user-enabled.

## Persistence and compatibility

Application version **8.0.0**; world format **7**; adventure format **3**; arsenal format **1**. New key: `eternities.realm08.save.v7`. The loader can copy supported earlier saves, including Realm07's world6/adventure2 format, without modifying the earlier key or caller's object. Existing world2–6 migration paths remain.

Arsenal data consists of loose-gem counts, per-weapon sockets, a first-medal flag, and best time. Ownership, active equipment, copper and currency continue to live in the existing adventure record. The validator rejects unknown gems, fractional/negative quantities, inappropriate sockets, sockets on unowned weapons, and incoherent medal/time combinations.

Saving in the court retains earned progress but restarts at the safe exterior workshop position. An unfinished round, target positions, partial arrows, or a shot animation do not become invented persistent achievements. Keep a JSON export when changing file location or browser. Local file storage and multi-tab conflict handling remain limitations.

## Evidence and next work

`arsenal.test.cjs` uses explicitly synthetic known-answer fixtures to test rules and refusals. `arsenal_journey.cjs` separately earns chapter I, harvests materials, crafts/equips a bow, hits all targets using actual travelling arrows, returns, fits a gem, excavates more copper, and crafts/swaps the next tier. It does not directly grant inventory, medal hits or positions. Its accelerated time and automated decisions are not a human playtest.

`arsenal_browser.py` starts from those earned checkpoints and exercises real recipe/equipment/socket controls, a projected-world target click, firing, round completion, entering/leaving, saving, import, a cold fixture restart, and a ranged road encounter. It also tests mobile layout and map fallback. Reports carry the exact HTML hash. Browser storage fixtures are explicitly marked.

The previous chapters, creative tools, sandbox progression, and reflection tests remain regression gates. Read current `VALIDATION.md` rather than treating the historical counts in old design documents as current runs.

Next: real-device feel and readable weapon posture, stronger enemy anticipation, companion positioning, and one bounded encounter that rewards ranged positioning without requiring it. Separately prototype two-client authoritative play before expanding the content catalogue indefinitely. No account service, multiplayer, deployment, paid hosting, live residents, Heaven migration, or complete GitHub source upload is established by this edition.

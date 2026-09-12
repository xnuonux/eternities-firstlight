# The Sunward Road — implemented chapter contract

**Realm 07 · 2026-09-11.** Location names and dialogue are working creative choices for Dom. This describes the delivered local code, not a finished MMORPG or further approved branding.

## Purpose and geography

Extend the existing valley through a returnable surface expedition. Give the fox a practical exploratory role; add one merchant, one new directional enemy behavior, and a visible change at home. Original creative systems and the first chapter remain independent activities.

The external gate is at the existing lookout `(44,6)`. The prior envoy’s reward is required. The destination is a separate `road` scene: entry `(0,17)`, Tessa `(-10,12)`, beacon `(0,-24)`. Its ellipse is centered `(0,-3)`, with radii18/26. A river follows `z = sin(x*0.13)*0.6`; crossing is possible only through the real bridge centered on x2. Rocks, cart, tower and tree trunks share geometry definitions between collision and scene construction. Distant mountains/castle are nontraversable backdrop, not built additional regions.

The camera uses the same isometric renderer; the map fallback runs the same rules. The new water mask matches this scene without replacing the original islands’ shore rule or the P×V×H reflection convention.

## Six steps

1. Enter after the chapter-I gift. Without a rescued fox the player can explore, leave, and return for Briar; the game does not automatically grant the bond.
2. Clear the prowler. Ask the following fox to Seek near `(-11,3)`. It chooses a reachable, unrevealed cache within eight units of the player, travels there, and reveals it only on approaching within0.7. Collection is a separate range/visibility-checked action.
3. Repair the cart after recovering that latch, defeating the prowler and bringing2copper to Tessa. The cost is spent exactly once. Its fitted latch appears, and local trade becomes available.
4. Cross the bridge, overcome the prism, optionally discover the surveyor’s cache at `(11,-13)`, and defeat the Ram.
5. Kindle the beacon after all three road encounters are defeated. Its light activates and20XP is granted once.
6. Return along the actual southern route, exit to the stored lookout, and report at the Commons spring after repair+beacon. Receive20XP, the Band of the returning light, and a visible keepsake lantern in the village.

The second cache is optional. Chapter-I rewards are not replaced. Home construction, notes, music, and farming are not sacrificed to start this route.

## Encounters and balance

These are current tuning values, not validated human difficulty:

| Enemy | Location | HP | Damage | XP | Cache |
|---|---|---:|---:|---:|---|
| Thicket prowler | -2,8 |65|13|20|1copper,5sunmarks|
| Gloam prism |6,-8|95|16|25|2copper,7sunmarks|
| Sunscar Ram |0,-19|320|28|55|3copper,12sunmarks|

The first two extend the skitter and sentinel behaviors. The Ram winds up for1.2seconds with a fixed direction, then charges nine units at12units/second. Swept collision uses increments no larger than0.12units. Banks/rocks stop the charge. Each charge can damage the player once, then recovers1.8seconds. It does not home after commitment. Evading the marked lane avoids damage; the existing dodge interval also applies.

A paired dotted lane and endpoint ring supplement warning color. Bodies rotate around real yaw, while ground warnings/health indicators stay world-oriented. Enemies acquire awareness with line of sight, retain the last known target briefly (three seconds), and abandon pursuit outside the range/leash. Returning to origin does not currently refill enemy health. Reentering the scene resets surviving enemies. There is no squad planning, monster climbing, ballistic projectile combat or networking.

## Companion

Follow uses valid paths. Seek is an exploratory task with physical travel and a separate reveal event. Stay cancels a pending search. Leaving the scene cancels transient search state. If a changed layout makes the current companion point invalid, an explicit recall to safe ground emits a notice. It does not pretend to walk through walls.

The name, bond and mode persist; exact position does not. Follow may recall across a scene boundary. It cannot die and has no offline affection loss, hunger, evolution or breeding. It remains an authored game creature, not a protected digital resident.

## Merchant and equipment

Trade only near the repaired cart. Four fixed offers: buy1tonic for2sunmarks (carry up to3); buy the unique mantle for18; sell2copper for3; sell2sunberries for1. Berries come from the sandbox garden inventory.

Preconditions/capacity are checked before changes. Unknown offers do not fall back to a default purchase. A repeated successful command ID returns its receipt without charging again; changed terms under the same ID refuse. The unique-item fact prevents repeat purchase after receipt expiry. These are consistency rules, not anti-cheat or a trusted online economy.

Courier’s storm mantle: armor, +7guard,+20maxHP. Band of the returning light: charm,+4attack,+2guard,+15maxHP. Equipping maximum health does not heal. The eight-item catalogue and level cap5 remain intentionally small. The band may be preferable to the original heartstone for attack, not a strict upgrade in every dimension.

## Persistence and scene isolation

World6 accepts supported previous formats2–5. Adventure2 accepts previous adventure1 with an empty road state. Road1 checks unique/known cache identifiers, claimed⊆revealed, entry, bond, latch/repair, guard defeats/beacon, and report prerequisites. Consistent edited JSON is still edited local JSON; it may not create online entitlements later.

Unclaimed road loot survives entering another area. The mine UI explicitly skips road encounter IDs for context, interactions and labels. It cannot collect them remotely. The browser regression obtains an actual unclaimed road cache, reloads that save, walks back to the mine and exercises those paths.

A save taken on the road restarts outside the lookout, not inside an in-flight charge. Partial enemy health, paths, exact fox coordinates and animations are not preserved as completed events. Death does not destroy prior belongings. Pause stops timers; visual time changes and closed-app time do not advance the simulation.

## Evidence boundaries

The domain journey starts from a fresh world, earns chapterI via accepted gameplay, and continues through chapterII without inventory grants, position edits, or planted defeats. Automated tactics/accelerated50ms steps are not a human timing or balance study.

The browser journey starts from its earned checkpoint, uses actual buttons for combat, seeking, collecting, trade, equipment, and story, and actual path/simulation APIs for some long routes/time advancement. Storage is an explicit Map-backed fixture. Native origins are separately probed and blocked by the host browser policy. Screenshots are application renders, not image-generated art or physical-device performance evidence.

## Not delivered

No online server, accounts, player trading, guilds, procedural campaign, Heaven/Hell/cosmic/ocean maps, subclasses, new weapon family, sockets, companion evolution, mounts, protected-resident integration, public deployment, or universal60FPS promise.

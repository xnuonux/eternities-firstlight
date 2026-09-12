# Firstlight 09 — The Beacon Answers

**A complete offline browser prototype, continuing Firstlight 08.**

Chapter III adds the angel's arrival at the restored Sunward Beacon, three waves of infernal attackers, Oren/Mara/Ilan's supporting roles, Briar's hidden-enemy detection, a recoverable defense, and a choice of supernatural techniques. A new RPG interface replaces the crowded equipment/crafting/adventure drawers. Tab targeting, deliberate autoattack and a seven-button combat bar work across the mine, road and archery court.

This is still a single-player prototype. It is **not** the separate Shared Commons networking experiment, an Unreal project, or a live MMORPG. No paid service, server, account, model call, downloaded art, or private resident record is required.

## Open the game

Extract this package and open **FIRSTLIGHT_VALLEY.html** in Chrome or Edge, or another browser supporting WebGL2. Open the file in the browser itself—not a text-only attachment preview. `index.html` is identical. The map fallback remains available when WebGL2 cannot initialize. No build or dependency installation is needed to play.

An optional local server is included: `python serve.py`. The Windows launcher also opens the offline HTML directly; the Python server is optional, not a required backend. Native file/localhost navigation could not be qualified in the author's automated browser environment; the exact offline document was tested with explicit storage fixtures. See VALIDATION.md.

### Bring your Realm 08 save

Export your current world JSON from Realm 08 first. In Realm 09 choose **More → Import a saved world**, then select the JSON. Import replaces the loaded world, so keep your backup.

World schema is now **8**, adventure schema **4**, beacon schema **1**. Supported world formats 2–7 migrate without overwriting their old browser-storage keys. Realm 09 writes `eternities.realm09.save.v8`. When accessible, an older local key is copied automatically; file-location/browser differences can prevent discovery. Exported JSON is the portable backup, not a guarantee of permanent browser storage. One active tab per saved world is recommended; simultaneous edits are not merged.

`examples/BEACON_READY_EARNED.json` is an optional command-earned Chapter II checkpoint. It starts beside the **road gate in the valley**, not in the middle of a battle. Enter, follow the road north, and approach the beacon. It has no Chapter III completion, Grace, cinder or invasion reward. Importing this example replaces your loaded world.

## Controls

| Control | Action |
|---|---|
| Click/tap ground or WASD/arrows | Walk. Keyboard movement cancels click-to-approach, not deliberate autoattack. |
| Drag; scroll/pinch | Orbit; zoom. |
| R; [ / ]; V | Comfortable follow preset; fixed-angle turn; overview toggle. |
| Tab / Shift+Tab | Next/previous nearby visible target. Selecting does not attack. |
| 1 | Toggle autoattack. It waits for actual range, visibility, recovery and stamina. It does **not** walk you into range. |
| 2 | Weapon skill: blade sweep or bow's Piercing Light. |
| 3 | Brace: half incoming damage for 3 seconds. |
| 4 | Briar: reveal/expose/interrupt a nearby foe; without a nearby enemy on the road, follow a scent. |
| 5 | Optional soul technique: Dawn aegis or Cinder surge. Blank until deliberately chosen. |
| 6 | Drink a healing tonic. |
| Space | Dodge. |
| E | Interact, gather, enter, loot, repair or speak according to location. |
| C / I | Character / inventory. |
| K / J | Unified crafting / journal. |
| B | Existing construction controls. T rotates a construction piece. |
| Escape | Close a workspace; clear target/autoattack first in combat; otherwise open the game menu rather than silently leave an expedition. |
| P / M / H | Pause simulation / opt-in ambience / photo mode. |

Legacy F single strike, Q weapon skill, G tonic, and L road scent remain. **Number keys 1–6 now belong to skills.** Music, people, retreat, appearance, chronicle and settings are under **More**. Equipment is C; crafting is K, removing the old C ambiguity. Dialog focus uses normal Tab navigation, not enemy selection.

Clicking an enemy retains the optional legacy approach-and-attack convenience. Tab + 1 is the manual-positioning alternative. Autoattack stops on target loss/death, scene transitions, opening a workspace, losing window focus, hiding the page or defeat. It does not pull the next enemy automatically or resume after loading a save.

## The interface

**Character:** one paused workspace with a rotatable rendering of your actual procedural visitor, the three implemented equipment slots, item icons, quantity/equipped markers, search, category filters, actual stat comparison, and removable weapon sockets. There are no fabricated helmet slots, critical ratings, rarity rolls or character levels.

**Crafting:** actual bow, blade, gem, tool, component and construction recipes share a workbench screen. Costs show your quantities versus requirements; proximity and ownership are checked. Selecting a blueprint remotely does not let you craft station-restricted items. Oren's starter kit, the archery entrance and Tessa's merchant are retained.

**Journal:** one concise tracked objective on the left, with switchable story and optional homestead tracks. The larger journal contains the chapter steps and walking routes. Selecting a route does not grant its outcome.

**Combat:** selected-target frame, health/stamina, named skills, numerical cooldowns, an autoattack indicator, world-space selection/telegraph effects and brief damage numbers. Busy family/enemy labels are reduced during the beacon assault. Follow/Tactical/Wide camera presets keep normal travel from requiring constant manual orbiting.

The major RPG workspace pauses this local world and restores the prior pause setting. Some older creative/build/settings drawers retain their prior layouts; this is not a complete redesign of every subsystem. The legacy music workspace and ordinary side drawers do not all pause time. Pause manually before a long activity near danger. Online pause semantics are a future separate design problem.

## Chapter III

Finish Chapter II's cart repair and beacon lighting. Approach the beacon on the Sunward Road and press E. A prior home report is not required; meeting here can settle that reward once. Existing Chapter II completions are supported.

Choose **Answer the beacon**. The angel descends and three family figures travel from the road crossing to the ward. This arrival is a short procedural scene, not a voiced cinematic. The community does not become interchangeable soldiers: Oren repairs integrity, Mara exposes attacks, and Ilan helps maintain stamina. Their arrival is locally path-driven; their checkpoint return placement is not a full offscreen-life simulation.

Accept the optional first Grace, or remain mortal. Start the defense when ready. It refills health, stamina and three tonics. Three breaches bring raiders, an ember channeler, a cloaked saboteur and the Chainbound Herald. Some attack you; others advance on or channel against the beacon. Between waves there are seven seconds to regroup.

Stand beside the damaged beacon and E repairs 15 ward for 20 stamina, with an eight-second repair cooldown. Oren also performs scheduled small repairs. Briar can reveal the saboteur; Mara and eventual visibility provide alternatives. The companion command exposes the selected enemy and interrupts its current windup.

If the ward falls or you withdraw, return and reclaim it. Your home, creative work, previous chapters, equipment and companion are not deleted. There is no online/global regional takeover in this version.

A successful defense grants a **one-time 15 sunmarks and pearl moonstone**, collected in the beacon meeting. The projection records a chosen future route—monastery, kingdom, or forest—but these regions are explicitly **not playable yet**.

### Two possible techniques

**Dawn aegis:** accept the Grace voluntarily. Skill 5 spends 25 stamina for a 35-point barrier lasting at most five seconds, and can restore eight ward nearby. Eighteen-second recovery.

**Cinder surge:** after victory, choose to keep or seal the herald's cinder. Keeping it teaches an optional heavy strike; acceptance alone adds no corruption. Invoking it spends 12 health, deals 2.3× attack to a visible targeted enemy within ten paces, and records one corruption point and the enduring `cinder-invoked` history entry. Twelve-second recovery. It cannot spend your final 12 health.

One technique can be equipped at a time; neither is mandatory. Accepting Grace records one Radiance point. Relinquishing an accepted cinder at the beacon removes its technique and current corruption, records relinquishment, and adds one Radiance point. Prior use remains in history. These are **explicit fictional story facts**, not covert behavioral profiling, a full morality simulator or religious judgments about the player.

After completion you can deliberately invite another breach to try weapons and techniques. Repeats award **no additional money, gems, XP or story victory**. Losing a repeat cannot corrupt the already-completed story beacon. Using the cinder during a repeat still counts as using it.

### Persistence boundaries

Introduction, completion, attempts, ordinary failures, chosen route, claimed reward, soul choices and history persist. Targets, autoattack, arrows, barriers, current attackers and wave progress are transient. Loading an interrupted invasion restores the last durable chapter checkpoint with no fabricated victory. Inside scenes save a safe exterior restart location, as before. Choosing to restart a defense refills the battle; there is no offline invasion or offline punishment.

## Earlier systems are included

Both previous adventure chapters, excavation, copper forging, fox rescue and road scents, merchant trading, bows/projectiles, range medal, gems, gathering/crafting, three islands, outdoor construction/crops, four original interiors, personal decoration, visitor customization, authored routines, notebook and real music exports remain. The repository is a continuation of Realm 08, not the reduced Shared Commons prototype.

## Rebuild and test

- `python build.py` — produces identical `FIRSTLIGHT_VALLEY.html` and `index.html`.
- `node --test tests/*.test.cjs` — rule tests, no runtime packages needed.
- `node tests/beacon_journey.cjs` — command-only Chapter III acceptance journey from the included earned Chapter II checkpoint.
- `python tests/rpg_browser.py` — new UI + Chapter III browser journey; requires Playwright and Chromium. Its environment flag overrides file-local storage with a clearly labelled test fixture.
- `python tests/reflection_browser.py` — independent asymmetric landmark readback from the reflection framebuffer.

The older browser scripts document pre-09 interfaces and are not the current UI acceptance suite. Do not total historical pass counts into this release. `VALIDATION.md` records only tests actually run on the delivered source. `SOURCE_MANIFEST.json` inventories source/checkpoints; `MANIFEST.json` covers the delivery package.

## Source ownership and publication

`SOURCE.bundle` contains local Git history, not a claimed GitHub push. Clone it with `git clone SOURCE.bundle firstlight09`. For an existing Firstlight checkout, reconcile changes on a review branch; the provided additive importer refuses conflicting files instead of overwriting another engineer's changes. The earlier repository charter must remain intact.

This release was not pushed, deployed, or merged into `eternities-heaven`. No public software license has been assigned. See `LICENSE_STATUS.md`, `GITHUB_STATUS.json`, and `docs/NEXT_SESSION.md`.

# Firstlight 07 — The Sunward Road

A playable second chapter inside the existing offline isometric action/sandbox RPG. Help a stranded trader, follow Briar to discoveries, evade a guardian’s charge, light a beacon, and bring its light home.

**This is a local single-player prototype.** Characters are authored game simulations. No account, CDN, model service, downloaded art, private Raven/Luna memory, paid service, or online inventory is required. The complete application is one HTML file built from the included source.

## Run

Extract the ZIP, then open **FIRSTLIGHT_VALLEY.html** in a modern WebGL2-capable browser. The Windows launcher opens that same file. A chat application's text preview does not execute the game. A map fallback is available if WebGL2 is unavailable.

Optional loopback-only development server:

```sh
python serve.py --port 8000
```

Open `http://127.0.0.1:8000/`. Ctrl+C stops it; this does not publish a website.

## Keep your world

**Export your current world JSON before upgrading.** Import it through Settings. Supported world formats 2–5 migrate to format 6, preserving supported music, rooms, appearance, notes, flowers, construction, gardening, chapter-I history, equipment, and fox bond. Browser storage varies by file location/browser; JSON is the portable backup. Use one active tab per world. Earlier edition storage keys are not overwritten.

## Play the new chapter

Finish The Feather Beneath Wildwood and accept the envoy’s gift. Rescue Briar in the mine as well: finding the latch uses its new Seek ability. Entry permits exploring without a rescued fox, and you can return to rescue it later.

1. Open **Adventure (8/U)**, choose the Sunward Road route, and walk to the far-water lookout on the blossom island. Press E at the gate.
2. Clear the Thicket prowler. In the meadow west of the bridge, press **L / Seek**. Briar walks to a hidden latch; follow and collect it with E.
3. Bring the latch and **2 copper** to Tessa’s cart. Repair it, then interact again to open her shop.
4. Cross the stone bridge. Overcome the Gloam prism, explore the northern ruins, and confront the Sunscar Ram. Evade the marked charge lane, then attack during its recovery.
5. Clear all three encounters and kindle the northern beacon. Return to the southern waygate, walk home to the spring, and report to the envoy.

The report gives a new charm and makes a commemorative light appear at the Commons. The optional second companion cache is near the eastern ruins.

**Immediate chapter access:** import `examples/CHAPTER_II_START_EARNED.json`. That checkpoint was earned by the automated fresh-world acceptance journey, not made by granting items. Chapter I is complete, Briar is rescued, and you stand at the lookout; no road encounters, caches, or reward are completed. Import replaces your currently loaded world—export yours first. Automated completion is not an online achievement or a human playtest.

## Controls

| Action | Control |
|---|---|
| Walk / orbit / zoom | Click or tap / drag / scroll or pinch |
| Direct movement | WASD / arrows |
| Strike | F, onscreen button, or click a foe to approach and repeatedly strike |
| Dodge | Space; 22 stamina |
| Dawn sweep | Q; 30 stamina |
| Healing tonic | G; restores up to 48 health, maximum three carried |
| Briar: Seek nearby scent | L or Seek; road caches only |
| Interact | E: gate, repair, cache, beacon, envoy, or nearby action |
| Adventure / gear / companion / shop | 8 or U |
| Backpack / craft / build / field guide | I or 7 / C / B / J |
| Music desk | 4 |
| Pause / overview / reset camera | P / V / R |
| Sound / hide interface | M / H |

Touch views have onscreen combat and Seek controls. Stay cancels a pending scent search. Manual movement cancels your automatic enemy approach. Refused commands do not spend materials.

## Delivered gameplay

- A distinct surface-expedition scene: meadow, river, real bridge, caravan, tower, ruins, and beacon.
- Three encounters including a non-homing, collision-checked charging guardian.
- Two persistent companion discoveries, with actual fox travel before revealing them.
- One local NPC shop with four fixed transactions using actual inventory and currency.
- Two new equipment items and a return-home quest reward.
- Replanning enemy/fox movement; actual enemy facing and explicit blocked-ground fox recall.
- Cross-scene cache fixes: revisiting the mine with road loot does not crash or collect it remotely.
- Existing music/WAV/MIDI, decoration, building, farming, notes, original cave, family schedules, and corrected reflections retained.

### Tessa’s exact offers

Buy one tonic for **2 sunmarks**; buy the unique Courier’s storm mantle for **18**; sell **2 copper for 3**; sell **2 sunberries for 1**. Berries are taken from your actual garden inventory. All offers require being near the repaired cart. This is local game currency, not player-to-player trade or a payment service.

The mantle gives +7 guard and +20 maximum health. The return band gives +4 attack, +2 guard and +15 maximum health. Equipment does not refill health. The band competes with the original heartstone for one charm slot. Level cap remains five.

## Persistence and recovery

Completed encounters and unclaimed caches persist. Surviving enemies reset on reentry. Partial enemy HP, active attacks, scent paths, and exact companion positions are transient. Road saves restart at the safe external lookout while keeping chapter facts. Stay does not simulate an offscreen life; Follow can explicitly recall the companion across a scene boundary.

Death offers return to the spring without destroying your home, score, construction, bond, or earned belongings. Pausing freezes gameplay clocks. The daylight setting cannot speed up crops or combat cooldowns. There is no invented offline progress.

World format **6**, adventure format **2**, road format **1**. Storage key: `eternities.realm07.save.v6`. Editable offline saves must never be trusted as proof of online items or currency.

## Build and test

```sh
python build.py
node --test tests/*.test.cjs
node tests/road_journey.cjs
python tests/run_browser_suites.py
```

The browser suites need optional Playwright and Chromium; no script installs them. Existing tests default to `/usr/bin/chromium`; change their executable setting for another environment. Opening the game needs none of these test dependencies.

Read `VALIDATION.md` for exact evidence and limitations; `docs/SUNWARD_ROAD.md` for mechanics; `docs/NEXT_SESSION.md` for the next assignment; and `GITHUB_STATUS.json` for publication status. A local bundle is not a remote push.

No extra realm maps, classes, mounts, evolution, accounts, guilds, PvP, multiplayer, or public hosting are claimed.

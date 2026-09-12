# Firstlight 10 — Bellweather Crossing

Continuous development starts at [docs/CURRENT_STATE.md](docs/CURRENT_STATE.md). Run `python tools/verify.py` for portable source verification. The original edition description below is retained; its delivery-time validation and publication statements are historical. See [the bootstrap record](docs/development/BOOTSTRAP_RESULTS_2026-09-12.md) for this import's actual results and limits.

A complete, local isometric action/sandbox RPG prototype for Dom / Eternities. **This extends the full Firstlight09 game, not the separate Shared Commons networking experiment.** Four small chapters, creative tools, construction, a companion, bows, sockets, an equipment workspace, and the new village are integrated in one offline application.

## Play

Extract the ZIP and open **FIRSTLIGHT_VALLEY.html** in a modern browser. `index.html` has identical bytes. Use an actual browser, not a text preview. No package installation, CDN, account, paid service, API key or external asset request is required.

**Before upgrading, export your current world JSON.** In this edition select **More → Import a saved world** and choose that JSON. Keep the unmodified backup. Browser file storage is origin-dependent; JSON export is the portable backup. This edition uses a separate storage key and accepts supported older world schemas 2–8.

Continue Chapter III until the beacon is defended, then take the **northern arch beside the Sunward Beacon**. Press **M** for named local destinations and known waystones. The new chapter starts in Bellweather Crossing.

For a direct preview, `examples/REALM10_CROSSING_READY_EARNED.json` is a command-earned Chapter III completion, standing at the Commons. Import it, open M, travel to Sunward, then walk through its northern arch. It has no Chapter IV equipment, kills, attunement, quest completion or rewards. **Importing an example replaces the loaded world. Back up first.** The fixture includes its earlier test character's explicit Grace/cinder-history choices; it does not apply those choices to an existing save.

## What's new

- Bellweather Crossing: five exterior buildings, a cobbled square, stream and bridge, wooded trail, and watch-bell court. Rowan gives a quest; Nella provides a free rest on the inn porch; Edda sells a coat/tonic and buys copper/berries; the public forge uses the existing recipes. Building interiors are not newly implemented.
- A full local Chapter IV: meet Rowan, read an inscription, let Briar find the bronze clapper, clear three encounters, repair the bell, ring three resonators, and return for a charm and 18 sunmarks. Completion adds visible windbells to Oren's original workshop.
- The Hushbound Keeper alternates a wide annulus with a safe center and a smaller central strike. The target frame explains whether to step in or out. Existing targeting, skills, bow projectiles, guard and mitigation still apply.
- M opens a numbered map with local walking destinations. Discovered waystones connect the Commons, Sunward Beacon and Bellweather. Travel requires being at an anchor and out of danger; it grants no health, loot or progress.
- Camera cutaway removes part of flagged foreground scenery from the main image when it hides the player. It is configurable. Collision, enemy visibility rules, shadows and water-reflection geometry are not removed with it.
- Two optional village commissions consume actual materials and give one reward each. New lamps or pantry supplies remain in the world. No daily timer or guild/network system is implied.

## Controls

| Key | Action |
|---|---|
| WASD / arrows / click | Move; ordinary click-to-target pursuit remains available. |
| Drag / wheel | Orbit / zoom. |
| R / [ / ] | Follow-camera reset / stepped rotation. |
| Tab / Shift+Tab | Cycle visible targets. Selection does not attack. |
| 1 | Toggle stationary weapon autoattack. |
| 2 | Weapon skill: sweep or piercing arrow. |
| 3 | Brace. |
| 4 | Briar: combat insight; outside immediate combat, contextual scent seeking. The map offers explicit clapper search. |
| 5 | Chosen Aegis or Cinder technique, if learned. |
| 6 | Tonic. |
| Space | Dodge. |
| E | Nearby interaction, dialogue, cache, door or resonator. |
| C / I / K / J / M | Character / Inventory / Crafting / Journal / Map. |
| B / T | Construction / rotate a construction piece. |
| P | Pause. |

The main RPG workspace, including maps and services, pauses the local game and restores the prior pause state on close. Some retained creative/settings drawers follow their earlier behavior. Music and sound remain accessible through their controls; **M now means Map**, not sound.

## What persists

Old supported creative and adventure state, chapter outcomes, owned/equipped items, coins, gems, soul choices, companion bond/name/mode, excavation, buildings, crops, new village attunement, quest flags and commissions. Saving inside an expedition restarts outside at its safe return point. New enemy partial damage, paths, attack warnings, bell input in progress and exact NPC/fox positions are transient.

These are authored game characters, not live Luna residents. The game has no accounts, online multiplayer, server inventory, shared public events, guilds or deployed infrastructure. Editable local JSON is not legitimate online gear. Heaven, Hell, the monastery, ruined kingdom and living forest remain future maps. Unreal remains a later production-client direction.

## Build and verify

```
python build.py
node --test tests/*.test.cjs
node tests/crossing_journey.cjs
node tests/crossing_journey.cjs --bow
python -m unittest discover -s tests -p 'test_*.py'
```

Optional browser tests require Python Playwright and a compatible Chromium developer environment:

```
python tests/crossing_browser.py
python tests/regression09_browser.py
python tests/cutaway_browser.py
python tests/reflection_browser.py
```

`regression09_browser.py` runs the prior edition's UI workflows against the **current** HTML. Its historical screenshot names do not mean the prior HTML was substituted. Evidence10 contains this edition's actual reports. Evidence09, when included, is historical; its old pass counts are not counted again. Native file/loopback browser navigation was blocked here; successful browser storage checks use an explicitly labeled fixture. Read VALIDATION.md for exact counts and limitations.

Full source is in this package. SOURCE.bundle contains local Git history, **not evidence of a GitHub push**. See START_HERE_FOR_CODEX.md before importing into a repository.

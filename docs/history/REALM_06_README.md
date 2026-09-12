# Firstlight 06 — The Feather Beneath Wildwood

A self-contained 2.5D action/sandbox RPG chapter by Eternities. Walk from the existing village into a persistent mine, fight readable enemies, rescue a briarfox, find equipment and copper, defeat the Hollow Hart, and bring a feather home to a white-winged envoy.

**This is a working local chapter, not the full MMORPG.** The valley, four interiors, three islands, building, gardening, notebook, visitor styling, family routines, and music/WAV/MIDI tools remain. All characters are ordinary game simulations. There is no live AI or private Luna data.

## Play

Extract the whole package and open **FIRSTLIGHT_VALLEY.html** in Chrome or Edge (a modern WebGL2 browser). It is a single complete file; no assets, CDN, API key or installation is needed. A plain-text attachment viewer will not run the application. The Windows shortcut opens the same file.

An optional loopback-only server is included:

```sh
python serve.py --port 8000
```

Open `http://127.0.0.1:8000/` in your browser. Stop the server with Ctrl+C. No cloud hosting or public listener is created.

**Export your old world before upgrading.** The Settings/Chronicle import accepts the supported older formats and retains creative/sandbox work. The new save uses a separate key. Browser file-origin storage varies; exported JSON is your portable backup. Use one active tab per world.

## Begin the chapter

1. Press **8** or click **Adventure**. Select **Oren's workshop**, then **Take expedition supplies** when you arrive. You receive a trail blade, coat, lantern and three tonics.
2. Use the existing Backpack/Craft/Field guide to gather timber and stone, craft a pickaxe and planks, and repair the northern crossing. The bridge costs 8 planks and 6 stone. Nothing is secretly granted by the story.
3. Walk to the **mine entrance** using the Adventure route button. Press **E** or Interact beside its doorway.
4. Chip an exposed stone face by clicking it, or stand beside it and press E. The cleared cells are persistent, walkable tunnels.
5. Help the fox after defeating its nearby threat. Read violet enemy warnings, gather caches, equip the recovered vest, and reach the Hart's chamber.
6. After the guardian, collect the feather and separate cache. Return along your path to the **southern lantern exit**. Back at the Commons, interact to hear the envoy and choose one gift.

Optional quick start: import `examples/CHAPTER_START_EARNED.json`. This is an earned checkpoint from the automated fresh-world acceptance journey; it includes paid crossing/pickaxe and workshop supplies, but no defeated enemies, fox bond or relic. **Import replaces the current world; export yours first.** It is not an online achievement.

## Controls

| Action | Input |
|---|---|
| Walk / rotate / zoom | Click or tap / drag / scroll or pinch |
| Direct movement | WASD or arrow keys |
| Attack | F, Strike button, or click an enemy to approach/auto-strike |
| Radial sweep | Q; 30 stamina |
| Dodge | Space; 22 stamina |
| Heal | G; uses one of three tonics |
| Contextual action | E or Interact |
| Adventure | 8 or U |
| Music | 4 |
| Backpack / crafting / construction | I or 7 / C / B |
| Field guide | J |
| Pause / reset camera / overview | P / R / V |
| Sound / hide UI | M / H |

Normal movement cancels automatic mining/attacking. The Adventure panel offers route buttons and companion Follow/Stay. On small screens, use the Chapter card for Adventure and the four cave action buttons for combat.

## What is delivered

One cutaway mine with persistent excavation; four encounters across three behaviors; six named equipment items; weapon/armor/charm slots; five character levels; copper forging; one rescued companion with naming and movement/combat help; safe resurrection; one celestial relic and three-page envoy meeting; one mutually exclusive gift. The old creative world remains intact.

This is a finite starter chapter. Defeated enemies stay defeated; unfinished encounters reset on entry. Saving underground restarts at the safe external doorway while preserving excavation and completed progression. Exact transient companion position and attacks in flight are not saved. Follow can recall the companion across scenes. Stay keeps its scene during the current session; reloading initializes its position beside you.

No random loot economy, classes, enchantments, sockets, merchants, mounts, flight, networked multiplayer, accounts, player trading, or additional realm maps are implemented yet.

## Source and tests

```sh
python build.py
node --test tests/*.test.cjs
node tests/chapter_journey.cjs
```

Python builds `FIRSTLIGHT_VALLEY.html` and `index.html` from the source modules without npm dependencies. Browser tests need Python Playwright and Chromium, documented in `requirements-dev.txt`; they do not install dependencies automatically.

```sh
python tests/browser_test.py
python tests/experience_browser.py
python tests/sandbox_browser.py
python tests/adventure_browser.py
python tests/reflection_browser.py
python tests/native_browser.py
```

Run the chapter journey before the adventure browser test, because it supplies an earned checkpoint. Inspect `VALIDATION.md` for the distinction between real interactions, accelerated simulation, isolated known-answer fixtures, and native-origin limitations.

## Read next

- `docs/FIRSTLIGHT_VERTICAL_SLICE_GDD.md`: complete slice design and implemented/planned boundaries.
- `docs/ARCHITECTURE.md`: module/state ownership.
- `docs/NEXT_SESSION.md`: engineering continuation and acceptance priorities.
- `VALIDATION.md`: actual test results and limitations.
- `GITHUB_STATUS.json`: exact remote publication status, not an inferred success.
- `docs/history/`: preserved older edition notes; not current test certification.

The package includes editable source and a Git bundle. Source and screenshot rights/licensing remain subject to `LICENSE_STATUS.md`. No font files, proprietary game assets, private account data or credentials are included.

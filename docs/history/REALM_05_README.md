# Firstlight 05 — Wildwood Reach

An original, offline 2.5D sandbox by Eternities. Explore a small archipelago, gather materials, craft tools, repair a crossing, and build a homestead. The creative valley remains: a playable music desk with WAV/MIDI export, a furnished retreat, house interiors, and a simulated family.

## Play

Open **FIRSTLIGHT_VALLEY.html** in a modern browser after downloading/extracting it. Do not open it in a text/attachment preview. `index.html` is an identical standalone build. Both contain their own code and styling; no CDN, API key, account, model, samples, fonts, or art assets are requested.

For a conventional local origin, use `python serve.py`, or the Windows launcher, and open the address it prints. The built application uses WebGL2 with a map fallback. The test environment used software-rendered Chromium, not a physical GPU or phone.

**Keep a world JSON backup.** Settings → Export world. This version imports v2/v3/v4 worlds and writes v4 saves under a new browser-storage key, without overwriting the earlier keys. Native `file://` storage is browser-specific. If the game reports “Memory only”, export before closing. One active tab per save is recommended.

## The first complete loop

1. Open **Backpack** (`I` or `7`). Find a timber tree, stone seam, or fibre patch. Clicking a resource approaches it and harvests repeatedly; `E` makes one nearby swing.
2. Gather timber and stone. Visit Oren's workshop and craft an axe and pick. Refine timber into planks. Recipes show exact input costs and whether a nearby workbench is required.
3. At the **Northern Crossing**, spend **8 planks + 6 stone** to repair the bridge. Walk across to **Wildwood Reach**.
4. Mine moon crystal with the pick, craft a garden lantern, and start a homestead on the **7 × 7** plot. Select Build (`B`), choose a piece, and click a highlighted cell. Green is valid, red explains why placement is refused.
5. Make a growing bed, plant a seed (`E`), water it (`E`), and return after **90 seconds of active simulation** to harvest sunberries and seeds. Pausing stops growth; changing the time-of-day slider does not fast-forward it.
6. Keep creating: arrange a terrace, stack stone, build walls, add a bench, hearth, lanterns, or your own workbench. Reclaim the topmost piece to return its crafted item to your backpack.

There is an optional six-step field guide (`J`), not compulsory quest grinding. The starting world has four seeds but no gifted building materials. Tools do not break. Resource nodes regrow on active simulation time. Sunberries are collected; eating/hunger is **not implemented**.

## Controls

| Input | Action |
|---|---|
| Click/tap ground; WASD/arrows | Walk |
| Click a resource | Approach and gather; manual movement cancels |
| Drag; wheel/pinch | Orbit; zoom |
| E | Nearby interaction; harvest; plant/water/collect; enter/leave |
| I / 7 | Backpack |
| C | Crafting |
| B | Building |
| T | Rotate a selected blueprint |
| J | Field guide |
| Escape | Leave build/auto-gather mode or close panel |
| 1 / 2 / 3 | Explore, inhabitants, chronicle |
| 4 / 5 / 6 | Music desk, room decoration, visitor appearance |
| R / V | Reset camera / archipelago overview |
| P / M / H | Pause / sound / photo interface |

Touch building uses a target-selection tap followed by Place (or a second tap). The Build panel also provides a labeled 49-cell chooser. On narrow screens, less-used panels remain under Explore and Settings rather than overflowing the toolbar.

## What is real here

- Eighteen harvestable nodes, twelve crafting recipes, eight placeable piece types, a repairable bridge, a third island, and persistent local gardening/building.
- Crafted inventory is consumed only on accepted commands. Local command IDs reject duplicate or conflicting retries within a bounded saved history.
- Placed solids affect navigation. The central approach stays clear; placements cannot occupy the visitor or seal their exit. Masonry stacks to three courses; removal proceeds top-down.
- Corrected planar water reflection uses `Projection × View × WaterReflection` and is tested with asymmetric landmarks.
- The original music editor makes real synthesized audio and MIDI; it is not a mock audio interface.

## What is not implemented

No infinite/procedural chunk streaming, arbitrary terrain excavation, caves, combat, survival meters, online inventory, multiplayer, cloud save, user accounts, or live AI residents. Decorative village trees and houses are protected scenery rather than harvestable nodes. The finite homestead is not yet a full voxel building engine. NPC dialogue and routines are authored simulation, not cognition or consciousness evidence.

Heaven is a separate repository and game. This update does not alter it or any Luna system.

## Develop

```bash
python build.py
node --test tests/*.test.cjs
```

No npm dependencies are required for the application or Node tests. Optional browser verification requires Python Playwright and Chromium; see `requirements-dev.txt` and `VALIDATION.md`. Edit `src/`, never only the generated HTML. `docs/GAMEPLAY.md`, `docs/ARCHITECTURE.md`, and `docs/NEXT_SESSION.md` describe the current seams and next work.

The optional homestead JSON under `examples/` is a clearly labeled test/showcase world. Importing it replaces the currently loaded world—export yours first. It was assembled with real gather/craft/build commands but uses controlled clock advancement and visitor repositioning for capture. It is not a recorded user's progress.

See `docs/GITHUB_PUBLICATION.md` for precise remote status and `VALIDATION.md` for actual test counts and limits. Specifications, rendered previews, and test fixtures do not establish MMO readiness or a 60 FPS guarantee.

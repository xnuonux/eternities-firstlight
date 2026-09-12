# Realm 06 — The Feather Beneath Wildwood

2026-09-11. Adds one complete local adventure chapter to Realm 05: cave excavation,
combat/telegraphs/dodge/healing, fixed loot/equipment/levels, one fox companion,
single-claim forging, safe resurrection, feather recovery and envoy dialogue/gift.
Adds world save format 5 with migration; maintains the older creative/sandbox systems.
New tests include 66 domain cases and a full earned journey. See VALIDATION for
current browser checks and limitations. No online service or additional realm shipped.

## Earlier editions (historical)

# Changelog

## 5.0.0 — Wildwood Reach

- Added `sandbox.js`: harvestable resources, typed inventory, tool requirements, crafting, costs, workbench proximity, bridge repair, construction, crops, persistence and bounded command deduplication.
- Added `sandbox-ui.js`: backpack, recipe book, build preview, touch placement, keyboard controls, field guide and auto-approach harvesting.
- Added `sandbox-art.js`: the third island, broken/repaired crossing, resource geometry/depletion, accepted construction, crop growth, preview and hit feedback.
- World-save version 4 imports v2/v3 without erasing creative work; browser writes use a new key.
- Placed objects participate in movement collision. Supported layering, maximum masonry height, central access and player exit are checked before acceptance.
- Updated overview, fog and shoreline calculations for three islands. Retained `P*V*H` reflection construction and its rendered orientation checks.
- Added 42 local domain tests, four presentation-owner regressions and 60 offline sandbox browser checks. Re-ran earlier creative/simulation/browser/reflection paths.

- Fixed the old creative presentation tick overwriting construction previews; build ghosts and grid now survive repeated frames.

## 4.0.0 — reflection repair and visual polish

The initial Firstlight repository package corrected reversed planar reflections using `P*V*H`, added eight asymmetric rendered sample checks, and polished shorelines, water and village detail. Preserved as a separate supplied ZIP.

## 3.0.0 — a place of your own

Added the blossom island, retreat decoration, visitor style, working two-bar music editor and real WAV/MIDI/score exports. Simulated family can gather at the stage. Local/offline only.

## 2.0.0 — Firstlight Valley

Self-contained renderer, original procedural archipelago, authored family routines, rooms, notes, flowers, controls, time/weather, storage reporting and JSON backup.

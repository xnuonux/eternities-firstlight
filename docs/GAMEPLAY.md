> Earlier sandbox gameplay reference. For the two adventure chapters and current controls, read ../README.md and SUNWARD_ROAD.md.

# Sandbox design and working contract — Realm 05

## Direction

Borrow the useful *loop* of gathering, making, discovering, and shaping a home—not assets, names, creatures, progression tables, or proprietary systems—from the genre references. Firstlight remains an original isometric 3D-rendered world with bounded navigation. It is not a direct Minecraft or Terraria reproduction.

The first gameplay arc is self-contained: material → tool → crossing → new material → authored homestead → renewable garden. The creative tools and settlement are not sacrificed for survival chores. There is no hunger tax, tool breakage, paid currency, or punitive failure in this version.

## Resources and recipes

`src/sandbox.js` is the authoritative local catalogue. A harvestable node has one stable ID, kind, position, remaining hit points, and regrowth deadline. A node exhausted by a swing yields materials once, not on every subsequent animation. Eighteen nodes are distributed over the village outskirts and northern island. The original village scenery is not destructible.

Timber and stone take four basic swings; the relevant crafted tool doubles damage. Fibre takes one swing and returns a seed as well as fibre. Moon crystal requires a pick. Hits are range-checked and rate-limited against simulation time. Regrowth uses 90–180 active seconds by resource type, never wall-clock time. The persisted deadline and remaining health are validated.

Refinement recipes work in the field. Tools, benches and lanterns need a workbench. Two public benches and crafted benches share the same proximity check. All costs are checked before any material changes. Unique tools cannot be crafted twice. Item quantities are bounded integers, capped at 999; excess-yield cases are rejected rather than silently destroying inputs.

## Construction

The Wildwood plot has 49 cells, 1.65 world units apart. Each supports a floor layer and a surface layer. Masonry may extend through three layers with continuous supports. Every record has a stable ID, kind, grid cell, layer and quarter-turn rotation. The plot is finite and validated on import, with a 160-record ceiling.

The gold central lane excludes solid structures so the approach remains usable. Beds and floors do not block it. Other solids affect pathfinding; the visitor cannot place a solid on their current position, and an additional bounded flood check preserves an exit from the plot. This is a game rule, not a general-purpose navmesh proof.

Placement checks bridge access, outdoors, reach, cell, resource count, layer, overlap, exit and geometry before mutation. Reclaim operates top-down, returns the crafted piece, and refuses a planted bed until its crop is collected. Supporting a roof, building arbitrary elevations and climbing blocks are future mechanics, not hidden features.

`src/sandbox-art.js` draws the exact accepted records and their live crop stages. Preview ghosts never commit inventory. Input selection belongs to `src/sandbox-ui.js`; the domain neither queries DOM nor trusts a green preview as permission to commit.

## Growing

A growing bed proceeds empty → seeded → watered → ripe → empty. Planting spends one seed. Watering starts a 90-second active timer. Harvest returns three berries and two seeds. No automatic catch-up farming happens while the application is closed. Pausing stops it. The visual clock slider is not a farming accelerator. Berries have storage value only for now; cooking and food effects are a next-stage design task.

## Persistence and retries

The new `sandbox` substate has schema version 1; the enclosing world becomes version 4. User-edited JSON is never a trusted online entitlement. v2/v3 saves gain a fresh sandbox without discarding the existing music, retreat, garden, notes, character, or relationships defined by the authored simulation.

A bounded journal remembers 128 accepted command IDs with their payload fingerprints and results. An identical retry within that window is acknowledged without spending again; reuse of the ID for a different operation is refused. This is **not** universal exactly-once delivery or permanent replay protection. A future server requires authenticated actors, server-side transactions and sequence handling.

Opening an older key copies into the new key after validation; it does not mutate the old save. Storage acknowledgement remains distinct from in-memory success. Explicit JSON export is the portable recovery path.

## Accessibility and visual language

The scene keeps the orthographic camera and warm green/gold palette. Resource outlines and interface text accompany highlights. Build preview validity is expressed in words as well as color. Labeled buttons and a tile grid complement mouse targeting. Reduced environmental motion, quality modes and the top-down map fallback remain. Physical accessibility testing is still needed; automated checks are not a certification.

## Next expansion boundary

Prioritize one authored cave/mineshaft with mineable wall cells, a material gate, a readable entrance/exit, a portable light source and persistent excavation. First prove useful blocks and navigation before unlimited terrain, automated industries or multiplayer economics. Keep the village protected by default. Avoid grafting Heaven's combat loop into Firstlight merely because the renderer is shared ancestry.

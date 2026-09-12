> Current edition: Realm07. This retained architecture describes the earlier foundation. See SUNWARD_ROAD.md and README for world6/adventure2/road1, the new scene, and current evidence.

# Firstlight 06 architecture

## Current runtime

Browser → `app.js` input/coordinator → `core.js` Simulation → sandbox/creative/adventure domain state → procedural world/art adapters → custom WebGL2 renderer. No game server or live model host exists.

`build.py` inlines the owned modules and CSS into one offline document. It does not fetch dependencies, assets or execute unknown build hooks. `index.html` and `FIRSTLIGHT_VALLEY.html` are byte-identical outputs.

## Module owners

- `adventure.js`: persistent chapter schema; migration validator; cave topology and visibility; bounded commands; HP/stamina; equipment/levels; enemy/companion simulation; loot and story eligibility.
- `adventure-art.js`: gate, mine cutaway, dynamic rock, creatures, companion, effects, relic and envoy geometry; read-only domain adapter.
- `adventure-ui.js`: objective/status panels; bounded interactions; target approach; story/failure modals; controls and labels. Mutation uses `Simulation.adventureCommand`.
- `core.js`: world state format 5, supported legacy migration, pathfinding, simulation stepping, safe exterior snapshot for interiors, save status.
- `sandbox.js`: gathering, recipes, crossing, construction and crops. Its inventory is not the new equipment catalogue.
- `creative.js`, `experience.js`: score/audio/WAV/MIDI; retreat furnishing and visitor styling.
- `world.js`, `sandbox-art.js`: old valley/interiors and persistent construction presentation.
- `engine.js`: instancing, lighting, shadow, water reflection and picking. Cave adds explicit torch illumination/ambient configuration. Reflection remains `P*V*H`.
- `app.js`: lifecycle, input, camera, panels, scene switching, map fallback, audio access and test observability.

## Persistence versus transient state

Persistent: chapter progression, excavation/chips, fixed defeated IDs, unclaimed caches, materials, level XP, HP/stamina, tonic inventory, owned/equipped item IDs, companion bond/name/mode, relic, envoy, gift, deaths and bounded successful-command receipts. Existing creative/sandbox state is preserved.

Transient: enemy current damage/position/attack; cooldowns; exact companion position; FX; camera; target intent; internal room navigation. Saving inside a scene records the exterior restart point, not an arbitrary invisible interior. Returning to a mine regenerates unfinished encounters and retains defeated ones.

The 100-record receipt list is retry assistance. One-time progression flags independently block repeated claims. This is not trusted remote state; a local user can edit their JSON. No offline values may be adopted as verified online wealth later.

## User/control boundaries

A UI button cannot grant loot at a distance or equip an unowned item. Digging opens only valid interior cells with an exposed face. Hit resolution checks distance and line of sight. Rest/forge/reveal require valid outdoor locations. A menu cannot open a home to escape a cave from anywhere. At zero HP normal input stops, but safe revival remains available, including when paused.

Narration follows accepted state; it is not a source of rewards. Labels, notes and companion names do not execute HTML. Source test hooks are available only when the explicit testing flag is set. No test hook changes the fact that offline source is user-controlled.

## Future networking seam

Move accepted commands and state to a qualified server room while clients render snapshots and predict bounded movement. Define input sequencing, revision checks, reconciliation, reconnect and receipt storage before trading or shared rewards. Preserve separate offline and server-trusted worlds. This document does not claim a network protocol or server implementation exists.

Protected residents belong to a separate host/lifecycle model. No world save or player action gets authority over a hypothetical resident's identity. Heaven remains a separate repository until the founder explicitly chooses a content/technology migration.

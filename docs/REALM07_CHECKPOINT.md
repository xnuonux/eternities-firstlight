# Firstlight 07 — The Sunward Road

Prepared 2026-09-11. This is a development checkpoint, not a deployment or a claim of MMO readiness.

## What is actually on this branch

`src/road.js` is the actual route geometry, encounter/cache catalogue, road-state validator, and objective module used by the locally delivered application. `tests/road-domain.test.cjs` independently exercises that module with Node. Run:

```sh
node --test tests/road-domain.test.cjs
```

These six standalone tests are only a subset of the complete test suite. This branch also retains the earlier chapter-I design/import documents from its parent.

**The full runnable application and integrated source are NOT completely uploaded on this branch.** They are supplied in `ETERNITIES_FIRSTLIGHT_07_REPOSITORY.zip` in the originating conversation, alongside `FIRSTLIGHT_07_OFFLINE.html`. A checkout of this branch alone is not the playable game. Do not mistake the independent module tests for a complete remote build.

The full source package includes both chapters, the existing creative/sandbox systems, all current rule tests, browser harnesses, real screenshots, an earned chapter-II checkpoint, and a source Git bundle. Its additive importer refuses conflicting existing files; review changes before committing an import. No external archive reconstruction or private credentials are needed to use the supplied ZIP.

## Delivered playable changes

The far-water lookout opens the Sunward Road after the envoy's first gift. The new surface scene contains a navigable meadow, river and real stone crossing, a stranded merchant's caravan, ruins and a beacon. Distant architecture is nontraversable scenery.

Briar's Seek action selects a nearby reachable scent and walks there before revealing the cache. Collection is a separate validated action. Recover the cart's latch, defeat the prowler and bring two copper to repair Tessa's cart. The optional second cache is near the northern ruins. Stay cancels a pending search.

Tessa's four local offers are: buy one tonic for two sunmarks (carry at most three); buy a unique storm mantle for eighteen; sell two copper for three; sell two actual garden sunberries for one. These are local NPC transactions, not real money, player-to-player trade, or a secure online economy.

Three route encounters extend the combat. The Sunscar Ram marks a lane, locks direction, charges along it with swept collision, and can damage the player only once per charge. It does not home after commitment. A recovery interval creates an opening. Enemy body orientation follows actual yaw; enemies and the fox re-plan around blockers.

Clear the three encounters, kindle the beacon, walk back through the southern gate and report at the village spring. A new charm and a visible commemorative light are awarded once. The original gift choice remains intact. The original mine, music/WAV/MIDI exports, decoration, building, gardening and saved history remain.

A cross-scene bug was fixed: mine labels/context/interactions now skip unclaimed road caches instead of dereferencing them as cave enemies. The browser test obtains a real unclaimed road cache, reloads it and walks back into the mine to check that boundary.

## Tested build identity and evidence

- Version: 7.0.0.
- Standalone HTML: 291385 bytes.
- HTML SHA-256: `45154024be410b799dd5889c2c49b0206d600fd1941b045ac6927f4de406e584`.
- Local rules: 240 tests passed, including 50 new route/domain checks and the earlier 190.
- Browser journeys: 309 checks passed across original-world, creative, sandbox, chapter-I and road suites.
- Reflection orientation: eight rendered red/green landmark samples passed.
- A fresh-world domain journey earns chapter I and then chapter II through accepted commands; no inventory grants, player-position edits or planted defeats. Automated tactics and accelerated simulation are not a human balance study.

The complete reports and current file hashes are in the ZIP. Browser execution used the exact standalone HTML in an offline page and explicitly labeled Map-backed storage fixtures. File and loopback navigation were blocked by the host browser's administrator policy. Native-origin persistence, physical phones, Firefox/Safari, actual GPU performance, and 60 FPS are not certified. A rendered preview is not a performance benchmark.

## Save compatibility

World format 6; adventure format 2; road format 1. Supported earlier world formats 2–5 migrate. The new key is `eternities.realm07.save.v6`; earlier keys are untouched. Export the user's JSON before moving versions or file locations.

Completed encounters, discoveries, claims, cart repair, beacon and return reward persist. Surviving encounters reset on reentry. Partial enemy HP, active attacks, exact fox position and search paths are transient. Saving on the road restarts at the exterior lookout. Editable offline saves must never mint trusted online rewards later.

## Next work

Read the package's README, `docs/SUNWARD_ROAD.md`, `VALIDATION.md`, and `docs/NEXT_SESSION.md`. Prioritize actual-device combat/camera/companion feel, then a bounded new weapon choice. A two-client authoritative-room experiment is a separate task; it must not trust local JSON inventory.

No main-branch merge, public deployment, paid service, Heaven repository merge, model call, private Raven/Luna history, or protected-resident mutation occurred. GitHub write actions worked for the files listed above; the publication limit is incomplete bulk upload, not a claim that the connection is read-only.

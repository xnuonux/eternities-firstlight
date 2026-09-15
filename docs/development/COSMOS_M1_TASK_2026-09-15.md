# Cosmos M1: a road under an extraordinary sky

Dom explicitly resumed development on 2026-09-15 and asked Codex to use Astra's new vision. This is a new bounded implementation, not a restart of the expired timed automation.

Base: `bdad75b70b7762f6ef89fe0982ebc07cd4ddef0c`, PR #13, `gameplay/outing-readability`. Design: PR #14 archive `799a0a467dd11b50742c3b441c45e807e4454443`. The complete Drive package SHA-256 is `c39b211390875dd166392eb3c136a37dc38dfc7727cc8eff2cd815e9555427e2`, verified locally. README, first prototype, source review, art/coordinate guidance and the M0/M1 assignment were inspected. Historical proposals remain evidence; the user's current request authorizes this build. The game was not replaced by the archive.

## Playable boundary

An optional physical invitation beside the valley observatory leads into `cosmos-near-expanse`. A preview explains two continuous ground approaches, the occupied overlook, no combat/reward in this first opening, and an always-available return. Three Lamps, a usable sheltered bench, a rising open road, Rootcut Lane, real cover, the converging landing and Anik's inhabited observatory provide a complete walk out and back. One stable up vector; no platform jumping, gravity trick, class/XP/item grant or campaign advancement. The moon is an invented, fixed fold image beyond the physical terrain, never a target or destination.

The current level cap and all equipment projects remain. This is M1 geography and safe travel; contracts, Glassjaw, personal route outcomes and Parallax Fitting belong to later review slices.

## Ownership and compatibility

- `cosmos.js`: fixed ground rectangles, cover footprints/heights, slopes, landmarks, transient travel ticket and recovery. `core.js` dispatches navigation; existing pathfinding remains authoritative.
- `cosmos-art.js`: original geometry from the same ground and cover definitions; warm stone/timber/bronze, sparse living green, indigo distance. `engine.js` supplies the isolated sky palette and height-aware surface picking. The rest of the renderer remains.
- `cosmos-ui.js`: destination preview, interaction, route map, local guidance and explicit return in the existing paused workspace. App owns active simulation/storage identity and scene construction.
- No durable Cosmos record is needed. World/key 9, adventure 7, classPath/roster/starter/pursuit/arsenal/cameraViews 1 stay unchanged. Save and reopen use the acknowledged valley checkpoint, as existing transient expedition scenes do. This is stated before entry, not disguised as a saved cosmic checkpoint.
- A preview ticket binds the simulation reference, active character, library revision, source position and intended destination. Confirmation revalidates those facts. Save the source before any scene mutation; refusal leaves the player outside. Construction failure rolls back to the source scene. Closing or superseding the preview invalidates it. Switching characters invalidates old tickets and preserves each complete world. Follow companions travel; Stay companions remain where commanded.
- A fall/out-of-bounds recovery recalls to the arrival point without item, health or story changes. Normal return works from anywhere. No persistent visits, observations, rewards or new consent are inferred from looking at scenery.

## Verification and delivery

First add failing behavior coverage for both connected routes, collision/ray occlusion, movement grades, ticket ownership, save refusal, rollback, recovery and snapshot/reopen. Then wire actual player callers and test the visible entry/return/map, both cameras, companion/body clearance, low/reduced-motion view and character switching. Use fresh synthetic and command-earned returning fixtures only. Inspect rendered views and record normal-time gameplay separately from accelerated setup. At the review gate run the current verifier and browser suites, push a stacked draft PR, and verify a clean remote clone. Report exact counts and any failure/skip. No main merge or public deployment.

Human acceptance remains pending: does the first horizon feel like a place worth walking into; are both routes and the way home clear; is the third-person/diorama framing comfortable? Names, scale and pacing are prototype choices.

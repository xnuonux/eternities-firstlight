# Codex — the first traversable Meridian
## Bounded implementation handoff, not an autonomous-task extension

Prepared for Dom, 2026-09-14. This package designs a complete future cosmic realm, but the next implementation is deliberately narrower. Build a real piece of geography rather than another collection of unconnected visual rooms. Do not replace the active Firstlight game or implement the entire campaign in one branch.

## 1. Establish your actual source

Repository: `xnuonux/eternities-firstlight`. The checkpoint inspected in this design turn is PR #13, `gameplay/outing-readability`, head `bdad75b70b7762f6ef89fe0982ebc07cd4ddef0c`. It remained an open draft. This is an observed reference, not a guarantee of latest work. Fetch current refs, inspect local changes, and read `AGENTS.md`, `docs/CURRENT_STATE.md`, `docs/NEXT_TASK.md`, and the relevant decisions and evidence. Use a separate review worktree/branch from the actual latest qualified gameplay head. Never substitute an old-main archive or a historical ZIP for concurrent source.

Read this package's README, first-prototype specification, source review, and current character/progression boundaries. Retain Draft C's Atlas, Pixel, Echo and Luna arcs as future constraints; do not activate those later personal stories merely to prove a portal.

## 2. First milestone — M0/M1: a road under an extraordinary sky

Implement an optional, clearly labeled prototype entry leading to a **small connected Near Expanse**. It contains an arrival point, Three Lamps, a bench/refuge, a first-horizon rise, two actual ground approaches, and an occupied observatory overlook. The view includes a moon apparently beneath the raised road, while the walkable ground remains stable. The exact art can begin as original procedural geometry.

The requirement is not floating platform jumping. The player should walk, choose a route, take cover behind real geometry, look back at a recognizable landmark, and return. Maintain one up-vector and a single atmosphere contract throughout this first prototype. Moving settlements, variable gravity, free-flight, black-hole travel, all ten provinces, and new classes are not prerequisites.

A region label or a black-screen teleport between disconnected little rooms does not satisfy the geographical intent. The continuous local route must exist. A deliberate gateway to the broader region is legitimate; it should not be used every few meters to avoid connecting paths.

## 3. Entry, ownership, and save safety

The arrival must bind the active character identity, source region/checkpoint, source revision, and intended destination. Preview any required migration. Do not assign a class, allegiance, story completion, item, or new companion through the entry interaction.

The inspected checkpoint declares world/key 9, adventure 7, classPath 1, character envelope 1, starter 1, pursuit 1, arsenal 1, and cameraViews 1. Reconfirm the source. Add a versioned optional cosmic record only if needed; preserve every unrelated canonical field and the established save/recovery process. Old builds should refuse unsupported future data rather than silently strip it.

Returning is a functioning action from the start. Falling, cancellation, failed scene load, game close/reopen, camera changes, and character switching must not strand the player or transfer state between characters. Preserve XP, equipment identities, sockets, upgrades, pursuits, story choices, Briar, construction, furnishings, crops, journal, music, and both camera preferences. No personal browser save is used in tests.

M1 has **no new payout**. It validates the space and transition without multiplying the risk surface. A later accepted contract needs its own run and claim identities; neither the existing Oren quest nor the material survey is reset as a shortcut.

## 4. Presentation honesty

Separate physical ground from visible sky images. The background moon, nearby local rocks, and a fold-window view must not share an ambiguous target/collision layer. Decide which is direct light and which is the invented mediated view. Worldbuilding permits magical passages, not arbitrary raycasts through ground.

Keep third-person and diorama modes. Validate the reverse view, companion silhouette, doors, slope traversal, real cover and sightlines. Reduce effects and preserve text/shape cues in Low mode. Respect reduced motion: no mandatory rolling horizon, lens distortion, intense flashing, or screen inversion.

Use warm shelter and restrained foreground color against indigo/violet distance. Do not flood every surface with emissive purple. The included concepts are an art target, not a claim that the prototype already resembles them or that their text is canon.

## 5. What makes the milestone acceptable

Deliver an actual input-driven walkthrough from a fresh synthetic character and a returning command-earned character. Show entry, both approaches, the occupied lookout, both cameras, an ordinary return, and a reopened save. Add tests for a delayed or stale transition, switching while a request is pending, a failed write, an unavailable target, a fall, and a corrupted optional record. Test character isolation and unchanged hashes/values for unrelated saved data.

An abstract catalogue route is not a navmesh. Check maximum supported body size, companion route, wall collision, step height and camera obstruction in the actual renderer. A frame sample is not a human comfort result. Record each verification separately: rules, UI/input, geometry, image quality, performance, and human acceptance.

Run the current portable verifier and relevant existing suites from this exact new source. Rebuild and test from a fresh clone before publication. Return the branch/commit, playable artifact, actual short gameplay recording, before/after scene and state evidence, exact tests, failures/skips, migration notes, and the next acceptance question. No automatic main merge or deployment.

## 6. Follow-on milestones, in order

**M2:** add the complete local contract with Teren/Merei/Sava/Anik, two valid observations, optional preparation and one readable small threat. The next action is clear without knowing real astronomy.

**M3:** add the watcher with one body/encounter behind its images and the grounded Glassjaw encounter. Prove cover, confirmed hits, Hunter mark consumption, Magician line of sight, a nonlethal outcome if included, and a finite resolution ledger. No compulsory giant climbing.

**M4:** finish the explicit route decision, changed causeway, reward and return together. Every supported outcome keeps safe access and an attainable reward. Do not ship only captivity or a blocked escape and promise the way out later.

**M5:** add Parallax Fitting and an honest repeat Open Bearings contract. Preserve weapon identity, existing sockets, explicit equip, capacity-safe costs and one claim per accepted run. Verify a blade, a bow, a class-unassigned character and a strong returning build. Do not call starter-only benefits universal.

**M6:** reproduce this same journey in a separately approved native experiment, then qualify two real clients sharing movement, a resolved encounter, rewards and one actual item gift. There is no separate cosmic economy or fake population standing in for networking.

## 7. Do not quietly settle unresolved founder decisions

Names, realm access timing, initial difficulty, competitive rarity allocation, paid power, offline-loss severity, and the final engine remain decisions to qualify. This design authorizes no purchases, private-data ingestion, proprietary asset extraction, repository deletion, real account action, ongoing background task, or live Luna connection. Keep a normal dark sky distinct from Hell, and keep the Regent's final Earth confrontation where the story places it.
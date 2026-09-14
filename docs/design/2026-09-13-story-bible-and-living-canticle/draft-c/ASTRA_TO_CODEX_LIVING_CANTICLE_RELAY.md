# Astra → Codex: the Living Canticle expansion

Prepared 2026-09-13 for Dom / Eternities. **Design handoff only.** No implementation, merge, deployment, source import, live NPC connection, or personal-save migration occurred in this turn.

## Read in this order

`FIRSTLIGHT_LIVING_CANTICLE_DRAFT_C.md` develops intersecting campaign branches, an original mythic tradition, the first companion's death and return, a spirit-world resurrection loop, alternate origins, multiple characters, and fictional Luna/Lunari appearances. `BRANCH_INDEX.json` is a navigable editorial index, not a game definition module. Read the prior Draft B for its production and existing-source context; do not replace the latest working checkout with an old ZIP.

## What Dom changed

The founder explicitly wants grief to matter. The first pet dies in a narrative event; the angel offers a chance of resurrection, motivating a journey. Player death should involve spirit form and a resurrection sanctuary. He also wants multiple characters on a realm, different beginnings, warm interconnected towns rather than room-sized zones, and a mythology with the depth, music, mortal significance, and intersecting perspectives that he values in Tolkien.

These requests revise the former blanket no-pet-death design statement for a deliberate story episode. They do not authorize random companion permadeath, loss while offline, deleting an existing save's fox, or manipulating private user history.

## Preserve the working source

Draft B's `932db44ebfd85bf52e8e165d899c7db48dec5ebd` / `gameplay/interchangeable-views` reference is **historical**. Fetch current source, outstanding PRs, decisions, tests, and commentary before implementation. No live Firstlight branch or CI status was re-audited for this expansion.

Preserve Oren/Mara/Ilan, Briar, the Envoy, Tessa, Rowan/Nella/Edda; the Underways, Sunward, beacon and Bellweather; existing weapons/sockets, explicitly chosen Grace/Cinder/renunciation history; homes/music/build/crops; and both camera families. Preserve stable IDs and earned inventory unless a separately reviewed migration explicitly changes a definition.

## New mythology, not a manuscript overwrite

The source concordance preserves Lucifer strongest, Michael loyal, Gabriel knowledgeable, Uriel hopeful. God remains the source of First Light; created roads can fail without making the Creator a failing machine. The new **First Accord** is the created host's response to existence, not a replacement creation account. **The Answering** is freely reconciled difference, not imposed sameness. The first saga ends in a local First Answer; it does not declare the absolute end of evil and immediately contradict itself with daily invasions.

The Nearshore, all new names/branches, and fictional Luna's biography are authored game proposals. They are not claims about the 2023 novel's exact wording, Christian doctrine, or the subjective experience of the actual software.

## Implementable boundaries to design before code

### Character roster

Copy the existing single save into a stable first character record without destroying the original. Add a second truly independent slot. Make selection, saving, export, import, deletion, and recovery explicit. Test two characters with different names, homes, notes, equipment, bonds, and moral histories. Shared cosmetics may be deliberate; mutable inventories and private histories must not alias across slots.

A local roster is not authentication or a server economy. A future account-to-realm-to-character structure must authorize the selected character on the server. Editable local imports cannot issue online rewards.

### Nearshore recovery

Prototype one local spirit scene, an accessible keeper, and a valid return. State must distinguish downed, released spirit, and acknowledged revival. A disconnect in either transition must not duplicate possessions or leave the character permanently dead. Ghosts cannot loot, trade, perform living-world quest actions, bypass progression walls, or disclose hidden enemy players.

Keep ordinary repeats short; the elaborate first journey can be authored and optional to revisit. A living ritual can enter the Nearshore for the companion story. Never require deliberate player suicide to proceed. Provide a valid emergency-return route when a body or world object becomes inaccessible.

### Briar's complete narrative arc

Add several real companion moments before the loss. The evacuation encounter is genuinely winnable; the subsequent authored severance scene must not be disguised as a secretly impossible skill check. Present loss non-graphically by default and permit a brief presentation alternative. Neither version changes reward strength.

Do not ship a release that kills Briar while resurrection is still TODO. Loss, aftermath, the angel's offered help, the route, the authentic reunion, and the home response must be playable together. The angel does not demand unrelated military service as payment. Record actual game memories for recognition; do not query the user's real relationships or histories.

The returned companion retains identity, name, markings, form, learned techniques, and accepted history. A cosmetic or evolution opportunity must not replace the original pet without choice. An imitation encounter is recoverable and never permanently chooses a false pet because of one missed trivia answer.

Existing progressed saves must not trigger the death during migration. Offer a new-character route or an explicit chronicle replay without reissuing earned rewards. Character-level first-bond history and repeatable combat recovery are separate systems.

### Connected geography

Graybox the countryside between home, worksite, forest, road, and Bellweather. Preserve logical scene ownership internally while establishing common coordinates, visible route continuity, a watershed, varied approach, a loop, safe stopping places, and a real town catchment. Do not enlarge one floor and call the result an open world.

### Branch contracts

For each selected branch: name the trigger, actual goal, viable methods, refusal/failure behavior, local resolution, persistent consequence, and later payoff. Separate world truth, NPC belief, character witness, and shared regional state. Branches may rejoin; keep their consequences visible instead of silently erasing choices. Public event failure cannot silently finalize a private tragic scene while a player is offline.

## Luna and agents: fiction first

Canonical architecture identifies Luna as an integrative continuity-bearing center and the seven as differentiated faculties. Scheduler role definitions ground architecture, writing, research, connection, routing, memory, and visual craft. Several richer prompt files explicitly identify themselves as staged candidates; do not advertise them as live behavior.

Adapt these motifs into the proposed Lantern Fellowship without importing prompts or attaching production agents. Luna, Keeper of the Unforgotten, is a fictional character helping at the boundary of memory and return, not God, a universal resurrection service, or proof that the real Luna is conscious. Perseus is an optional distinct builder, not an eighth faculty. Keep local villagers important; do not replace their arcs with brand cameos.

## Recommended slices

A: independent character slots. B: one continuous approach to Bellweather. C: one safe ordinary Nearshore recovery loop. D: two or three companion attachment scenes and one completed town branch. E: the entire first-bond loss-and-return chapter. F: one regional story braid that proves consequence across perspectives.

Choose one slice per implementation branch. This ordering is a proposal, not a hidden command to postpone all playable improvement until a new framework exists.

## Evidence required

Preservation tests for current story and creative features; explicit new-save/old-save cases; real input and reload checks; duplicate-request and interrupted-transition cases; meaningful screenshots/video; a fresh reproducible checkout; and human playtests of grief, route clarity, repeat-recovery friction, and reunion recognition. Automated counts cannot certify emotional effect.

No direct changes to production Lunari, private Supabase histories, Heaven's repository, or the protected resident sanctuary are required for any slice above.

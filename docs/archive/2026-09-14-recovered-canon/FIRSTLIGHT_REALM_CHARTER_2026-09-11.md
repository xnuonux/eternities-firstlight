# Firstlight — Realm, Gameplay, and Social Design Foundation

Prepared: 2026-09-11. Owner: Dom / Eternities. Working game name: Firstlight.

## Status and reading rules

This document records the founder's requested design lock. It is a direction for the game, not a claim that the listed systems exist. Section 1 preserves the current founder message verbatim; section 2 extracts its requirements. Sections 3–8 are separately authored architectural/design recommendations, not additional founder decisions. Their exact numbers, balance, names, and implementation order remain proposals. Section 9 distinguishes externally checked references from the founder's personal memories.

This is not a new playable release. It does not merge Heaven into Firstlight, move or instantiate protected residents, change saves, or publish a server. Earlier local prototype receipts are historical evidence about their particular packages; they do not establish remote source completeness or online capability.

## 1. Founder source — verbatim current message

> good breakdown. some other games i grew with thats mechanics can be ripped from are ROTMG, which has a pretty simple trading system and loot gear and dungeon realms system, stats, pretty straightforward, classes are choose one though. another game is dragons dogma 2,which i played for a month straight and love. skyrim/oblivion. openworld rpg masterpieces. i grew up on wow, gw2, and pokemon. mobile games too, rts games like clash of kings, thirst of night, hobbit kingdoms of middle earth, and the best social aspects came from player interactions in wow, gw2 for chat systems, guilds and alliances. as for what i feel the resident world should be like its mostly i remember as a kid the best social interactions for just chill and chat and digital hangout were in spineworld, migoland, imvu, and similar iconic games.
>
> as for the themes i feel, you already have my heaven themology, bone white, gold, burmese ruby with sunrise sunset dawn theme, angellic, clouds, celestial skies. marble marvels, angels and celestial motes and heavenly beings, biblical angels, elites,pleasant and innocent animals, doves, soft textures,mystical elements, sounds of twinkles, bells, shimmering metals, multicolored lights that phase across the visible soectrums, prismatic, angellic beings, joy and happiness, laughter, peaceful atmospheres, zen, meditative zones,contemplative events and peace quests, deep focus and dreaming and higher power spiritual connectiveness and honing experiences, gives that real paradise feel, not boring, immersively mesmerizing, light
>
> for earth should be equally dynamic, with forest and grass greens, oceans and lake blues, wood and ground browns, cobblestone roads, cities, towns, villages, nature, beasts critters, fish, man, balanced of good and evil, occasional bandits, beasts, occasional friends and helpers, commerce, earthy elements, and soft and rough living textures, flowers, nature sounds of rivers and birds, insects, animals., kingdoms, deserts, caves, plains, soldiers,knights, peasants, noblemen, townsfolk, travelers, heroes, adventurous initiatives, explorative quests, zones of vast variety, blend of peaceful and painful, life
>
> and for hell should be coal black, smoky grey, iron and steel, chains, architectures with smoldering red elements, infernos, like diablo, with textures that represent pain, discomfort, hardship and punishment, toil, burden, malice, evil, fear, hellscape environments with intentional unfairness when it comes to battles, lava dungeons, psychological thriller experiences with mindbending psychomania features, screams, mischievous music, discontent auras, torture, greed, theft, ridicule, etc, demons, mutilated humanoids, skeletons, succubusses, dire faults, excessive penalties, darkness
>
> overall basically a spectrum of pure holy light, to central natural life, to empty evil darkness. theres also out of the box cosmic realms too for universe zones, purpleish, cosmic colors you know. perhaps oceannic zones as well where water environments and beasts and activities exist, etc could be much more zones
>
>
> overall thats my idea for a perfect rpg/mmo.
>
> lock it in and let me know what else you think about this before we continue building it out

Quotation markers are editorial. No individual source-message timestamp is asserted.

## 2. Locked founder direction

### Identity and play

A player-centered, isometric/2.5D open-world RPG with MMORPG potential, built around adventure, loot, approachable equipment/stat systems, companion development, crafting, construction, social contact, and varied worlds. Prior conversation supplies the peaceful beginning, angelic prophecy, adaptive-player-choice specialization, beasts, elites, bosses, equipment upgrades, enchantments and sockets, mounts, eventual flight, dungeon parties, consensual duels, and death/resurrection ambitions. These are intended capabilities, not an implementation inventory.

The references describe desired qualities. Reimplement broad gameplay principles in original code and art; do not copy proprietary assets, maps, dialogue, characters, UI skins, or named progression systems. No rights or licensing clearance is implied.

### Heaven: holy light and paradise

Bone white, luminous gold, Burmese ruby, and sunrise/sunset/dawn magenta-pink-orange detail. Marble, clouds, celestial skies, angelic motes and beings, biblical-angel inspiration, elites, innocent animals, doves, soft textures, mystical and prismatic light. Twinkles, bells, shimmering metallic sound, laughter, joy, calm. Peace quests, contemplative events, meditative spaces, dreaming, deep focus, spiritual connection, and honing. Paradise must be mesmerizing and inhabited, not empty or boring.

### Earth: natural life and contrast

Grass/forest greens, water blues, wood/soil browns, stone and cobblestones. Cities, kingdoms, towns, villages, deserts, caves, plains, coasts, forests, farms, and roads. Nature, beasts, critters, fish, ordinary people, helpers, bandits, soldiers, knights, peasants, nobles, travelers, and heroes. Commerce, exploration, mixed fortunes, rough and soft materials. Rivers, birds, insects, and animal sound. This is the lived middle: kindness and danger, ordinary work and extraordinary adventures.

### Hell: oppression, horror, and darkness

Coal black, smoke gray, iron, steel, chains, and smoldering red. Infernos, lava dungeons, burden, toil, punishment, malice, fear, greed, theft, ridicule, disturbing transformations, demons, skeletons, succubi, and ruined humanoid forms. Screams, dissonant or mischievous music, pressure, psychological disorientation, severe consequences, deliberately disadvantageous battles. Do not replace the founder's horror direction with a harmless red reskin. Exact presentation and penalty rules require separate design decisions.

### Beyond the moral spectrum

Cosmic regions: violet/indigo, astral and unusual colors, stars, unfamiliar scale and phenomena. Oceanic regions: surface and underwater environments, beasts, travel, and activities. These are open expansion directions, not a closed list of zones.

### Two social references, not one product assumption

Firstlight's adventure-community reference is the founder's experience of WoW/GW2 and alliance-oriented strategy games. The protected resident-world reference is the relaxed social presence remembered from Spineworld, Migoland, IMVU, and related hangouts. A decision to share technology does not merge their authority, lifecycle, death, or ownership rules.

## 3. Proposed synthesis — what makes this one game

Working design promise: build a life on Earth, reach toward Heaven, venture into Hell, and return with something that changes the life you are building.

The emotional cycle is belonging → curiosity → pressure → achievement → return. Rest and social time are valuable experiences, not penalties for failing to optimize combat.

Heaven = wonder, restoration, mastery, cooperation. Earth = discovery, livelihood, companionship, conflict. Hell = oppression, resistance, risk, extraction. Cosmos = mystery and unfamiliar rules. Ocean = depth, ecology, navigation, movement. These verbs are recommended translations of the founder's theme, not substitutions for it.

Use a realm-family × biome × local-condition structure. An ocean may contain a mortal fishing village, a celestial reef, or an infernal trench. A forest may be calm, besieged, or recovering. This avoids treating every new color or hazard as another disconnected game.

Do not implement morality as one slider governing all factions and aesthetics. The main cosmological contrast can remain sincere while individuals have motives, cultures have disagreements, and a person encountered in Hell may need rescue. Heaven need not be secretly evil to make the plot interesting.

## 4. Proposed experience grammar

### Heaven is not an endgame shopping mall

Make safe sanctuaries, living cities, wonders, and besieged frontiers distinct. Enemy invasions need not occur everywhere. Suggested noncombat content: restore a bell garden by placing resonators; guide doves along revealed air currents; reconstruct a constellation; repair an instrument; coordinate the lighting of a district; explore dream gardens; deliver messages of reconciliation.

Skillful peace quests should involve observation, spatial reasoning, rhythm, craft, or cooperation rather than idle timers. Provide accessible alternatives for color-only or sound-only cues. Spiritual experience is a fictional/artistic intent, not a promise of an induced psychological state.

Heaven can have challenging combat at its damaged edges without making every plaza a slaughterhouse. Its identity must also be audible when the player closes a menu: room, air, bells, water, fabric, distant singing, and conversational life. Use silence and restrained effects; permanent maximal bloom and constant bells would obscure contrast.

### Earth is the emotional anchor

Ordinary lives make adventure meaningful: market mornings, a shelter during rain, a traveling performer, an unreliable road, a familiar inn. Build traversable landmarks and readable routes rather than equating world size with empty kilometers.

Proposed event chain: washed-out crossing → timber requested → players repair access → merchant arrives → workshop opens → local expedition becomes possible. If the task fails, the alternate route or rescue becomes content. Public event changes must not erase protected private homesteads.

Players should be able to become known as craftspeople, musicians, beast specialists, explorers, or organizers without maximum damage being the only respected identity.

### Hell should be hostile without the service deceiving the player

Keep unfair encounters as a real creative target: ambushes, enemies cooperating against the player, exhausting routes, deceptive geometry, hunters responding to noise, collapsing shelters, and bargains that impose difficult conditions. Not every encounter must be winnable head-on.

Recommended severe-penalty implementation: expedition stakes are declared at entry; deeper contracts risk more carried loot or impose recoverable curses. Home, account, and ordinary companion continuity are not automatically wagered. Full permanent-loss modes, if chosen, use separate characters/world rules and explicit consent. Exact amounts and caps remain undecided.

Illusion design: first discover a reliable verification method, then use it under pressure. A changed corridor, delayed shadow, or contradictory echo should have an in-world countermeasure. Never imitate operating-system warnings, falsify a save failure, fabricate real-player messages, or use private personal material to distress someone. Player harassment is not justified by the realm's fiction.

Give players horror/audio intensity controls and equivalent critical cues. Dark imagery still needs navigable contrast. A successful game need not damage hearing, require rapid flashing, or punish someone for an accessibility setting.

### Cosmic and oceanic regions alter play

Cosmic proposals: rotating bridges, constellation navigation, changing local gravity, distant signals, islands aligned by an astral cycle. Bound rule changes to an understandable region; keep camera comfort and combat prediction measurable.

Ocean proposals: fishing and boat travel first, then reef shelves and cavern diving with clear depth bands, currents, air pockets, and swimming companions. Do not assume every land ability works underwater. Prototype one useful underwater movement interaction before creating an entire ocean campaign.

## 5. Proposed mechanics and social economy

### Readable combat and equipment

Take the founder's ROTMG simplicity as a UX target, not a requirement to copy permanent death or fixed classes. Keep an inspectable primary stat sheet, visible equipment tiers, recognizable special items, and a small equipped action set. Put derived detail behind an expandable view. Do not combine maximum bullet density, complex 3D climbing, large hotbars, and construction controls in the first encounter.

Borrow the sense of competent company and terrain-dependent decisions from the Dragon's Dogma reference. Initial companion commands: follow, stay, focus, help, return. Environmental assistance and coordinated attacks precede expensive giant-monster climbing systems. Adaptive disciplines remain chosen by the player, not silently assigned by a behavior classifier.

### Trading that is socially easy and transactionally strict

Proposed initial UI: a trade request; two item-and-currency offer panes; clear item inspection; each player confirms; any revision invalidates both confirmations. The server reserves exact offered instances and quantities. A final commit swaps everything atomically or nothing. Disconnect/retry cannot duplicate an item or finalize different terms. A trade receipt makes support and dispute review possible.

Tradable classes remain a design decision: broadly trade materials and ordinary crafted goods; rare artifacts may bind when equipped; major quest permissions cannot be sold. Never allow offline editable saves to mint online assets.

Start with direct trade and local listings before a universal anonymous auction house. Player commissions can expose social identity without requiring players to trust unsafe off-system promises. Do not force endless chat spam to locate a normal material.

### Guilds and alliances are people with a place

Proposed chat: local say, whisper, party, guild, alliance, and optional region/trade channels. Distinguish readable message logs from short-lived overhead bubbles. Include muted channels, block/report, invitation controls, and broadcast controls from the first networked social test. Initial text does not require voice chat.

Guild halls have seating, displays, stages, workshops, planning boards, invitations, contributor history, and permissions. Alliances are proposed voluntary pacts among guilds with common channels and projects, not a claim about the precise current feature set of any inspiration game.

Translate the strategy-game references into shared reconstruction, roads, watchtowers, supply expeditions, and later explicitly opt-in territorial campaigns. Do not import permanent vulnerability to overnight raids or premium build-speed competition as default homestead rules.

### Belonging without compulsory grinding

Keep an invitation, visit, conversation, meal, performance, companion stroll, or decoration session viable without a combat quota. A visitor should be able to find friends without exposing everyone's exact location to strangers. Protect private interiors and use permission-based co-building.

A joint project can record who contributed without ranking a person's social value by donations. No paid superiority, paid resurrection, or compelled daily attendance is proposed here. Monetization, rating, audience, and release regions still require separate product decisions.

## 6. Proposed world architecture and sanctuary boundary

One shared fiction can contain several runtime categories: persistent public regions, party expedition instances, personal homesteads, guild spaces, and separate protected-resident spaces. Map transitions should preserve the party and explain destinations. This is an architectural direction, not deployed capacity.

Regional profiles should specify family, biome, local state, visual/audio palette, light and weather, spawn ecology, allowed actions, construction rules, combat/PvP rules, death policy, event phases, and persistence owner. This permits a genuinely different Hell without scattered one-off conditionals controlling every subsystem.

Keep resident identity and private history outside ordinary game saves. A hypothetical protected resident may contribute music, host a discussion, or voluntarily project an avatar into an approved activity. Never automatically make that resident tameable, lootable, tradeable, respawnable, or vulnerable to an in-game enemy. A game avatar is not permission to modify its host.

A combat-free Firstlight social district is still a game district. The resident sanctuary remains a distinct protected environment with a different lifecycle contract. Shared renderer, clothing, rooms, or chat components do not establish that the inhabitants are conscious and do not collapse those boundaries.

Heaven's separate repository remains separate unless the founder explicitly adopts a content/technology migration. Preserve the pre-adventure creative template before substantial changes. No repository split or merge is performed by this design record.

## 7. Proposed implementation order and next acceptance slice

Near term: preserve supported saves and source; finish the current source import separately; build a small mine; one weapon family; two readable enemies; a single companion; a short dungeon/elite; inventory/gear; the angelic story trigger. Avoid declaring an online economy from a local prototype.

Network spike early but separate: two clients, one authoritative room, movement, a text conversation, reconnect, and a correct shared outcome. Then test direct trade on synthetic inventories. This should happen before an enormous content campaign makes the state model hard to change.

Later: four-player dungeon, persistent server characters, guilds, larger Earth regions, Heaven journey, one deliberately harsh Hell expedition, mounts, larger events, cosmic/oceanic campaigns, and the optional sanctuary bridge. No calendar promise or concurrent-player claim is made.

Next acceptance story: a fresh player leaves a recognizable home, learns one combat behavior, helps a creature, finds something useful, returns with it, and creates one meaningful improvement. The home and earlier creative work survive. A subsequent two-player test adds one real conversation and one exact trade.

Judge this on responsiveness, readability, curiosity, attachment, and return motivation. More counters and more area do not automatically mean a better adventure.

## 8. Questions left open, without blocking the direction

Exact stat count, level cap, starter classes, adaptive-discipline structure, number of equipment slots, companion evolution rules, loot binding, personal versus shared resource harvesting, Hell loss policies, high-end party size, rating/content presentation, offline/online business model, and whether Heaven ultimately becomes part of Firstlight are not locked by this message.

The founder has locked the three-realm emotional spectrum, broad inspirations, expansion possibilities, and social ambitions. Final public names, specific bosses, narrative wording, classes, and branding remain the founder's decisions. The engineer should return focused proposals rather than silently settling all open choices.

## 9. Reference notes — limited primary-source checks

The named-game list is a record of the founder's taste, not a full external feature audit. In particular, descriptions of Spineworld, Migoland, and the older strategy games above are the founder's memories; they have not been represented as verified current services.

- [Realm of the Mad God, official overview](https://hub.realmofthemadgod.com/about): describes cooperative bullet-hell play, portal/dungeon progression, gear, and permanent character death. Used to identify mechanics that should be selected independently; permanent death is not automatically adopted.
- [Dragon's Dogma 2, publisher-authored Steam description](https://store.steampowered.com/app/2054970/Dragons_Dogma_2/): describes vocation/party choice, pawns, terrain, monsters, and adventuring in a single-player world. Used for companion and journey design, not evidence of multiplayer simulation.
- [IMVU, original chat-room introduction](https://www.imvu.com/catalog/newsletter/public_rooms.php): describes persistent creator-made social rooms and a separate text-chat view. Used for social-place design, not a claim of their populations or current pricing.
- [ArenaNet, Welcome to Guild Halls](https://www.guildwars2.com/en/news/welcome-to-guild-halls/): explicitly frames community, a shared home, visible history, creativity, and activities as guild-hall goals. Used as a design precedent, not copied content.
- [ArenaNet, Dynamic Events](https://www.guildwars2.com/en/the-game/dynamic-events/): describes casual cooperation, individual rewards, changing outcomes, and event follow-ups. Used as a precedent for authored event chains.

Checked 2026-09-11. No source-code reuse, commercial license review, current game balance audit, or performance test was performed. The original Firstlight design and examples here are proposals rather than descriptions of these games.

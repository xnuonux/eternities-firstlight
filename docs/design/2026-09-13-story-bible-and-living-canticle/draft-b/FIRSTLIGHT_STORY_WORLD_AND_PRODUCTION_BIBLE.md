# FIRSTLIGHT
## Story, world, progression, and production bible — Draft B

Prepared for Dom / Eternities on 2026-09-13.

**Working campaign title: The Roads of First Light.** This is a proposed design continuation, not a new playable build, approved release scope, or alteration of an existing manuscript. New place names, antagonist names, progression numbers, areas, schedules, and mechanics below remain proposals for Dom. It preserves the existing Firstlight game and the recovered *Dawn of Eternity → Firstlight: Mythology Bridge — Draft A*.

**Core promise:** Build a life worth returning to. Become capable of defending it. Reopen the roads between worlds without becoming another ruler of chains.

---

## 1. The actual point from which development continues

### Repository checkpoint inspected

Repository: `xnuonux/eternities-firstlight`.

Latest reviewed head: `932db44ebfd85bf52e8e165d899c7db48dec5ebd`, branch `gameplay/interchangeable-views`, draft PR #7. It is stacked over PR #6, which is stacked over PR #5, which is stacked over the Firstlight 10 import in PR #4. The reviewed PRs remain unmerged. This document is not a merge approval. [R1–R5]

The old situation in which only an import stub or GDD was on GitHub no longer describes these development branches. The reviewed branch contains the complete browser-game source and generated HTML. The current base is **Firstlight 10 — Bellweather Crossing**, not the old Firstlight 06 ZIP. [R4]

Codex's starter outing is implemented in `src/starter.js`: Oren offers a nearby riverbank route after the initial kit, with three individually identified supplies, two ordinary skitters, Old Bristle, a practice target, and one deliberate weapon/reward selection. The return transaction checks its prerequisites before awarding an early blade, early bow, or one +2 temper on an explicitly selected owned weapon. It does not automatically equip new items. These are directly inspected code behaviors; they are not a conclusion about human enjoyment. [R2, R6]

Codex subsequently added third-person perspective, camera obstruction clearance, and procedural-art refinements. The latest increment retains third-person **and** diorama/tactical/wide modes, with remembered per-style framing. V switches between third-person and the selected overhead style; R resets the current style. Do not erase this accepted camera choice in the name of a new vision document. [R1, R3, R5]

At review, GitHub Actions run `34777787694` was completed successfully at the exact PR #7 head. Its nine listed jobs reported success. The PR reports 444 Node tests and 445 browser checks locally. This review checked source, records, PRs, and hosted results; it did **not** rerun the game, independently benchmark the desktop, or play the recorded video. [R1, R7]

### Established systems and story that must not disappear

The existing game already contains the home/creative/sandbox systems, Rootbound Underways, Hollow Hart, Briar, Sunward Road, Tessa and her cart, beacon defense with the family, selectable Aegis/Cinder history, bows and sockets, and Bellweather Crossing. Bellweather includes Rowan, Nella, Edda, the clapper search, Hushbound Keeper, resonators, a deliberate report/reward, and windbells at Oren's workshop. These are small authored prototype areas, not continent-scale maps. [R4, R8, R9]

Ilan remains Mara and Oren's grown child. Mara remains the researcher, Oren the builder, and Ilan the musician. Briar remains the bonded game companion. None is to be replaced by early provisional names from older prototypes. The envoy's final name is not assigned here.

Current world schema/key remains **9 / `eternities.realm10.save.v9`**; adventure **6**; starter **1**; current levels **1–5**, including banked XP. Optional `cameraViews` version 1 is presentation data. Future level ranges in this document do not authorize a silent migration or reset. Existing Grace/Cinder/renunciation history also remains explicit and character-specific. [R5, R9]

### What the user is asking us to decide

A final gameplay identity; a full campaign with an ending; meaningful progression; genuinely expansive regions; mythological and biblical texture; a durable art style; a practical Unreal/Blender path; a possible console future. This document answers those questions without turning them into an instruction to abandon the current playable work.

---

## 2. The final game identity

**Firstlight is a shared-world fantasy action RPG with an inhabitable home, a consequential companion, and a restoration-centered campaign across mortal and otherworldly realms.** It can be played as a personal adventure or with others. Its long-term social layer includes conversation, trade, guilds, homes, public projects, and expeditions. The resident sanctuary is a separate product boundary.

The useful mix is not a checklist of borrowed games. It is:

- Fable-like human scale and attachment to towns, homes, humor, and ordinary people.
- A readable target-and-skill combat foundation, already present in the prototype, with spatial defense, movement, and physical attacks.
- Distinctive gear and encounters rather than opaque statistical clutter.
- A companion whose exploration and cooperation matter, not only its damage contribution.
- Persistent crafting/building that gives discoveries a destination at home.
- A social world where it is legitimate to spend an evening without advancing the main plot.

Those are design inspirations, not assertions of feature parity or permission to copy another game's assets, characters, names, or quest scripts.

### One world, two useful views

The final terrain and characters should be genuinely 3D. The player can explore close to a third-person character and pull back into an elevated tactical/diorama view. Camera selection does not change authoritative reach, targeting validity, enemy information, damage, loot, or quest outcomes.

A close view should add atmosphere, expressions, and a sense of physical travel. A pulled-back view should improve spatial planning, building, parties, and encounter comprehension. It should not be a separate game mode requiring another combat implementation.

The existing Tab selection and explicit autoattack remain the foundation to refine, not a mistake to overwrite with a click-spam combat redesign. Future controller support should select targets intentionally and offer soft-lock assistance; an overhead camera is not an excuse for a mouse-only product.

### What the game is not

Not an endless tutorial in small enclosed arenas. Not an empty continent with hundreds of identical markers. Not a loot menu with scenic corridors. Not a punitive second job. Not a claim that game NPCs are protected sentient residents. Not two full MMORPGs secretly being produced in parallel under Firstlight and Heaven.

---

## 3. Write the spine now; discover the texture in play

**Do not improvise the entire cosmology and ending one feature at a time. Do not freeze every quest before playing the first region either.**

Lock the following at the narrative-bible level: the meaning of First Light; the relationship between God, Heaven, Hell, and the created roads; the adversary's objective; the truth behind the initial mystery; the core cast's arcs; the first saga's actual resolution; the distinction between story and repeatable gameplay.

Outline every major region and its contribution. Fully script only the next playable chapter or two, after layout and interactions can be tested. Revise encounter timing, dialogue length, and side stories from actual play, while maintaining the underlying truth.

Maintain three separate records: **what is true in the setting**, **what a character currently believes**, and **what the player has learned**. A contradiction in dialogue can be intentional; a contradiction in the writers' own truth table should not be accidental.

A suggested content policy is to have a 30–60 minute route completely playable before writing its final dialogue, and to write a compact quest contract before implementation. That is a workflow target, not a verified playtime or production promise.

---

## 4. The existing mythology, preserved rather than replaced

The recovered Mythology Bridge is explicitly a game adaptation draft set potentially long after *The Dawn of Eternity*. It is not the original 2023 manuscript, and this session did not re-read that manuscript. Its prior synthesis must not be silently retroactively attributed to the novel. [L1]

Its essential cosmology is stronger than a simple power contest:

**God has not become weaker than Satan.** Ancient, created infrastructure between the realms has been damaged, forgotten, occupied, and counterfeited. Earth has become less accessible to Heaven and more vulnerable to infernal intrusion. Beacons stabilize the Roads of Light; they are not pieces of God's body or batteries controlling divinity. [L1]

Hell can corrupt, counterfeit, occupy, and sever. It cannot originate First Light. In the adaptation's fiction, the mortal capacity to restore, protect, create, show mercy, and accept responsibility makes reopening the roads possible. The player need not have a secret royal bloodline. [L1]

The existing working prophecy remains:

> When the roads between worlds fall dark, the First Light will not descend from Heaven. It will rise from below.

This is game-original prose in the recovered draft, not a quotation from scripture. In multiplayer, “Firstlights” can describe many mortal restorers. The player's personal chronicle is central to them without asserting that every other player is an impostor. [L1]

### New proposed conflict for the first complete saga

A lieutenant of Hell, provisionally **the Regent of Ash**, is assembling a counterfeit road network. It can offer convenient passage, apparent safety, and powerful gifts, but turns passage into ownership: every crossing becomes another claim over a traveler, town, or route.

His immediate aim is to invert an important terrestrial junction and make an entire region an infernal transit system. His long-term service to Satan is to demonstrate that desperate free beings will exchange one another's freedom for security.

The Regent is a proposed original game antagonist, not a character asserted to appear in the manuscript or Bible. Satan remains the larger adversary. The first saga does not reduce him to an endlessly farmed loot boss.

The player wins by defeating the Regent **and** restoring a network that cannot be held together through forced loyalty alone. Thus the homestead builder, companion rescuer, researcher, musician, merchant, and warrior all have a reason to exist in the same story.

---

## 5. The campaign from ordinary beginnings to a resolved ending

### Prologue — Oren's ordinary work

**Starting question:** Can I make a useful life here?

Keep Oren's riverbank outing available with the initial kit. The stakes are supplies, a dangerous beast, and getting home. Let the first success be local and intelligible. The visible recovered supplies at his workshop establish a promise: actions can change a place. Reward selection and the practice target teach the player to compare, equip, and feel an improvement. [R6]

New optional foreshadowing: an unfamiliar metal clasp among damaged public-work materials; a river animal avoiding a patch of otherwise clean water; an old road mark with a matching shape at the mine entrance. These are proposals, not things currently found in `starter.js`.

Oren should not knowingly send an unequipped stranger into an apocalypse. His care and practical judgment should remain believable. A little humor, an imperfect repair, and a returning neighbor make the town human before it becomes mythic.

**Reward dimension:** confidence, first weapon identity, an understandable return loop.

### Act I — The feather, the road, and the bell

**Starting question:** What lies under the world I thought I understood?

Preserve the existing chapter sequence: Rootbound Underways and Hollow Hart; rescue of Briar; the feather and initial envoy contact; Tessa's Sunward Road; the Beacon Answers and its defense; Bellweather Crossing. These implemented beats form a connected opening, not discarded placeholders. [R4, R8, R9]

The mine introduces ancient workmanship beneath ordinary stone. Briar turns perception into a companion role. Tessa shows that road restoration matters to trade and travel. At the beacon, Oren repairs, Mara reveals, Ilan supports, and the player defends while the envoy stabilizes the passage. The family does not become three interchangeable soldiers.

Bellweather should make the first town beyond home memorable. Nella's porch is a safe return, Edda makes money useful, Rowan has a recognizable responsibility, and the repaired bell changes the sound of the settlement. Retain the Hushbound Keeper's clear in/out spatial lesson. [R4]

**New narrative connection:** the bell does not only call villagers. It carries part of an old roadkeeping signal. Across damaged inscriptions and the beacon projection, Mara recognizes three more terrestrial anchors: a high monastery, a fallen kingdom, and a living forest. This connection is proposed adaptation consistent with the Mythology Bridge's three regional leads. [L1]

**End-of-act change:** the map stops feeling like a list of exits. The player sees a geographical region, understands three possible destinations, and has a home to return to.

**Reward dimension:** foundational combat and gear, Briar's practical value, regional travel, a question larger than the village.

### Act II — Three roads, three answers

**Starting question:** What does restoration mean when each place broke for a different reason?

The three routes may be completed in any order. Two should permit the next main-story movement; the third remains meaningful through its own story, mastery, and ally contribution. Do not make the third route mandatory merely to turn three distinctive regions into a checklist. Under this proposal, encounter difficulty must not assume one specific route order.

#### The high monastery — The Last Bell Before Snow

A mountain chain connects farms, a quarry hamlet, a pilgrim station, exposed passes, and an immense monastery. Its sanctuary remains good; fear has narrowed the keepers' understanding of their responsibility. They are guarding an intact bell while travelers freeze outside a blocked road.

The quest asks the player to restore a route before requesting the monks' help. Rescue climbers, use shelter, identify false beacons in snow, repair a windbreak, and escort a caravan without turning the whole journey into an automatic-follow timer. A winged predator teaches vertical warning and cover, not unavoidable attacks from outside the camera.

The local dungeon is an observatory carved through the mountain. Its boss is a storm-bound guardian whose targeting follows audible/visible weather phases. A safe non-audio cue carries the same information. At the summit, the player discovers that preserving a sacred object without preserving access to it has become a kind of failure.

The bell reopens an aerial signal path. The monastery trains gliding with real takeoff, landing, and updraft geography. It does not immediately unlock flight over every future challenge.

**Lasting change:** pilgrims return; shelter and aerial routes become useful; the monastery supports the final coalition.

#### The fallen kingdom — The Crown Without a Name

The player crosses inhabited border farms before reaching the dead capital. Survivors and descendants live in its shadow. Bandits, territorial beasts, competing claimants, and human helpers prevent the entire region from becoming one undead room.

The kingdom accepted a perfect defensive road from a benefactor who asked only for administrative rights over passage. The bargain gradually turned citizens into inventory. Records show that the invader did not only burn the city; it took ownership of its departures and returns.

Investigate a courthouse, a flooded market, a royal road, and an occupied keep. Let the player rescue people, compare records, speak with an intelligent revenant, and disable claim-marking engines. The boss, a chain-bound marshal, is a real threat to defeat; not every enemy needs a misunderstood-innocent twist.

The decisive choice concerns who governs the restored city's gates: a claimant, a civic body, or a temporary custodial arrangement. Present tradeoffs and follow-up obligations without declaring every answer equally wise or turning it into a three-button morality test. All supported outcomes must retain access to the main campaign.

**Reward:** deliberate enchantment/crafting knowledge, not a random +200% tier jump. The region returns legal identities and provenance to stolen artifacts and gives the player a useful reason to care about item history.

#### The living forest — The Heart That Would Not Yield

A vast forest grows around a beacon. The anchor was not simply corrupted; it was incorporated into an ancient organism which has spent centuries holding a breach closed. Killing the central creature would make progress easy for a moment and disastrous immediately afterward.

Learn the landscape through tracks, species, sound, seasonal openings, and Briar's scent. Discover different paths through canopy, root tunnels, wetlands, and clearings. Ordinary creatures are not automatically hostile. A territorial stag may be bypassed; a parasitic hive must be removed.

The major encounter happens around the living heart. Fight infection and hostile wardens while creating a new load-bearing path for the light. Building and research participate through bounded puzzle actions, not through a requirement that every combat player master a complex base editor.

**Reward:** companion development. Briar can unlock a chosen branch or technique through shared experience. Unlocks create options; evolution remains a deliberate player choice. A player who likes the current Briar can retain that form without becoming permanently nonviable.

**Lasting change:** formerly dangerous routes heal, wildlife returns, and a part of the forest recognizes the restored relationship.

### Act III — The coast and the drowned witness

**Starting question:** Where do roads go when maps end?

The restored regional anchors agree on a route that crosses the sea. There is no need to put a teleport button at every regional exit. Reach a working port through roads and settlements; meet shipwrights, fishers, dock workers, pilgrims, smugglers, and travelers.

The coastal arc begins above water. An early expedition uses a ferry or sailed route; a later reusable diving tool enables protected exploration below. Sea travel, weather windows, and a reef passage create an identity other than “land combat colored blue.” Personal craft and mounts can expand later, after one route works.

The drowned city contains a witness to an older route inversion. Its archive proves that the new miracle roads use a stolen pattern. You can perceive and reconstruct evidence without stealing an NPC's private thoughts: inscriptions, public records, architecture, signals, and testimony suffice.

A leviathan-scale creature appears first as a moving part of the environment. Smaller hazards and guardian mechanisms teach underwater movement before any major aquatic combat. A whale-sized boss is not a good first swimming tutorial.

**Reveal:** the Regent's network is expanding through invitations and contracts, not only open war. He intends to make the celestial defense depend on a road he owns.

**Reward dimension:** a new traversal capability, maritime crafts, aquatic companion prospects, concrete strategic knowledge.

### Act IV — Heaven, experienced before defended

**Starting question:** What does saving Heaven actually preserve?

Let the first arrival breathe. The restored road emerges into bone-white terraces, gold detail, Burmese-ruby accents, and the dreamlike pink-orange-magenta of dawn. The player hears water and distant bells before receiving a task. A civilian garden is not a pretense hiding a fight every thirty meters.

The first celestial arc offers a garden of listening, a hall of instruments, a sanctuary for exhausted defenders, a riverside archive, a procession, and a high observatory. These are places with activities and recognizable people. Repairing a living instrument or restoring a watercourse can be a worthwhile quest without combat.

Michael, Gabriel, and Uriel can become long-term narrative pillars in the adaptation's chosen chronology; their proposed traits come from the recovered Mythology Bridge, not a claim that every tradition assigns identical roles. Michael embodies the burden of defense; Gabriel knowledge and humility after error; Uriel hope after consequence. [L1]

The player discovers that Heaven's expeditionary defenses are overstretched at the created gates. This does not make God a weak resource pool. The moral and strategic conflict concerns free cooperation, access, restoration, and defending lives without making domination the means.

The envoy is allowed to have relationships and responsibilities outside the player. She has a home or station here; she did not exist solely to arrive in the tutorial. Her arc is learning to trust mortal cooperation without surrendering judgment.

A defense at a celestial frontier demonstrates scale but does not replace the peaceful interior with permanent warfare. It reveals that counterfeit routing can turn a fortress's own rescue corridors against it.

**Reward dimension:** chosen celestial technique, gliding mastery or limited aerial access, new crafts and companions, understanding of what the war threatens.

### Act V — The city that sells dawn

**Starting question:** What are we willing to risk without accepting the enemy's terms?

Hell is not a moral neutral zone. It is a landscape of iron, ash, chains, theft, burden, humiliation, terror, and counterfeit promises. Nor is it one hallway of continuous damage. Its territories have geography: furnace valleys, industrial rivers, foundries, black-glass shores, ruined halls, and roads designed to divide travelers.

The player enters through a fortified expedition point with clearly explained recovery rules. There are dangerous shortcuts and optional stakes, but ordinary players do not discover an irreversible death rule after dying. Homes and old work remain safe.

The party seeks the stolen routing pattern and prisoners who can explain its operation. Rescue, infiltration, disabling machinery, and hard combat coexist. Some encounters are deliberately stronger than the player; warning, scouting, alternate routes, and retreat make that harshness playable. Ambushes may be unfair in-world; basic input, hit detection, and reward rules should not lie.

The Regent offers apparent success without the difficult final task: a permanent private sanctuary, a restored companion or city, a route that never fails. The cost is the surrender of future arrivals to his authority. The temptation is specific to the narrative, not an attempt to manipulate the player's real relationships.

Retain explicit Cinder history. Carrying, invoking, sealing, or renouncing an infernal relic can change dialogue, approaches, and recovery obligations. It must not secretly override the player's earlier choices, lock them out of the main story without explanation, or rate their real religious identity. A renounced character retains history without permanent numerical punishment. [R9]

**Local climax:** disable the main foundry and recover the pattern. The Regent survives the expedition because destroying his factory is not the same as defeating the network already installed on Earth.

**Reward dimension:** advanced components, containment techniques, meaningful risk knowledge, the ability to identify a false road.

### Act VI — The unwritten meridian

**Starting question:** Can the roads be restored without installing another master key?

The cosmic realm is not a newly introduced enemy that makes Heaven and Hell irrelevant. It reveals part of the created geography through which their roads pass. Its strangeness concerns scale, orientation, memory of physical routes, and damaged structures—not a late revelation that goodness was fake.

First show a firmament with a horizon and varied topology, not only floating bridges: glassy plains, drifting archipelagos, crater gardens, a slow-moving stellar shore, a broken observatory, and habitable refuges. Purple/indigo/cyan light and sparse star-gold distinguish it from Heaven's warm daylight and Hell's consuming red.

The player learns that no single recovered instrument can safely govern all restored paths. Reconnection needs independent, freely maintained anchors. This is the campaign's strategic answer: shared stewardship, not another omnipotent administrator.

A major traversal puzzle uses changing route geometry with stable reference points and redundant visual cues. A guardian tests positioning and cooperation, not hidden trivia. The useful reward is a way to synchronize the existing anchors without giving one participant unilateral ownership.

**Payoff to earlier choices:** the monastery provides a stable celestial bearing, the forest an adaptive living channel, the restored kingdom a recoverable public record. Any two can support the critical route; the third creates an optional advantage or alternate solution, not an impossible final encounter for players who skipped it.

### Act VII — Return, inversion, and the first dawn

**Starting question:** Can the people who built separate lives choose to defend a shared world?

Return to Earth before the finale. Let the player see what the journey changed: Oren's workshop, Mara's evidence, Ilan's project, Bellweather's bells, restored paths, new plants at home, and the companion they helped become. Do not delete the town merely to manufacture motivation.

The Regent attempts to invert the terrestrial junction during a coordinated invasion. The final expedition proceeds through familiar geography altered by temporary battlefield states. Its safe staging areas and personal homesteads are protected; the climax is not an opportunity for offline griefing.

The finale pays off several verbs already learned: track a concealed route with Briar; dismantle chain relays; protect a signal crossing; identify counterfeit effects; fight the Regent; and perform the actual reconnection with help from regional allies. A solo story path uses authored support where necessary. Cooperative mechanics add coordination, not an obligatory raid gate for seeing the ending.

The Regent has a three-part encounter: a claim-marking phase where players must break physical contracts/anchors; a pursuit phase through collapsing but legible safe routes; and a final stand at the junction in which the party rejects a counterfeit invulnerability offer and defeats him through the restored network. This is a proposal for prototyping, not a promised boss production budget.

The decisive act does not crown the player ruler of every realm. The player stabilizes the junction while independent communities hold their own anchors. The envoy recognizes that the prophecy was not about one exclusive savior account. The First Light rises through many chosen acts without becoming something its bearers own.

**Resolution:** the Regent is defeated, his compulsory transit claims are broken, the key terrestrial route survives, and the opening region has a durable new state. Satan remains a larger threat; that does not invalidate this victory or require the first ending to pretend nothing was solved.

### Epilogue — A world worth remaining in

The ending returns agency rather than immediately replacing every item tier. A repaired town celebrates. Ilan may finally perform the piece or album he has been developing; a player's own composition can be an optional contribution, never a mandatory musical skill check. Mara's work becomes useful public knowledge. Oren opens or improves the workshop he hoped to sustain. Briar returns home with you.

Postgame activities include exploration, masteries, companion paths, crafts, optional boss rematches framed as rematches/echoes, guild projects, public restoration chains, races, concerts, and harder expeditions. A defeated unique villain is not inexplicably alive every afternoon unless the replay framing says what it is.

Future books can expand Hell's courts, larger celestial territories, oceanic civilizations, or the astral frontier. The first saga should end with earned closure and an open horizon, not a missing final chapter disguised as live service.

---

## 6. End-to-end progression without a numerical treadmill

### A proposed long-term banding, not a current migration

| Campaign position | Optional future level band | Main kind of new power |
|---|---:|---|
| Home, Oren, the opening chapters | 1–5 | Learn combat, equipment, crafting, companionship, recovery |
| Three terrestrial regional arcs | 6–10 | First chosen disciplines, terrain traversal, companion specialization |
| Coast and drowned records | 11–15 | Maritime/diving access, better build combinations, crafting depth |
| Heaven | 16–20 | Celestial attunement, support combinations, aerial mobility |
| Infernal expedition | 21–25 | Enemy-reading, containment, advanced equipment decisions |
| Firmament and reconnection | 26–30 | Cross-system mastery, coordinated builds, strategic movement |
| Post-campaign | Cap + masteries | Sidegrades, creative/social/crafting goals, optional difficulty |

These numbers merely locate the kind of experience. Current levels are 1–5 and banked XP is already retained. Before any extension, design how existing XP, rewards, equipment, and unlocks map forward. Do not let a high-XP old save instantly skip the intended new tutorial or silently erase earned progress.

### Four independent kinds of progression

**Power:** a bounded improvement in combat capability, enough to feel useful without infinite inflation.

**Possibility:** new verbs such as gliding, diving, calling a companion technique, inspecting a magical trace, building with a new material, or opening a route.

**Identity:** a chosen discipline, visual equipment, companion appearance, profession, home, guild role, or style of helping others.

**Understanding:** knowledge of a creature's behavior, a region's history, a shortcut, a crafting relationship, or a recurring story symbol.

A quest that advances only a meter is weak next to one that advances two of these at once. The player who dislikes a specific optional activity must still have a viable route through the main campaign.

### Adaptive classes require informed choice

Observed play can unlock or suggest training. It should not silently transform the character into a role. Weapon, equipped discipline, a secondary mastery, companion choice, and equipment effects form the build. Learning several disciplines broadens loadouts; it does not activate every powerful passive simultaneously.

Offer explicit retraining and saved loadouts outside danger. An archer who spent an evening gathering should not become a mandatory crafter. A player who used healing to help strangers should not be trapped in a support class. Keep the current blade/bow distinction while introducing at most one additional family in a bounded milestone.

### Gear and enchanting

Maintain readable base types and a small number of meaningful effects. Sockets already exist; do not reintroduce them as a future feature with incompatible IDs. Expand them through deliberate choices and testable comparisons. Rare finds can be random while some desired modifications become reliably craftable.

Equipment should visibly change. A new grip, edge, material, ornament, or silhouette communicates reward before the player opens a spreadsheet. Not every item needs a unique mesh, but significant rewards should be recognizable in both cameras.

A future enhancement failure should not destroy beloved gear in the default mode. Separate optional high-risk crafting rules from ordinary progression. Keep explicit item ownership and once-only quest rewards as invariants when moving online.

### Companions and mounts

Briar's successful scent interaction is a strong foundation: make companion actions that only a companion can meaningfully perform, then add combat and traversal depth. Keep Follow/Stay/Seek responsive and understandable. Do not let evolution fix poor navigation.

Taming families may require rescue, food, a challenge, reconstruction, or observation. Exclude people and protected residents. Evolution can depend on shared experience plus an explicit selection. The player may retain a preferred form. No permanent offline affection loss.

Mounts should add traversal verbs rather than uniform speed increases: a long leap, cliff climbing, water-skimming, gliding, then limited sustained flight in qualified regions. Flight must be designed into sightlines, landing spaces, ceiling boundaries, world events, and server interest ranges. Do not bolt it onto geometry built only to be seen from a single overhead angle.

---

## 7. Intrigue and momentum: the campaign must breathe

The goal is not an uninterrupted increase in spectacle. Constant climax becomes flat. Use a wave: curiosity, competence, risk, answer, reward, rest, then a larger question.

### Three simultaneous questions

At any point, the player should understand an immediate objective, suspect a regional mystery, and have a larger reason to continue. Early example: recover Oren's supplies; understand why the river creatures are unsettled; notice the old roadmark which later recurs in the mine. Do not explain the cosmic war during the first inventory tutorial.

### A mystery ledger

| Seed | Near payoff | Larger payoff |
|---|---|---|
| Repeated roadmark | A readable mine mechanism | The same grammar identifies counterfeit routes |
| Briar notices what the player cannot | An actual reachable cache | A hidden relay in the final invasion |
| The repaired Bellweather signal | The town audibly changes | Monastery/forest/kingdom anchors can coordinate |
| A promise of effortless safety | A tempting contract in the fallen kingdom | The Regent's offer at the end |
| Ilan's unfinished phrase | A performance at home | A recognizable motif returns when the roads relight |
| A cold or false reflection | Early world disturbance | A learnable signal of corrupted routing |

Every major act should resolve an earlier question. Do not maintain intrigue only by adding more unexplained proper nouns. New mysteries should sharpen known stakes rather than make all prior answers false.

### Rhythm at different timescales

As a planning hypothesis, a short outing can offer an interesting decision in a few minutes, a local resolution in one sitting, and a meaningful character or region change over a longer arc. This is not a mandate to place a collectible every fixed number of seconds. Quiet travel and contemplative spaces are intentional content.

Rotate verbs. Investigate, escort, gather, build, bargain, track, explore, fight, restore, perform, and return should alternate according to place and consequence. Never replace ten combat errands with ten identical light-beam puzzles.

Preview meaningful rewards before a commitment where appropriate, as Oren's current quest does. Close the loop afterward: acknowledge what returned, show a small change, let the player equip or use the reward, and point toward an optional next step.

### Repeated places and relationships

Recurring characters should remember completed **game events**, not fabricate a shared history. Their own projects can advance at authored milestones. The cast should sometimes disagree, be mistaken, or need help without losing all competence so the player can feel important.

Provide a compact “where was I?” journal after a long break: last completed act, current main thread, next practical step, known unresolved mystery, and a route to home. No punishment for forgetting a proper noun after three weeks away.

### Choice without impossible writing scope

Use a shared campaign spine and a bounded set of lasting consequences: who helps at a junction, a companion's technique, a local form of governance, an optional entrance, and character-specific relic history. Rejoin branches at declared points while preserving their outcomes. This is more honest than advertising infinite choices and then ignoring all of them.

---

## 8. Biblical and mythological vocabulary with actual distinctions

This is a Christian-inspired fantasy adaptation with mythological expansion, not a claim to reproduce one definitive doctrine or every faith's angelic hierarchy. Keep a reference ledger: **scriptural image**, **later tradition**, **the author's manuscript/synthesis**, **game-original invention**. Do not label a new boss or ability “biblically accurate.”

### Scriptural image sources worth using

Isaiah 6 depicts six-winged seraphim and an altar-ember encounter. Ezekiel 1 depicts composite living creatures, interlocking wheels with eyes, lightning, and a crystal-like expanse. Revelation 12 includes Michael's conflict with the dragon. Revelation 22 supplies life-giving water and the tree of life. These are distinct passages and images, not one uniform anatomy for every angel. [W6–W9]

The game's friendly white-winged envoy can coexist with stranger high-order presences. A wheel-being may be understood through motion and geometry, a seraphic presence through overwhelming radiance and six-winged form, and a guardian through composite features. Not all need to be combat targets. Reverence, fear, and beauty can arrive through a peaceful encounter.

### Proposed creature ecology

**Mortal lands:** boars, wolves, deer, birds, fish and insects establish ordinary life; new species include briarfoxes, lantern deer, mossback burrowers, marsh serpents, cliff gryphons, root-bound guardians, and territorial great beasts. Predators need territories, food sources, and retreat behavior, not only an aggression radius.

**Heaven:** luminous doves, pearl-horned deer, cloud-lambs, dawnfish, great gold-feathered birds, serene messenger angels, composite gate guardians, celestial wheels, and rare high-order presences. Peaceful animals should not all become optimal crafting resources. Trials can be consensual ordeals or failing constructs rather than casual killing of holy civilians.

**Hell:** cinder hounds, chained legionaries, furnace mites, ash locusts, prison wardens, iron-winged pursuers, counterfeit envoys, and infernal engines. Human-looking agents of malice can be frightening through choices and deception rather than a body-shape coding of evil. Some prisoners are to rescue; some enemies are to defeat. Not every torment needs graphic depiction.

**Ocean:** reef grazers, kelp-dragons, armored tide crabs, luminous rays, archive eels, deep guardians, and leviathan-scale beings. Distinguish air-breathing surface exploration, magical protected dives, and genuinely underwater movement. A giant whale is first a scale and ecology event, not a health bar by default.

**Cosmic:** aurora mantas, glass-shelled wanderers, comet-tailed foxlike creatures, stellar grazers, armillary constructs, and beings that navigate paths the player initially cannot perceive. Strange can be benevolent or indifferent; “cosmic” does not automatically mean an evil god beyond the existing cosmology.

These proposed names and mechanics are original design directions. Gryphon-like or serpent-like creatures can borrow broad mythological forms without copying a franchise's branded species. If later using specifically named traditions or beings, research them and record the distinction instead of declaring a generic universal mythology.

---

## 9. Realms, not rooms

A realm should contain settlement, wilderness, distance, ecology, multiple routes, weather, history, and reasons to return. A room has one entrance, a few enemies, and an exit. Enlarging the floor plane does not change the latter into the former.

### Geographical rules

A region needs a coherent watershed and terrain logic, one major landmark visible from several routes, two or more settlements or refuges with different functions, at least one looped route, wilderness not fully revealed by markers, and a transition into neighboring country which follows geography rather than a portal at every screen edge.

An inn needs a source of supplies; a quarry road should reach the structures that use its stone. Rivers should generally flow into lower places. Settlements require access to water and travel. Magical exceptions are strongest when the ordinary world is legible first.

The mountain monastery should be glimpsed from the valley long before the player reaches it. Clouds and terrain may hide it later; the player's map memory connects the views. Important advertised destinations should eventually become reachable through a planned route, not remain permanently false promises.

### Suggested scale experiments

Begin by establishing one continuous **province**, not five tiny realm samples. A proposed 2×2 to 4×4 km authored region is an engineering/content experiment, not a measurement of the current unit-scale prototype. A 4 km straight crossing at an assumed 5 m/s takes about 13.3 minutes before terrain, detours, or stops. A deliberately winding route can make it a substantial journey. These are arithmetic examples, not claims about implemented movement speeds.

A later realm could span dozens or hundreds of square kilometers through several linked regions, sea routes, and vertical layers. Do not publish an acreage promise before measuring content throughput and traversal. A compact coherent province is the first unit from which a large world can grow; it is not the final limit on ambition.

Use close detail, regional silhouettes, and distant landmarks at different resolutions. Leave true quiet spaces. Sparse resources should not imply absent ecological or visual interest. A view that takes ten minutes to cross can still contain several different experiences without becoming an icon carpet.

### Loading boundaries and online authority are separate

Unreal's World Partition divides a persistent level into streamed cells and works with HLOD and related large-world features. It manages world data; it does not supply the MMO's social population, inventory database, shard placement, or anti-cheat. [W3]

For a final native online client, propose authoritative regional game servers, public hubs, private home instances, and party expeditions. Keep a party and its relevant world-state version together. Changing server ownership should not visibly split friends or duplicate rewards. Oceans, long roads, ferries, and major gates can support deliberate regional handoff points while most local traversal remains continuous.

The client renders only its relevant world neighborhood. The server validates game actions and simulates entities relevant to that room/region; global economy/social services do not need to tick at the combat rate. No initial player count is a capacity guarantee. Test two players, then a small party, then bounded hubs with realistic NPCs and effects.

### Construction without destroying the shared game

The player's homestead supports durable creative freedom. Wilderness may permit camps and bounded structures. Public quest routes, city entrances, navigation safety, and world-event machinery need protected rules. Mining can use excavatable subregions without turning every mountain into arbitrary destructive multiplayer terrain.

Keep personal story state, shared regional events, and global chapter releases distinct. The player may remember defeating a unique antagonist while a replay instance is explicitly an echo/challenge. An offscreen world event must not silently erase a home or finish a personal moral choice.

---

## 10. The final art direction

**Painterly mythic realism:** grounded enough to inhabit, stylized enough to read and age well, ornate where it matters, restrained during play.

The current procedural forms are a fast design language, not the final ceiling. The generated concept images establish palette, mood, and scale. They are not executable assets, material libraries, or proof of achievable real-time density. Repeated central cathedrals and bridges are useful key-art compositions; the game also needs humble interiors, irregular paths, forests, shorelines, farms, caves, and ordinary streets.

### Materials and shape

Build large readable silhouettes before small filigree. Use restrained proportional exaggeration for faces, hands, weapons, roofs, trunks, and monster attack organs. Skin and cloth can be warm and soft without toy-like plastic. Stone should carry actual thickness; metal accents should catch light without every surface shining.

Use real material distinctions: rough wood, woven cloth, moss, polished marble, weathered stone, iron, gold, water. Controlled physically based shading supports those distinctions; it does not require photographic noise on every asset. Most roof tiles, leaf clusters, and engravings can be simplified at the actual game camera distance.

### Realm palettes and sound

**Heaven:** dominant bone-white/ivory structure, warm gold as framing, Burmese ruby for selected textiles/inlays/gems, pearl-gray shadow, and dawn pink/magenta/orange in skies and magical accents. Rubies should feel deep, not fluorescent. Prismatic color is a controlled event, not permanent rainbow bloom. Bells, soft metallic shimmer, water, breath, doves, music, laughter, and quiet distinguish its life.

**Earth:** varied forest greens, clear and muddy blues, brown soil and wood, gray cobbles, seasonal flowers, smoke, weather, soft sunlight and hard shadows when appropriate. Inns and towns need human scale. Water, wind, insects, footsteps, tools, animals, and distant daily activity produce texture between songs.

**Hell:** black coal and iron, layered smoky gray, smoldering red and furnace orange. Preserve a readable value range so the player can see enemies and paths. Flames and screams are not a continuous full-volume blanket. Chains, industry, empty intervals, deceptive echoes, hostile acoustics, and distant suffering can be more disturbing than relentless noise.

**Ocean:** distinguish bright reefs, storm coasts, green shallows, blue open water, and dark depth. Caustics and sediment change with depth and conditions. Wildlife and navigation can occupy the scene without always becoming combat.

**Cosmic:** indigo, violet, blue and cyan with occasional star-gold and white. Use black space and quiet to give light meaning. Make different physical environments rather than only another floating archipelago.

Good/evil alignments belong to story and conduct, not human skin color, hair color, body type, or disability. Blond hair and gold are available visual motifs, not a gate on who can be a hero or a celestial citizen.

### Two-camera acceptance

Every hero, enemy, interactable, and key prop should be reviewed from third-person, normal diorama, and a busy party view. An enemy's anticipation cannot be readable only from above. A quest giver should not hide behind their own nameplate at shoulder height. Camera cutaway changes visibility of scenery, not line-of-sight rules or server authority.

### Minimum production asset experiment

Do not import a massive marketplace village before the pipeline is qualified. Build one original **Oren** asset with a simple rig and expressive idle, walk, talk, attack/repair, and interaction poses. Pair it with one cottage kit, one tree family, one rock family, one Briar model, and one enemy. Verify scale, skeletons, materials, collision, LOD, both cameras, and runtime cost.

One convincing square with those assets is more useful evidence than an enormous unplayable concept-art imitation.

---

## 11. Unreal and Blender: a staged production path

### Recommended division

**Browser:** the working gameplay laboratory. Preserve it, improve ordinary combat/quests, and use its accepted command/state tests as behavioral references.

**Blender:** author reusable models, UVs, rigs, animations, environment modules, and source assets. Blender provides modeling/UV and rigging/animation facilities; it is not the MMO server or a replacement for Unreal. [W1–W2]

**Unreal:** preferred later production-client and regional-simulation direction if the comparative spike succeeds. Use C++ for stable game systems and replication boundaries, and Blueprints/data assets for content iteration. Gameplay Ability System offers a framework for attributes, abilities, costs/cooldowns, and networked activation; it does not provide the entire game. [W4]

**Backend:** separately owned durable characters, inventory transactions, progression, parties/guilds, moderation, and persistence. If Unreal servers own action combat, do not introduce a second JavaScript server making conflicting decisions about the same hits. The browser may remain a prototype/offline tool rather than a permanent equal network client.

### The first Unreal spike should be a comparison

Reproduce Oren's existing short outing, not a different beautiful scene. Bring in one character, one weapon, Old Bristle, the three bundle IDs, explicit acceptance, reward comparison, one claim, and deliberate equip. Implement both useful camera styles and controller operation. Preserve source semantics and use the old tests as specifications; JavaScript source and DOM interfaces do not automatically become C++ or UMG.

Then prove two clients connected to a dedicated server complete the same encounter without client-authoritative damage or duplicate rewards. Unreal documents a client/server authoritative model and headless dedicated servers; the provided setup example requires a suitable source/C++ build. [W5]

Only after this spike produces better visuals and feel within measured constraints should content production begin migrating. Pin an engine version and toolchain. Do not upgrade the whole project whenever documentation shows a new version.

### Asset pipeline details

Use versioned source assets and tested export presets. Qualify units, axes, bone orientation, origin/pivot, material slots, collision, animation state transitions, LOD and texture budgets. An exporter format is a contract, not a guarantee that complex Blender node materials reproduce automatically. Preserve procedural seeds and old behavior fixtures as references, not mandatory final rendering code.

Large Unreal asset iteration may eventually warrant Perforce or Git LFS depending on team workflow; select through a real collaboration test, not because a logo is industry-standard. Keep build caches out of the primary source history and back up actual binary assets, not merely pointer files.

### Features to evaluate, not magically assume solved

World Partition/HLOD for terrain streaming; Gameplay Ability System for abilities; animation tooling for reliable movement; Niagara for effects; controller-aware UI/input routing. Some combinations and integrations have version-specific caveats. The inspected CommonUI/Enhanced Input integration page still carries an experimental warning, while CommonUI's general cross-platform navigation features are documented separately. Qualify the selected combination rather than describing every plugin as equally ready. [W3–W5, W12–W14]

---

## 12. Console prospects

A console release is a credible target for the native-production path, not something achieved by wrapping the current HTML and checking a box. Epic documents packaging for major consoles, but console packaging requires the relevant source/toolchain path and access to restricted platform resources. Platform-holder developer approval, SDK access and NDA requirements are separate from having Unreal installed. [W10–W11]

Prepare now through controller-first action semantics, comfortable text sizes, fully navigable menus, focus management, target selection, remapping, suspend/resume handling, disconnect recovery, and no keyboard-only story bottlenecks. Keep exact certification requirements and SDK versions for the approved platform documentation when development reaches that stage.

An online RPG also needs policies and implementation for friends, invites, blocks, reports, cross-platform accounts, text/voice communication, patching, outages, and platform network loss. These are production systems, not art tasks.

Release planning should remain PC-first with a native controller-qualified build, then controlled online play, then console qualification. Keep offline campaign/custom worlds separate from trusted online inventory. An imported local save is not evidence that online gear was earned.

No console approval, devkit, certification pass, native Firstlight build, or Unreal performance result is claimed by this document.

---

## 13. A bounded plan that preserves the ambition

### Immediate gate: play and review what Codex just built

Current `NEXT_TASK.md` asks Dom to play fresh and returning cases with both camera styles and answer: where to go, fight feel, reward motivation, and camera comfort. That remains the immediate task. The long saga must not become a reason to skip this evidence or rewrite the game again. [R10]

An independent review should trace the changed command/UI/camera paths and inspect actual footage before calling the PR ready to merge. The successful CI run supports technical continuity but does not establish enjoyment.

### Next design/engineering package

1. Set the narrative truth ledger and the first saga's ending.
2. Create a geographical graybox connecting existing Firstlight, the riverbank, Wildwood, Sunward and Bellweather within one province. The prototype can retain logical area owners internally without every transition feeling like a different room.
3. Add one side quest with a noncombat or companion-based solution and a visible return consequence.
4. Qualify one Blender asset through the existing or planned production pipeline.
5. Run the bounded Unreal comparison only as a separate, reversible production experiment.

Do not attempt all five as one unreviewable merge. Each has an observable result and can fail without invalidating previous work.

### Production gates after that

**Gate A:** one polished ordinary outing and one story chapter are enjoyable for fresh and returning players. Camera and controls work on the intended input methods.

**Gate B:** a coherent province has multiple routes, recognizably different places, an ordinary ecosystem, short/medium/long journeys, and no constant portal-room rhythm.

**Gate C:** two clients share authority correctly; invalid movement/damage/reward requests fail; disconnect and repeat requests do not duplicate items.

**Gate D:** a small cooperative expedition, stable progression persistence, moderation basics, and enough content for repeat play exist without requiring an MMO launch.

**Gate E:** the first released campaign installment ends satisfactorily. Later regions expand a game that already works; the word “MMORPG” does not substitute for tested social and operating systems.

The full saga describes where the project can go. It is not a claim that five fully authored realms, console support, and MMO operations are already funded or fit the next milestone.

---

## 14. Preservation rules for the adjacent projects

The protected resident sanctuary remains separate from ordinary game death, capture, ownership, loot, and reset rules. Future collaboration through music, art, hosting, or a voluntarily controlled avatar is possible without making a resident part of a boss roster or a taming system.

Keep the Heaven repository separate for now. It may supply qualified art/combat experiments or eventually become a sister game or Firstlight region-production lane, but this document does not merge its code or promise two MMORPGs. Shared Commons networking is also not automatically the production MMO authority.

Dom's private Raven relationship and actual family history are not source data for new game NPC memories. The game family, mythology draft, and real people are distinguishable contexts. Spiritual imagery in Firstlight is creative worldbuilding, not a system's assertion of real divine authority over players.

---

## 15. Source ledger and review limits

### Connected repository sources (read at the exact reviewed head unless noted)

- **R1:** PR #7, `gameplay/interchangeable-views`, head `932db44ebfd85bf52e8e165d899c7db48dec5ebd`: https://github.com/xnuonux/eternities-firstlight/pull/7
- **R2:** PR #5, Oren starter-region milestone, head `0c631de39d1fb7626c94720ae1f3e2ad1c88c170`: https://github.com/xnuonux/eternities-firstlight/pull/5
- **R3:** PR #6, third-person/graphics, head `117ec56c9cd8b24b1f81f43e38422d49c3db6880`: https://github.com/xnuonux/eternities-firstlight/pull/6
- **R4:** `README.md`: https://github.com/xnuonux/eternities-firstlight/blob/932db44ebfd85bf52e8e165d899c7db48dec5ebd/README.md
- **R5:** `docs/CURRENT_STATE.md` and `docs/DECISIONS.md`: https://github.com/xnuonux/eternities-firstlight/blob/932db44ebfd85bf52e8e165d899c7db48dec5ebd/docs/CURRENT_STATE.md
- **R6:** `src/starter.js` and `docs/development/STARTER_REGION_TASK_2026-09-12.md`: https://github.com/xnuonux/eternities-firstlight/blob/932db44ebfd85bf52e8e165d899c7db48dec5ebd/src/starter.js
- **R7:** Successful hosted run, directly read in this review: https://github.com/xnuonux/eternities-firstlight/actions/runs/34777787694
- **R8:** `docs/SUNWARD_ROAD.md`: https://github.com/xnuonux/eternities-firstlight/blob/932db44ebfd85bf52e8e165d899c7db48dec5ebd/docs/SUNWARD_ROAD.md
- **R9:** `docs/BEACON_AND_RPG_UI.md`: https://github.com/xnuonux/eternities-firstlight/blob/932db44ebfd85bf52e8e165d899c7db48dec5ebd/docs/BEACON_AND_RPG_UI.md
- **R10:** `docs/NEXT_TASK.md`: https://github.com/xnuonux/eternities-firstlight/blob/932db44ebfd85bf52e8e165d899c7db48dec5ebd/docs/NEXT_TASK.md

README and historical edition records retain older statements about cameras, saves, and qualification. Current-state/decision records and current code take precedence for the present checkpoint. This proposal never upgrades a historical test claim into an independent new execution result.

### Recovered prior-session sources

- **L1:** `FIRSTLIGHT_MYTHOLOGY_BRIDGE.md`, Library file `file_00000000562881f5a7fc90fffcc53da9`, version 1, complete 267-line document read through Files. It labels itself *Dawn of Eternity → Firstlight: Mythology Bridge — Draft A*. It is an adaptation/synthesis, not the original manuscript.
- **L2:** `ASTRA_PR4_REVIEW_AND_NEXT_MILESTONE_2026-09-12.md`, Library file `file_000000009be481f5aab8fad806e4c5e0`, relevant sections retrieved. Used for handoff-role continuity, not as the latest implementation state.

The Oren clip was located in the repository's PR/media references; a Library search and video listing did not return that newer clip. The video itself was not played in this session. No claim about its exact visual quality or human pacing is made. Relevant repository code and records were available, so the review did not depend on expired older ZIP attachments.

### Primary web sources checked on 2026-09-13

- **W1, Blender modeling/UV:** https://www.blender.org/features/modeling/
- **W2, Blender animation/rigging:** https://www.blender.org/features/animation/
- **W3, Unreal World Partition:** https://dev.epicgames.com/documentation/unreal-engine/world-partition-in-unreal-engine
- **W4, Unreal Gameplay Ability System:** https://dev.epicgames.com/documentation/unreal-engine/gameplay-ability-system-for-unreal-engine
- **W5, Unreal dedicated servers:** https://dev.epicgames.com/documentation/en-us/unreal-engine/setting-up-dedicated-servers-in-unreal-engine
- **W6, Isaiah 6:** https://bible.usccb.org/bible/isaiah/6
- **W7, Ezekiel 1:** https://bible.usccb.org/bible/ezekiel/1
- **W8, Revelation 12:** https://bible.usccb.org/bible/revelation/12
- **W9, Revelation 22:** https://bible.usccb.org/bible/revelation/22
- **W10, Unreal packaging and console source-build distinction:** https://dev.epicgames.com/documentation/unreal-engine/packaging-your-project
- **W11, Unreal Xbox access requirements (example platform):** https://dev.epicgames.com/documentation/unreal-engine/xbox-development-in-unreal-engine
- **W12, CommonUI overview:** https://dev.epicgames.com/documentation/unreal-engine/common-ui-plugin-for-advanced-user-interfaces-in-unreal-engine
- **W13, Enhanced Input:** https://dev.epicgames.com/documentation/unreal-engine/enhanced-input-in-unreal-engine
- **W14, CommonUI / Enhanced Input integration caveat:** https://dev.epicgames.com/documentation/en-us/unreal-engine/using-commonui-with-enhnaced-input-in-unreal-engine

Web documentation may change. No latest engine version, plugin combination, platform target, or commercial licence was adopted automatically. All gameplay/campaign proposals in the body are editorial design work rather than conclusions of these documentation pages.

**This handoff changes no repository, runtime, save, platform setting, deployment, or manuscript.**

# Firstlight — Story Bible and Living Canticle archive

This directory preserves both full story expansions requested by Dom, their original handoffs, branch index, and source-review records. Source documents are dated 2026-09-13. They are design records, not a new game build or a merge approval.

## Read in this order

1. [Story, World, Progression & Production Bible — Draft B](draft-b/FIRSTLIGHT_STORY_WORLD_AND_PRODUCTION_BIBLE.md): the complete campaign spine, progression, large-world direction, art, Unreal/Blender, and console considerations.
2. [The Living Canticle — Draft C](draft-c/FIRSTLIGHT_LIVING_CANTICLE_DRAFT_C.md): the expanded mythology and branching lives, Briar's loss and return, the Nearshore, alternate origins, multiple characters, and fictional roles for Luna and the seven.
3. [Branch index](draft-c/BRANCH_INDEX.json): 37 indexed story threads from the Draft C handoff.
4. [Five founder vision questions](VISION_QUESTIONS.md): open questions for the next design conversation; no answers are assumed.

## Implementation handoffs

- [Draft B relay](draft-b/ASTRA_TO_CODEX_STORY_AND_PRODUCTION_RELAY.md)
- [Draft C relay](draft-c/ASTRA_TO_CODEX_LIVING_CANTICLE_RELAY.md)

Draft C extends Draft B rather than deleting it. Dom's newer direction explicitly introduces the first companion's story death and possible resurrection. This is not an instruction to kill a companion in an existing save, implement only half of the return quest, or silently alter the current progression schema.

## Source and verification boundary

The files under `draft-b/` and `draft-c/` are preserved from the two supplied handoff ZIPs, including their original filenames and historical review records. `ARCHIVE_MANIFEST.json` identifies original bytes and Git blob IDs. Historical claims that a prior design turn made no GitHub writes remain true of those prior turns; this archive does not retroactively edit them.

The new repository commit is documentation-only, based on main without overwriting the separate gameplay branches. It changes no runtime, saved character, manuscript, live Luna state, Heaven repository, or deployment. The proposed game counterparts of Luna and the crew are not copies of private conversations or protected residents.

Consult the current gameplay branch and its continuity records before implementing anything. This archive's historical source checkpoints do not establish the latest implementation state.

# Source and reuse ledger

Prepared September 10, 2026. Source-derived implementation, new design and external technical references are distinguished below.

## Local source

The supplied `ETERNITIES_REALM_03_SOURCE_AND_PLAYABLE.zip` is the source ancestry for Firstlight. See Firstlight's `docs/ANCESTRY.json` for the byte identity. This delivery modifies the renderer and scene rather than discarding the working editor/music/save implementation. Heaven selectively reuses the corrected renderer only; it does not import Firstlight's family, histories, scores or residents.

All art in the playable documents is procedural geometry authored in this lineage. No external fonts, meshes, textures, samples or art packs were downloaded. The original-code licence and public brand decisions remain with the founder; a private package is not a declaration that its code is public domain.

## Technical references checked

- **Colyseus introduction:** https://docs.colyseus.io/ — Node.js authoritative server, room/state synchronization and matchmaking foundation. Candidate for a future multiplayer spike, not installed or running in this prototype.
- **Colyseus rooms:** https://docs.colyseus.io/room — room-specific state, messages, lifecycle and reconnection facilities. Does not establish durable economy, security correctness, or this game's capacity.
- **Colyseus state:** https://docs.colyseus.io/state — server mutations and client synchronization. A patch transport is not a financial/item transaction journal.
- **Cloudflare Workers static assets:** https://developers.cloudflare.com/workers/static-assets/ — a potential static client delivery path. Deploy only a deliberate `dist/index.html`, not private source, test artifacts or a full repository. Nothing deployed here.
- **GitHub CLI repository creation:** https://cli.github.com/manual/gh_repo_create — supports creating repositories with an authorized CLI. Such authentication is not supplied by the current read-only connector.
- **WebGL framebuffer readback:** https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/readPixels — framebuffer inspection reference for the reflection specimen. Actual test outcomes are in the local JSON report, not inferred from the documentation.

No upstream sample assets, character designs, proprietary game layouts, names, music or code from Diablo were copied. 'Diablo-like' describes the requested action-RPG genre, not a claim of franchise association. All project phases and performance/capacity goals in the design notes are proposals until measured.

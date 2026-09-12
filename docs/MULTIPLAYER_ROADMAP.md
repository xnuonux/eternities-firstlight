# Firstlight multiplayer: proposal, not implemented

The goal is an inhabited creative place: shared visits, performances and work, not the Heaven game's combat economy. Both can evaluate the same networking ideas, but they must not share session authority, local saves or gameplay rules by accident.

## Smallest proof

Two authenticated test participants enter one bounded room, move, leave and reconnect. The room's server accepts sequence-numbered input, imposes speed/collision/rate limits and emits accepted state. Client prediction remains presentation. Keep private notes absent from another viewer's packets, including counts and thumbnails. Persist a deliberately shared placement once despite a reconnect/replayed command. A guest invite never grants the host's notebook or private family history.

A Node.js/TypeScript Colyseus room is a candidate; official docs describe authoritative room state and synchronization. It has not been installed or integrated. Pin a release and run a two-client spike before adopting it. PostgreSQL can own accepted room versions and shared artifact references; large creative files remain in a separate authorized object store. Avoid a new distributed stack before one room is correct.

## Toward a larger realm

Use bounded districts, private interiors and portals. Propose a measured 16–32-human commons only after the two-client path and load tests work; these counts are targets, not existing capacity. Keep invitations, room presence, relationships, project grants and tool authority separate. Network/server outage should not erase an acknowledged score or promise that offline edits have synced.

Static delivery can be evaluated with Cloudflare Workers assets. A persistent stateful game service needs separately qualified hosting, reconnection and persistence. No cloud resources, payment operations, account changes or production deployment were made in this release. Sources: docs/SOURCES.md.

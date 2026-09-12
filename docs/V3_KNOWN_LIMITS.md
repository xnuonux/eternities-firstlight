> Historical Realm 03 notes retained for context. Evidence filenames mentioned below belong to the original Realm 03 package; use the current VALIDATION.md for checks run on Realm 04.

# Known limits — Realm 03

## Execution and graphics

The application is one owned offline HTML document. It was tested by injecting those exact bytes at about:blank in offline Chromium. This environment refused file:// navigation with ERR_BLOCKED_BY_ADMINISTRATOR; that policy was not disabled or bypassed. The earlier failed navigation attempt is retained in artifacts/FILE_NAVIGATION_LIMIT.json. Actual file opening and persistent file-origin storage were not independently qualified here.

The main regression suite exercises animation and input. The creative suite freezes rendering between snapshots to test deterministic UI state and downloads. Its storage is explicitly a Map-based fixture at the application's storage interface, not the browser's native persistence. Passing it establishes serialization, migration, restore and UI behavior against that adapter—not disk retention across machine restarts.

Rendering uses a software GPU in the development container. The screenshot capture mode may display 0 FPS because it renders on request. No delivered preview is a real-time frame-rate benchmark. Real hardware, Firefox, Safari, physical Android/iOS, assistive technologies, audio devices and low-end GPUs need independent trials. Low quality disables the heavier reflection/shadow passes.

This is an original stylized lighting renderer, not a physically complete PBR engine. No ray tracing, dynamic global illumination or imported assets. Some scenery, fine decoration and foliage are intentionally not collision objects. Walking is planar and bounded; no jumping or arbitrary stair traversal.

## Local life and authority

The three inhabitants use authored routines, projects and dialogue. Project counts are simulation counters. The gatherings are local deterministic invitations, not evidence of autonomous desire. The residents do not write songs, create research, earn money, or execute real-world tools. The service helper is a separate repeating visualization. There is no hosted multiplayer, authentication, private data service, resident lifecycle, custody service or consciousness qualification.

The local Realm diagnostics object and devtools can edit client state. There are no security claims for client-local scores or journals. Importing a save does not establish a person, resident identity, external capability or private-memory authority.

## Creative work

The score has a fixed D-minor pitch palette, two bars and one-step note gates, three melodic timbres, one bass voice and three drum synthesizers. It has no per-note velocity editor, free piano roll, arbitrary samples, plugin hosting, lyrics, full albums, recording or learned composition. It is a complete small instrument, not a full music-production application.

MIDI carries notes, tempo and program/channel information, not the original synthesizer's tone. WAV has two repetitions plus tail. Playback and export can sound different depending on browser/device output, and no professional monitoring or mastering claim is made. Sound starts by gesture, remains optional, and is stopped when the page is hidden; it never resumes automatically after reopening.

Decoration is constrained to eight named positions. There are no draggable arbitrary placements, floorplan construction, housing markets or online permissions. Layout/score undo histories are session-local. Current accepted state persists. Slots avoid the entrance, but there is no universal proof for arbitrary future furniture or visitor-body dimensions.

## Persistence

Exports are plain JSON and contain the user's own notes. They are not encrypted; store them appropriately. No content is sent to an external service. One active tab per world is recommended; last-writer behavior can overwrite another tab's edits. Rename/moving an HTML file can change native file-storage visibility depending on the browser. Export before upgrading or transferring.

Migration preserves the supported v2 schema, not every arbitrary invalid JSON. Incoming text is bounded/escaped, unknown values are rejected, and state replacement requires confirmation, but the app is not a general hostile archive parser. Old storage is not modified by migration. Current failed storage is not claimed saved.

## Source engineering

Runtime sources retain the compact style of Realm 02. A future readability/type-checking refactor must preserve the build hash expectations, supported state migrations and successful journeys. Do not treat more documentation as more implementation. Tests are scoped evidence and do not establish production-grade concurrent services.

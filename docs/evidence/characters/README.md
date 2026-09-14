# Separate character lives: actual browser evidence

The 27.88-second silent MP4 records the real current browser game, with normal animation frames at 1280 × 720. It is not concept art or a generated video. Chrome 153.0.8010.36 reported NVIDIA GeForce RTX 3080 through ANGLE Direct3D11. No frame-time benchmark or human-enjoyment claim follows from this recording.

- [Recording](separate-character-lives.mp4), SHA-256 `e8468610a049c14db5fc5bcf18fb24627215f8c5ca9f04b2e5aae9366b6dec4b`, 5,852,541 bytes.
- [Hardware and action receipt](RECORDING_REPORT.json), [input script](recording-actions.json).
- [Wide character view](CHARACTER_LIBRARY.png), [narrow view](CHARACTER_LIBRARY_NARROW.png).
- [63-check browser report](CHARACTERS_BROWSER_REPORT.json), [import-based command-earned journey](CHARACTERS_JOURNEY_REPORT.json).

HTML SHA-256: `0848c3402c37a534e0cc0fceba3e23637f0ef83ac7d6af769a32319b487bdfa7`. Both generated HTML files are identical. Initial fixture: `docs/evidence/upgrade-hunt/run5_02_PARTIAL.json`, independently command-earned earlier and untouched here. The script renames that fixture Iris using an accepted appearance command, then uses the visible character UI to create Rowan. It obtains the kit, walks to practice, selects a target through the production command and toggles real autoattack, swaps cameras and characters, and shows retained pursuit state. Inspect the action receipt for exact accepted commands and clicks. There are no personal saves in this evidence.

Run `tools/record_browser_gameplay.py --fixture docs/evidence/upgrade-hunt/run5_02_PARTIAL.json --actions docs/evidence/characters/recording-actions.json --output <outside-artifact-directory>` with the development Python environment and a real Chrome executable in `FIRSTLIGHT_CHROMIUM_EXECUTABLE`. The tool uses an isolated temporary profile and HTTP origin; reports retain the original local artifact paths as provenance. The browser regression suite is separately software-WebGL based.

Human acceptance remains pending: can Dom tell whose life he is entering, trust what is preserved, and resume an outing without confusion?

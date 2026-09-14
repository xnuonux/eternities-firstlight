# Actual Hunter and Magician playthroughs

[The 50.08-second recording](hunter-and-magician.mp4) joins two actual normal-frame browser sessions: a fresh Magician (26.96 seconds), then a Hunter using a previously command-earned bow world (23.12 seconds). The join does not imply a continuous single character. It shows visible comparison and explicit choice, practice impacts, real local combat and camera switching. No generated footage, inventory grant or planted defeat is used.

Chrome **153.0.8010.36**, viewport **1280 × 720**, reported **NVIDIA GeForce RTX 3080 / ANGLE Direct3D11**. The game runs on normal requestAnimationFrame timing. Input is scripted; some setup, navigation and target selection uses accepted production commands. The video is silent. Its on-screen FPS counter is not a benchmark, and no frame-time or human-pacing claim follows from this capture.

MP4 SHA-256: `2b87c935d6e6754d223ecdf48f859103fc6bd50fbf0eb7b928837b6ea5de6807`; **11,492,941 bytes**. Both sessions use HTML SHA-256 `e5d203dc6912388c5c2a962aaf08a90638f9a164dbcd6c2bd6c0af3e69253b76`.

- [Magician recording receipt](MAGICIAN_RECORDING.json) and [actions](magician-actions.json). Starts with a new world, earns Oren's kit, chooses Magician, casts on practice, starts survey1 and defeats its west skitter through the actual rules.
- [Hunter recording receipt](HUNTER_RECORDING.json) and [actions](hunter-actions.json). Loads [HUNTER_SOURCE.json](HUNTER_SOURCE.json), an unassigned world freshly earned by `tests/pursuit_journey.cjs --bow`: five legitimate surveys, copper bow and two finite fittings. It chooses Hunter, confirms a marked arrow impact, starts survey6 and defeats its west skitter. Fixture hash is in the recording receipt.
- [Visible choice](CLASS_CHOICE.png), [narrow class page](CLASS_NARROW.png), [Magician spell](MAGICIAN_PRACTICE.png), [Hunter bow](HUNTER_BOW.png), [browser report](CLASSES_BROWSER_REPORT.json).
- [Complete command-earned class surveys](CLASSES_JOURNEY_REPORT.json). Separately from the short recording, this follows two imported earned worlds through **both enemies, both samples and an atomic claim each**, using 42 accepted game commands and 8 deliberate refusals. A strongest veteran retains gear, socket, fittings, XP563 and history after explicit choice. No direct position edits, materials or defeats are injected; simulation ticks are accelerated. These are engineering runs, not a human enjoyment or elapsed-playtime test.

Reproduce each real-time capture with the development Python environment and `FIRSTLIGHT_CHROMIUM_EXECUTABLE` set to a real Chrome path:

```
python tools/record_browser_gameplay.py --actions docs/evidence/classes/magician-actions.json --output <outside-magician-directory>
python tools/record_browser_gameplay.py --fixture docs/evidence/classes/HUNTER_SOURCE.json --actions docs/evidence/classes/hunter-actions.json --output <outside-hunter-directory>
```

Run the checked-in browser suite independently with `python tests/classes_browser.py`. It uses a temporary loopback origin and isolated profiles with software WebGL. The original local artifact paths in receipts are retained as provenance; personal saves were never used.

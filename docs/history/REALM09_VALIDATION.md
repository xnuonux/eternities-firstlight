# Firstlight 09 — validation and custody

Edition **9.0.0 / The Beacon Answers**. This is the final local prototype build, continuing Realm08. It is not an online deployment or proof of production security, human balance, native storage, or hardware performance.

## Final application identity

Both `FIRSTLIGHT_VALLEY.html` and `index.html` are **428,794 bytes** and have SHA-256:

```
6cc4ca43f1f323474c9df70483a81b3bdaa1900a129a03b46dd0fbe889d95b30
```

Hashes bind the reports to these bytes. They are not authenticity signatures. Package/bundle restoration results and their identities are in `BUILD_PROVENANCE.json` and the separate delivery receipt.

## Tests actually run for this edition

| Evidence | Result | Meaning |
|---|---:|---|
| `evidence09/ALL_RULES.tap` | **352 passed, 0 failed** | 299 inherited rule cases plus 53 new beacon/combat/validation cases. All ran on the current source. |
| `evidence09/RPG_BROWSER_REPORT.json` | **106 passed** | Actual new interface and chapter tested in offline Chromium, at desktop and a touch-sized viewport. |
| `evidence09/REFLECTION_TEST_REPORT.json` | **8 passed** | Asymmetric red/green landmark framebuffer samples at four camera angles. Engine hash matches current `src/engine.js`. |
| `evidence09/PUBLICATION_TOOLS_TESTS.log` | **20 passed** | Local importer/publisher refusal checks. No GitHub transport is exercised by these tests. |
| Six command-journey reports listed below | **Passed** | Accepted gameplay commands, accelerated simulation, no inventory grants, position edits or planted defeats. |

The final new-browser report has no unhandled JavaScript errors or external resource requests. The current application syntax check covers every `src/*.js` module. `evidence09/VALIDATION_SUMMARY.json` verifies identities and aggregates **only this edition's evidence**.

The older pre-09 browser suites target different menus. Their historical pass counts are **not** added to this release. This edition's 106 browser assertions replace, rather than imply a rerun of, the previous interface-specific suites. Construction/decor/settings accessibility is checked; not every old graphical workflow has been re-executed through every new menu. Domain tests and command journeys additionally cover earlier rules and stories.

## Command-only journeys

- `CHAPTER_I_JOURNEY.json`: a fresh-world journey gathers, crafts, pays for the bridge, enters/excavates the mine, fights, rescues Briar, recovers the feather, returns, forges and completes the envoy gift. No direct grants, player-position assignment or planted deaths.
- `CHAPTER_II_JOURNEY.json`: continues the command-earned Chapter I checkpoint through the Sunward Road, merchant, scents, guardian, beacon and report.
- `BOW_CHAPTER_II_JOURNEY.json`: a command-earned bow build completes the earlier road journey using the ranged system.
- `journeys/radiant/BEACON_JOURNEY.json`: earned Chapter II checkpoint, actual walking and scene transitions, arrival, Grace, all three waves, reward, replay, cinder invocation, renunciation, route choice and cold save round-trip.
- `journeys/mortal/BEACON_JOURNEY.json`: the same new chapter without accepting Grace.
- `journeys/bow/BEACON_JOURNEY.json`: the same new chapter from the separately earned bow-completed road checkpoint.

The new acceptance driver uses 50-ms simulation steps and automated tactical decisions. It does not prove that pacing, tutorial discoverability, attack difficulty or companion feedback are good for a human. The successful melee runs retained full ward; the bow run lost some ward. This is a useful balancing observation, not a difficulty certification. The repeat sequence intentionally pays no further combat XP, money or gems.

`examples/BEACON_READY_EARNED.json` comes from the new driver before any Chapter III action. Inside-scene saving restarts safely at the outside gate, so importing it places the visitor beside the Sunward Road doorway. It does not contain a planted victory, supernatural power or reward. Existing earlier-schema example saves are retained as migration fixtures, not rewritten to masquerade as new-schema originals.

## New browser acceptance coverage

The harness loads the exact final standalone HTML through Playwright `page.set_content` with the browser context offline. It exercises actual clicks, keys, exported files and validated movement commands. No replacement renderer is used.

It checks the C/I/K/J workspace, actual visitor portrait, real three-slot equipment, inventory search/categories, comparison, exact crafting deductions, socket swaps, resource limits, companion text safety and commands, Tessa's existing merchant, and a less cluttered objective tracker. A portrait sizing regression on the 390×844 viewport was fixed and explicitly tested.

Combat checks include Tab and reverse cycling, selection without autoattack, the 1 toggle, out-of-range waiting without involuntary movement, real arrows hitting practice targets, Brace/cooldown feedback, menu/focus stop behavior, and scene-safe targeting. A real bug where the first target selection after entering a scene was erased on the next tick was fixed; both domain and browser checks cover it.

Chapter III checks include visible arrival, family path positions, voluntary Grace, three actual enemy waves, the player's skill inputs, finite ward/health, one-time reward, cinder acceptance without corruption, actual invocation cost/history, replay withdrawal without corrupting completed story, renunciation retaining history, and a future-route choice that does not fake an available map.

The browser exports the completed save and reimports it. The cold-restart fixture retains story and never resumes attack intent. The exact score grid still edits and actual WAV/MIDI downloads contain their expected headers; exported files are included. This is not a fresh full DAW/audio-quality audit. Notebook input is rendered safely as text. Audio does not activate itself.

A separate **normal requestAnimationFrame** page verifies that the new RPG dialog pauses actual simulation and closing resumes it. This is distinct from `Realm.test.step`, which intentionally advances accelerated test time.

## Storage and device limitations

Direct native `file:///.../FIRSTLIGHT_VALLEY.html` navigation was attempted during the current smoke test and rejected with `net::ERR_BLOCKED_BY_ADMINISTRATOR`. No policy bypass was used. No successful native-origin or localhost-origin qualification is asserted.

The successful browser storage tests inject a **Map-backed localStorage fixture**. Known read/write denial and cold-restart scenarios are explicitly separate. These prove application handling, not lasting storage on Dom's desktop or a physical phone. Keep JSON backups. No multi-tab merge guarantee exists.

Rendering used Chromium under llvmpipe/software WebGL2. The touch-sized test is emulation, not a physical-phone playtest. Firefox, Safari, native file persistence, controller support, screen-reader completeness, GPU timing and 60 FPS remain unqualified.

The fallback-map test forces WebGL2 initialization failure and verifies that the same durable story/equipment state stays usable. It does not claim identical visual combat feedback or visual parity with the WebGL scene.

## Game / publication boundaries

This is the full integrated **local** Realm09 prototype, not the smaller Shared Commons multiplayer spike. There are no accounts, persistent network rooms, real player trading, shard events, online economy, or deployed services.

The source lineage starts from the supplied `ETERNITIES_FIRSTLIGHT_08_REPOSITORY.zip`, SHA-256 `6fbdeb6f0e19ad198e57abf1d349f8b574eb070c33c15c797ec88721814e6186`. Its existing source-bundle parent is local commit `cabee897ba72b5f715d087ed69515c6cd846624e`. The original archive remains untouched.

GitHub main was read this turn at `1aae2f14f2b2ab0ba54a5bf8571bd45bbf32ab46`; it contained the earlier import workflow and charter, not the complete game. No new remote push, default-branch merge, Heaven change, public deployment, model call, private resident data access or paid infrastructure change occurred.

The new SOURCE.bundle is local history. Restore and reconcile it on a review branch before publication; do not force the partial remote or treat documentation as a runnable checkout.

## Reproduce

```
python build.py
node --test tests/*.test.cjs
node tests/chapter_journey.cjs
node tests/road_journey.cjs
node tests/ranged_road_journey.cjs
node tests/beacon_journey.cjs
python -m unittest discover -s tests -p 'test_*.py'
python tests/rpg_browser.py
python tests/reflection_browser.py
```

The browser scripts require optional Playwright and Chromium in a compatible developer environment. Older journey scripts write to their historical evidence07/evidence08 directory names; these names do not establish which game version was tested. The delivery copies the current run's relevant reports into evidence09. The reflection script also writes under `evidence07/regression`; copy its current result to evidence09 before `python tools/summarize_validation.py`.

`python tests/verify_package.py` is read-only package hash verification. Rebuilding/running generators can change evidence files; preserve the original delivery if you want an untouched custody copy.

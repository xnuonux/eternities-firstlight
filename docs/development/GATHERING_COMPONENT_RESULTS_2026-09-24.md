# A Table After the Rain — component hardening, 2026-09-24

## Status

**Implemented fixes with component-level verification. Not a qualified whole-game release.**

Continuation base: `f23cc2827bfdc8797f32bf7f31cdbb690b872105`, branch `gameplay/a-table-after-the-rain`. Its reviewed game base is PR #19, `1abddcfbf30bacb2791dde14fbc1fe7e46b666f7`. All existing candidate work is preserved. This continuation changes three gathering source files and adds tests and this evidence record. It does not merge, deploy, change billing, or modify the trusted entrypoints and save origin.

The established candidate is an optional roadside gathering after Fenna's delivery arrives, even when its payment remains unclaimed. It uses Nella's basket, Oren's stand and Ilan's written arrangements; it does not relocate those characters from their existing routines. Preparation, a deliberately chosen arrangement and sharing are remembered. Sound is optional. No XP, gold, item, allegiance or class reward is introduced.

## Fixes actually made

1. **Existing quest interactions remain reachable.** The table and Fenna's delivery radii overlap. The gathering now yields to the original unpaid-delivery interaction at that overlap, using the original subsystem's predicate. Completed cloth and lantern preparations no longer capture their contextual prompt indefinitely. Arrival must be the boolean fact `true`, not arbitrary truthy data.
2. **Delayed audio cannot follow the wrong character.** Playback tracks its owner and request generation while awaiting audio enable/resume. A stop, departure, panel change, mute, hidden document or character change invalidates the request. An older resume completion and an old source's `onended` cannot interrupt a newer preview. Startup and node-cleanup errors resolve safely. The original score and PCM synthesis remain unchanged.
3. **A preview is not a decision.** Arrangement confirmation retains the simulation and adventure revision that produced it. A changed owner/revision or position refuses before submitting the choice. Keyboard focus moves to explicit confirmation; cancelling restores focus to the considered arrangement. Preview audio remains available after a different arrangement has been kept, without rewriting the kept choice.

## Executed evidence

Run from the repository root with Node and the optional Playwright development dependency:

```text
node --test tests/gathering_contract.test.cjs
python tests/gathering_component_browser.py
```

- **48/48 Node component tests passed.** These exercise the actual gathering rules and music implementation, with the actual hash-verified Earth geometry. The story predicate, journal and audio services are explicitly synthetic fixtures. All 18 combinations of three arrangements and six task orders complete. Refusals preserve unrelated fixture data. Input validation, contextual priority and asynchronous audio lifetimes are exercised.
- **31/31 browser component checks passed**, with no page exceptions and no external requests. These execute the actual component UI in Chromium, with a labelled synthetic RPG host and checkpoint. They exercise real DOM input, keyboard confirmation, a real Web Audio context, silent completion, late-resume cancellation, owner/revision refusal and a narrow mobile layout.
- **Before the fixes, 11 of the same 48 component tests failed** (37 passed). Preserve that failure record; this was not a first-try success.
- All six locally recovered JavaScript files pass `node --check`. The browser harness compiles with Python.

The browser's ordinary localhost navigation was rejected by this environment's policy. The component tests therefore inject owned source bytes into a blank page. They do **not** verify native save-origin behavior, actual game navigation, terrain rendering, third-person camera behavior or gameplay frame rate. No browser policy setting was disabled. The unused HTTP-server setup was removed from the component harness.

The test host initially had an undeclared global; that fixture-only setup error was fixed before the successful run. It is distinct from the game changes above.

## Separate listening study

The downloadable continuation package includes a self-contained `FIRSTLIGHT_THREE_WAYS_HOME.html` and three 26-second stereo WAV renders generated from the actual music module at 24 kHz. These are listening studies, not a replacement game client. The listening sheet passed 12 dedicated browser checks: explicit playback, selection feedback, stop, mobile width, no network requests and no browser errors. Its HTML/WAV generation and playback checks are separate from the 48 rule and 31 component-UI results.

## Source custody

Recovered individual files were verified against their Git blob IDs before editing:

| File | Original Git blob SHA-1 |
|---|---|
| `gathering.js` | `65d0f5f0c25ce25cc1332954ecce3581ce119438` |
| `gathering-music.js` | `a039803dbe5b498112fb04b3be715de311a65abb` |
| `gathering-ui.js` | `a7e6dd939d4ebabf1f1510d662719e42293659dd` |
| `gathering-adapter.js` | `b12ec1b2f0e66ee2321dc57b6a449cbd97525613` |
| `gathering.css` | `fa653f5697f235bdfb6cf0c00a1d9e0065a6c15a` |
| `earth.js` | `cd86121fd57a1fa0cdd5c60a734512a0f87e396f` |

The adapter, CSS and Earth geometry are unchanged reference dependencies in this continuation. The local change package is **not** a complete clone. It must not replace the repository tree. The older Realm10 archive was reference material only and was not substituted for current source.

## What remains unqualified

The staged adapter's adventure9-to-10 migration and the full renderer/RPG hooks have **not** passed a fresh whole-game verification in this workspace. The current root build remains the trusted PR19 client (712,134 bytes; SHA-256 `14c79b47648e13764fbe4d623d4835ebe0089a54f37bc48d8d6fa7bccc2a8750`). The candidate builder retains an exact-base hash gate; do not erase it or relabel the candidate as a release.

The previously attempted snapshot CI job did not start because GitHub reported a billing lock. During this continuation a remote browser session also refused for exhausted service credits, and the local runtime could not resolve GitHub DNS. No service upgrade, secret reuse or billing modification was attempted. Connector source reads and repository writes remain separate from these unavailable execution routes.

## Next acceptance gate

From the actual current branch in an isolated full checkout, build the candidate separately and exercise the real app bootstrap, the existing roster persistence manager, schema9 migration, schema10 round trips and forward-version refusal. Test all three preparation locations through real navigation, unpaid Fenna interaction, character switches during audio enable/resume, notebook and composed-score preservation, and both cameras. Re-run the existing source/journey/browser suites without replacing them with the synthetic component host. Record exact source/build hashes and separate any skips from passes.

Do not import a candidate schema10 save back into an older schema9 build. Keep personal backups and the stable 8780 trusted origin untouched until the integration gate is satisfied. No new realm, paid service, online actors, cash economy or live Luna connection is part of this change.

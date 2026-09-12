# Firstlight source-import bootstrap results

This record concerns repository setup and verification, not new gameplay, an Unreal conversion or a public release. The current source is the complete four-chapter Firstlight 10 browser game.

## Source custody and reconciliation

- Inspected private GitHub repository `xnuonux/eternities-firstlight`, all four remote branches and open PRs #1–3 before import. Observed main: `1aae2f14f2b2ab0ba54a5bf8571bd45bbf32ab46`; handoff: `53572a25049362c5f02cb1d29ef54f2c9a177714`.
- Cloned to `C:\dev\eternities-firstlight`, created `import/firstlight10-bootstrap-20260912` from current main, and preserved PR #3's handoff. Earlier partial branches remain intact. Their overlapping road module/test and GDD exactly match the complete source; their extra handoff records are preserved in dated provenance.
- Game ZIP: 25,072,319 bytes; SHA-256 `bd8fe0345b871707114188933a91865eaf0d09c203f042a4b1994866b30af973`, matching the supplied handoff. Separate extraction verified all 243 package-manifest entries and all 133 source-manifest entries.
- Additive importer dry run and apply each reported 132 new files, zero existing-file overwrites. The charter was already identical in Git; Windows checkout line endings were restored to those exact tracked bytes before import.
- Import-only commit: `d7c57ee47833dad4fb9ec3332d352468abf32109`. All 133 staged Git blobs match the original source manifest. Both rebuilt HTML outputs are 489,117 bytes with SHA-256 `6b1905b62b321c6335a641257bacedc997e1272fa35671852a35d076300c921a`.
- Later commits change tooling/tests/records only. Runtime modules, HTML and founder charter remain identical. No personal save was read or imported; automation uses the supplied labelled fixtures and isolated browser contexts.

Original inputs, full evidence/media and initial logs remain outside the checkout at `C:\dev\firstlight-artifacts\bootstrap-2026-09-12`. Small metadata and `SOURCE.bundle` are preserved under `docs/provenance/2026-09-12/`. The bundle verifies as complete local history. The absent external `FIRSTLIGHT_10_DELIVERY.json` is not treated as evidence.

## Executed checks on this Windows host

Python 3.13.15, Node v24.18.0, pinned Playwright 1.57.0 with its managed Chromium. Browser renderer checks use software WebGL, not an RTX performance measurement.

| Check | Actual result | Scope |
|---|---|---|
| Baseline build | Exact expected HTML hash and size | Separate extraction and imported checkout |
| Node rules | 399 passed, 0 failed | All current rule files |
| JavaScript syntax | 24 modules passed | Current `src/*.js` |
| Python helper suite | 19 passed, 1 skipped | Windows account lacks symlink privilege; Linux CI must exercise that case |
| Chapter IV journeys | Blade and bow passed | Accepted commands and accelerated simulation, not human balance |
| Chapter IV browser UI | 115 passed | Real UI/keyboard with labelled earned and commission fixtures |
| Earlier gameplay browser UI | 106 passed | Current HTML, including equipment, crafting, soul, music exports, fallback and touch-sized UI |
| Camera cutaway | 6 passed | Rendered framebuffer comparison |
| Water reflection | 8 passed | Rendered asymmetric landmarks at four orbits |

The four browser reports contain no unhandled browser errors or external resource requests. Their 221 UI checks use labelled Map-backed storage; that result alone does not prove native persistence. The portable verifier was also exercised with a deliberately failing temporary rule test and returned nonzero; the probe was then removed.

Initial Python baseline result was 19 successful cases plus one error while trying to create a symlink (`WinError 1314`), before testing importer behavior. The workflow commit changes only that fixture to an explicit capability skip. It does not disable the importer's symlink refusal or change Windows privileges.

## Reproduce and read live status

`python tools/verify.py` rebuilds, rejects stale HTML, checks syntax/rules/helper cases and runs both current journeys. `python tools/verify.py --browser` adds the four current browser suites. See `tests/README.md` for the optional environment. Logs are ignored under `verification/`; generated browser/journey evidence is under `evidence10/` and the retained reflection output path `evidence07/regression/`.

The new `verify.yml` workflow has read-only repository permission, pinned action revisions, Windows/Linux source jobs and a Linux Chromium job. It does not deploy or write commits. The old `import-source.yml` and `.import/READY.json` path are not activated. Hosted CI results and the exact pushed head are available on the source-import PR; a workflow file is not itself a claim that hosted checks ran.

Main merge, public hosting, tags/releases, visibility/license changes and gameplay progression changes are outside this bootstrap. Remaining product work is the bounded starter quest/equipment/combat loop in `docs/NEXT_TASK.md`, followed by a real human playtest. Native-origin results and remote fresh-clone results are recorded once those checks complete; historical browser evidence is not counted again.

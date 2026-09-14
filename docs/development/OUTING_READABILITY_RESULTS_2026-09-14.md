# Connected outings and safe imports

Branch `gameplay/outing-readability`, stacked on PR #12 at `447f49b2d06962c23f992befe043d679711892c9`. This is the final connected-flow refinement in Dom's 2026-09-14 autonomous window ending 07:00 Central. The implementation PR names the exact pushed head and separate fresh remote-clone verification.

## Playable changes

Oren's service page now links directly to optional Hunter/Magician comparison. After choosing, the Path page gives class-specific practice instructions and reuses the field guide's real walking route. Entry still requires E at the riverbank sign, and selecting/attacking the practice bundle uses normal combat. The same page opens equipment projects. Equipment and roster headings display each world's saved class, including an honest unassigned state.

The active-survey tracker shows each threat/sample count once. Its directions change between the riverbank, another interior, the village and the actual claim interaction beside Oren. It never creates a pickup, defeat, class choice or payout.

## Import boundary repair

A read-only integration review identified a character file read that could finish after switching lives. A new production-browser regression failed on the old handler, and its screenshot showed the delayed preview appearing under the newly selected character. Existing worlds were not automatically overwritten, but the preview belonged to an obsolete operation.

The handler now captures its simulation, active identity, saved revision, import mode and selection token before awaiting the file. Changed character context refuses the read; a newer selection or picker cancellation invalidates it. Older completion cannot replace the latest preview or clear its input. Both legacy and character import entry points declare their mode explicitly. Existing size/validation limits, confirmation, Web Locks, source-byte checks and atomic storage writes remain authoritative. Four additional character-browser assertions cover switching and overlapping file reads without changing either saved world.

## Compatibility

This branch adds no save migration. It retains world/key 9, adventure 7, classPath 1, character envelope 1, starter 1, pursuit 1, arsenal 1 and cameraViews 1. PR #12's existing adventure 6 → 7 migration still creates unassigned classes while preserving XP, equipment, sockets, fittings, companion, housing, music and story history. Old schema-6 builds refuse newly saved schema-7 worlds. Managed legacy recovery keys remain present. No personal save was used.

## Local launch

`PLAY_FIRSTLIGHT_WINDOWS.cmd` starts the portable `tools/play_local.py` server and opens the usual browser at `http://127.0.0.1:8780/`. Only the generated game routes are served, from a cached pair of identical HTML outputs. The stable loopback origin preserves the browser's existing save location. A matching server is reused; a conflicting build is refused without killing it or selecting another port. The launcher never reads browser storage. Windows binds exclusively to prevent a second listener from sharing that port; [Microsoft's socket option documentation](https://learn.microsoft.com/en-us/windows/win32/winsock/using-so-reuseaddr-and-so-exclusiveaddruse) describes the platform distinction.

Seven Python tests cover build identity, route restrictions, exact reuse, occupied/wrong-build refusal, redirect refusal and cached-byte consistency. The real Windows command file was exercised with `--port 18782 --no-browser` in an isolated test: it served the final 611,694-byte game with the expected SHA-256 header, and a second invocation reported the matching server already running. The owned smoke-test server was then stopped. The default 8780 origin is retained for the final playable handoff.

## Evidence

The full local `python tools/verify.py --browser` passed at HTML SHA-256 **643107c97521ebfc336d8bb41e03bb041bd9ab3be46622df1074b595b9bcff80**. Both checked-in outputs contain **611,694 identical bytes**. After the launcher was added, the full source gate passed again at that unchanged game hash: **33 source syntax checks, 489 Node rules, 26 Python passes and one explicit Windows symlink-privilege skip, and 10 command journeys**. The preceding browser gate passed **702 assertions across 10 suites**: Crossing 115, prior gameplay/creative 107, cutaway 6, reflections 8, native restart 11, starter 147, cameras 51, equipment pursuit 145, characters 67 and classes 45. The launcher does not alter the browser bundle. There are no final failures. The earlier missing Oren-link, delayed-import and Windows duplicate-binding regressions failed before their fixes; the failure logs remain in the external task artifacts.

[The local receipt](../evidence/outing-readability/LOCAL_VERIFICATION.json) binds the reports to the generated build. Full command logs are in `C:/dev/firstlight-artifacts/outing-readability-2026-09-14/release-verification/`. The implementation PR records the separate complete remote-clone gate after pushing its exact head. [Actual flow recording and hardware methodology](../evidence/outing-readability/README.md) remain separate from software-WebGL browser tests and pending human acceptance.

The final normal-time recording completed 177 scripted UI/walking/combat steps from a fresh world: explicit Magician choice, five real surveys, ten skitter defeats, ten samples, five claims, copper-blade crafting, two finite fittings, deliberate equip and a confirmed 27-point practice hit. Stored XP remains 0 and Oren's once-only quest remains unaccepted. The complete silent recording lasts 200.76 seconds; the delivered 63.96-second video contains its opening and final excerpts, with the intervening time explicitly omitted. This scripted duration is not a fresh human pacing result. An earlier recording attempt finished the same visible hit but its diagnostic assertion sampled the transient damage popup after expiration; the corrected assertion reads the retained production practice result. That initial diagnostic failure remains in the external artifacts.

The final hardware sample used installed Chrome **153.0.8010.36**, NVIDIA **RTX 3080 / 10,240 MiB**, driver **610.74**, ANGLE **Direct3D11**, balanced quality, and a **1920 × 1080** viewport and WebGL drawing buffer at device scale 1. CDP reports WebGL and GPU compositing enabled. Six contexts each collected 2,160 normal RAF intervals after a 1.5-second warmup, for **12,960 intervals** over about **90 seconds** of sampling. All six had p50 6.9 ms, p95 7.0 ms and p99 7.1 ms. The worst interval was 27.8 ms in the village third-person sample; none exceeded 33.333 ms or 50 ms. Village, riverbank and active bow practice were each sampled in third person and diorama. The same fixture reached them through accepted commands and normal-time walking; its five prior surveys were command-earned. No local browser test or video capture ran concurrently with sampling.

These are headless browser-frame intervals. They do not measure GPU completion, monitor presentation, input latency, long-session thermal behavior or every campaign scene. Screenshots and raw intervals are retained in [the hardware receipt](../evidence/outing-readability/RTX_FRAME_REPORT.json). Earlier development samples preceded the final text/import refinements and remain outside the repository; this receipt is the final generated build.

## Remaining acceptance

Dom still needs to try one fresh Magician and one returning bow Hunter: was the destination clear, did the technique and weapon impact feel useful, and did the equipment project make another outing appealing? The independent roster and one-technique class experiment are bounded prototype mechanics. Class balance, names, permanence and repetition remain subject to founder playtest. No class tree, rare-pet rule, paid power, offline-loss rule, online participants, level expansion, merge, deployment or Unreal qualification is implied.

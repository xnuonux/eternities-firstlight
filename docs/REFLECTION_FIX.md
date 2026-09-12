# Reflection defect, correction and qualification

## Observed defect

Realm 03 made a reflected view by negating eye/target Y and passing an inverted up vector to `look()`. Reconstructing that right-handed camera basis reverses its screen-horizontal direction for the same world landmark. The water sampled the reflection texture using the normal camera's clip UVs, so a reflection could sit on the opposite side of the surface. The mirror calculation also used zero instead of the visible water plane at y=0.01.

## The fix implemented in src/engine.js

For a world point p and plane y=h, use:

```text
H(h) = | 1  0  0   0 |
       | 0 -1  0  2h |
       | 0  0  1   0 |
       | 0  0  0   1 |

reflected_point = H(h) * p
reflectionVP    = P * V * H(h)
h               = 0.01
```

P and V are the normal camera's projection and view matrices. Column-major implementation sets index5=-1 and index13=2h. For any point on the water plane, H leaves it fixed. A landmark touching the water therefore shares its projected contact with its reflection at every camera orbit. H²=I. An object above water maps below it without an unrelated horizontal camera-axis reversal.

The geometry reflection pass uses `reflectionVP`. The water vertex shader also projects its surface point with `reflectionVP` and computes texture UVs from that projected point. It does not apply a blanket U/V inversion. Water-normal perturbation is added afterward and intentionally bounded. The reflected eye is used for lighting calculations; it does not reconstruct the reflected basis. Face culling was already disabled, so the reflection determinant's handedness change is handled by the current rendering path. An engine change enabling culling must deliberately reverse face selection in this pass.

## Evidence

Firstlight's six Node tests cover plane contacts, involution, orbit/elevation projections, mirrored object locations, the old horizontal-flip counterexample and invalid plane input. They are not merely a test comparing the function to itself: the old look-at construction is retained in a negative specimen which produces the wrong projected X.

`tests/reflection_browser.py` creates two asymmetric red/green landmarks, renders the reflection buffer, and reads pixels at independently computed expected locations. Both colours were found at each of four yaw angles: eight checks. See `artifacts/REFLECTION_TEST_REPORT.json` and its specimen PNG. The observed engine source SHA is recorded there. The regular Firstlight browser journeys test final scene rendering as well.

Heaven uses the same corrected engine bytes, checked in both source roots. Its own browser test proves that the consumer initializes/renders offline. This does not substitute for every possible material, camera or device test.

## Limits and future renderer work

The water is one planar surface, not arbitrary curved reflection or underwater refraction. There is no full screen-space reflection system or physically calibrated BRDF. Large planar reflections cost an extra scene pass. Low quality intentionally omits that pass. Reflections of bright geometry, clipping near the plane, oblique angles, transparent effects and mobile GPUs need continued visual qualification. Framebuffer tests are correctness specimens, not FPS benchmarks. Do not 'fix' a later image-upload orientation issue by breaking the world-plane geometry again.

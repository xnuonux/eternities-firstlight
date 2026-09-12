# Publishing the current source

No Firstlight10 push occurred in this turn. The supplied SOURCE.bundle has real **local** history. Clone it or reconcile its files into a clean review branch of `xnuonux/eternities-firstlight`. Preserve the existing charter and any newer remote work.

`python tools/import_into_checkout.py /path/to/checkout` is a dry run; `--apply` adds only manifest-verified files whose paths are absent. Identical files are accepted. Different existing files are refused, not overwritten. Main/master, wrong origin, dirty checkouts, unsafe paths and symlinks are refused. It performs no network, commit, build or installation operation. On a previously imported game checkout, reconcile a source diff manually rather than expecting an additive importer to be a merge engine.

After review, rebuild, run the current tests, commit/push through your authorized environment, and verify the remote tree before saying the game is uploaded. `tools/publish_github.py` is an older guarded publication utility, not evidence that this release was pushed. Do not supply tokens inside the repository or chat, force-push existing history, or activate the old `.import/READY.json` workflow with a different payload.

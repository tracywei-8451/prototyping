---
description: Create the next version of a prototype, copying the latest version and updating the nav bar
allowed-tools: Read, Write, Edit, Bash
---

Create a new version of the prototype in the current or specified directory.

## Workflow

1. **Find the prototype directory** — if $ARGUMENTS names a path, use it. Otherwise use the closest prototype directory to the current working directory (look for a folder containing `index.html` with a `.version-bar` inside it).

2. **Discover existing versions** — list files matching `index.html` and `v*.html` in the prototype folder. Determine the highest version number N. The new version will be v(N+1).
   - `index.html` is always V1
   - `v2.html` is V2, `v3.html` is V3, etc.
   - New file to create: `v{N+1}.html` (or `v2.html` if only `index.html` exists)

3. **Copy the latest version** — copy the highest-version file to the new `v{N+1}.html`.

4. **Update the nav bar in ALL version files** — every version file needs a `<a class="version-tab">` entry for the new version. For each file:
   - Add `<a class="version-tab" href="v{N+1}.html">V{N+1}</a>` after the last existing version tab
   - The `active` class must be on the tab matching that file only (e.g. in `index.html` V1 is active, in `v2.html` V2 is active, etc.)
   - Use sed or direct file edits — do not rewrite whole files

5. **Verify** — grep the nav bar block from each file to confirm active states are correct.

6. **Wrap up** — one sentence: which file was copied, what the new version file is named.

---
description: Add a Figma iframe tab to the navigation of the current prototype
argument-hint: [figma-url]
allowed-tools: Read, Write, Edit, Bash
---

Add a Figma tab to the prototype in the current working directory using this Figma URL: $ARGUMENTS

## Workflow

1. **Find index.html** — locate `index.html` in the current directory (or the nearest prototype directory).

2. **Read the version-bar** — find the `<div class="version-bar">` block in `index.html` to understand the existing tabs.

3. **Create figma.html** — write a `figma.html` file in the same directory. It should:
   - Copy the `.version-bar` and `.version-tab` CSS rules **verbatim** from `index.html` — do not paraphrase or use defaults. Read the exact values for font-size, font-weight, gap, padding, height, etc.
   - List the existing tabs as non-active links pointing to their respective files
   - Have the Figma tab as `active`
   - Embed the Figma URL in a full-height iframe using the embed format: replace `figma.com/design/` with `embed.figma.com/design/` and append `&embed-host=share` to the URL
   - Use the same `<link rel="icon">` path as `index.html`
   - The version-bar should use `position: relative` (not fixed) since the iframe fills the rest of the page height

4. **Add the Figma tab to index.html** — insert into the version-bar:
   - A divider: `<span style="width:1px;height:14px;background:rgba(255,255,255,0.2);margin:0 6px;"></span>`
   - A tab link: `<a class="version-tab" href="figma.html">Figma</a>`
   - Do the same for any other sibling HTML files that share the same version-bar (e.g. `ppc.html`, `internal.html`) so the Figma tab appears consistently across all tabs.

5. **Confirm** — report what files were created or modified.

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
   - Use the standard version-bar CSS (see styles below) with `position: relative` (not fixed) since the iframe fills the rest of the page height
   - List the existing tabs as non-active links pointing to their respective files
   - Have the Figma tab as `active`
   - Embed the Figma URL in a full-height iframe using the embed format: replace `figma.com/design/` with `embed.figma.com/design/` and append `&embed-host=share` to the URL
   - Use the same `<link rel="icon">` path as `index.html`
   - Include the Inter font link (`https://rsms.me/inter/inter.css`) for correct font rendering

4. **Add the Figma tab to index.html** — if `.version-tab` CSS doesn't exist yet, add it. Then insert a tab link into the version-bar:
   - `<a class="version-tab" href="figma.html">Figma</a>`
   - Do the same for any other sibling HTML files that share the same version-bar (e.g. `ppc.html`, `internal.html`) so the Figma tab appears consistently across all tabs.

5. **Confirm** — report what files were created or modified.

## Standard version-bar CSS

Use these exact values for all version-bar and version-tab styles:

```css
.version-bar {
  height: 36px;
  background: #1a1a2e;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}
.back-to-library {
  position: absolute;
  left: 12px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 600;
  color: rgba(255,255,255,0.5);
  text-decoration: none;
  letter-spacing: -0.1px;
  line-height: 1;
  transition: color 120ms;
}
.back-to-library:hover { color: rgba(255,255,255,0.85); }
.version-tab {
  display: inline-flex; align-items: center;
  height: 24px; padding: 0 12px;
  border-radius: 4px; border: none;
  background: transparent;
  color: rgba(255,255,255,0.5);
  font-family: var(--font);
  font-size: 12px; font-weight: 700;
  letter-spacing: 0.04em; text-transform: uppercase;
  text-decoration: none; cursor: pointer;
}
.version-tab:hover { color: rgba(255,255,255,0.8); }
.version-tab.active { background: rgba(255,255,255,0.12); color: #fff; }
```

Note: tabs are separated by `gap: 4px` on the bar — do NOT add divider spans between tabs.

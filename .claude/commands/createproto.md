---
description: Create a new prototype from a Figma link
argument-hint: [figma-url]
allowed-tools: Read, Write, Edit, Bash, mcp__figma__get_design_context, mcp__figma__get_screenshot, mcp__figma__get_metadata, mcp__meridian__search_components, mcp__meridian__get_component_api, mcp__meridian__get_design_tokens, mcp__meridian__get_tailwind_reference
---

Create a new prototype from this Figma link: $ARGUMENTS

## Workflow

1. **Read the design** — call `mcp__figma__get_design_context` on the node. Extract the fileKey and nodeId from the URL.

2. **Check for annotations** — grep the response for `data-annotations=` attributes. Pair each annotation with the nearest `data-name=` to know which element it targets. These communicate intent not visible in the rendered design — apply them before writing any code.

3. **Determine the folder name** — use the Figma frame/page name, lowercased with underscores (e.g. `keyword_bid`). Create the folder at `/Users/t160029/repo/prototyping/<folder_name>/`.

4. **Build the prototype** — create a single self-contained `index.html` inside that folder. Rules:
   - Vanilla JS and CSS only, no build step, no framework
   - Meridian design tokens as CSS variables (use `mcp__meridian__get_design_tokens` for values)
   - Use Meridian components where applicable (`mcp__meridian__search_components`, `mcp__meridian__get_component_api`)
   - Mock data inline — no external API calls
   - Make reasonable assumptions without asking questions

5. **Add to the library** — open `/Users/t160029/repo/prototyping/index.html` and insert a new `<a class="card">` block inside `.grid`, matching the format of existing cards:
   ```html
   <a class="card" href="<folder_name>/index.html">
     <span class="card-tag"><folder_name></span>
     <span class="card-title"><Descriptive Title></span>
     <div class="card-footer">
       <span class="card-path"><folder_name>/index.html</span>
       <span class="card-arrow">→</span>
     </div>
   </a>
   ```

6. **Wrap up** — one or two sentences: what was built, and any assumptions worth noting.

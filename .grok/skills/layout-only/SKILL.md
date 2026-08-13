---
name: layout-only
description: >
  Apply another page or component’s layout without copying its content.
  Use when the user says "copy the layout", "follow the layout", "match the layout",
  "same layout as", "layout like", or runs /layout-only. Changes CSS and HTML
  structure only; keeps existing page content, theme tokens, and fonts.
---

# Layout only (no content copy)

## Goal

Make page A **look structured like** page B (or component B) while **keeping A’s content, assets, theme, and type**.

## Hard rules

| Do | Do not |
|----|--------|
| Mirror structure: banner height, max-width shells, grids, section stacks, nav placement | Copy prose, headings unique to the reference, feature lists, CTAs, or image assets from the reference |
| Reuse A’s existing strings, images, and data | Invent “matching” intro/CTA text from the reference |
| Use site tokens (`var(--pistachio-green-background)`, etc.) and existing title classes | Replace A’s theme/fonts with ad-hoc colors or type from the reference unless asked |
| Edit CSS + structural HTML | Rewrite A into a content clone of B |

## Steps

1. Read **target** page/component (what stays content-wise).
2. Read **reference** for layout only: wrappers, grid, spacing, alternating sections, CSS classes/patterns.
3. Diff layout patterns — list structural changes only (e.g. sticky sections, `max-w-7xl`, image/content columns).
4. Implement on the target:
   - Restructure markup around **unchanged** content nodes.
   - Add/adjust CSS; prefer the target’s existing CSS file or a page CSS file already in use.
5. Verify: every visible string/image on the target is still the target’s original (or only what the user explicitly asked to change).

## Phrases that trigger this skill

- “follow the X layout”
- “copy layout from X”
- “make this like X” when X is a page layout (not “rewrite like X’s marketing copy”)

If the user explicitly asks to copy **content** as well, then content copy is allowed — only when they say so.

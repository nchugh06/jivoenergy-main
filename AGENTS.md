# JIVO Energy — project agent rules

## “Copy / follow / match the layout” means layout only

When the user asks to copy, follow, match, or mirror another page/component’s **layout**:

1. **Only change layout** — HTML structure (wrappers, grid/flex order, section shells) and CSS (spacing, columns, sticky/stack, alignment).
2. **Do not copy content** — do not take or invent titles, paragraphs, bullets, CTAs, images, links, or data from the reference page.
3. **Keep the target page’s existing content** — rewrite markup around the same copy and assets already on the page being edited.
4. **Keep theme and type as before** on the target page:
   - Colors via existing CSS variables (`--pistachio-green-background`, `--color-dark-green`, `--color-text-dark`, etc. in `src/app/globals.css`).
   - Existing title classes (`section-title`, `section-title-spl`) and site fonts — do not swap in the reference page’s unique copy or one-off type treatments unless the user asks.
5. Prefer a dedicated CSS file + class names over dumping large Tailwind utility strings, when the target page already uses CSS files.

**Bad:** Porting business-areas intro text onto capabilities while “matching layout”.  
**Good:** Same capabilities copy, restructured to the same grid/banner/section shell as business-areas.

## General

- Prefer existing design tokens and components over new one-off styles.
- Do not add content the user did not request.

# Visual Language Observations

Based on the first rendered sample set from the downloaded PPTX corpus.

## Reusable Brand Cues

Recent kintone proposal decks consistently use these recognizable cues:

- White or very pale cream backgrounds.
- A thick yellow top rule and matching yellow bottom rule on many content slides.
- A small kintone logo at bottom left or bottom right.
- Bold black or dark navy titles with generous whitespace.
- Yellow cloud-shaped kintone badges near titles.
- Thin gray divider lines for title slides and section separators.
- Yellow highlight bars, rounded labels, and pill-like callouts for key conclusions.
- Simple card grids with light gray outlines and yellow accents.

These cues are worth retaining, but the source decks are not a quality benchmark. Treat older cybozu templates with pale cyan gradients, pink/yellow variants, and generic corporate styling as historical references, not the default target style.

## Repeated Visual Elements To Rebuild

Prioritize rebuilding these as reusable PowerPoint-native or clean vector/raster components:

- **Kintone cloud mark variants**: small logo lockups, yellow cloud badges, plain cloud marker, title badge.
- **Yellow section devices**: top/bottom rules, small title dashes, long highlight pills, tab labels, segmented ribbons.
- **Problem/solution cards**: two-column pain cards, before/after blocks, 2x2 problem grids, app pack blocks.
- **Dashboard/UI mockups**: kintone app screenshots framed by editable callouts, device mockups, list/table panels, workflow panels.
- **Process diagrams**: yellow arrows, circular improvement loops, approval/process flows, branch-and-merge diagrams.
- **Icon tiles**: square rounded app icons with long shadows, calendar/clock/chart/clipboard/briefcase/Excel/database/gear/person icons.
- **People/character assets**: yellow kintone mascot, line-art office workers, simple customer/manager avatars, worried/thinking/working poses.
- **Industry packs**: manufacturing, workflow, HR attendance, SFA, purchasing, solution map layouts.

## Character Style Notes

Two character systems appear:

- Kintone yellow mascot: rounded yellow body, small feet, simple eyes, often wearing/holding props such as cardboard box, laptop, or sign.
- Human line art: black or gray outlines with minimal yellow accent, simple poses such as presenting, thinking, laptop work, approval, or group discussion.

For reusable assets, prefer redrawn simplified figures over copying extracted bitmap characters. Use extracted images only as local private references unless usage is explicitly approved.

## PPT Layout Archetypes Worth Rebuilding Better

Create reusable template/component pages for:

- Title slide with horizontal rules and kintone badge.
- Section divider with pale yellow full background.
- Pain overview with 2 cards or 2x2 cards.
- Solution overview with 3-5 app modules.
- App pack map with grouped app icons.
- Workflow/process slide with arrows and approval states.
- Before/after slide.
- Case study slide with customer logo/photo area and outcome bands.
- Product introduction slide with screenshot plus annotation callouts.
- Solution map one-pager.

## Implementation Implications

- Route A should start from template/page reuse because the visual system is very consistent across proposal decks.
- A1 code generation is useful for repeated grids, process arrows, app-pack maps, and dashboard mockups.
- Character assets are often embedded raster images in source decks; do not assume they are editable. Rebuild a small approved standard set before relying on them in generated decks.
- Preserve the current kintone-yellow proposal style as the default; keep older cyan/pink template styles only as optional historical variants.

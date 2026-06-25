# Route C Experiment Plan

This plan defines the next Route C / web-first experiments before implementation. The goal is to test several sub-routes, compare their real output quality, and record which parts are worth turning into repeatable production workflow.

## Objective

Route C should answer one question:

Can Reveal.js / HTML / CSS / JS produce cybozu/kintone-style presentation pages that are meaningfully stronger than Route A / native-first for motion, interaction, layout control, or web-like product storytelling, while still offering useful PPTX export options?

The experiments should not assume the answer is yes. Each experiment must produce visible artifacts, self-review, one revision pass, and a short conclusion.

## Naming

- Route A / native-first: PowerPoint-native editable deck production.
- Route B / image-first: generated-image visual-story production.
- Route C / web-first: Reveal.js/HTML/CSS/JS production, optionally exported to PPTX.

## Shared Scenario Set

Use small, concrete business scenarios rather than abstract route demos. Prefer scenarios that kintone-style decks commonly need:

1. Phone call record management.
2. Field feedback improvement loop.
3. Approval workflow / status visibility.
4. Customer support escalation.
5. Simple before-after product introduction.

Start with two scenarios:

- phone call record management, because a first C prototype already exists;
- field feedback improvement loop, because it already has A, B-pure/B-hybrid comparison material.

## Sub-routes To Test

### C-live

Final artifact is a browser presentation.

Test purpose:

- motion and step-by-step reveal;
- interactive navigation;
- live product-story feel;
- whether the browser deck feels better than exported PPTX.

Required output:

- local server URL;
- web source folder;
- browser screenshots of final states;
- review notes that judge live behavior separately from PPT export.

Success criteria:

- the live deck has a reason to exist beyond static slides;
- fragments or motion improve comprehension;
- presenter can run it locally without manual setup beyond one command.

### C-export

Final artifact is PPTX with one full-slide browser screenshot per page.

Test purpose:

- fidelity of web-rendered slides in PowerPoint;
- whether screenshot-only export is acceptable for customer handoff;
- whether browser controls/progress bars can be reliably hidden.

Required output:

- screenshot folder;
- PPTX with one screenshot per slide;
- PowerPoint-rendered preview PNGs;
- contact sheet.

Success criteria:

- PPTX preview matches browser screenshots;
- no Reveal controls, progress bars, scrollbars, mouse cursor, or browser chrome appear;
- export is deterministic and repeatable.

### C-hybrid-export

Final artifact is PPTX with web-rendered screenshot backgrounds plus editable PPT overlays.

Test purpose:

- reusable customer/product/language overlay layer;
- whether web background plus PPT overlay avoids duplicate text/logo;
- comparison with B-hybrid.

Required output:

- full screenshots for reference;
- background-only screenshots with web title/logo/page marks hidden;
- PPTX with editable title/body/logo/page overlays;
- manifest listing overlays and non-editable regions;
- preview/contact sheet.

Success criteria:

- no duplicated title, logo, or page mark;
- overlay text is editable and readable;
- background screenshot retains visual value even after text/logo are removed;
- overlay count stays small enough that this does not become Route A.

### C-fragment-export

Final artifact is PPTX where selected Reveal fragment states become separate slides.

Test purpose:

- whether step-by-step explanation can be preserved in PPTX;
- whether fragment snapshots create useful presenter pacing or too many near-duplicate slides.

Required output:

- screenshot sequence per fragment state;
- PPTX with fragment states as separate pages;
- review of page count and pacing.

Success criteria:

- each additional state changes meaning, not just decoration;
- page count stays reasonable;
- speaker notes explain the reveal sequence.

### C-component-export

Experimental artifact where selected web components are exported as PNG or SVG assets and inserted into native PPT pages.

Test purpose:

- whether web can act as a component renderer;
- whether reusable UI boards, process modules, and diagrams can be made cleaner than native PPT while still used inside A/native-first decks.

Required output:

- one or two component exports;
- a native PPTX page using those components;
- notes on PNG versus SVG reliability.

Success criteria:

- component export is visually crisp;
- insertion into PPT does not create unexpected scaling, font, or shadow issues;
- the component is reusable enough to justify this path.

### C-native-reconstruction Spike

Experimental spike only. HTML layout is used as a design source, then a script rebuilds a small subset as native PPTX objects.

Test purpose:

- estimate whether HTML-to-PPTX reconstruction is worth future investment.

Required output:

- one simple page rebuilt as native PPT objects;
- list of unsupported CSS/layout features;
- engineering cost estimate.

Success criteria:

- only worth continuing if repeated layouts can be mapped predictably;
- not worth continuing if every page needs hand-authored conversion logic.

## Experiment Batch Plan

### Batch 1: Phone Record Route C Baseline

Starting point:

- existing `outputs/c-web-first-phone-record/` prototype.

Run:

1. C-live review and one design revision.
2. C-export review and one export pipeline revision.
3. C-hybrid-export review and one overlay/background revision.
4. C-fragment-export variant.

Expected learning:

- whether C is better than B-hybrid for this scenario;
- whether the web-first style feels like a real presentation or a web mockup pasted into slides.

### Batch 2: Field Feedback Improvement Loop

Starting point:

- existing A/B route test content and Text Lock.

Run:

1. C-live with staged improvement loop.
2. C-export final-state deck.
3. C-hybrid-export with editable text/logo overlays.

Expected learning:

- compare C against existing A and B-hybrid outputs using the same story;
- test whether web animation helps explain loop logic.

### Batch 3: Approval Workflow / Status Visibility

Starting point:

- create a short Text Lock from scratch.

Run:

1. C-live with interactive status board or reveal sequence.
2. C-fragment-export where each status step becomes a PPT page.
3. C-component-export for the status board.

Expected learning:

- test Route C for process/status visibility pages;
- evaluate whether component export can strengthen Route A.

## Required Review Loop Per Experiment

Each sub-route experiment must include:

1. Initial build.
2. Browser screenshot or PPT render.
3. Self-review against route-specific QA.
4. One targeted revision pass.
5. Final preview/contact sheet.
6. `dist/review.md` with:
   - what improved;
   - what still fails;
   - whether the sub-route should continue.

Do not call an experiment complete after the first render unless the first render already passes the route-specific QA gates.

## Common QA Checklist

- C-live fits the visible browser viewport without scrolling at normal presentation zoom.
- Text readable at 16:9 presentation scale.
- No accidental browser controls, Reveal controls, scrollbars, or progress bars in exported screenshots.
- No CSS/HTML primitive drawings of complex representational art such as people, mascots, devices, vehicles, buildings, or realistic objects. Use source assets, generated image assets, screenshots, simple icons, cards, tables, and status boards instead.
- No duplicated title/logo/page mark in hybrid exports.
- Screenshots match PowerPoint-rendered previews.
- Fragment state capture is deterministic.
- Live deck and exported PPTX are evaluated separately.
- The route advantage is explicit: motion, interaction, web layout, export fidelity, editability, or component reuse.

## Folder Shape

Use one output folder per experiment:

- `outputs/c-<scenario-slug>/work/text-lock.md`
- `outputs/c-<scenario-slug>/work/storyboard.md`
- `outputs/c-<scenario-slug>/web/`
- `outputs/c-<scenario-slug>/screenshots/full/`
- `outputs/c-<scenario-slug>/screenshots/backgrounds/`
- `outputs/c-<scenario-slug>/screenshots/fragments/`
- `outputs/c-<scenario-slug>/dist/*.pptx`
- `outputs/c-<scenario-slug>/dist/*contact-sheet.jpg`
- `outputs/c-<scenario-slug>/dist/manifest.json`
- `outputs/c-<scenario-slug>/dist/review.md`

## Implementation Notes

- Prefer deterministic Playwright capture over manual screenshots.
- Use local static server paths; avoid external CDN dependencies.
- Keep Reveal.js vendor assets local to the experiment or make the project dependency explicit.
- For C-hybrid-export, capture background-only screenshots by hiding web title/logo/page elements before screenshot.
- For C-export, capture full screenshots with all web presentation chrome intended for the slide but no Reveal controls.
- Use PowerPoint preview export as the final check, not only browser screenshots.

## Decision Gates

After the three batches, decide:

- whether Route C remains experimental only;
- whether C-live should become an officially supported delivery mode;
- whether C-hybrid-export deserves a reusable script template;
- whether C-component-export is useful enough to support Route A;
- whether C-native-reconstruction should be dropped or explored further.

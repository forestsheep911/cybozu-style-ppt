# Route C Phone Record Prototype Review

## Output

- C-live source: `outputs/c-web-first-phone-record/web/index.html`
- C-export PPTX: `outputs/c-web-first-phone-record/dist/c-export-phone-record.pptx`
- C-hybrid-export PPTX: `outputs/c-web-first-phone-record/dist/c-hybrid-export-phone-record.pptx`
- C-fragment-export PPTX: `outputs/c-web-first-phone-record/dist/c-fragment-export-phone-record.pptx`
- C-component-export PPTX: `outputs/c-web-first-phone-record/dist/c-component-export-phone-record.pptx`
- C-export contact sheet: `outputs/c-web-first-phone-record/dist/c-export-contact-sheet.jpg`
- C-hybrid-export contact sheet: `outputs/c-web-first-phone-record/dist/c-hybrid-export-contact-sheet.jpg`
- C-fragment-export contact sheet: `outputs/c-web-first-phone-record/dist/c-fragment-export-contact-sheet.jpg`
- C-component preview: `outputs/c-web-first-phone-record/preview/c-component-export-phone-record/slide-01.png`

## Route Fit

This prototype tests Route C / web-first:

- Reveal.js, HTML, CSS, and JavaScript are the authoring surface.
- C-export uses full browser screenshots as non-editable PPTX slides.
- C-hybrid-export uses browser-rendered background screenshots plus editable PPT title, copy, logo, page mark, and bottom rule overlays.
- C-fragment-export turns selected Reveal fragment states into separate PPTX pages.
- C-component-export renders a web component as PNG and places it inside a mostly native PPT page.

## Findings

- Route C is technically viable for local browser presentation and screenshot-based PPTX export.
- Web-first layout is easier to control than native PPT for staged fragments, UI-like boards, and reusable theme tokens.
- C-export preserves the browser composition but is bitmap-final.
- C-hybrid-export needs a separate background screenshot pass with web title/logo/page elements hidden. Reusing the full C-live screenshot causes duplicate text and logo overlays.
- Fragment export must be deterministic. Advancing Reveal with keyboard input can accidentally move to the next slide; the capture script now marks current-slide fragments visible directly.
- C-fragment-export is viable but can easily overproduce pages. The phone prototype expanded from 3 live slides to 13 PPTX pages, which is useful for preserving presenter pacing but too verbose as a default export.
- C-component-export is promising as a Route A supplement: web-rendered UI modules look cleaner than quick native PPT rebuilds, while surrounding titles, logos, and explanatory copy remain native/editable.
- C-live benefits from imagegen when the page needs people, mood, or realistic object scenes. The revised first slide uses an imagegen scene panel for the phone-call moment and keeps web-native cards for the structured explanation.
- C-live should not use CSS/HTML primitive drawings for people or complex objects. Those looked weaker than both B-hybrid and the imagegen scene replacement.
- Viewport fit matters for C-live. The revised deck was checked at 1366x768 with no document scrolling; Reveal scales the 16:9 canvas into the browser viewport.

## Visual Notes

- This prototype is deliberately web/CSS-native rather than generated-image-rich, so its illustration quality is cleaner than Route A but less emotionally rich than B-hybrid.
- It is strongest where motion or staged reveal matters.
- For static proposal pages, B-hybrid still gives stronger scene emotion. For interactive walkthroughs, Route C has the better ceiling.
- For product UI or status-board modules, C-component-export may become a practical middle route: not fully editable, but more reusable than full-slide screenshots.
- A stronger C-live pattern is now emerging: imagegen for scene panels, web/CSS for text, cards, tables, status boards, and reveal timing.

## Next Improvements

- Add a formal static server script instead of relying on ad hoc commands.
- Decide whether each fragment state should export as a separate PPTX page or only final states.
- Improve character/scene art with source assets or generated background images if Route C needs more emotional force.
- Consider a C-hybrid standard: web screenshot background must hide `.copy-block`, `.brand-slot`, and `.page-mark` before capture.
- Limit C-fragment-export to meaningful states only. Do not export every fragment by default.
- Continue testing C-component-export with SVG and high-DPI PNG options before adopting it as a standard support path for Route A.

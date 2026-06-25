# Route C Experiment Summary

## Tested Scenarios

- `outputs/c-web-first-phone-record/`: phone call record management.
- `outputs/c-web-first-field-feedback/`: field feedback improvement loop.

## Tested Sub-routes

### C-live

Works technically and is worth keeping as a distinct route. It is strongest when reveal timing, browser-native layout, or a demo-like feeling matter.

Phone record result: acceptable, but not clearly better than B-hybrid for emotional persuasion.

Field feedback result: stronger fit because process nodes and loop states benefit from staged reveal.

### C-export

Works reliably as screenshot-to-PPTX. It is simple, predictable, and visually faithful, but not editable.

Best use: archive, handoff, or customer preview when browser delivery is not acceptable.

### C-hybrid-export

Works, but only with a strict background-only screenshot pass. Full C-live screenshots cannot be reused because titles, logos, page marks, and sometimes business labels will duplicate or compete with PPT overlays.

Best use: same logic as B-hybrid, but with web-rendered backgrounds instead of generated image backgrounds.

### C-fragment-export

Technically works, but it overproduces pages if every fragment becomes a slide. The phone record prototype expanded from 3 live slides to 13 PPTX pages.

Best use: export only key fragment states, not every reveal step.

### C-component-export

Promising. Web-rendered UI/status components can be inserted into otherwise native PPT pages. This may strengthen Route A without making the entire deck screenshot-based.

Best use: polished UI boards, dashboards, process modules, or reusable visual components that do not need frequent text editing.

### C-native-reconstruction Spike

Not implemented yet. It should remain a later engineering spike because the current experiments already show useful paths without native reconstruction.

## Initial Route Decision

- Keep Route C experimental but active.
- Prioritize C-live, C-export, C-hybrid-export, and C-component-export.
- Treat C-fragment-export as optional and constrained.
- Delay C-native-reconstruction until repeated layouts justify the cost.

## Comparison

- Against Route A / native-first: C is visually cleaner for web-like process modules and status boards, but less editable.
- Against Route B / image-first: C is better for process clarity, staged reveals, and reusable layout systems; B-hybrid is better for emotional scene-setting and human/field atmosphere.
- Against B-hybrid specifically: C-hybrid-export uses the same layer principle, but the background comes from deterministic web rendering rather than image generation.

## Next Changes To Formalize

- Add a reusable C capture script template that supports:
  - full screenshots;
  - background-only screenshots;
  - selected fragment states;
  - component screenshots.
- Define a CSS class contract for hybrid export:
  - `.copy-block`
  - `.brand-slot`
  - `.page-mark`
  - `.export-hide`
  - `.hybrid-hide`
- Add a rule: C-hybrid backgrounds should avoid baked-in main copy, customer names, product names, and identity marks.

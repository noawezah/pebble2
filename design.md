# PEBBLE 2 — design experiment

## Purpose and baseline

Explore a new look and trajectory for PEBBLE, and test whether Figma improves the visual quality and iteration process. Keep the existing Next.js / TypeScript implementation as the technical foundation.

The copied baseline is original Pebble commit `6841fcb1f831b05a48d44a8445743f36070fb2e3` (6 October 2026 copy date). Its full ancestor history, all 110 tracked files, and 61 image assets are preserved. The initial copy makes no changes to the site's rendered design or behavior.

- New repository: https://github.com/noawezah/pebble2
- New working folder: `C:\Users\HP\Documents\ChatGPT\pebble2`
- Figma design lab: https://www.figma.com/design/dRLqgYzHIKn3L2FJ1xwFYA
- Original repository: https://github.com/noawezah/pebble

## Taste recovered from earlier chats

The user prefers premium, atypical sites with bold, expressive typography, distinctive palettes, substantial photography, and intentional editorial composition. Movement matters: fluid timing, creative scroll behavior, floating objects, moving text, overlays, and compelling 2D or 3D interactions. Performance and fast loading matter too.

The concrete user-supplied reference is https://www.bonneheure-paris.com/. It is a reference to study before designing screens, rather than an already inspected or copied design. The user previously felt a design borrowed too little from this reference.

Pebble feedback emphasizes tighter vertical spacing, occasional text/photo overlap, carefully placed objects, desktop information that fits beside imagery, and strong footer lettering. Mobile should retain ambitious interactions when they work well. Avoid repetitive layouts and repeated copy patterns.

Sources: “Assess Figma for Pebble site”, “Update project for new devices”, “design md start”, and “Create a website design prompt”. These preferences establish a starting brief; feedback specific to another business does not automatically become a Pebble requirement.

## Three proposed directions

These are exploration prompts, not approved designs. No direction has been selected.

1. **Kinetic monochrome.** Off-white and charcoal, with green supplied by café photography. Oversized rounded typography, asymmetrical photo composition, and controlled text or object movement. Explore a more expressive version of the existing identity.
2. **Café poster.** Warm paper, inky plum, and a copper accent. Bold display typography, playful poster-like crops, layered photography, and rhythmic movement. Explore a clearly different palette and composition.
3. **After hours.** Deep ink, moss, and lamp amber. Atmospheric café photography, immersive transitions, and a tactile central object. Explore a darker and more spatial direction without sacrificing readability.

Palette, fonts, composition, and interaction details remain open. The initial Figma board is an editable brief, not a completed homepage or a motion prototype.

## Workflow

1. Study the visual reference and inspect the current site at desktop and mobile sizes.
2. Develop three distinct visual and motion concepts in Figma using real café assets and confirmed content. Show enough of the hero, navigation, and one lower section to compare them meaningfully.
3. Select a direction with the user and record the choice here: palette, typography, grid, photography, motion, and mobile behavior.
4. Implement in Next.js / TypeScript. Translate reusable design decisions into CSS tokens and appropriately sized components. Read the installed Next.js documentation before code changes, as required by `AGENTS.md`.
5. Verify the site in the browser at desktop and mobile sizes, including navigation, language switching, readability, reduced motion, and interaction timing. Run lint, type checking, and a production build for substantial code changes.
6. After substantial redesign work, create a separate Vercel project connected to `pebble2` and configure the new site origin.

Evaluate Figma through concrete outcomes: how quickly alternatives can be compared and revised, how well the implemented composition matches the selected design, and whether interaction, mobile quality, and loading performance improve. Keep code and browser behavior as part of the evaluation; a static board alone cannot establish that Figma improved the workflow.

## Content and identity

Keep confirmed café facts and both English and Romanian content available. Preserve supplied photography, logo/snail source assets, and provenance. Existing monochrome styling, Fraunces / DM Sans, vines, spotlights, moss, and motion are baseline choices to assess rather than mandatory ingredients in every new concept. Do not invent menu prices, contact details, reviews, or awards.

## Decision record

- 6 October 2026: independent repository and editable Figma brief established; current site retained as the comparison baseline.
- Selected visual direction: pending.
- Separate Vercel project: deferred until substantial redesign work.

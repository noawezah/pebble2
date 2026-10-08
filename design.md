# PEBBLE 2 — design experiment

## Purpose and baseline

Explore a new look and trajectory for PEBBLE, and test whether Figma improves the visual quality and iteration process. Keep the existing Next.js / TypeScript implementation as the technical foundation.

The copied baseline is original Pebble commit `6841fcb1f831b05a48d44a8445743f36070fb2e3` (6 October 2026 copy date). Its full ancestor history, all 110 tracked files, and 61 image assets are preserved. The initial copy makes no changes to the site's rendered design or behavior.

- New repository: https://github.com/noawezah/pebble2
- New working folder: `C:\Users\HP\Documents\ChatGPT\pebble2`
- Figma design lab: https://www.figma.com/design/dRLqgYzHIKn3L2FJ1xwFYA?node-id=2-2
- Original repository: https://github.com/noawezah/pebble

## Taste recovered from earlier chats

The user prefers premium, atypical sites with bold, expressive typography, distinctive palettes, substantial photography, and intentional editorial composition. Movement matters: fluid timing, creative scroll behavior, floating objects, moving text, overlays, and compelling 2D or 3D interactions. Performance and fast loading matter too.

The user clarified that Bonne Heure is a reference for Jai Bistrot, not PEBBLE. PEBBLE uses cream and charcoal. Cross-project preferences may inform the ambition of the work, but must not replace this café's identity.

Pebble feedback emphasizes tighter vertical spacing, occasional text/photo overlap, carefully placed objects, desktop information that fits beside imagery, and strong footer lettering. Mobile should retain ambitious interactions when they work well. Avoid repetitive layouts and repeated copy patterns.

Sources: “Assess Figma for Pebble site”, “Update project for new devices”, “design md start”, and “Create a website design prompt”. These preferences establish a starting brief; feedback specific to another business does not automatically become a Pebble requirement.

## Three proposed directions

Three directions were compared in editable Figma frames. The user selected kinetic monochrome: cream and charcoal. The other directions remain unselected explorations.

1. **Kinetic monochrome.** Off-white and charcoal, with green supplied by café photography. Oversized rounded typography, asymmetrical photo composition, and controlled text or object movement. Explore a more expressive version of the existing identity.
2. **Art-poster café.** Warm paper, inky plum, and a copper accent. Bold display typography, playful poster-like crops, layered photography, and rhythmic movement. Explore a clearly different palette and composition.
3. **After-hours garden.** Deep ink, moss, and lamp amber. Atmospheric café photography, immersive transitions, and a tactile central object. Explore a darker and more spatial direction without sacrificing readability.

The selected palette is cream `#F5F3EE` and charcoal `#292929`, with neutral rules and muted text. Keep rounded Fraunces with SOFT 100 and DM Sans. Green from café photography and the preserved original vine artwork remains part of the identity.

Selected desktop design: https://www.figma.com/design/dRLqgYzHIKn3L2FJ1xwFYA?node-id=22-85. Figma contains native editable layers, local components, and bound variables. Figma's built-in AI was not invoked. The Starter-plan connected-tool call limit interrupted mobile frame and motion-keyframe work; those remain unpopulated in Figma. Mobile composition and animation are implemented in the website itself. Detailed file state is recorded in `docs/FIGMA.md`.

## Workflow

1. Inspect PEBBLE's current site and original artwork at desktop and mobile sizes. Keep references from other businesses separate.
2. Develop three distinct visual and motion concepts in Figma using real café assets and confirmed content. Show enough of the hero, navigation, and one lower section to compare them meaningfully.
3. Select a direction with the user and record the choice here: palette, typography, grid, photography, motion, and mobile behavior.
4. Implement in Next.js / TypeScript. Translate reusable design decisions into CSS tokens and appropriately sized components. Read the installed Next.js documentation before code changes, as required by `AGENTS.md`.
5. Verify the site in the browser at desktop and mobile sizes, including navigation, language switching, readability, reduced motion, and interaction timing. Run lint, type checking, and a production build for substantial code changes.
6. After every change, open the local preview at `http://localhost:3002/` in this chat. Keep edits local for the user's terminal publication workflow. Vercel Production tracks `codex/cream-charcoal-overhaul`; future pushes to this branch update `https://pebble2.vercel.app`. Review and verify that permanent public address after release. Production `NEXT_PUBLIC_SITE_URL` is configured for the same origin.

Evaluate Figma through concrete outcomes: how quickly alternatives can be compared and revised, how well the implemented composition matches the selected design, and whether interaction, mobile quality, and loading performance improve. Keep code and browser behavior as part of the evaluation; a static board alone cannot establish that Figma improved the workflow.

## Content and identity

Keep confirmed café facts and both English and Romanian content available. Preserve supplied photography, logo/snail source assets, and provenance. The user explicitly requires the original 3D loading choreography and spotlight/vine dividers. Keep these as the layout evolves. Do not invent menu prices, contact details, reviews, or awards.

## Decision record

- 6 October 2026: independent repository and editable Figma brief established; current site retained as the comparison baseline.
- 6 October 2026: patched Next.js and `eslint-config-next` from 16.3.5 to 16.3.8 after the inherited dependency audit flagged [GHSA-vcvr-r3jv-pc5j](https://github.com/advisories/GHSA-vcvr-r3jv-pc5j). The affected `next/og` / `ImageResponse` API is not used by this site. The original dependency versions remain in the copied baseline history.
- 6 October 2026: user selected cream/charcoal and separated PEBBLE's direction from Jai Bistrot. User required the original 3D intro, actual background asset preparation, the original vine dividers, and artistic motion throughout.
- Selected visual direction: kinetic monochrome, implemented in `codex/cream-charcoal-overhaul`.
- Separate Vercel project: GitHub's existing integration connects to `ahad-fcea/pebble2`. On 7 October, Vercel confirmed the saved Production branch as `codex/cream-charcoal-overhaul`; every future push to this branch creates a Production deployment. Auto-assignment of Production domains remains enabled.
- Permanent public URL: the user explicitly requested publishing the redesign to `https://pebble2.vercel.app` and using that as the public address for work in this chat. Vercel's Domains page confirmed Valid Configuration and Production assignment for this hostname. Preserve the existing mapping and verify this URL after each release.
- Production origin: Config variable `NEXT_PUBLIC_SITE_URL=https://pebble2.vercel.app` was added successfully to Production on 7 October. The requested runtime release is Ready / Production from commit `e32a9b305612539a34932577e03d4e7b8479be53`, and the redesign is verified live at that permanent URL.
- Manual publication workflow: the user runs Git staging, commit, and push themselves in the Codex terminal when changes are worth publishing or ready for phone review. Agent work stays local, unstaged, and uncommitted unless an explicit instruction authorizes a Git or deployment action. Earlier remote commits remain intact.

## Dependency follow-up

After the Next.js patch, npm reports 27 inherited audit findings: 13 high, 13 moderate, and 1 low, with no critical finding remaining. Review the Sanity-related dependency tree and other transitive packages before the eventual production deployment. Some proposed audit fixes require major downgrades, so they need a compatibility review. This setup does not claim that every dependency finding has been resolved.

## Setup verification — 6 October 2026

- Production build, lint, and standalone TypeScript checks pass with Next.js 16.3.8.
- Application source, content, styles, and assets match the copied baseline; setup changes are limited to documentation and the framework patch.
- The original checkout remains clean at the baseline commit, with its original remote.
- The Figma brief board uses native editable text, vector artwork, and auto-layout. Its full composition was visually checked after correcting text sizing. It does not yet include finished webpage concepts or interactive motion.

## Overhaul implementation

The first screen brings the Come on in link alongside the headline. Directions remain in the visit section. A compact hours ribbon follows. The address appears once in the visit details. Story photography and text share one composition, the original snail is integrated into that section, and coffee photos plus retail content share one chapter. Spotlight/vine rails remain between sections. Native anchor navigation, optional CMS menu content, English/Romanian copy, and social links remain available. The user-confirmed 5.0 average Google rating is restored with a compact, redesigned review section; its display is a supplied value, not a live Google API integration.

The server renders the page beneath the original 3D intro. Responsive photos and fonts prepare concurrently with the 3D imports; image promotion and decoding use one worker on weaker/save-data devices and two otherwise. Actual progress and observed rendering cost ease the assembly pace. Fast loads still play the complete assembly and docking; preparation finishing near the deadline receives time to finish the crossfade. There is no skip button. Error, timeout, reduced-motion, and deep-link paths restore page access and clean up resources.

Motion starts after the intro-ready signal. Headline lines arrive in staggered sequences, photos settle and drift subtly with scroll, desktop hover adds small photo changes, decorative objects retain their designed angles, and the footer wordmark arrives once. Body text remains readable, scrolling stays native, and reduced motion presents the static design.

The menu retains its original inverse colors: charcoal over cream sections and cream over dark sections. The color boundary tracks the precise portion of the sticky header crossing a section, including partial overlaps. Fraunces / DM Sans imports and original font axis settings are unchanged.

Readiness behavior is covered by `npm test`: bounded queues, final photo decoding and fonts, cached images, failures, and cancellation cleanup.

## Overhaul verification — 6 October 2026

- Production build, lint, and standalone type checking pass. Nine readiness tests pass.
- Browser checks cover desktop and 320/390px layouts, English/Romanian navigation and document language, native mobile navigation, loaded responsive photos/fonts, the full successful 3D docking path, restored 5.0 review composition, and adaptive header color over the dark coffee section.
- The loader has no skip control. The full address is rendered only in the visit details. Original font imports, global font settings, and `spotlight-vine-rail.tsx` are unchanged.
- Screenshots are saved in `docs/previews/`. Figma uses native editable layers, with further connected editing limited by the free Starter-plan quota.
- The original sibling repository remains clean. No Vercel project was created by the agent. On 7 October, GitHub's existing integration was confirmed to have automatically deployed the overhaul to the separate `pebble2` project.

## Refinement pass — 7 October 2026

The automatic preview for implementation commit `9579661` was checked in the browser: all seven responsive photographs and fonts were ready, the original intro completed its docking, and the page had no horizontal overflow. Draft [PR #1](https://github.com/noawezah/pebble2/pull/1) contains the overhaul. Protected preview access used the user's existing GitHub sign-in.

Further changes improve mobile caption/label legibility, give language switches 44px touch targets and explicit language names, and make the active navigation section clearer. Responsive image readiness now also waits for a replacement source selected during phone rotation. The small section snail stops rendering after movement settles and restarts when interaction requires it.

New browser inspection was rejected by the automatic browser URL security policy; do not work around that rejection with other browser surfaces or terminal automation. These refinements use source review and automated verification. The previously saved previews document the first overhaul, not a fresh visual check of this refinement pass.

Production build, lint, and TypeScript checks pass for the refinement. Ten readiness tests pass, including the responsive-source replacement regression. The sculpture retains its geometry, scroll assembly, and original easing; cleanup removes every new listener and cancels queued drawing. Original fonts, adaptive header colors, intro choreography, and the vine component remain intact.

## Screenshot corrections — 7 October 2026

The sticky menu is slimmer at 72px on desktop and 64px on mobile; anchor offsets and the mobile dropdown follow its height. The hero directions button and coffee photo's Made with care oval are removed. The section sculpture keeps a small minimum gap between its three parts while retaining scroll and pointer movement, idle rendering, and the original proportions. The loading intro still assembles and docks fully.

The footer keeps the same large PEBBLE lettering. Its oblique arrow is replaced with the original snail SVG at its native 250:312 ratio, sized relative to the lettering. A quiet 9px credit reads Website made by Zaidi "noawezah" Ahad (with the introductory phrase translated in Romanian). Build, lint, and TypeScript pass; both prerendered language pages were checked for the requested removals, original footer logo ratio, and exact credit. Figma synchronization remains pending its free-plan tool quota, and fresh browser inspection remains unavailable under the previously reported URL policy restriction.

## Production publication — 7 October 2026

The user-requested release is live at https://pebble2.vercel.app. Vercel deployment `5c3xUAyxoJQyYkPpXhfuD4d1vp8B` is Ready / Production, assigned to that domain, with source commit `e32a9b305612539a34932577e03d4e7b8479be53` and a deployment duration of 1m44s.

Live production browser checks confirmed the cream/charcoal site, completed intro, all seven photographs and fonts ready, original footer snail and credit, correct Romanian document language, and coffee navigation. At 390×844, the mobile menu opens, Găsește-ne reaches `/ro#visit`, and the menu closes. Headers measure 72px on desktop and 64px on mobile; neither layout has horizontal overflow or browser errors. This verification concerns the live remote production URL and does not replace the historical restriction on local preview inspection recorded above.

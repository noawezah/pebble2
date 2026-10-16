# PEBBLE visual system — 01

## Creative direction

A quiet place with presence. An independent café identity expressed through generous soft letterforms, charcoal brick, real plants, imperfect milk foam, and morning light. The café is the subject; avoid generic luxury-hotel imagery and generic beige product-page patterns.

## Colour

| Token    | Value   | Use                                        |
| -------- | ------- | ------------------------------------------ |
| Paper    | #F5F5F2 | Main background and reversed text          |
| Charcoal | #292929 | Headlines, buttons, footer, coffee section |
| Graphite | #545454 | Secondary neutral surfaces                 |
| Stone    | #BCBCB8 | Rules and supporting details               |

Green belongs only in photographs. No green buttons, panels, typography, hover states or decorative backgrounds. No gradients. Photography carries wood tones and golden light.

## Typography

- Brand: PEBBLE, uppercase; exact client vector wordmark and original snail outlines, with their native proportions.
- Display: Fraunces Variable, weight 900, SOFT 100, WONK 1, optical size 72. A soft web alternative to Cooper Black, not an exact font match.
- Body/UI: client-provided Hurme Geometric Sans 1, weights 400/600/700, 16-20px and comfortable line height. DM Sans is retained only for missing glyphs such as Romanian U+021A/U+021B.
- Labels: 12–14px, uppercase with modest tracking.
- Main headings: fluid roughly 38–132px. The PEBBLE masthead intentionally exceeds the headline scale.
- Romanian support: ă â î ș ț / Ă Â Î Ș Ț; use comma-below Ș and Ț.

Hurme is converted from the supplied OTF files into locally hosted WOFF2 and loaded with next/font/local. Fraunces and the missing-glyph fallback remain self-hosted through Fontsource. The commercial Cooper font on the local machine is not copied or published.

## Layout

Seven columns on desktop, 24px gaps. Four columns below 700px, 12px gaps and 20px outside margins. Base spacing rhythm: 8, 16, 24, 48, 96. Use flat surfaces and rules rather than cards. Photographs span columns; headings cross their edges where contrast remains clear. On mobile, overlaps are bounded and reading order remains natural.

## Photography and artwork

The actual café references anchor every generated scene: charcoal brick, ivory bar, La Marzocco equipment, moss/snail wall, tall storefront, real greenery. The opening image is an empty interior. Latte art should have broad, imperfect hand-poured foam forms, not illustrative precision. Use large close crops alongside architectural views. The supplied snail is vectorized in `public/images/snail.svg`.

## Motion

GSAP/ScrollTrigger diagonal entrances: 28–42px translation, 1–2 degrees rotation, about 900–1000ms, power3.out, once per view. Image parallax: about ±4% within a clipped wrapper with overscan. No scroll hijacking or continuous ticker. Disable motion for reduced-motion preferences. Controls remain immediately usable.

## Components

Original-snail + PEBBLE brand lockup; English/Romanian language links; underlined editorial links; monochrome rectangular primary and outline actions; Remix Icon at 20–24px; clear focus states; semantic address/hours; conditional menu with RON prices. Interactive specimens live at `/design-system`.

## Content principles

English first, Romanian second. Personal, calm, specific. MERON is identified as the coffee served. Do not invent awards, rankings, reviews or the claim that it is objectively the best coffee in Bucharest. Convey quality through the work, imagery and confident simplicity. No menu/prices until provided or published through Sanity.

## September 15 refinements

- Open text overlaps without background panels. Three interior photographs cascade through a seven-column composition.
- Alternating diagonal GSAP scroll trajectories, inner image parallax, rotating display captions, magnetic buttons, diagonal hover fills and rolling text. Reduced-motion visitors receive static compositions.
- The matte grey snail is real WebGL geometry extruded from the original client vector contours, with rounded edges and nonmetallic lighting. It responds to scroll and pointer position, loads near the viewport, stops rendering offscreen and has the original SVG as fallback.
- Google rating is a manually maintained 5.0 snapshot supplied by the owner and corroborated by café listings on September 15, 2026. No fabricated individual testimonials or live-review-count claim.
- Map is a grayscale Google embed resolving the PEBBLE place at Mendeleev 10. EN remains primary, RO secondary.

## Final sculpture motion

The body, shell and pebble now use separate smooth Bézier contours (`public/images/snail-sculpture.svg`). High-resolution rounded bevels and shared vertex normals eliminate the stepped edges. Each piece moves at most 20 scene units laterally, 18 vertically and 12 in depth. Separation is zero when the sculpture centre aligns with the viewport centre, then increases gently in either scroll direction. Reduced-motion renders the assembled mark. Browser verification confirmed joined state at 359px versus a 360px viewport midpoint, followed by separated state after scrolling.

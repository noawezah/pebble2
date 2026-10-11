# PEBBLE image provenance and final prompts

All generated images used the built-in ImageGen tool, not the API/CLI fallback. PNG masters are retained beside optimized WebP files in `public/images/`. Photography is an art-directed interpretation of the supplied café references; original references remain unchanged.

| Website image | Master | Usage |
|---|---|---|
| Empty interior | interior-empty.png | Hero on website and design system |
| Natural seahorse flat white | flat-white-seahorse-natural.png | Coffee section |
| La Marzocco and bar | marzocco-bar.png | Coffee editorial image |
| Moss wall with snails | snail-wall.png | Our place section |
| Enhanced storefront | front-enhanced.png | Visit section |

Original reference files: `pebble-logo.png`, `interior-reference.png`, `front-reference.png`. The header snail in `snail.svg` is deterministically vector-traced from the supplied logo, using `scripts/trace-snail.cjs`.

Earlier variants are retained for revision history but not used on the café page. The initial unrelated coffee-counter concept is superseded. No fabricated product price or ranking is inferred from generated images.

## Final empty-interior prompt

Use case: precise-object-edit
Asset type: quiet premium editorial hero photograph of the actual Pebble café.
Input image 1 is the exact EDIT TARGET. Input image 2 is factual supporting context for the existing charcoal left wall, moss and white snail installation and plant materials only; do not add its yellow MERON sign.
Primary request: remove ALL PEOPLE from image 1, including every person seated at tables, the person on the central bar stool, every partially visible person along the sides, every child and all human reflections. Naturally reconstruct only the small areas they occluded using the actual surrounding furniture, walls and floor. Remove customer-specific belongings such as laptops, bags, coats and used cups on seating tables, leaving clean inviting table and chair surfaces. Retain actual café equipment, pastry dome and service objects on the bar.
Strict invariants: preserve exactly the same full landscape camera viewpoint and narrow long room geometry, ivory bar counter at left foreground, La Marzocco machine and tall black grinders, charcoal brick walls, existing wooden tables and chairs in the same positions, central bar stool, actual moss panel with white snail forms and wooden rail, all actual hanging and floor plants, concrete ceiling with existing fixtures and track lights, and tall storefront windows at the far end. Preserve original visible existing signage, glazing and street context. Do not invent a wider room, rearrange tables, add furniture, change architecture or introduce a yellow sign. Keep the entire original framing and aspect ratio.
Photographic treatment: quietly intimate golden morning light, rich readable charcoal, restrained fresh natural greens, soft warm ivory, gentle highlights without blown glare, tactile material detail, subtle natural film grain and a premium artistic editorial mood. Quiet empty café before guests arrive. No artificial beams, no excessive orange color cast, no CGI or exaggerated HDR.
Output: exactly one enhanced landscape image of the SAME actual café, entirely without people. Do not redesign the room.

## Final natural-seahorse prompt

Use case: precise-object-edit
Asset type: refined editorial café photograph.
Input image 1 is the EDIT TARGET. Input image 2 is the visual reference for the LATTE ART ONLY.
Primary request: change only the foam design on the coffee surface in image 1. Match the visibly handmade, real free-poured seahorse latte art in image 2 closely: asymmetric broad white microfoam strokes, simple approximate round head with short blunt muzzle, soft irregular body, broad curved rosetta/wing made from a few flowing concentric milk bands on the right, and a thick curled tail. A few small incidental white milk dots may echo the reference. It should unmistakably look like a skilled but naturally imperfect real pour into crema, with wobbly soft edges, unequal flowing bands and natural tan-white mixing. The reference is the target aesthetic: charming fluid latte art, not an anatomically precise seahorse illustration.
Remove the current meticulous illustrated appearance: no etched scales, no tiny dorsal spines, no crisp thin long snout, no precisely illustrated fin, no perfectly segmented tail. Replace it with the broad fluid natural foam pattern from image 2. Keep realistic microfoam texture, crema color and believable liquid integration.
Invariants: keep image 1's exact white cup and saucer, handle, ivory counter, background café, charcoal brick, wall plants, storefront, lens perspective, camera framing, sunlight, shadows and composition unchanged. Do not adopt the black cup, grey background or overhead camera of image 2.
Output: exactly one landscape 3:2 photograph. No text, logos, extra props, people, CGI or new architecture.

## La Marzocco and bar prompt

Use case: photorealistic-natural
Asset type: one art-directed café equipment and bar photograph for actual Pebble shop website.
Input images: Image 1 is the factual reference for the real equipment, bar layout and shop identity. Image 2 supports clarity and lighting only.
Primary request: a wider close editorial photograph of the actual La Marzocco espresso machine WITH THE BAR visible in the left foreground of the reference. Reframe closer onto this exact equipment area: preserve the same rectangular brushed-metal espresso-machine rear and side casing with its original red LA MARZOCCO badge, the same tall black cylindrical grinders immediately beside it, red and white cups on top, the actual warm ivory bar countertop, and illuminated warm bar front. Keep enough counter to understand the real bar arrangement.
Scene: faithfully use the reference shop's charcoal brick left wall, existing rectangular green moss panel and plants softly behind. Preserve relative positions, equipment design, materials and counter geometry from the reference. Do not swap in a different espresso machine model, generic shiny group-head machine, different grinders, stainless counter or redesigned café. Work from the visible rear/side view in the original photo.
Composition: landscape 3:2, medium close view of machine, grinders and bar, natural camera perspective similar to source, equipment in crisp focus and actual shop background gently softer. Frame without adding or inventing people; no hands.
Light/style: warm natural morning sunlight, balanced readable charcoal shadows, tactile brushed metal, subtle film grain, restrained high-quality editorial photography.
Constraints: exactly one original art-directed photograph based on this real shop. Existing LA MARZOCCO badge must remain correctly spelled. No additional branding or text, no irrelevant props, no invented architectural elements, no beige studio backdrop, no CGI.

## Snail-wall prompt

Use case: photorealistic-natural
Asset type: one art-directed architectural detail photograph for actual Pebble café website.
Input images: Image 1 is the factual reference of the actual shop. Image 2 provides higher-clarity supporting view and lighting.
Primary request: close editorial detail of the real rectangular green living moss/plant panel on the CHARCOAL BRICK LEFT WALL, with its hanging WHITE SNAIL-SHAPED PLANTERS. Use the recognizable source arrangement: weathered horizontal wood rail above the rectangular lush moss patch, rounded green moss mounds in varied natural greens, white sculptural snail forms attached around the moss panel (one near the upper left rail, one near upper right, one around the lower middle-left). Show the snail shapes clearly as white ceramic sculptural planters with curled shell profiles and organic rounded bodies, integrated into the same panel; do not substitute regular flowerpots or actual living snails. Their arrangement and surrounding brick and wood must remain recognizably based on the supplied actual wall.
Composition: landscape 3:2, tight medium detail framing of the whole panel and wood rail, charcoal brick border visible, slight natural camera angle consistent with left-wall view. Focus on tactile moss, white sculptural snail planters and rough painted brick. Crop out people and tables through framing; add no people or hands.
Light/style: natural golden morning side light with gentle realistic shadows, rich fresh greens against charcoal and glazed white, detailed tactile editorial magazine photograph, subtle grain and restrained grade, no orange cast.
Constraints: exactly one image. Same shop identity and recognizable original wall installation, no newly invented wall or decorative installation, no extra text/logos, no irrelevant objects, no beige studio, no CGI. This is an art-directed close detail based on the real café reference, not a documentary claim.

## Storefront prompt

Use case: lighting-weather
Asset type: faithful enhanced storefront photograph for the actual Pebble specialty café website.
Input image: supplied portrait storefront photo is the exact EDIT TARGET, not a style reference.
Primary request: carefully enhance only photographic clarity, exposure, and natural golden-hour light in this exact image. The real shop location must remain faithfully recognizable.
Invariants: preserve full original portrait framing and aspect ratio, original camera viewpoint, exact facade, metallic double door and window frames, every mullion and crossbar, glass surfaces, door handles, threshold, all reflections, visible interior layout, furnishings, plants, people and their positions. Preserve the exact existing white snail mark and PEBBLE signage on the glass, preserving placement, size, letterforms, spelling and all original line breaks. Preserve existing subordinate signage including SPECIALTY COFFEE, by MERON, Lemonade, Matcha, Tea, COFFEE, Iced coffee, Cocktails, Beer, and Snacks & More exactly as in the input. Preserve every other existing visible sticker and mark. Do not alter, replace, restyle, move, or add any architecture, text, logo, object or person.
Allowed changes only: balanced natural exposure, gentle clarity recovery, nuanced warmer late-afternoon golden sunlight consistent with the original light, realistic glass reflections, readable interior detail without flattening contrast, and a restrained high-quality editorial photographic grade. The image should look like a careful professional photographic edit of the original, not a redesigned storefront.
Output: exactly one enhanced portrait photograph at high resolution with the complete original composition. No additional text, no watermark, no invented facade features. Avoid exaggerated orange grading, HDR halos, artificial sun rays, overly sharpened edges, and reconstructed or changed signage.

## Additional reference-based assets — September 15, 2026

`reverse-bar.webp` derives from `reverse-bar.png`, imagegen output exec-8e776cfe-88f7-4ea3-ac8a-649dc7feb5d2.png. It retains the supplied white brick rear bar, illuminated shelves, MERON bags, counter, machine and plant. The partial person was removed and lighting refined.

`fridge-merch.webp` derives from `fridge-merch.png`, imagegen output exec-4f4f1ad8-9b8d-4d94-a644-b92a8d944968.png. It retains the supplied fridge and reddish shelf with two PEBBLE snail mugs added as a styling concept. Small product labels and price tags are generated and are not factual menu or pricing data.

The original `meron-corner-reference.png` is used in the interior cascade. The 3D snail is code-created geometry derived from `snail.svg`, not a generated image or third-party model.

Content references: https://www.meron.coffee/roastery/ (roasting in Transylvania and origin character); https://europeancoffeetrip.com/cafe/pebble-bucharest/ (listing and amenities). Opening hours use the owner's supplied times, which take precedence over the directory. The COFFeEAST directory banner is not presented as PEBBLE sponsorship.

## Final editorial photo suite

Twelve selected PNG masters and matching WebP assets use the `-editorial` suffix in `public/images`. Original files remain available. `photo-enhancement-manifest.json` records final output sources and exact image-generation prompts.

Final seahorse: the owner's supplied seahorse pattern is composited into the actual rounded dark PEBBLE ceramic cup against the existing PEBBLE counter/interior background. The other café's reference background is not used. Bunny: supplied bunny pattern in the PEBBLE cup alongside water on the dark tray; carousel UI removed. Retail: fridge restocked conceptually with existing drink types, squat dark PEBBLE cups replace tall mugs, and generated price tags removed. These are styled photo composites, not documentary evidence of stock or latte designs actually served.

- `snail-wall-corrected.png` / `.webp`: revised wall photo based on the user�s real-wall reference (24 September 2026). AI reconstruction of the top/right moss arrangement, exposed brick and plain white planters; replaces `snail-wall-editorial.webp` on the page. Original retained.
`snail-wall-authentic.png` / `.webp`: user-supplied photograph, used directly without AI alteration. Lossless WebP conversion only. Replaces the rejected generated wall correction; natural 568 × 558 aspect ratio retained.

- snail-wall-reference-edit.png / .webp: current wall image. AI edit preserving the original oblique landscape angle, using snail-wall-authentic.png as the real-wall reference for the black central brick panel, grey outer brick, greenery and warm lighting along both sides. Supersedes the frontal photograph on the page; all originals retained.

## Creator footer logo

The user supplied `Portfolio/noawezah-logo-kit/svg/noawezah-for-dark-backgrounds.svg`. Its website copy in `public/images/noawezah-for-dark-backgrounds.svg` retains all original paths, colors, and transforms. Only the SVG canvas is trimmed to remove blank margins for the small linked footer credit; the source logo is unchanged.

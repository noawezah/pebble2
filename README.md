# PEBBLE 2

The independent redesign and Figma workflow experiment for PEBBLE. This repository starts from the complete original site at `6841fcb1f831b05a48d44a8445743f36070fb2e3`, including its Git history, source, assets, and documentation.

- Repository: https://github.com/noawezah/pebble2
- Working folder: `C:\Users\HP\Documents\ChatGPT\pebble2`
- Figma design lab: https://www.figma.com/design/dRLqgYzHIKn3L2FJ1xwFYA
- Direction and workflow: [design.md](design.md)

The copied site is the comparison baseline. Its existing brand rules below describe that baseline; the new visual direction has not been selected. The original `pebble` repository and deployment remain separate. A new Vercel project will be set up after substantial redesign work.

An English-first, Romanian-second specialty café site for PEBBLE, Bucharest. Next.js App Router, React, TypeScript, Tailwind CSS, self-hosted Fraunces and DM Sans, Remix Icon, GSAP, and Sanity.

## Preview

- `/` — English café page
- `/ro` — Romanian café page
- `/design-system` — interactive visual system, in both languages
- `/studio` — Sanity Studio (requires a project)

Run `npm ci`, then `npm run dev`, from the `pebble2` folder. Use the exact URL printed by Next.js; port 3000 may be occupied. `npm run build` creates the Vercel-compatible production build. `npm run typecheck` checks TypeScript, and `npm run lint` checks source quality. The initial stack remains Next.js 16.3.5, React 19.2.8, and TypeScript.

## Brand and content

Interface: off-white, charcoal and neutral greys only. Green is restricted to photographs. PEBBLE is always uppercase. The snail SVG is traced from the supplied original logo, not a newly invented symbol. Fraunces Black with SOFT 100 is the web-font alternative to Cooper Black; no commercial Cooper font is redistributed.

The reusable CSS tokens are in `app/globals.css`; the café composition is in `app/cafe.css`. Details and usage rules are in `DESIGN_SYSTEM.md`.

Confirmed local content is in `lib/content.ts`: Str. D. I. Mendeleev 10, 030167 București; weekdays 08:00–17:00; weekends 10:00–19:00. Menu/prices are intentionally absent until supplied. There are no fabricated reviews, ratings, awards, phone numbers or product prices.

## Sanity connection

The website works immediately using the confirmed local content. To activate CMS editing:

1. Create a Sanity project and a public `production` dataset in the owner's account.
2. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`. These are project identifiers, not secret tokens.
3. Add the local and production Studio origins to Sanity's CORS settings with authenticated requests enabled.
4. Restart the dev server, visit `/studio`, and sign in with the project owner's Sanity account.
5. Open **Café content**. Fill both language fields and publish. The site reads published content and revalidates every 60 seconds. An empty menu is hidden. Invalid or missing fields use the local fallback.

The schema is in `sanity/schema.ts`. Studio authenticates through Sanity; no write token is embedded in the site. Sanity service connection cannot be verified until a real project is supplied. Initial copy remains local until entered and published in Studio.

## Vercel

This copy is intentionally unlinked from Vercel while the design experiment develops. `vercel.json` selects the Next.js framework and contains no project identity. When substantial redesign work is ready, create a separate Vercel project connected to `noawezah/pebble2`. Use `npm run build`, default Next.js output settings, and any configured public Sanity settings. Set `NEXT_PUBLIC_SITE_URL` to the new project's final HTTPS origin. Keep the original Pebble Vercel project separate.

## Images

`public/images/` contains the supplied references, preserved generated PNG masters, and optimized WebP assets used by the site. AI-created or enhanced imagery is art direction based on the actual café references; small equipment and decorative details can differ. Original photographs and logos remain available. Generation provenance is recorded in `ASSETS.md`.

## Accessibility and motion

Real anchor navigation, Next.js language links, visible keyboard focus, descriptive image alternatives, semantic sections and hours, responsive 7-column desktop / 4-column mobile layouts. GSAP diagonal reveals run once; parallax does not hijack scrolling. `prefers-reduced-motion` disables scroll effects. Body text is at least 16px. No autoplay video or infinite animation.

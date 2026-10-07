# PEBBLE 2

The independent redesign and Figma workflow experiment for PEBBLE. This repository starts from the complete original site at `6841fcb1f831b05a48d44a8445743f36070fb2e3`, including its Git history, source, assets, and documentation.

- Repository: https://github.com/noawezah/pebble2
- Working folder: `C:\Users\HP\Documents\ChatGPT\pebble2`
- Figma design lab: https://www.figma.com/design/dRLqgYzHIKn3L2FJ1xwFYA?node-id=2-2
- Direction and workflow: [design.md](design.md)

The copied site remains available in Git history as the comparison baseline. The selected redesign uses cream and charcoal, the original fonts, adaptive menu colors, spotlight/vine dividers, and the original 3D loading choreography. Photography, headings, and decorative objects receive a coordinated motion pass. The original `pebble` repository and deployment remain separate. GitHub's existing integration now tracks the redesign branch for Production in the separate `pebble2` Vercel project.

An English-first, Romanian-second specialty café site for PEBBLE, Bucharest. Next.js App Router, React, TypeScript, Tailwind CSS, self-hosted Fraunces and DM Sans, Remix Icon, GSAP, and Sanity.

## Preview

- `/` — English café page
- `/ro` — Romanian café page
- `/design-system` — interactive visual system, in both languages
- `/studio` — Sanity Studio (requires a project)

Run `npm ci`, then `npm run dev`, from the `pebble2` folder. Use the exact URL printed by Next.js; port 3000 may be occupied. `npm run build` creates the Vercel-compatible production build. `npm run typecheck` checks TypeScript, and `npm run lint` checks source quality. The stack remains Next.js, React 19.2.8, and TypeScript; Next.js and its lint configuration are patched to 16.3.8.

## Brand and content

Interface: off-white, charcoal and neutral greys only. Green appears in photographs and the preserved original spotlight/vine artwork. PEBBLE is always uppercase. The snail SVG is traced from the supplied original logo, not a newly invented symbol. Fraunces Black with SOFT 100 is the web-font alternative to Cooper Black; no commercial Cooper font is redistributed.

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

The user stages, commits, and pushes from their Codex terminal when changes are ready for publication or phone review. Agent edits remain local, unstaged, and uncommitted unless explicitly requested otherwise. After every change, open `http://localhost:3002/` in this chat for the user to review before publishing. Vercel's saved Production branch is now `codex/cream-charcoal-overhaul`; future user pushes to this same branch create Production deployments that update the permanent public URL.

GitHub's existing integration connects `noawezah/pebble2` to the separate Vercel project `pebble2` in `ahad-fcea`. Its permanent public URL is [pebble2.vercel.app](https://pebble2.vercel.app), confirmed as a valid Production domain in Vercel. Auto-assignment of Production domains remains enabled. Production Config variable `NEXT_PUBLIC_SITE_URL=https://pebble2.vercel.app` has been added successfully. The user explicitly requested publishing the redesign and using this as the public address for work in this chat. The redesign is now live from commit `e32a9b305612539a34932577e03d4e7b8479be53`; Vercel reports Ready / Production. Live checks pass for both language pages and Romanian desktop/mobile navigation. Verify this same permanent URL after future terminal pushes. Draft [PR #1](https://github.com/noawezah/pebble2/pull/1) remains available for review. The local checkout has no `.vercel/project.json`; `vercel.json` selects the Next.js framework without a project identity. Keep the original Pebble Vercel project separate.

## Images

`public/images/` contains the supplied references, preserved generated PNG masters, and optimized WebP assets used by the site. AI-created or enhanced imagery is art direction based on the actual café references; small equipment and decorative details can differ. Original photographs and logos remain available. Generation provenance is recorded in `ASSETS.md`.

## Accessibility and motion

Real anchor navigation, Next.js language links, visible keyboard focus, descriptive image alternatives, semantic sections and hours, responsive 7-column desktop / 4-column mobile layouts. GSAP diagonal reveals run once; parallax does not hijack scrolling. `prefers-reduced-motion` disables scroll effects. Body text is at least 16px. No autoplay video or infinite animation.

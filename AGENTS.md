# PEBBLE 2 working context

Work in `C:\Users\HP\Documents\ChatGPT\pebble2` for this experiment. The destination repository is `https://github.com/noawezah/pebble2`; `origin` points there. The sibling `pebble` checkout is the original site and must remain separate. `upstream` records the original repository for comparison, with its push URL disabled.

The user controls publication from their Codex terminal. Edit and verify locally, then leave changes unstaged, uncommitted, and unpushed. Do not run Git staging/commit/push, create or merge pull requests, or trigger Vercel releases unless the user explicitly asks for that action. The user chooses when work is ready and pushes it themselves to check on their phone. Earlier commits already exist remotely; preserve their history. Before helping with a production push, confirm the checkout and branch match the existing Vercel Production workflow; the current `codex/cream-charcoal-overhaul` branch creates review previews.

Read `design.md` before design changes. Keep Next.js and TypeScript. The user selected cream and charcoal for PEBBLE. The Bonne Heure reference belongs to Jai Bistrot and must not steer this site's palette. Use ordinary editable Figma layers/components; do not invoke Figma's built-in AI or spend AI credits. The connected Figma tools have reached the Starter-plan call limit; respect that limit.

Preserve the original onyx 3D loading animation and its docking into the header logo. Prepare responsive photographs and fonts behind it, adapting the animation pace to actual readiness. Keep `components/spotlight-vine-rail.tsx` between site sections. Add pleasing artistic motion to photographs, headings, and decorative objects while retaining readable body copy, native scrolling, and reduced-motion support. Preserve confirmed café facts, original photography, and source asset provenance.

Keep the original Fraunces/DM Sans fonts and adaptive menu color transition. Fast loads must still play the complete original 3D intro and smooth docking. The loader has no skip button. Display the address only in the visit details, and retain the user-confirmed 5.0 Google average review section in the new composition. The user prefers concise meaningful updates rather than scheduled progress messages.

Latest composition corrections: slim header (72px desktop, 64px mobile); hero has no Get directions button; coffee photograph has no Made with care oval; section sculpture parts retain small visible gaps. Keep the full loading assembly separate from this section-sculpture behavior. Footer keeps the huge original PEBBLE type, replaces its oblique arrow with the original snail SVG at its native aspect ratio, and adds a discreet credit to Zaidi "noawezah" Ahad.

GitHub's existing integration connects this repository to the separate Vercel project `pebble2` in `ahad-fcea`. Branch pushes create previews automatically. Reuse that project for this experiment and keep the original Pebble project separate. The overhaul is being reviewed in draft PR #1; production release remains a later step.

The user requires the permanent public URL `https://pebble2.vercel.app` for Vercel uploads, matching their other repository workflows. Vercel's Domains page confirms that exact hostname has Valid Configuration and is assigned to Production. Keep it assigned to this project for every production release and verify it after uploading. Set Production `NEXT_PUBLIC_SITE_URL=https://pebble2.vercel.app` before building a release. Temporary branch/deployment URLs are for preview review. This URL preference does not by itself request an immediate production release.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

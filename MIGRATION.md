# Move PEBBLE to another computer

This archive contains the complete PEBBLE project: source code, original and edited images, design and asset notes, the dependency lockfile, and the `.git` folder with project history and the existing GitHub remote. It leaves out `node_modules`, `.next`, and local build caches; these are recreated on the new computer. There is no `.env.local` in this copy.

1. Copy the ZIP to the new computer and extract it. Keep the `pebble` folder intact.
2. Install Node.js 24 (the version used for this copy was 24.21.0). Open a terminal in the extracted `pebble` folder.
3. Run `npm ci`, then `npm run dev`. Open the local URL shown by Next.js. The site works with its built-in content and images without any account setup.
4. For a production check, run `npm run build`. To use the optional Sanity editor, copy `.env.example` to `.env.local`, enter your Sanity project ID and dataset, and restart the server. Sign in to the same Sanity account; its online content is stored by Sanity, outside this archive.
5. If deploying on Vercel, sign in to the intended Vercel account, reuse the existing `pebble2` project connected to `noawezah/pebble2`, and set the same public Sanity values if used. Keep `https://pebble2.vercel.app` as its permanent Production domain and set Production `NEXT_PUBLIC_SITE_URL=https://pebble2.vercel.app` before building a release. Hosting and domain settings live in those accounts, outside this archive.

On Windows PowerShell, step 4's copy command is `Copy-Item .env.example .env.local`. On macOS or Linux, use `cp .env.example .env.local`.

The default pages are `/` (English) and `/ro` (Romanian). `/studio` needs a configured Sanity project. `README.md`, `DESIGN_SYSTEM.md`, `ASSETS.md`, and `photo-enhancement-manifest.json` preserve implementation and image information. Historical absolute paths in the image manifest document where edits originated on the old computer; the website uses the image files included in `public/images` and does not need those paths.

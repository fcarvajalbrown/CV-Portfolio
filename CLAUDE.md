# CLAUDE.md

Guidance for Claude Code (and any other AI assistant) working in this repository.

## What this repo is

A monorepo that does two things on every push to `main`:

1. Compiles `martinchipoco-cv.tex` with XeLaTeX and copies the PDF to `apps/web/public/cv.pdf`.
2. Builds the Next.js portfolio in `apps/web` as a **static export** and deploys it to GitHub Pages.

Both steps live in a single workflow: `.github/workflows/pages.yml`.

## Layout

```
martinchipoco-cv.tex          LaTeX source of the CV (root, not in a cv/ folder)
apps/content/projects/<slug>/index.mdx   project content + front-matter
apps/web/                     the Next.js 14 App Router site
  app/                        routes: / and /projects/[slug]
  components/                 UI components
  lib/projects-content.ts     reads the MDX front-matter from apps/content
  lib/publicPath.ts           prefixes asset URLs with the base path
  lib/site.ts                 canonical site URL and shared metadata values
  public/                     static assets served as-is
.github/workflows/pages.yml   LaTeX build + static export + Pages deploy
```

The root `package.json` has no scripts. All commands run from `apps/web`.

## Commands

```bash
cd apps/web
npm install
npm run dev      # dev server on port 5173
npm run build    # static export into apps/web/out
npm start        # serve the built output
```

There is no test suite and no linter configured. Do not add either without asking first.

## Things that will break if you forget them

**Base path.** The site is deployed to a GitHub Pages *project* subpath, not a domain root. `next.config.mjs` reads `NEXT_PUBLIC_BASE_PATH`, which CI sets to `/CV-Portfolio`. Locally it is empty, so a hardcoded `/images/foo.png` works in dev and 404s in production. Always route asset URLs through `publicPath()`. `next/link` and `next/router` handle the base path themselves, so do **not** call `publicPath()` on route hrefs.

**Site URL.** `NEXT_PUBLIC_SITE_URL` (also set in CI) is the absolute deployed URL including the base path. Canonical URLs, Open Graph tags and `sitemap.xml` are built from it via `lib/site.ts`. Anything that needs an absolute URL should use `absoluteUrl()` from there rather than composing one by hand.

**Static export.** `output: 'export'` means no server at runtime: no Server Actions, no dynamic route handlers, no ISR, no `next/image` optimization (`images.unoptimized` is on, and plain `<img>` is used throughout). Anything added must be resolvable at build time. Client components that read `useSearchParams()` need a `<Suspense>` boundary or the page de-opts.

**The CV PDF is a build artifact that happens to be committed.** CI regenerates `apps/web/public/cv.pdf` from the `.tex` source on every push. Edit the LaTeX, never the PDF.

**Project content lives outside the web app.** `lib/projects-content.ts` resolves `apps/content/projects` relative to `process.cwd()` and tries two paths, so it works whether the build runs from the repo root or from `apps/web`. Adding a project means adding a folder there with an `index.mdx`; `title` and `slug` are required in the front-matter or the build throws.

## Conventions

- TypeScript with `strict: false`. The `@/*` alias maps to `apps/web/*`.
- Styling is vanilla CSS in `app/globals.css`, driven by CSS custom properties declared in the `:root` block at the top. Change a token there rather than adding one-off values in components. The theme is a deliberate design choice, so ask before altering colors, radii, shadows or the glass effect.
- Prefer small, self-contained diffs. This is a personal portfolio, not a framework.

## Content rules

- **Never invent content.** Project descriptions, dates, technologies, job history, achievements and CV entries are statements about a real person's real work. Write only what is already in the repo or what the owner explicitly provides. If a section needs a fact you do not have, stop and ask for it. This applies to the LaTeX CV, the MDX front-matter, the About text, and any metadata description.
- Do not credit or mention AI assistance in commit messages, PR descriptions, code comments or site copy.
- Do not add analytics, trackers or third-party scripts without being asked.

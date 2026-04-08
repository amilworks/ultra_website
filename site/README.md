# Site Package

Astro site for the BisQue Ultra public website. This package holds the pages, MDX articles, and local UI components. Shared design tokens and prose styles live one level up in `../shared/brand`.

## Stack

- Astro 6
- MDX
- React for the small interactive islands
- Tailwind CSS v4
- Shared brand primitives from `../shared/brand`

## Commands

Run these from the repository root:

```bash
pnpm --dir site install
pnpm --dir site dev
pnpm --dir site check
pnpm --dir site build
pnpm --dir site test:e2e
```

## Content model

Canonical content lives in `src/content/news/*` and renders at `/news/[slug]`.

Each article entry supports:

- `title`
- `slug`
- `date`
- `summary`
- `excerpt`
- `ogImage`
- `tags`
- `kind` (`News` or `White paper`)
- `featured` (optional)
- `version` (optional)
- `coverImage` (optional)
- `coverImageAlt` (optional)
- `coverPosition` (optional)

The `/releases/[slug]` route is kept only as a compatibility alias for white-paper style entries.

## Environment

- `PUBLIC_SITE_URL`: canonical site origin, for example `https://amilworks.github.io`
- `SITE_BASE_PATH`: base path for GitHub Pages project hosting, for example `/ultra_website/`

## Deployment

GitHub Pages deployment is defined in `../.github/workflows/release-site.yml`. The workflow installs dependencies in `site/`, builds the Astro site, and uploads `site/dist` to Pages.

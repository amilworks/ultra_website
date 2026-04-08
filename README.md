# BisQue Ultra Website

Public GitHub Pages site for BisQue Ultra release notes, white papers, and platform articles.

The site is intentionally small and content-first:

- `site/` contains the Astro app, MDX content, and local components.
- `shared/brand/` contains the shared design tokens, brand mark, and prose styling used by the site.
- `.github/workflows/release-site.yml` builds and deploys the site to GitHub Pages.

## Local development

```bash
pnpm --dir site install
pnpm --dir site dev
```

Useful checks:

```bash
pnpm --dir site check
pnpm --dir site build
pnpm --dir site test:e2e
```

## Publishing model

All public articles live in `site/src/content/news/*.mdx`.

Each entry can be a shorter news note or a longer white paper, but both use the same MDX article template. White-paper entries may also appear under `/releases/[slug]` as a compatibility alias.

## GitHub Pages

The workflow is already configured for repository-hosted Pages builds. By default it publishes this repository at:

- `https://amilworks.github.io/ultra_website/`

It reads two optional repository variables:

- `PUBLIC_SITE_URL`
- `SITE_BASE_PATH`

If those are not set, the workflow falls back to the correct GitHub Pages values for this repository automatically.

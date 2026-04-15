import { getAllNews } from "@/lib/content";

export const prerender = true;

const siteUrl = process.env.PUBLIC_SITE_URL ?? "https://amilworks.github.io";
const basePath = process.env.SITE_BASE_PATH ?? "/";

const normalizeBase = (value: string) => {
  if (!value || value === "/") {
    return "/";
  }
  return value.startsWith("/") ? value : `/${value}`;
};

const withBase = (path: string) => {
  const normalizedBase = normalizeBase(basePath);
  if (normalizedBase === "/") {
    return path;
  }
  return `${normalizedBase.replace(/\/$/, "")}${path}`;
};

const toUrl = (path: string) => `${siteUrl}${withBase(path)}`;

export async function GET() {
  const news = await getAllNews();
  const urls = [
    { loc: toUrl("/"), lastmod: new Date("2026-04-12").toISOString() },
    { loc: toUrl("/news"), lastmod: new Date("2026-04-12").toISOString() },
    ...news.map((entry) => ({
      loc: toUrl(`/news/${entry.data.slug}`),
      lastmod: entry.data.date.toISOString(),
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map(
      (url) =>
        `  <url>\n    <loc>${url.loc}</loc>\n    <lastmod>${url.lastmod}</lastmod>\n  </url>`,
    )
    .join("\n")}\n</urlset>\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}

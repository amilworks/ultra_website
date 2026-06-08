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
  const siteUpdatedAt = new Date("2026-06-08").toISOString();
  const urls = [
    { loc: toUrl("/"), lastmod: siteUpdatedAt, changefreq: "weekly", priority: "1.0" },
    { loc: toUrl("/news"), lastmod: siteUpdatedAt, changefreq: "weekly", priority: "0.8" },
    ...news.map((entry) => ({
      loc: toUrl(`/news/${entry.data.slug}`),
      lastmod: entry.data.date.toISOString(),
      changefreq: "monthly",
      priority: entry.data.featured ? "0.9" : "0.7",
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map(
      (url) =>
        `  <url>\n    <loc>${url.loc}</loc>\n    <lastmod>${url.lastmod}</lastmod>\n    <changefreq>${url.changefreq}</changefreq>\n    <priority>${url.priority}</priority>\n  </url>`,
    )
    .join("\n")}\n</urlset>\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}

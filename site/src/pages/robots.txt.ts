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

export function GET() {
  const body = `User-agent: *\nAllow: /\nSitemap: ${siteUrl}${withBase("/sitemap.xml")}\n`;
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

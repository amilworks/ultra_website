// @ts-check
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";

const repoRoot = fileURLToPath(new URL("../", import.meta.url));
const siteRoot = fileURLToPath(new URL("./", import.meta.url));
const srcRoot = fileURLToPath(new URL("./src", import.meta.url));
const sharedBrandRoot = fileURLToPath(new URL("../shared/brand", import.meta.url));
const clsxEsmEntry = fileURLToPath(new URL("./node_modules/clsx/dist/clsx.mjs", import.meta.url));

const siteUrl = process.env.PUBLIC_SITE_URL ?? "https://amilworks.github.io";
const base = process.env.SITE_BASE_PATH ?? "/";

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  base,
  integrations: [react(), mdx()],

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": srcRoot,
        "@brand": sharedBrandRoot,
        clsx: clsxEsmEntry,
      },
    },
    server: {
      fs: {
        allow: [siteRoot, repoRoot],
      },
    },
  }
});

import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const sharedFields = {
  title: z.string().min(3),
  slug: z.string().min(2),
  date: z.coerce.date(),
  summary: z.string().min(20),
  excerpt: z.string().min(20),
  ogImage: z.string().min(1),
  coverImage: z.string().min(1).optional(),
  coverImageAlt: z.string().min(1).optional(),
  coverPosition: z.string().min(1).optional(),
  tags: z.array(z.string().min(1)).min(1),
};

const news = defineCollection({
  loader: glob({
    base: "./src/content/news",
    pattern: "**/*.{md,mdx}",
  }),
  schema: z.object({
    ...sharedFields,
    kind: z.enum(["White paper", "Platform foundation", "Design language"]).default("Platform foundation"),
    featured: z.boolean().default(false),
    sequence: z.number().int().positive().optional(),
    version: z.string().min(1).optional(),
  }),
});

export const collections = {
  news,
};

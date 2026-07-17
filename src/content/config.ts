import { defineCollection, z } from "astro:content";

const commonSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  pubDate: z.coerce.date().optional(),
  updatedDate: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().optional(),
  slug: z.string().optional(),
  series: z.string().optional(),
  cover: z.string().optional()
});

const posts = defineCollection({
  schema: commonSchema
});

const drafts = defineCollection({
  schema: commonSchema
});

const guides = defineCollection({
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    purpose: z.string(),
    label: z.string().default("GUIDE"),
    order: z.number().default(100),
    hidden: z.boolean().default(false),
    language: z.enum(["html", "markdown"]).default("html"),
    html: z.string(),
    css: z.string()
  })
});

export const collections = {
  posts,
  drafts,
  guides
};

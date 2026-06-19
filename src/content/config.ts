import { defineCollection, z } from "astro:content";

const commonSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  pubDate: z.coerce.date().optional(),
  updatedDate: z.coerce.date().optional(),
  category: z.enum(["ai", "cs", "life", "english"]).optional(),
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

export const collections = {
  posts,
  drafts
};

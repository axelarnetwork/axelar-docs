import { defineCollection, z } from "astro:content";

const docs = defineCollection({
  schema: z.object({
    title: z.string().optional(),
  }),
});

export const collections = {
  docs,
};

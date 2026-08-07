// Import the glob loader to read local files at build time
import { glob } from "astro/loaders";
// Import utilities from `astro:content`
import { defineCollection } from "astro:content";
// Import Zod
import { z } from "astro/zod";

// Define a `loader` and `schema` for each collection
const publications = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: "./src/contents/publications" }),
  schema: z.object({
    title: z.string(),
    journal: z.string(),
    doi: z.string(),
    publishDate: z.coerce.date(),
    description: z.string(),
    authors: z.array(z.object({
      name: z.string(),
      affiliation: z.string().optional(),
      presenter: z.boolean().optional()
    })),
    abstract: z.string(),
    image: z.object({
      url: z.string(),
      alt: z.string()
    }),
    tags: z.array(z.string()).optional()
  })
});

const research = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md, mdx}', base: "./src/contents/research" }),
  schema: z.object({
    title: z.string(),
    publishDate: z.date(),
    description: z.string(),
    collaborators: z.array(z.object({
      name: z.string(),
      affiliation: z.string().optional(),
      })),
    image: z.object({
      url: z.string(),
      alt: z.string()
    }),
    tags: z.array(z.string())
  })
});
// Export a single `collections` object to register your collection(s)
export const collections = { research, publications };
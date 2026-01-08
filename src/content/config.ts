import { defineCollection, z } from 'astro:content';

const newsCollection = defineCollection({
    type: 'content', // v2.5.0+ feature
    schema: z.object({
        title: z.string(),
        date: z.string(), // or z.date() if we parse it
        summary: z.string(),
        image: z.string().optional(),
    }),
});

export const collections = {
    'news': newsCollection,
};

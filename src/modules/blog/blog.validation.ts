import { z } from 'zod';

// validation schema for creating a blog
export const createBlogValidation = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Blog title is required',
      invalid_type_error: 'Title must be string',
    }),
    content: z.string({
      required_error: 'Blog content is required',
      invalid_type_error: 'Content must be string',
    }),
  }),
});

// validation schema for updating blog content
export const updateBlogValidation = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Blog title is required',
      invalid_type_error: 'Title must be string',
    }).optional(),
    content: z.string({
      required_error: 'Blog content is required',
      invalid_type_error: 'Content must be string',
    }).optional(),
  }),
});

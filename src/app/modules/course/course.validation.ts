import { z } from 'zod';

const createCourseZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'name is required' }),
    duration: z.string({ required_error: 'duration is required' }),
    regularPrice: z.string({ required_error: 'regular price is required' }),
    currentBatch: z.string({ required_error: 'current batch is required' }),
    thumbnail: z.any(),
  }),
});

const updateCourseZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'name is required' }).optional(),
    duration: z.number({ required_error: 'duration is required' }).optional(),
    regularPrice: z
      .number({ required_error: 'regular price is required' })
      .optional(),
    currentBatch: z
      .string({ required_error: 'current batch is required' })
      .optional(),
    thumbnail: z.string({ required_error: 'thumbnail is required' }).optional(),
  }),
});

export const courseValidation = {
  createCourseZodSchema,
  updateCourseZodSchema,
};

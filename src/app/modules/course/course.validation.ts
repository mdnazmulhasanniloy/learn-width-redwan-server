import { z } from 'zod';

const createCourseZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'name is required' }),
    duration: z
      .number({ required_error: 'duration is required' })
      .max(12)
      .min(1),
    regularPrice: z.number({ required_error: 'regular price is required' }),
    currentBatch: z.number({ required_error: 'current batch is required' }),
    thumbnail: z.any(),
  }),
});
const updateCourseZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'name is required' }).optional(),
    duration: z
      .number({ required_error: 'duration is required' })
      .max(12)
      .min(1)
      .optional(),
    regularPrice: z
      .number({ required_error: 'regular price is required' })
      .optional(),
    currentBatch: z
      .number({ required_error: 'current batch is required' })
      .optional(),
    thumbnail: z.any().optional(),
  }),
});

export const courseValidation = {
  createCourseZodSchema,
  updateCourseZodSchema,
};

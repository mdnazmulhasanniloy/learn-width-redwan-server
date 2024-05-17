import { z } from 'zod';

const createBatchZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'name is required' }),
    duration: z
      .number({ required_error: 'duration is required' })
      .min(0)
      .positive('duration must be a positive number'),
    startedAt: z.string({ required_error: 'startedAt is required' }),
    courseId: z.string({ required_error: 'courseId is required' }),
    thumbnail: z.string().optional(),
    description: z.string().optional(),
    isActive: z.boolean({ required_error: 'isActive is required' }),
  }),
});

const updateBatchZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'name is required' }).optional(),
    duration: z
      .number({ required_error: 'duration is required' })
      .min(0)
      .positive('duration must be a positive number')
      .optional(),
    startedAt: z.string({ required_error: 'startedAt is required' }).optional(),
    courseId: z.string({ required_error: 'courseId is required' }).optional(),
    thumbnail: z.string().optional(),
    description: z.string().optional(),
    isActive: z.boolean({ required_error: 'isActive is required' }).optional(),
  }),
});

export const batchValidation = {
  createBatchZodSchema,
  updateBatchZodSchema,
};

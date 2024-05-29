'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.courseValidation = void 0;
const zod_1 = require('zod');
const createCourseZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    name: zod_1.z.string({ required_error: 'name is required' }),
    duration: zod_1.z
      .number({ required_error: 'duration is required' })
      .max(12)
      .min(1),
    description: zod_1.z
      .string({ required_error: 'description is required' })
      .optional(),
    regularPrice: zod_1.z.number({
      required_error: 'regular price is required',
    }),
    currentBatch: zod_1.z.number({
      required_error: 'current batch is required',
    }),
    thumbnail: zod_1.z.any(),
  }),
});
const updateCourseZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    name: zod_1.z.string({ required_error: 'name is required' }).optional(),
    duration: zod_1.z
      .number({ required_error: 'duration is required' })
      .max(12)
      .min(1)
      .optional(),
    regularPrice: zod_1.z
      .number({ required_error: 'regular price is required' })
      .optional(),
    currentBatch: zod_1.z
      .number({ required_error: 'current batch is required' })
      .optional(),
    description: zod_1.z
      .string({ required_error: 'description is required' })
      .optional(),
    thumbnail: zod_1.z.any().optional(),
  }),
});
exports.courseValidation = {
  createCourseZodSchema,
  updateCourseZodSchema,
};

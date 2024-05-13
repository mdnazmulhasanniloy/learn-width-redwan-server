import { z } from 'zod';

const createModuleZodSchema = z.object({
  body: z.object({
    moduleName: z.string({ required_error: 'module name is required' }),
    course: z.string({ required_error: 'course  is required' }),
    batch: z.string({ required_error: 'batch is required' }),
  }),
});
const updateModuleZodSchema = z.object({
  body: z.object({
    moduleName: z
      .string({ required_error: 'module name is required' })
      .optional(),
    course: z.string({ required_error: 'course is required' }).optional(),

    batch: z.string({ required_error: 'batch is required' }).optional(),
  }),
});

export const moduleValidations = {
  createModuleZodSchema,
  updateModuleZodSchema,
};

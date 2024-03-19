import { z } from 'zod';

const createModuleZodSchema = z.object({
  body: z.object({
    moduleName: z.string({ required_error: 'module name is required' }),
    courseName: z.string({ required_error: 'course name is required' }),
    batchName: z.string({ required_error: 'batch name is required' }),
  }),
});
const updateModuleZodSchema = z.object({
  body: z.object({
    moduleName: z
      .string({ required_error: 'module name is required' })
      .optional(),
    courseName: z
      .string({ required_error: 'course name is required' })
      .optional(),
    batchName: z
      .string({ required_error: 'batch name is required' })
      .optional(),
  }),
});

export const moduleValidations = {
  createModuleZodSchema,
  updateModuleZodSchema,
};

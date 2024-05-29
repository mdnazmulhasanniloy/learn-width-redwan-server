'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.moduleValidations = void 0;
const zod_1 = require('zod');
const createModuleZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    moduleName: zod_1.z.string({ required_error: 'module name is required' }),
    course: zod_1.z.string({ required_error: 'course  is required' }),
    batch: zod_1.z.string({ required_error: 'batch is required' }),
  }),
});
const updateModuleZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    moduleName: zod_1.z
      .string({ required_error: 'module name is required' })
      .optional(),
    course: zod_1.z.string({ required_error: 'course is required' }).optional(),
    batch: zod_1.z.string({ required_error: 'batch is required' }).optional(),
  }),
});
exports.moduleValidations = {
  createModuleZodSchema,
  updateModuleZodSchema,
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moduleValidations = void 0;
const zod_1 = require("zod");
const createModuleZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        moduleName: zod_1.z.string({ required_error: 'module name is required' }),
        courseName: zod_1.z.string({ required_error: 'course name is required' }),
        batchName: zod_1.z.string({ required_error: 'batch name is required' }),
    }),
});
const updateModuleZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        moduleName: zod_1.z
            .string({ required_error: 'module name is required' })
            .optional(),
        courseName: zod_1.z
            .string({ required_error: 'course name is required' })
            .optional(),
        batchName: zod_1.z
            .string({ required_error: 'batch name is required' })
            .optional(),
    }),
});
exports.moduleValidations = {
    createModuleZodSchema,
    updateModuleZodSchema,
};

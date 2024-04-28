"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.batchValidation = void 0;
const zod_1 = require("zod");
const createBatchZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'name is required' }),
        duration: zod_1.z
            .number({ required_error: 'duration is required' })
            .min(0)
            .positive('duration must be a positive number'),
        startedAt: zod_1.z.string({ required_error: 'startedAt is required' }),
        courseId: zod_1.z.string({ required_error: 'courseId is required' }),
        thumbnail: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
    }),
});
const updateBatchZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'name is required' }).optional(),
        duration: zod_1.z
            .number({ required_error: 'duration is required' })
            .min(0)
            .positive('duration must be a positive number')
            .optional(),
        startedAt: zod_1.z.string({ required_error: 'startedAt is required' }).optional(),
        courseId: zod_1.z.string({ required_error: 'courseId is required' }).optional(),
        thumbnail: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
    }),
});
exports.batchValidation = {
    createBatchZodSchema,
    updateBatchZodSchema,
};

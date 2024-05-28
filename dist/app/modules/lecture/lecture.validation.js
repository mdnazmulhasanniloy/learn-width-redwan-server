"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lectureValidator = void 0;
const zod_1 = require("zod");
const createLectureZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        lectureName: zod_1.z.string({ required_error: 'lecture name is required' }),
        topic: zod_1.z.string({ required_error: 'topic is required' }),
        video: zod_1.z.any({ required_error: 'video is required' }),
        type: zod_1.z.string({ required_error: 'type is required' }),
        isActive: zod_1.z.boolean({ required_error: 'isActive is required' }),
        batchId: zod_1.z.string({ required_error: 'batchId is required' }),
        moduleId: zod_1.z.string({ required_error: 'moduleId is required' }),
        courseId: zod_1.z.string({ required_error: 'courseId is required' }),
    }),
});
const UpdateLectureZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        lectureName: zod_1.z
            .string({ required_error: 'lecture name is required' })
            .optional(),
        topic: zod_1.z.string({ required_error: 'topic is required' }).optional(),
        video: zod_1.z.any({ required_error: 'video is required' }).optional(),
        type: zod_1.z.string({ required_error: 'type is required' }).optional(),
        isActive: zod_1.z.boolean({ required_error: 'isActive is required' }).optional(),
        batchId: zod_1.z.string({ required_error: 'batchId is required' }).optional(),
        moduleId: zod_1.z.string({ required_error: 'moduleId is required' }).optional(),
        courseId: zod_1.z.string({ required_error: 'courseId is required' }).optional(),
    }),
});
exports.lectureValidator = {
    createLectureZodSchema,
    UpdateLectureZodSchema,
};

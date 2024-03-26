"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lectureValidator = void 0;
const zod_1 = require("zod");
const lectureVideo = zod_1.z.object({
    liveLink: zod_1.z.string({ required_error: 'video link is required' }),
    videoLink: zod_1.z.object({
        s3Hoster: zod_1.z.string({ required_error: 'host is required' }),
        vimeoHoster: zod_1.z.string({ required_error: 'vimeo is required' }).optional(),
    }),
});
const createLectureZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        lectureName: zod_1.z.string({ required_error: 'lecture name is required' }),
        topic: zod_1.z.string({ required_error: 'topic is required' }),
        notice: zod_1.z.string({ required_error: 'notice is required' }),
        lectureVideo: lectureVideo,
        type: zod_1.z.string({ required_error: 'type is required' }),
        startAt: zod_1.z.string({ required_error: 'startAt is required' }),
        endsAt: zod_1.z.string({ required_error: 'endsAt is required' }),
        isOptional: zod_1.z.boolean({ required_error: 'isOptional is required' }),
        batchId: zod_1.z.string({ required_error: 'batchId is required' }),
        moduleId: zod_1.z.string({ required_error: 'moduleId is required' }),
        courseId: zod_1.z.string({ required_error: 'courseId is required' }),
    }),
});
const updateLectureVideo = zod_1.z.object({
    liveLink: zod_1.z.string({ required_error: 'video link is required' }).optional(),
    videoLink: zod_1.z
        .object({
        s3Hoster: zod_1.z.string({ required_error: 'host is required' }).optional(),
        vimeoHoster: zod_1.z
            .string({ required_error: 'vimeo is required' })
            .optional()
            .optional(),
    })
        .optional(),
});
const UpdateLectureZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        lectureName: zod_1.z
            .string({ required_error: 'lecture name is required' })
            .optional(),
        topic: zod_1.z.string({ required_error: 'topic is required' }).optional(),
        notice: zod_1.z.string({ required_error: 'notice is required' }).optional(),
        lectureVideo: updateLectureVideo,
        type: zod_1.z.string({ required_error: 'type is required' }).optional(),
        startAt: zod_1.z.string({ required_error: 'startAt is required' }).optional(),
        endsAt: zod_1.z.string({ required_error: 'endsAt is required' }).optional(),
        isOptional: zod_1.z
            .boolean({ required_error: 'isOptional is required' })
            .optional(),
        batchId: zod_1.z.string({ required_error: 'batchId is required' }).optional(),
        moduleId: zod_1.z.string({ required_error: 'moduleId is required' }).optional(),
        courseId: zod_1.z.string({ required_error: 'courseId is required' }).optional(),
    }),
});
exports.lectureValidator = {
    createLectureZodSchema,
    UpdateLectureZodSchema,
};

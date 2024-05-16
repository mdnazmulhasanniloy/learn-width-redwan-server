import { z } from 'zod';

const createLectureZodSchema = z.object({
  body: z.object({
    lectureName: z.string({ required_error: 'lecture name is required' }),
    topic: z.string({ required_error: 'topic is required' }),
    video: z.any({ required_error: 'video is required' }),
    type: z.string({ required_error: 'type is required' }),
    isOptional: z.boolean({ required_error: 'isOptional is required' }),
    batchId: z.string({ required_error: 'batchId is required' }),
    moduleId: z.string({ required_error: 'moduleId is required' }),
    courseId: z.string({ required_error: 'courseId is required' }),
  }),
});

const UpdateLectureZodSchema = z.object({
  body: z.object({
    lectureName: z
      .string({ required_error: 'lecture name is required' })
      .optional(),
    topic: z.string({ required_error: 'topic is required' }).optional(),
    video: z.any({ required_error: 'video is required' }).optional(),
    type: z.string({ required_error: 'type is required' }).optional(),
    isOptional: z
      .boolean({ required_error: 'isOptional is required' })
      .optional(),
    batchId: z.string({ required_error: 'batchId is required' }).optional(),
    moduleId: z.string({ required_error: 'moduleId is required' }).optional(),
    courseId: z.string({ required_error: 'courseId is required' }).optional(),
  }),
});

export const lectureValidator = {
  createLectureZodSchema,
  UpdateLectureZodSchema,
};

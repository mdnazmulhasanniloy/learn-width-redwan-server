import { z } from 'zod';

const videoFileSchema = z.object({
  fieldname: z.literal('videos'),
  originalname: z.string().refine(name => /\.(mp4|avi|mov)$/i.test(name), {
    message: 'Invalid file type for video. Only MP4, AVI, and MOV are allowed.',
  }),
  encoding: z.string(),
  mimetype: z.string().refine(type => type.startsWith('video/'), {
    message: 'Invalid mime type for video. Only videos are allowed.',
  }),
  buffer: z.instanceof(Buffer),
});

const createLectureZodSchema = z.object({
  file: z.object({
    video: z.array(videoFileSchema).refine(video => (video.length = 1), {
      message: 'Exactly 1 videos are required.',
    }),
  }),

  body: z.object({
    lectureName: z.string({ required_error: 'lecture name is required' }),
    topic: z.string({ required_error: 'topic is required' }),
    video: z.any({ required_error: 'video is required' }),
    type: z.string({ required_error: 'type is required' }),
    isActive: z.boolean({ required_error: 'isActive is required' }),
    batchId: z.string({ required_error: 'batchId is required' }),
    moduleId: z.string({ required_error: 'moduleId is required' }),
    courseId: z.string({ required_error: 'courseId is required' }),
  }),
});

const UpdateLectureZodSchema = z.object({
  file: z
    .object({
      video: z.array(videoFileSchema).refine(video => (video.length = 1), {
        message: 'Exactly 1 videos are required.',
      }),
    })
    .deepPartial(),

  body: z
    .object({
      lectureName: z
        .string({ required_error: 'lecture name is required' })
        .optional(),
      topic: z.string({ required_error: 'topic is required' }).optional(),
      video: z.any({ required_error: 'video is required' }).optional(),
      type: z.string({ required_error: 'type is required' }).optional(),
      isActive: z
        .boolean({ required_error: 'isActive is required' })
        .optional(),
      batchId: z.string({ required_error: 'batchId is required' }).optional(),
      moduleId: z.string({ required_error: 'moduleId is required' }).optional(),
      courseId: z.string({ required_error: 'courseId is required' }).optional(),
    })
    .deepPartial(),
});

export const lectureValidator = {
  createLectureZodSchema,
  UpdateLectureZodSchema,
};

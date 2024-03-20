import { z } from 'zod';

const lectureVideo = z.object({
  liveLink: z.string({ required_error: 'video link is required' }),
  videoLink: z.object({
    s3Hoster: z.string({ required_error: 'host is required' }),
    vimeoHoster: z.string({ required_error: 'vimeo is required' }).optional(),
  }),
});
const createLectureZodSchema = z.object({
  body: z.object({
    lectureName: z.string({ required_error: 'lecture name is required' }),
    topic: z.string({ required_error: 'topic is required' }),
    notice: z.string({ required_error: 'notice is required' }),
    lectureVideo: lectureVideo,
    type: z.string({ required_error: 'type is required' }),
    startAt: z.string({ required_error: 'startAt is required' }),
    endsAt: z.string({ required_error: 'endsAt is required' }),
    isOptional: z.boolean({ required_error: 'isOptional is required' }),
    batchId: z.string({ required_error: 'batchId is required' }),
    moduleId: z.string({ required_error: 'moduleId is required' }),
    courseId: z.string({ required_error: 'courseId is required' }),
  }),
});
const updateLectureVideo = z.object({
  liveLink: z.string({ required_error: 'video link is required' }).optional(),
  videoLink: z
    .object({
      s3Hoster: z.string({ required_error: 'host is required' }).optional(),
      vimeoHoster: z
        .string({ required_error: 'vimeo is required' })
        .optional()
        .optional(),
    })
    .optional(),
});
const UpdateLectureZodSchema = z.object({
  body: z.object({
    lectureName: z
      .string({ required_error: 'lecture name is required' })
      .optional(),
    topic: z.string({ required_error: 'topic is required' }).optional(),
    notice: z.string({ required_error: 'notice is required' }).optional(),
    lectureVideo: updateLectureVideo,
    type: z.string({ required_error: 'type is required' }).optional(),
    startAt: z.string({ required_error: 'startAt is required' }).optional(),
    endsAt: z.string({ required_error: 'endsAt is required' }).optional(),
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

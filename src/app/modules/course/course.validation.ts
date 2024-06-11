import { z } from 'zod';

// Define the Zod schema for the images
const imageFileSchema = z.object({
  fieldname: z.literal('thumbnail'),
  originalname: z.string().refine(name => /\.(jpg|jpeg|png|gif)$/i.test(name), {
    message:
      'Invalid file type for thumbnail. Only JPG, JPEG, PNG, and GIF are allowed.',
  }),
  encoding: z.string(),
  mimetype: z.string().refine(type => type.startsWith('image/'), {
    message: 'Invalid mime type for image. Only images are allowed.',
  }),
  buffer: z.instanceof(Buffer),
});

const createCourseZodSchema = z.object({
  file: z.object({
    thumbnail: z
      .array(imageFileSchema)
      .refine(thumbnail => thumbnail.length != 1, {
        message: 'Exactly 1 thumbnail are required.',
      }),
  }),
  body: z.object({
    name: z.string({ required_error: 'name is required' }),
    duration: z
      .number({ required_error: 'duration is required' })
      .max(12)
      .min(1),
    description: z
      .string({ required_error: 'description is required' })
      .optional(),
    regularPrice: z.number({ required_error: 'regular price is required' }),
    currentBatch: z.number({ required_error: 'current batch is required' }),
  }),
});
const updateCourseZodSchema = z.object({
  file: z
    .object({
      thumbnail: z
        .array(imageFileSchema)
        .refine(thumbnail => thumbnail.length != 1, {
          message: 'Exactly 1 thumbnail are required.',
        }),
    })
    .deepPartial(),

  body: z
    .object({
      name: z.string({ required_error: 'name is required' }).optional(),
      duration: z
        .number({ required_error: 'duration is required' })
        .max(12)
        .min(1)
        .optional(),
      regularPrice: z
        .number({ required_error: 'regular price is required' })
        .optional(),
      currentBatch: z
        .number({ required_error: 'current batch is required' })
        .optional(),
      description: z
        .string({ required_error: 'description is required' })
        .optional(),
    })
    .deepPartial(),
});

export const courseValidation = {
  createCourseZodSchema,
  updateCourseZodSchema,
};

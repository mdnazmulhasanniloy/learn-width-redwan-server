import { z } from 'zod';
import { gender, userRole } from './user.constants';

const AddressSchema = z.object({
  country: z.string({ required_error: 'country is required' }),
  district: z.string({ required_error: 'district is required' }),
  street: z.string({ required_error: 'street is required' }),
});

const EducationSchema = z.object({
  educationLevel: z.string({ required_error: 'education level is required' }),
  degreeTitle: z.string({ required_error: 'degree title is required' }),
  institute: z.string({ required_error: 'institute is required' }),
  startDate: z.string({ required_error: 'start date is required' }),
  endDate: z.string().optional().optional(),
  currentlyStudying: z.boolean().default(false),
});

const ExperienceSchema = z.object({
  designation: z.string({ required_error: 'designation is required' }),
  company: z.string({ required_error: 'company is required' }),
  description: z.string().optional(),
  startDate: z.string({ required_error: 'start date is required' }),
  endDate: z.string().optional(),
  currentlyWorking: z.boolean().default(true),
});

export const createUserZodSchema = z.object({
  body: z.object({
    role: z.enum([...userRole] as [string, ...string[]]).default('student'),
    name: z.string({ required_error: 'name is required' }),
    email: z.string({ required_error: 'email is required' }).email(),
    password: z.string({ required_error: 'password is required' }),
    phoneNumber: z.string({ required_error: 'phone number is required' }),
    gender: z.enum([...gender] as [string, ...string[]]).optional(),
    presentAddress: AddressSchema.optional(),
    permanentAddress: AddressSchema.optional(),
    education: EducationSchema.optional(),
    skills: z.string().optional(),
    experience: ExperienceSchema.optional(),
    isValid: z.boolean().default(false),
    loggedInDevice: z
      .string({ required_error: 'device identity is required' })
      .optional(),
  }),
});

const updateAddressSchema = z.object({
  country: z.string({ required_error: 'country is required' }).optional(),
  district: z.string({ required_error: 'district is required' }).optional(),
  street: z.string({ required_error: 'street is required' }).optional(),
});

const updateEducationSchema = z.object({
  educationLevel: z
    .string({ required_error: 'education level is required' })
    .optional(),
  degreeTitle: z
    .string({ required_error: 'degree title is required' })
    .optional(),
  institute: z.string({ required_error: 'institute is required' }).optional(),
  startDate: z.string({ required_error: 'start date is required' }).optional(),
  endDate: z.string().optional(),
  currentlyStudying: z.boolean().default(false).optional(),
});

const updateExperienceSchema = z.object({
  designation: z
    .string({ required_error: 'designation is required' })
    .optional(),
  company: z.string({ required_error: 'company is required' }).optional(),
  description: z.string().optional().optional(),
  startDate: z.string({ required_error: 'start date is required' }).optional(),
  endDate: z.string().optional(),
  currentlyWorking: z.boolean().default(true).optional(),
});
export const updateUserZodSchema = z.object({
  body: z.object({
    role: z
      .enum([...userRole] as [string, ...string[]])
      .default('student')
      .optional(),
    name: z.string({ required_error: 'name is required' }).optional(),
    email: z.string({ required_error: 'email is required' }).email().optional(),
    password: z.string({ required_error: 'password is required' }).optional(),
    phoneNumber: z
      .string({ required_error: 'phone number is required' })
      .optional(),
    gender: z.enum([...gender] as [string, ...string[]]).optional(),
    presentAddress: updateAddressSchema.optional(),
    permanentAddress: updateAddressSchema.optional(),
    education: updateEducationSchema.optional(),
    experience: updateExperienceSchema.optional(),
    skills: z.string().optional(),
    isValid: z.boolean().default(false).optional(),
    loggedInDevice: z
      .string({ required_error: 'device identity is required' })
      .optional(),
  }),
});

export const userValidation = { createUserZodSchema, updateUserZodSchema };

'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.userValidation =
  exports.updateUserZodSchema =
  exports.createUserZodSchema =
    void 0;
const zod_1 = require('zod');
const user_constants_1 = require('./user.constants');
const AddressSchema = zod_1.z.object({
  country: zod_1.z.string({ required_error: 'country is required' }),
  district: zod_1.z.string({ required_error: 'district is required' }),
  street: zod_1.z.string({ required_error: 'street is required' }),
});
const EducationSchema = zod_1.z.object({
  educationLevel: zod_1.z.string({
    required_error: 'education level is required',
  }),
  degreeTitle: zod_1.z.string({ required_error: 'degree title is required' }),
  institute: zod_1.z.string({ required_error: 'institute is required' }),
  startDate: zod_1.z.string({ required_error: 'start date is required' }),
  endDate: zod_1.z.string().optional().optional(),
  currentlyStudying: zod_1.z.boolean().default(false),
});
const ExperienceSchema = zod_1.z.object({
  designation: zod_1.z.string({ required_error: 'designation is required' }),
  company: zod_1.z.string({ required_error: 'company is required' }),
  description: zod_1.z.string().optional(),
  startDate: zod_1.z.string({ required_error: 'start date is required' }),
  endDate: zod_1.z.string().optional(),
  currentlyWorking: zod_1.z.boolean().default(true),
});
exports.createUserZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    role: zod_1.z.enum([...user_constants_1.userRole]).default('student'),
    name: zod_1.z.string({ required_error: 'name is required' }),
    email: zod_1.z.string({ required_error: 'email is required' }).email(),
    password: zod_1.z.string({ required_error: 'password is required' }),
    phoneNumber: zod_1.z.string({ required_error: 'phone number is required' }),
    gender: zod_1.z.enum([...user_constants_1.gender]).optional(),
    presentAddress: AddressSchema.optional(),
    permanentAddress: AddressSchema.optional(),
    education: EducationSchema.optional(),
    skills: zod_1.z.string().optional(),
    experience: ExperienceSchema.optional(),
    isValid: zod_1.z.boolean().default(false),
    loggedInDevice: zod_1.z
      .string({ required_error: 'device identity is required' })
      .optional(),
  }),
});
const updateAddressSchema = zod_1.z.object({
  country: zod_1.z.string({ required_error: 'country is required' }).optional(),
  district: zod_1.z
    .string({ required_error: 'district is required' })
    .optional(),
  street: zod_1.z.string({ required_error: 'street is required' }).optional(),
});
const updateEducationSchema = zod_1.z.object({
  educationLevel: zod_1.z
    .string({ required_error: 'education level is required' })
    .optional(),
  degreeTitle: zod_1.z
    .string({ required_error: 'degree title is required' })
    .optional(),
  institute: zod_1.z
    .string({ required_error: 'institute is required' })
    .optional(),
  startDate: zod_1.z
    .string({ required_error: 'start date is required' })
    .optional(),
  endDate: zod_1.z.string().optional(),
  currentlyStudying: zod_1.z.boolean().default(false).optional(),
});
const updateExperienceSchema = zod_1.z.object({
  designation: zod_1.z
    .string({ required_error: 'designation is required' })
    .optional(),
  company: zod_1.z.string({ required_error: 'company is required' }).optional(),
  description: zod_1.z.string().optional().optional(),
  startDate: zod_1.z
    .string({ required_error: 'start date is required' })
    .optional(),
  endDate: zod_1.z.string().optional(),
  currentlyWorking: zod_1.z.boolean().default(true).optional(),
});
exports.updateUserZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    role: zod_1.z
      .enum([...user_constants_1.userRole])
      .default('student')
      .optional(),
    name: zod_1.z.string({ required_error: 'name is required' }).optional(),
    email: zod_1.z
      .string({ required_error: 'email is required' })
      .email()
      .optional(),
    password: zod_1.z
      .string({ required_error: 'password is required' })
      .optional(),
    phoneNumber: zod_1.z
      .string({ required_error: 'phone number is required' })
      .optional(),
    gender: zod_1.z.enum([...user_constants_1.gender]).optional(),
    presentAddress: updateAddressSchema.optional(),
    permanentAddress: updateAddressSchema.optional(),
    education: updateEducationSchema.optional(),
    experience: updateExperienceSchema.optional(),
    skills: zod_1.z.string().optional(),
    isValid: zod_1.z.boolean().default(false).optional(),
    loggedInDevice: zod_1.z
      .string({ required_error: 'device identity is required' })
      .optional(),
  }),
});
exports.userValidation = {
  createUserZodSchema: exports.createUserZodSchema,
  updateUserZodSchema: exports.updateUserZodSchema,
};

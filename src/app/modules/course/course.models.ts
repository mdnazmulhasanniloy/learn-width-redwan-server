import { Schema, model } from 'mongoose';
import { CourseModel, ICourse } from './course.interface';

const courseSchema = new Schema<ICourse>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      max: 12,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    currentBatch: {
      type: Number,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
);

export const Course = model<ICourse, CourseModel>('course', courseSchema);

import { model, Schema } from 'mongoose';
import { ILecture, ILectureModel } from './lecture.interface';

const lectureSchema = new Schema<ILecture>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    lectureName: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    video: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    isOptional: {
      type: Boolean,
      required: true,
      default: true,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: 'course',
      required: true,
    },
    batchId: {
      type: Schema.Types.ObjectId,
      ref: 'Batch',
      required: true,
    },
    moduleId: {
      type: Schema.Types.ObjectId,
      ref: 'Module',
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } },
);

export const Lecture = model<ILecture, ILectureModel>('lecture', lectureSchema);

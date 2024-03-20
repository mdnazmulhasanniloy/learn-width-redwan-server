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
    notice: {
      type: String,
    },
    lectureVideo: {
      liveLink: {
        type: String,
        required: true,
      },
      videoLink: {
        s3Hoster: {
          type: String,
        },
        vimeoHoster: {
          type: String,
        },
      },
    },
    type: {
      type: String,
      required: true,
    },
    startAt: {
      type: String,
      required: true,
    },
    endsAt: {
      type: String,
      required: true,
    },
    isOptional: {
      type: Boolean,
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
    courseId: {
      type: Schema.Types.ObjectId,
      ref: 'course',
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } },
);

export const Lecture = model<ILecture, ILectureModel>('lecture', lectureSchema);

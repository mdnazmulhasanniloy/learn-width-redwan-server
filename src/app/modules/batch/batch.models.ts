import { model, Schema } from 'mongoose';
import { BatchModel, IBatch } from './batch.interface';

const batchSchema = new Schema<IBatch>(
  {
    id: {
      type: String,
      required: [true, 'id is required'],
      unique: true,
    },
    name: {
      type: String,
      required: [true, 'name is required'],
      unique: true,
    },
    thumbnail: {
      type: String,
    },
    description: {
      type: String,
    },
    duration: {
      type: Number,
      required: [true, 'duration is required'],
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    startedAt: {
      type: String,
      required: [true, 'startedAt is required'],
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: 'course',
      required: [true, 'courseId is required'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
);

export const Batch = model<IBatch, BatchModel>('Batch', batchSchema);

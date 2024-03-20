import { model, Schema } from 'mongoose';
import { IModules, ModulesModel } from './modules.interface';

const modulesSchema = new Schema<IModules>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    moduleName: {
      type: String,
      required: true,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'course',
    },
    batchId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Batch',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
);
export const Module = model<IModules, ModulesModel>('Module', modulesSchema);

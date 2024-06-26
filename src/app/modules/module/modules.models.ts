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
    course: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'course',
    },
    batch: { type: Schema.Types.ObjectId, required: true, ref: 'Batch' },
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
export const Module = model<IModules, ModulesModel>('Module', modulesSchema);

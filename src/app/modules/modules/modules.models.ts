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
    courseName: {
      type: String,
      required: true,
    },
    batchName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
);
export const Module = model<IModules, ModulesModel>('Module', modulesSchema);

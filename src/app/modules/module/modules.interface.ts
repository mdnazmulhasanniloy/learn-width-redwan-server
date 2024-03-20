import { Model, Types } from 'mongoose';

export type IModules = {
  id: string;
  moduleName: string;
  courseId: Types.ObjectId;
  batchId: Types.ObjectId;
};

export type ModulesModel = Model<IModules, Record<string, unknown>>;

import { Model, Types } from 'mongoose';

export type IModules = {
  id: string;
  moduleName: string;
  course: {
    _id: Types.ObjectId;
    name: string;
  };
  batch: {
    _id: Types.ObjectId;
    name: string;
  };
  isActive: boolean;
};

export type ModulesModel = Model<IModules, Record<string, unknown>>;

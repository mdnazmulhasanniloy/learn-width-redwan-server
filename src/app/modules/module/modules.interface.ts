import { Model } from 'mongoose';

export type IModules = {
  id: string;
  moduleName: string;
  courseName: string;
  batchName: string;
};

export type ModulesModel = Model<IModules, Record<string, unknown>>;

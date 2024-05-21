import { Model } from 'mongoose';

export type ICourse = {
  id: string;
  name: string;
  duration: number;
  regularPrice: number;
  isActive: boolean;
  currentBatch: number;
  thumbnail: string;
  description: string;
};

export type CourseModel = Model<ICourse, Record<string, unknown>>;

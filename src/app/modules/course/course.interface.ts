import { Model } from 'mongoose';

export type ICourse = {
  id: string;
  name: string;
  duration: number;
  regularPrice: number;
  currentBatch: string;
  thumbnail: string;
};

export type CourseModel = Model<ICourse, Record<string, unknown>>;

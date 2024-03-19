import { Model, Types } from 'mongoose';
import { ICourse } from '../course/course.interface';

export type IBatch = {
  id: string;
  name: string;
  thumbnail: string;
  description: string;
  duration: number;
  startedAt: string;
  courseId: Types.ObjectId | ICourse;
};

export type BatchModel = Model<IBatch, Record<string, unknown>>;

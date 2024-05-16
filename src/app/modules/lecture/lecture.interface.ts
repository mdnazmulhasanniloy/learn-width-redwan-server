import { Model, Types } from 'mongoose';

export type ILecture = {
  id: string;
  lectureName: string;
  topic: string;
  video: string;
  type: string;
  isOptional: boolean;

  courseId: Types.ObjectId;
  batchId: Types.ObjectId;
  moduleId: Types.ObjectId;
};

export type ILectureModel = Model<ILecture, Record<string, unknown>>;

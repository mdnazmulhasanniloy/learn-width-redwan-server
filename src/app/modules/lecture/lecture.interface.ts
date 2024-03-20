import { Model, Types } from 'mongoose';

export type ILecture = {
  id: string;
  lectureName: string;
  topic: string;
  notice: string;
  lectureVideo: {
    liveLink: string;
    videoLink: {
      s3Hoster: string;
      vimeoHoster: string;
    };
  };
  type: string;
  startAt: string;
  endsAt: string;
  isOptional: boolean;

  courseId: Types.ObjectId;
  batchId: Types.ObjectId;
  moduleId: Types.ObjectId;
};

export type ILectureModel = Model<ILecture, Record<string, unknown>>;
//   assignment: {
//     sheduledAt: data?.scheduledAt,
//     deadLine: data?.endsAt,
//     assignments: selectedAssignment,
//   },

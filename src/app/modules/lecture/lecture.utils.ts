import { Lecture } from './lecture.models';

export const findLastLectureId = async (): Promise<string | undefined> => {
  const lastLectureId = await Lecture.findOne().sort({ createdAt: -1 }).lean();
  return lastLectureId?.id
    ? lastLectureId?.id.substring(2)
    : // eslint-disable-next-line no-undefined
      undefined;
};

export const generateLectureId = async (): Promise<string> => {
  const currentId =
    (await findLastLectureId()) || (0).toString().padStart(5, '0');
  //increment by 1
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `L-${incrementedId}`;
  return incrementedId;
};

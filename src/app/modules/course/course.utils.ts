import { Course } from './course.models';

export const findLastCourseId = async (): Promise<string | undefined> => {
  const lastCourseId = await Course.findOne().sort({ createdAt: -1 }).lean();
  return lastCourseId?.id
    ? lastCourseId?.id.substring(2)
    : // eslint-disable-next-line no-undefined
      undefined;
};

export const generateCourseId = async (): Promise<string> => {
  const currentId =
    (await findLastCourseId()) || (0).toString().padStart(5, '0');
  //increment by 1
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `C-${incrementedId}`;
  return incrementedId;
};

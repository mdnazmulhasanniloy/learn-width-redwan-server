//import { IUser } from './user.interface';
import { User } from './user.models';

export const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastStudent?.studentId
    ? lastStudent?.studentId.substring(5)
    : // eslint-disable-next-line no-undefined
      undefined;
};

export const generateStudentId = async (): Promise<string> => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0');
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `USER-${incrementedId}`;
  return incrementedId.toString();
};

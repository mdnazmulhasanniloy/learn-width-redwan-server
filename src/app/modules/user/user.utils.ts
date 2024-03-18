//import { IUser } from './user.interface';
import { User } from './user.models';

export const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne({ role: 'student' })
    .sort({ createdAt: -1 })
    .lean();
  console.log('lastStudent', lastStudent);
  return lastStudent?.studentId
    ? lastStudent?.studentId.substring(4)
    : // eslint-disable-next-line no-undefined
      undefined;
  // return lastStudent?.studentId
  //   ? lastStudent.studentId.substring(4)
  //   : // eslint-disable-next-line no-undefined
  //     undefined;
};

export const generateStudentId = async (): Promise<string> => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0');
  //increment by 1
  console.log('current', currentId);
  const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  console.log('incriment', incrementedId);
  return incrementedId.toString();
  // return incrementedId;
  //   lastUserId++
  //   return String(lastUserId).padStart(5, '0')
};

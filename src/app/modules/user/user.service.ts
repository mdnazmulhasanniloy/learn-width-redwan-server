import ApiError from '../../../errors/api.error';
import { IUser } from './user.interface';
import { User } from './user.models';
import { generateStudentId } from './user.utils';

const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto generated incremental id
  const studentId = await generateStudentId();

  user.studentId = studentId;
  const createdUser = await User.create(user);

  if (!createdUser) {
    throw new ApiError(400, 'Failed to create');
  }
  return createdUser;
};

export const UserService = {
  createUser,
};

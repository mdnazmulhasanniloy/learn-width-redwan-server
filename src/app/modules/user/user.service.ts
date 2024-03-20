import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/api.error';
import { paginationHelper } from '../../../helpers/pagination.helper';
import {
  IFilter,
  IGenericResponse,
  IPaginationOption,
} from '../../../interface/common.interface';
import { userSearchableFields } from './user.constants';
import { IUser } from './user.interface';
import { User } from './user.models';
import { generateStudentId } from './user.utils';
import httpStatus from 'http-status';

//crete user
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

//get all user
const getAllUsers = async (
  filters: IFilter,
  paginationOptions: IPaginationOption,
): Promise<IGenericResponse<IUser[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: userSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.entries(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData)?.map(([field, value]) => ({
        [field]: [value],
      })),
    });
  }

  //sorting and pagination
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
  //find collection
  const result = await User.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'oops! user not found.');
  }

  const total = await User.countDocuments();
  return {
    meta: { page: page, limit: limit, total: total },
    data: result,
  };
};

//update user
const updateUser = async (
  id: string,
  payload: IUser,
): Promise<IUser | null> => {
  const updatedUser = await User.findOneAndUpdate(
    { _id: id },
    payload as Partial<IUser>,
    { new: true },
  );

  if (!updatedUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Oops! user update failed');
  }

  return updatedUser;
};

//block user
const blockUser = async (id: string): Promise<IUser | null> => {
  const blockUser = await User.findOneAndUpdate(
    { _id: id },
    { userStatus: 'blocked' },
    { new: true },
  );

  if (!blockUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Oops! user update failed');
  }

  return blockUser;
};

//delete user
const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Oops! user deleting failed');
  }

  return result;
};

export const UserService = {
  createUser,
  getAllUsers,
  updateUser,
  blockUser,
  deleteUser,
};

import httpStatus from 'http-status';
import ApiError from '../../../errors/api.error';
import { ILecture } from './lecture.interface';
import { Lecture } from './lecture.models';
import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/pagination.helper';
import {
  IFilter,
  IGenericResponse,
  IPaginationOption,
} from '../../../interface/common.interface';
import { generateLectureId } from './lecture.utils';
import { lectureSearchableFields } from './lecture.constants';

//create lecture
const createLecture = async (props: ILecture): Promise<ILecture | null> => {
  // auto generated incremental id
  const courseId = await generateLectureId();

  props.id = courseId;
  const result = await Lecture.create(props);

  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Oops! lecture creation is Failed',
    );
  }
  return result;
};

//get all lecture
const getAllLectures = async (
  filters: IFilter,
  paginationOptions: IPaginationOption,
): Promise<IGenericResponse<ILecture[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: lectureSearchableFields.map(field => ({
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
  const result = await Lecture.find(whereCondition)
    .populate(['courseId', 'moduleId', 'batchId'])
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'oops! lecture is not found.');
  }

  const total = await Lecture.countDocuments();
  return {
    meta: { page: page, limit: limit, total: total },
    data: result,
  };
};

//get lecture by id
const getLectureById = async (id: string): Promise<ILecture> => {
  const result = await Lecture.findById(id).populate([
    'courseId',
    'moduleId',
    'batchId',
  ]);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'oops! lecture is not found.');
  }
  return result;
};

//update lecture
const updateLecture = async (
  id: string,
  props: ILecture,
): Promise<ILecture | null> => {
  const result = await Lecture.findByIdAndUpdate(id, props, { new: true });

  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Oops! lecture update is Failed',
    );
  }
  return result;
};

//delete lecture

const deleteLecture = async (id: string): Promise<ILecture | null> => {
  const result = await Lecture.findByIdAndDelete(id);

  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Oops! lecture delete is Failed',
    );
  }
  return result;
};

export const LectureService = {
  createLecture,
  getAllLectures,
  getLectureById,
  updateLecture,
  deleteLecture,
};

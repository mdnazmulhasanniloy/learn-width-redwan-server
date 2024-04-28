import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/pagination.helper';
import {
  IFilter,
  IGenericResponse,
  IPaginationOption,
} from '../../../interface/common.interface';
import { ICourse } from './course.interface';
import { Course } from './course.models';
import httpStatus from 'http-status';
import ApiError from '../../../errors/api.error';
import { generateCourseId } from './course.utils';
import { courseSearchableFields } from './course.constants';

const createCourse = async (props: ICourse): Promise<ICourse> => {
  // auto generated incremental id
  const courseId = await generateCourseId();

  props.id = courseId;
  const course = await Course.create(props);

  if (!course) {
    throw new ApiError(400, 'Oops! Course creation is Failed');
  }
  return course;
};

//get all course

const getAllCourses = async (
  filters: IFilter,
  paginationOptions: IPaginationOption,
): Promise<IGenericResponse<ICourse[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: courseSearchableFields.map(field => ({
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
  const result = await Course.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'oops! course is not found.');
  }

  const total = await Course.countDocuments();
  return {
    meta: { page: page, limit: limit, total: total },
    data: result,
  };
};

//get course by id

const getCourseById = async (id: string): Promise<ICourse> => {
  const result = await Course.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'oops! course is not found.');
  }
  return result;
};

//update course

const updateCourse = async (id: string, props: ICourse): Promise<ICourse> => {
  const result = await Course.findByIdAndUpdate(id, props, { new: true });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'oops! course is not found.');
  }
  return result;
};

//delete course

const deleteCourse = async (id: string): Promise<ICourse> => {
  const result = await Course.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'oops! course deleting is failed.',
    );
  }
  return result;
};

export const CourseService = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};

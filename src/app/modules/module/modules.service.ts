import httpStatus from 'http-status';
import ApiError from '../../../errors/api.error';
import { IModules } from './modules.interface';
import { Module } from './modules.models';
import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/pagination.helper';
import {
  IFilter,
  IGenericResponse,
  IPaginationOption,
} from '../../../interface/common.interface';
import { moduleSearchableFields } from './modules.constants';
import { generateModuleId } from './modules.utils';

//create module
const createModule = async (props: IModules): Promise<IModules | null> => {
  // auto generated incremental id
  const courseId = await generateModuleId();

  props.id = courseId;
  const course = await Module.create(props);

  if (!course) {
    throw new ApiError(400, 'Oops! module creation is Failed');
  }
  return course;
};

//get all module
const getAllModules = async (
  filters: IFilter,
  paginationOptions: IPaginationOption,
): Promise<IGenericResponse<IModules[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: moduleSearchableFields.map(field => ({
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
  const result = await Module.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'oops! modules is not found.');
  }

  const total = await Module.countDocuments();
  return {
    meta: { page: page, limit: limit, total: total },
    data: result,
  };
};

//get a batch by id
const getModuleById = async (id: string): Promise<IModules | null> => {
  const result = await Module.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'oops! module is not found.');
  }
  return result;
};

//update a batch
const updateModules = async (
  id: string,
  props: IModules,
): Promise<IModules | null> => {
  const result = await Module.findByIdAndUpdate(id, props, { new: true });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'oops! module is not found.');
  }
  return result;
};

//delete a batch
const deleteModule = async (id: string): Promise<IModules | null> => {
  const result = await Module.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'oops! modus deleting is failed.',
    );
  }
  return result;
};

export const ModuleService = {
  createModule,
  getAllModules,
  getModuleById,
  updateModules,
  deleteModule,
};

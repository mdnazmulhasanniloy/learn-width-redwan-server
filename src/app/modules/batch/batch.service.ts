//create a batch

import httpStatus from 'http-status';
import ApiError from '../../../errors/api.error';
import { IBatch } from './batch.interface';
import { Batch } from './batch.models';
import {
  IAFilter,
  IGenericResponse,
  IPaginationOption,
} from '../../../interface/common.interface';
import { batchSearchableFields } from './batch.constants';
import { paginationHelper } from '../../../helpers/pagination.helper';
import { SortOrder } from 'mongoose';
import { generateBatchId } from './batch.utils';

const createBatch = async (props: IBatch): Promise<IBatch | null> => {
  // auto generated incremental id
  const courseId = await generateBatchId();

  props.id = courseId;
  const course = await Batch.create(props);

  if (!course) {
    throw new ApiError(400, 'Oops! Course creation is Failed');
  }
  return course;
};

//get all batch
const getAllBatches = async (
  filters: IAFilter,
  paginationOptions: IPaginationOption,
): Promise<IGenericResponse<IBatch[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: batchSearchableFields.map(field => ({
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
  const result = await Batch.find(whereCondition)
    .populate('courseId')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'oops! batch is not found.');
  }

  const total = await Batch.countDocuments();
  return {
    meta: { page: page, limit: limit, total: total },
    data: result,
  };
};

//get a batch by id
const getBatchById = async (id: string): Promise<IBatch | null> => {
  const result = await Batch.findById(id).populate('courseId');
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'oops! batch is not found.');
  }
  return result;
};

//update a batch
const updateBatch = async (
  id: string,
  props: IBatch,
): Promise<IBatch | null> => {
  const result = await Batch.findByIdAndUpdate(id, props, { new: true });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'oops! batch is not found.');
  }
  return result;
};

//delete a batch
const deleteBatch = async (id: string): Promise<IBatch | null> => {
  const result = await Batch.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'oops! batch deleting is failed.',
    );
  }
  return result;
};

export const BatchService = {
  createBatch,
  getAllBatches,
  getBatchById,
  updateBatch,
  deleteBatch,
};

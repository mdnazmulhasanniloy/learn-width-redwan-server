import httpStatus from 'http-status';
import ApiError from '../../../errors/api.error';
import { ICoupon } from './coupon.interface';
import { Coupon } from './coupon.models';
import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/pagination.helper';
import { couponSearchableFields } from './coupon.constants';
import {
  IFilter,
  IGenericResponse,
  IPaginationOption,
} from '../../../interface/common.interface';
import { generateCouponCode } from './coupon.utils';

//create coupon
const createCoupon = async (props: ICoupon): Promise<ICoupon> => {
  const couponCode = await generateCouponCode(10);
  props.couponCode = couponCode;
  const coupon = await Coupon.create(props);
  if (!coupon) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Coupon not created');
  }
  return coupon;
};

//get all coupon
const getAllCoupons = async (
  filters: IFilter,
  paginationOptions: IPaginationOption,
): Promise<IGenericResponse<ICoupon[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: couponSearchableFields.map(field => ({
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
  const result = await Coupon.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'oops! coupon is not found.');
  }

  const total = await Coupon.countDocuments();
  return {
    meta: { page: page, limit: limit, total: total },
    data: result,
  };
};

//get coupon by id
const getCouponById = async (id: string): Promise<ICoupon> => {
  const coupon = await Coupon.findById(id);
  if (!coupon) {
    throw new ApiError(httpStatus.NOT_FOUND, 'oops! coupon is not found.');
  }
  return coupon;
};

//update coupon
const updateCoupon = async (id: string, props: ICoupon): Promise<ICoupon> => {
  const coupon = await Coupon.findByIdAndUpdate(id, props, { new: true });
  if (!coupon) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Coupon not updated');
  }
  return coupon;
};

//delete coupon
const deleteCoupon = async (id: string): Promise<ICoupon> => {
  const coupon = await Coupon.findByIdAndDelete(id);
  if (!coupon) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Coupon not deleted');
  }
  return coupon;
};

export const couponService = {
  createCoupon,
  getAllCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
};

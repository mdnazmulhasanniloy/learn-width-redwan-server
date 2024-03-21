import { Request, Response } from 'express';
import CatchAsync from '../../../shared/catchAsync';
import { couponService } from './coupon.service';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { couponFilterableFields } from './coupon.constants';
import { paginationFields } from '../../../constants/pagination';
import { ICoupon } from './coupon.interface';
import pick from '../../../shared/pick';

//create coupon
const createCoupon = CatchAsync(async (req: Request, res: Response) => {
  const couponData = req.body;
  const result = await couponService.createCoupon(couponData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'coupon created successfully!',
    data: result,
  });
});

//get all coupons
const getAllCoupons = CatchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, couponFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await couponService.getAllCoupons(filters, paginationOptions);
  sendResponse<ICoupon[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'all batch get successfully!',
    meta: result?.meta,
    data: result?.data,
  });
});

//get coupon by id
const getCouponById = CatchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await couponService.getCouponById(id);
  sendResponse<ICoupon>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'coupon retrieved successfully!',
    data: result,
  });
});

//update coupon
const updateCoupon = CatchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req?.body;
  const result = await couponService.updateCoupon(id as string, updatedData);
  sendResponse<ICoupon>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'coupon updated successfully!',
    data: result,
  });
});

//delete coupon

const deleteCoupon = CatchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await couponService.deleteCoupon(id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'coupon deleted successfully!',
    data: result,
  });
});

export const CouponController = {
  createCoupon,
  getAllCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
};

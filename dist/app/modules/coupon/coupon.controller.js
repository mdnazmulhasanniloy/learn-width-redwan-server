'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.CouponController = void 0;
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'));
const coupon_service_1 = require('./coupon.service');
const http_status_1 = __importDefault(require('http-status'));
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'));
const coupon_constants_1 = require('./coupon.constants');
const pagination_1 = require('../../../constants/pagination');
const pick_1 = __importDefault(require('../../../shared/pick'));
//create coupon
const createCoupon = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const couponData = req.body;
    const result =
      yield coupon_service_1.couponService.createCoupon(couponData);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'coupon created successfully!',
      data: result,
    });
  }),
);
//get all coupons
const getAllCoupons = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(
      req.query,
      coupon_constants_1.couponFilterableFields,
    );
    const paginationOptions = (0, pick_1.default)(
      req.query,
      pagination_1.paginationFields,
    );
    const result = yield coupon_service_1.couponService.getAllCoupons(
      filters,
      paginationOptions,
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'all batch get successfully!',
      meta: result === null || result === void 0 ? void 0 : result.meta,
      data: result === null || result === void 0 ? void 0 : result.data,
    });
  }),
);
//get coupon by id
const getCouponById = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield coupon_service_1.couponService.getCouponById(id);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'coupon retrieved successfully!',
      data: result,
    });
  }),
);
//update coupon
const updateCoupon = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req === null || req === void 0 ? void 0 : req.body;
    const result = yield coupon_service_1.couponService.updateCoupon(
      id,
      updatedData,
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'coupon updated successfully!',
      data: result,
    });
  }),
);
//delete coupon
const deleteCoupon = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield coupon_service_1.couponService.deleteCoupon(id);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'coupon deleted successfully!',
      data: result,
    });
  }),
);
exports.CouponController = {
  createCoupon,
  getAllCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
};

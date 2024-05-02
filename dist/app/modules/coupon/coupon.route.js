'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.CouponRouter = void 0;
const express_1 = require('express');
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest'),
);
const coupon_validation_1 = require('./coupon.validation');
const coupon_controller_1 = require('./coupon.controller');
const router = (0, express_1.Router)();
router.post(
  '/create-coupon',
  (0, validateRequest_1.default)(
    coupon_validation_1.couponValidations.createCouponZodSchema,
  ),
  coupon_controller_1.CouponController.createCoupon,
);
router.patch(
  '/:id',
  (0, validateRequest_1.default)(
    coupon_validation_1.couponValidations.updateCouponZodSchema,
  ),
  coupon_controller_1.CouponController.updateCoupon,
);
router.delete('/:id', coupon_controller_1.CouponController.deleteCoupon);
router.get('/:id', coupon_controller_1.CouponController.getCouponById);
router.get('/', coupon_controller_1.CouponController.getAllCoupons);
exports.CouponRouter = router;

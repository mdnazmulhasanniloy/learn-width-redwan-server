import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { couponValidations } from './coupon.validation';
import { CouponController } from './coupon.controller';

const router = Router();

router.post(
  '/create-coupon',
  validateRequest(couponValidations.createCouponZodSchema),
  CouponController.createCoupon,
);
router.patch(
  '/:id',
  validateRequest(couponValidations.updateCouponZodSchema),
  CouponController.updateCoupon,
);
router.delete('/:id', CouponController.deleteCoupon);
router.get('/:id', CouponController.getCouponById);
router.get('/', CouponController.getAllCoupons);

export const CouponRouter = router;

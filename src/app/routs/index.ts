import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { CourseRouter } from '../modules/course/course.route';
import { BatchRouter } from '../modules/batch/batch.route';
import { ModuleRouter } from '../modules/module/modules.route';
import { LectureRouter } from '../modules/lecture/lecture.route';
import { CouponRouter } from '../modules/coupon/coupon.route';
import { PaymentRouter } from '../modules/payment/payment.route';
import { authRoutes } from '../modules/auth/auth.route';

const router = Router();

const modulesRoutes = [
  {
    path: '/users',
    router: UserRoutes,
  },
  {
    path: '/auth',
    router: authRoutes,
  },
  {
    path: '/course',
    router: CourseRouter,
  },
  {
    path: '/batch',
    router: BatchRouter,
  },
  {
    path: '/module',
    router: ModuleRouter,
  },
  {
    path: '/lecture',
    router: LectureRouter,
  },
  {
    path: '/coupon',
    router: CouponRouter,
  },
  {
    path: '/payment',
    router: PaymentRouter,
  },
];

//optimize routes
modulesRoutes?.forEach(route => router?.use(route?.path, route?.router));

export default router;

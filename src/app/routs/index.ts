import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { CourseRouter } from '../modules/course/course.route';
import { BatchRouter } from '../modules/batch/batch.route';
import { ModuleRouter } from '../modules/module/modules.route';
import { LectureRouter } from '../modules/lecture/lecture.route';

const router = Router();

const modulesRoutes = [
  {
    path: '/users',
    router: UserRoutes,
  },
  {
    path: '/auth',
    router: AuthRoutes,
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
];

//optimize routes
modulesRoutes?.forEach(route => router?.use(route?.path, route?.router));

export default router;

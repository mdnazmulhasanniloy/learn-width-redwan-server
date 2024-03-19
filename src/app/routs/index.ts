import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { CourseRouter } from '../modules/course/course.route';

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
  //   {
  //     path: '/academic-semester',
  //     router: AcademicSemesterRoutes,
  //   },
  //   {
  //     path: '/academic-faculty',
  //     router: AcademicFacultyRoutes,
  //   },
  //   {
  //     path: '/academic-department',
  //     router: AcademicDepartmentRoutes,
  //   },
];
//optimize routes

modulesRoutes?.forEach(route => router?.use(route?.path, route?.router));

export default router;

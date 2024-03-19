import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { courseValidation } from './course.validation';
import { CourseController } from './course.controller';

const router = Router();

router.post(
  '/create-course',
  validateRequest(courseValidation.createCourseZodSchema),
  CourseController.createCourse,
);
router.patch(
  '/:id',
  validateRequest(courseValidation.updateCourseZodSchema),
  CourseController.updateCourse,
);
router.delete('/:id', CourseController.deleteCourse);
router.get('/:id', CourseController.getCourseById);
router.get('/', CourseController.getAllCourses);

export const CourseRouter = router;

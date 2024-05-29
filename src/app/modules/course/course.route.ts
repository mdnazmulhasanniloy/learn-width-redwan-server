import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { courseValidation } from './course.validation';
import { CourseController } from './course.controller';
import multer, { memoryStorage } from 'multer';
import { parseFormDataTypes } from '../../middlewares/parseFormDataTypes';
import { verifyToken } from '../../middlewares/verifyToken';

const router = Router();
const storage = memoryStorage();
const upload = multer({ storage });

router.post(
  '/create-course',
  upload.single('thumbnail'),
  parseFormDataTypes,
  verifyToken,
  validateRequest(courseValidation.createCourseZodSchema),
  CourseController.createCourse,
);
router.patch(
  '/:id',
  upload.single('thumbnail'),
  parseFormDataTypes,
  verifyToken,
  validateRequest(courseValidation.updateCourseZodSchema),
  CourseController.updateCourse,
);
router.delete('/:id', verifyToken, CourseController.deleteCourse);
router.get('/:id', CourseController.getCourseById);
router.get('/', CourseController.getAllCourses);

export const CourseRouter = router;

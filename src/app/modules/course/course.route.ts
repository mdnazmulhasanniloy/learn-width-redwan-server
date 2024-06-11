import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { courseValidation } from './course.validation';
import { CourseController } from './course.controller';
import multer, { memoryStorage } from 'multer';
import parseData from '../../middlewares/parse-data';

const router = Router();
const storage = memoryStorage();
const upload = multer({ storage });

router.post(
  '/create-course',
  upload.single('thumbnail'),
  parseData,
  validateRequest(courseValidation.createCourseZodSchema),
  CourseController.createCourse,
);
router.patch(
  '/:id',
  upload.single('thumbnail'),
  parseData,
  validateRequest(courseValidation.updateCourseZodSchema),
  CourseController.updateCourse,
);
router.delete('/:id', CourseController.deleteCourse);
router.get('/:id', CourseController.getCourseById);
router.get('/', CourseController.getAllCourses);

export const CourseRouter = router;

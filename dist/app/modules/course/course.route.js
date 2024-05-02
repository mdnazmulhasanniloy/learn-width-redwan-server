'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.CourseRouter = void 0;
const express_1 = require('express');
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest'),
);
const course_validation_1 = require('./course.validation');
const course_controller_1 = require('./course.controller');
const router = (0, express_1.Router)();
router.post(
  '/create-course',
  (0, validateRequest_1.default)(
    course_validation_1.courseValidation.createCourseZodSchema,
  ),
  course_controller_1.CourseController.createCourse,
);
router.patch(
  '/:id',
  (0, validateRequest_1.default)(
    course_validation_1.courseValidation.updateCourseZodSchema,
  ),
  course_controller_1.CourseController.updateCourse,
);
router.delete('/:id', course_controller_1.CourseController.deleteCourse);
router.get('/:id', course_controller_1.CourseController.getCourseById);
router.get('/', course_controller_1.CourseController.getAllCourses);
exports.CourseRouter = router;

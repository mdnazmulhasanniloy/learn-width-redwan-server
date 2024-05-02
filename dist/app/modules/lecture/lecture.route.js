'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.LectureRouter = void 0;
const express_1 = require('express');
const lecture_controller_1 = require('./lecture.controller');
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest'),
);
const lecture_validation_1 = require('./lecture.validation');
const router = (0, express_1.Router)();
router.post(
  '/create-lecture',
  (0, validateRequest_1.default)(
    lecture_validation_1.lectureValidator.createLectureZodSchema,
  ),
  lecture_controller_1.LectureController.createLecture,
);
router.patch('/:id', lecture_controller_1.LectureController.updateLecture);
router.delete('/:id', lecture_controller_1.LectureController.deleteLecture);
router.get('/:id', lecture_controller_1.LectureController.getLectureById);
router.get('/', lecture_controller_1.LectureController.getAllLectures);
exports.LectureRouter = router;

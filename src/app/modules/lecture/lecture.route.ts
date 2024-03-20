import { Router } from 'express';
import { LectureController } from './lecture.controller';
import validateRequest from '../../middlewares/validateRequest';
import { lectureValidator } from './lecture.validation';

const router = Router();

router.post(
  '/create-lecture',
  validateRequest(lectureValidator.createLectureZodSchema),
  LectureController.createLecture,
);
router.patch('/:id', LectureController.updateLecture);
router.delete('/:id', LectureController.deleteLecture);
router.get('/:id', LectureController.getLectureById);
router.get('/', LectureController.getAllLectures);

export const LectureRouter = router;

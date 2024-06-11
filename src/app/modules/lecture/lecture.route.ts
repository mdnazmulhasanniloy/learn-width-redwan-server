import { Router } from 'express';
import { LectureController } from './lecture.controller';
import validateRequest from '../../middlewares/validateRequest';
import { lectureValidator } from './lecture.validation';
import multer, { memoryStorage } from 'multer';
import parseData from '../../middlewares/parse-data';

const router = Router();
const storage = memoryStorage();
const upload = multer({ storage });

router.post(
  '/create-lecture',
  upload.single('video'),
  parseData,
  validateRequest(lectureValidator.createLectureZodSchema),
  LectureController.createLecture,
);
router.patch(
  '/:id',
  upload.single('video'),
  parseData,
  LectureController.updateLecture,
);
router.delete('/:id', LectureController.deleteLecture);
router.get('/:id', LectureController.getLectureById);
router.get('/', LectureController.getAllLectures);

export const LectureRouter = router;

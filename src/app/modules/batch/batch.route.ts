import { Router } from 'express';
import { BatchController } from './batch.controller';
import validateRequest from '../../middlewares/validateRequest';
import { batchValidation } from './batch.validation';

const router = Router();

router.post(
  '/create-batch',
  validateRequest(batchValidation.createBatchZodSchema),
  BatchController.createBatch,
);
router.patch(
  '/:id',
  validateRequest(batchValidation.updateBatchZodSchema),
  BatchController.updateBatch,
);
router.delete('/:id', BatchController.deleteBatch);
router.get('/:id', BatchController.getBatchById);
router.get('/', BatchController.getAllBatch);

export const BatchRouter = router;

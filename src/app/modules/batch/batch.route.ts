import { Router } from 'express';
import { BatchController } from './batch.controller';
import validateRequest from '../../middlewares/validateRequest';
import { batchValidation } from './batch.validation';
import { verifyToken } from '../../middlewares/verifyToken';

const router = Router();

router.post(
  '/create-batch',
  verifyToken,
  validateRequest(batchValidation.createBatchZodSchema),
  BatchController.createBatch,
);
router.patch(
  '/:id',
  verifyToken,
  validateRequest(batchValidation.updateBatchZodSchema),
  BatchController.updateBatch,
);
router.delete('/:id', verifyToken, BatchController.deleteBatch);
router.get('/:id', BatchController.getBatchById);
router.get('/', BatchController.getAllBatch);

export const BatchRouter = router;

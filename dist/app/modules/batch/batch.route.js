'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.BatchRouter = void 0;
const express_1 = require('express');
const batch_controller_1 = require('./batch.controller');
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest'),
);
const batch_validation_1 = require('./batch.validation');
const router = (0, express_1.Router)();
router.post(
  '/create-batch',
  (0, validateRequest_1.default)(
    batch_validation_1.batchValidation.createBatchZodSchema,
  ),
  batch_controller_1.BatchController.createBatch,
);
router.patch(
  '/:id',
  (0, validateRequest_1.default)(
    batch_validation_1.batchValidation.updateBatchZodSchema,
  ),
  batch_controller_1.BatchController.updateBatch,
);
router.delete('/:id', batch_controller_1.BatchController.deleteBatch);
router.get('/:id', batch_controller_1.BatchController.getBatchById);
router.get('/', batch_controller_1.BatchController.getAllBatch);
exports.BatchRouter = router;

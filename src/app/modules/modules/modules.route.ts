import { Router } from 'express';
import { ModuleController } from './modules.controller';
import { moduleValidations } from './modules.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = Router();

router.post(
  '/create-module',
  validateRequest(moduleValidations.createModuleZodSchema),
  ModuleController.createModule,
);
router.patch(
  '/:id',
  validateRequest(moduleValidations.updateModuleZodSchema),
  ModuleController.updateModule,
);
router.delete('/:id', ModuleController.deleteModule);
router.get('/:id', ModuleController.getModuleById);
router.get('/', ModuleController.getAllModules);

export const ModuleRouter = router;

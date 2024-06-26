import { Router } from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';

const router = Router();

router.post(
  '/create-user',
  validateRequest(userValidation.createUserZodSchema),
  UserController.createUser,
);
router.patch(
  '/:id',
  validateRequest(userValidation.updateUserZodSchema),
  UserController.updateUser,
);
router.delete('/:id', UserController.deleteUser);
router.patch('/block-user/:id', UserController.blockUser);
router.get('/:email', UserController.getUserByEmail);
router.get('/', UserController.getAllUsers);
export const UserRoutes = router;

import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/sign-in',
  validateRequest(AuthValidation.loginUserZodSchema),
  AuthController.signIn,
);

// router.post('/login-user');
router.post('/sign-out', AuthController.signOut);

export const AuthRoutes = router;

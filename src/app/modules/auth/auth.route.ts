import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/sign-up',
  validateRequest(AuthValidation.signUpZodSchema),
  AuthController.signUp,
);
router.post(
  '/sign-in',
  validateRequest(AuthValidation.signInZodSchema),
  AuthController.signIn,
);

// router.post('/login-user');
router.post('/sign-out', AuthController.signOut);

export const AuthRoutes = router;

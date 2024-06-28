import { Router } from 'express';
import { authControllers } from './auth.controller';
import { authValidation } from './auth.validation';
import validateRequest from '../../middlewares/validateRequest';
// import auth from '../../middlewares/auth';

const router = Router();

router.post(
  '/sign-up',
  // validateRequest(authValidation.signUpZodSchema),
  // authControllers.signUp,
);

router.post(
  '/sign-in',
  validateRequest(authValidation.loginZodValidationSchema),
  authControllers.login,
);
router.post('/sign-out', authControllers.signOut);

router.post('/clear-session', authControllers.clearSession);

router.post(
  '/refresh-token',
  validateRequest(authValidation.refreshTokenValidationSchema),
  authControllers.refreshToken,
);
router.patch(
  '/change-password',
  // auth(USER_ROLE.sub_admin, USER_ROLE.super_admin),
  authControllers.changePassword,
);
router.patch('/forgot-password', authControllers.forgotPassword);
router.patch('/reset-password', authControllers.resetPassword);
export const authRoutes = router;

// import express from 'express';
// import validateRequest from '../../middlewares/validateRequest';
// import { AuthController } from './auth.controller';
// import { AuthValidation } from './auth.validation';

// const router = express.Router();

// router.post(
//   '/sign-up',
//   validateRequest(AuthValidation.signUpZodSchema),
//   AuthController.signUp,
// );
// router.post(
//   '/sign-in',
//   validateRequest(AuthValidation.signInZodSchema),
//   AuthController.signIn,
// );

// // router.post('/login-user');
// router.post('/sign-out', AuthController.signOut);

// export const AuthRoutes = router;

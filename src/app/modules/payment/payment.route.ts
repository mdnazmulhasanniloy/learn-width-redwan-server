import { Router } from 'express';
import { PaymentController } from './payment.controller';
import validateRequest from '../../middlewares/validateRequest';
import { paymentValidator } from './payment.validation';

const router = Router();
router.post(
  '/',
  validateRequest(paymentValidator.paymentInitZodSchema),
  PaymentController.initPayment,
);
router.post('/webhook', PaymentController.webhook);
export const PaymentRouter = router;

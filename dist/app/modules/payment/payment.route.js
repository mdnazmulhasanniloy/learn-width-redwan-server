"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRouter = void 0;
const express_1 = require("express");
const payment_controller_1 = require("./payment.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const payment_validation_1 = require("./payment.validation");
const router = (0, express_1.Router)();
router.post('/', (0, validateRequest_1.default)(payment_validation_1.paymentValidator.paymentInitZodSchema), payment_controller_1.PaymentController.initPayment);
router.post('/webhook', payment_controller_1.PaymentController.webhook);
exports.PaymentRouter = router;

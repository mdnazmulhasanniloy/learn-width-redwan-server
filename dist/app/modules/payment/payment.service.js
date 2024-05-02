'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.PaymentService = void 0;
const http_status_1 = __importDefault(require('http-status'));
const api_error_1 = __importDefault(require('../../../errors/api.error'));
const ssl_service_1 = require('../ssl/ssl.service');
const payment_models_1 = require('./payment.models');
const payment_utils_1 = require('./payment.utils');
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initPayment = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    const tranId = yield (0, payment_utils_1.getTranId)();
    const data = {
      total_amount: payload.amount,
      tran_id: tranId,
      cus_name: payload.studentName,
      cus_email: payload.studentEmail,
      cus_add1: payload.studentAdd,
      cus_phone: payload.studentPhone,
      student: payload.student,
    };
    const paymentSessionData = {
      amount: payload.amount,
      student: payload.student,
      transactionId: tranId,
      id: tranId,
    };
    yield payment_models_1.Payment.create(paymentSessionData);
    const paymentSession = yield ssl_service_1.SslService.initPayment(data);
    if (!paymentSession.redirectGatewayURL) {
      throw new api_error_1.default(
        http_status_1.default.BAD_REQUEST,
        'Failed to initiate payment',
      );
    }
    return paymentSession.redirectGatewayURL;
  });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const webhook = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (
      !payload ||
      !(payload === null || payload === void 0 ? void 0 : payload.status) ||
      (payload === null || payload === void 0 ? void 0 : payload.status) !==
        'VALID'
    ) {
      throw new api_error_1.default(
        http_status_1.default.BAD_REQUEST,
        'invalid Payment',
      );
    }
    const result = yield ssl_service_1.SslService.validate(payload);
    if (
      (result === null || result === void 0 ? void 0 : result.status) !==
      'VALID'
    ) {
      throw new api_error_1.default(
        http_status_1.default.BAD_REQUEST,
        'invalid Payment',
      );
    }
    const { tran_id } = result;
    yield payment_models_1.Payment.updateOne(
      { tran_id },
      {
        status: 'paid',
        paymentGatewayData: payload,
      },
    );
    return result;
  });
exports.PaymentService = {
  initPayment,
  webhook,
};

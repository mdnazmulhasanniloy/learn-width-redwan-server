"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SslService = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../../../config"));
const api_error_1 = __importDefault(require("../../../errors/api.error"));
const http_status_1 = __importDefault(require("http-status"));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initPayment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        store_id: config_1.default.ssl.store_id,
        store_passwd: config_1.default.ssl.store_passwd,
        total_amount: payload.total_amount,
        currency: 'BDT',
        tran_id: payload.tran_id, // use unique tran_id for each api call
        success_url: 'http://localhost:3030/success',
        fail_url: 'http://localhost:3030/fail',
        cancel_url: 'http://localhost:3030/cancel',
        ipn_url: 'http://localhost:3030/ipn',
        product_name: 'course payment.',
        product_category: 'payment',
        product_profile: 'student',
        cus_name: payload.cus_name,
        cus_email: payload.cus_email,
        cus_add1: payload.cus_add1,
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: payload.cus_phone,
    };
    const response = yield (0, axios_1.default)({
        method: 'post',
        url: config_1.default.ssl.url,
        data: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    return response.data;
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validate = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, axios_1.default)({
            method: 'get',
            url: `${config_1.default.ssl.url}?val_id=${data.val_id}&store_id=${config_1.default.ssl.store_id}&store_passwd=${config_1.default.ssl.store_passwd}&format=json`,
        });
        console.log(data.val_id);
        if (!response) {
            throw new api_error_1.default(http_status_1.default.BAD_REQUEST, 'payment validation failed');
        }
        return response.data;
    }
    catch (error) {
        throw new api_error_1.default(http_status_1.default.BAD_REQUEST, 'payment validation failed');
    }
});
exports.SslService = {
    initPayment,
    validate,
};

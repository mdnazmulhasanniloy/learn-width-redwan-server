"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const zod_1 = require("zod");
const handelValidation_error_1 = __importDefault(require("../errors/handelValidation.error"));
const handleZod_error_1 = __importDefault(require("../errors/handleZod.error"));
const handleCast_error_1 = __importDefault(require("../errors/handleCast.error"));
const api_error_1 = __importDefault(require("../errors/api.error"));
// ErrorHandler.js
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ErrorHandler = (error, req, res, next) => {
    let statusCode = 500;
    let message = 'Something went wrong';
    let errorMessages = [];
    // console.log(error)
    if (error.name)
        if (error.name === 'ValidationError') {
            console.log(1);
            const simplifiedError = (0, handelValidation_error_1.default)(error);
            statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
            message = (simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message) || 'Validation Error';
            errorMessages = (simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorMessages) || [];
        }
        else if (error instanceof zod_1.ZodError) {
            const simplifiedError = (0, handleZod_error_1.default)(error);
            statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
            message = (simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message) || 'Validation Error';
            errorMessages = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorMessages;
        }
        else if (error.name === 'CastError') {
            const simplifiedError = (0, handleCast_error_1.default)(error);
            statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
            message = (simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message) || 'Cast Error';
            errorMessages = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorMessages;
        }
        else if (error instanceof api_error_1.default) {
            statusCode = error.statusCode | 500;
            message = error.message || 'Internal Server Error';
            errorMessages = error.message
                ? [
                    {
                        path: '',
                        message: error.message,
                    },
                ]
                : [];
        }
        else if (error instanceof Error) {
            message = error === null || error === void 0 ? void 0 : error.message;
            errorMessages = (error === null || error === void 0 ? void 0 : error.message)
                ? [
                    {
                        path: '',
                        message: error === null || error === void 0 ? void 0 : error.message,
                    },
                ]
                : [];
        }
    const stack = (config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.nod_env) === 'development' ? error.stack : null;
    res.json({
        success: false,
        status: statusCode,
        message: message,
        errorMessages,
        stack,
    });
};
exports.default = ErrorHandler;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HandleValidationError = (err) => {
    const errors = Object.values(err.errors).map((el) => {
        return {
            path: el === null || el === void 0 ? void 0 : el.path,
            message: el === null || el === void 0 ? void 0 : el.message,
        };
    });
    const statusCode = 400;
    // Create an IGenericErrorResponse with an array of error messages
    // const response: IGenericErrorResponse =
    // Do something with the response object, or return it if needed
    return {
        statusCode,
        message: 'Validation Error',
        errorMessages: errors,
    };
};
exports.default = HandleValidationError;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (error) => {
    var _a;
    const errors = (_a = error === null || error === void 0 ? void 0 : error.issues) === null || _a === void 0 ? void 0 : _a.map((issue) => {
        return {
            path: issue.path[issue.path.length - 1].toString(), // Convert path to string if it's a number
            message: issue.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation Error',
        errorMessages: errors,
    };
};
exports.default = handleZodError;

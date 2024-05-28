"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    const responseData = {
        statusCode: data.statusCode,
        success: data === null || data === void 0 ? void 0 : data.success,
        message: (data === null || data === void 0 ? void 0 : data.message) || null,
        data: (data === null || data === void 0 ? void 0 : data.data) || null,
        // eslint-disable-next-line no-undefined
        meta: (data === null || data === void 0 ? void 0 : data.meta) || null || undefined,
    };
    res.status(data === null || data === void 0 ? void 0 : data.statusCode).json(responseData);
};
exports.default = sendResponse;

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
exports.BatchController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const batch_service_1 = require("./batch.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const batch_constants_1 = require("./batch.constants");
const pagination_1 = require("../../../constants/pagination");
const createBatch = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const batch = req === null || req === void 0 ? void 0 : req.body;
    const result = yield batch_service_1.BatchService.createBatch(batch);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'batch created successfully!',
        data: result,
    });
}));
//get all batch
const getAllBatch = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, batch_constants_1.batchFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield batch_service_1.BatchService.getAllBatches(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'all batch get successfully!',
        meta: result === null || result === void 0 ? void 0 : result.meta,
        data: result === null || result === void 0 ? void 0 : result.data,
    });
}));
//get batch by id
const getBatchById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield batch_service_1.BatchService.getBatchById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'batch retrieved successfully!',
        data: result,
    });
}));
//update batch
const updateBatch = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req === null || req === void 0 ? void 0 : req.body;
    const result = yield batch_service_1.BatchService.updateBatch(id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'batch updated successfully!',
        data: result,
    });
}));
//delete batch
const deleteBatch = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
    const result = yield batch_service_1.BatchService.deleteBatch(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'batch deleted successfully!',
        data: result,
    });
}));
exports.BatchController = {
    createBatch,
    getAllBatch,
    getBatchById,
    updateBatch,
    deleteBatch,
};

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
exports.ModuleController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const modules_service_1 = require("./modules.service");
const pick_1 = __importDefault(require("../../../shared/pick"));
const modules_constants_1 = require("./modules.constants");
const pagination_1 = require("../../../constants/pagination");
//create a module
const createModule = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const module = req === null || req === void 0 ? void 0 : req.body;
    const result = yield modules_service_1.ModuleService.createModule(module);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'module created successfully!',
        data: result,
    });
}));
//get all modules
const getAllModules = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, modules_constants_1.ModuleFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield modules_service_1.ModuleService.getAllModules(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'all modules get successfully!',
        meta: result === null || result === void 0 ? void 0 : result.meta,
        data: result === null || result === void 0 ? void 0 : result.data,
    });
}));
//get modules by id
const getModuleById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield modules_service_1.ModuleService.getModuleById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'module retrieved successfully!',
        data: result,
    });
}));
//update module
const updateModule = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req === null || req === void 0 ? void 0 : req.body;
    const result = yield modules_service_1.ModuleService.updateModules(id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'module updated successfully!',
        data: result,
    });
}));
//delete module
const deleteModule = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
    const result = yield modules_service_1.ModuleService.deleteModule(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'module deleted successfully!',
        data: result,
    });
}));
exports.ModuleController = {
    createModule,
    getAllModules,
    getModuleById,
    updateModule,
    deleteModule,
};

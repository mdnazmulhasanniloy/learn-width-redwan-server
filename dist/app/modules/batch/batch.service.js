"use strict";
//create a batch
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const api_error_1 = __importDefault(require("../../../errors/api.error"));
const batch_models_1 = require("./batch.models");
const batch_constants_1 = require("./batch.constants");
const pagination_helper_1 = require("../../../helpers/pagination.helper");
const batch_utils_1 = require("./batch.utils");
const createBatch = (props) => __awaiter(void 0, void 0, void 0, function* () {
    // auto generated incremental id
    const courseId = yield (0, batch_utils_1.generateBatchId)();
    props.id = courseId;
    const course = yield batch_models_1.Batch.create(props);
    if (!course) {
        throw new api_error_1.default(400, 'Oops! Course creation is Failed');
    }
    return course;
});
//get all batch
const getAllBatches = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            $or: batch_constants_1.batchSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.entries(filtersData).length) {
        andCondition.push({
            $and: (_a = Object.entries(filtersData)) === null || _a === void 0 ? void 0 : _a.map(([field, value]) => ({
                [field]: [value],
            })),
        });
    }
    //sorting and pagination
    const { page, limit, skip, sortBy, sortOrder } = pagination_helper_1.paginationHelper.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
    //find collection
    const result = yield batch_models_1.Batch.find(whereCondition)
        .populate('courseId')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    if (!result) {
        throw new api_error_1.default(http_status_1.default.NOT_FOUND, 'oops! batch is not found.');
    }
    const total = yield batch_models_1.Batch.countDocuments();
    return {
        meta: { page: page, limit: limit, total: total },
        data: result,
    };
});
//get a batch by id
const getBatchById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield batch_models_1.Batch.findById(id).populate('courseId');
    if (!result) {
        throw new api_error_1.default(http_status_1.default.NOT_FOUND, 'oops! batch is not found.');
    }
    return result;
});
//update a batch
const updateBatch = (id, props) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield batch_models_1.Batch.findByIdAndUpdate(id, props, { new: true });
    if (!result) {
        throw new api_error_1.default(http_status_1.default.NOT_FOUND, 'oops! batch is not found.');
    }
    return result;
});
//delete a batch
const deleteBatch = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield batch_models_1.Batch.findByIdAndDelete(id);
    if (!result) {
        throw new api_error_1.default(http_status_1.default.BAD_REQUEST, 'oops! batch deleting is failed.');
    }
    return result;
});
exports.BatchService = {
    createBatch,
    getAllBatches,
    getBatchById,
    updateBatch,
    deleteBatch,
};

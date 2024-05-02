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
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.ModuleService = void 0;
const http_status_1 = __importDefault(require('http-status'));
const api_error_1 = __importDefault(require('../../../errors/api.error'));
const modules_models_1 = require('./modules.models');
const pagination_helper_1 = require('../../../helpers/pagination.helper');
const modules_constants_1 = require('./modules.constants');
const modules_utils_1 = require('./modules.utils');
//create module
const createModule = props =>
  __awaiter(void 0, void 0, void 0, function* () {
    // auto generated incremental id
    const courseId = yield (0, modules_utils_1.generateModuleId)();
    props.id = courseId;
    const course = yield modules_models_1.Module.create(props);
    if (!course) {
      throw new api_error_1.default(400, 'Oops! module creation is Failed');
    }
    return course;
  });
//get all module
const getAllModules = (filters, paginationOptions) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { searchTerm } = filters,
      filtersData = __rest(filters, ['searchTerm']);
    const andCondition = [];
    if (searchTerm) {
      andCondition.push({
        $or: modules_constants_1.moduleSearchableFields.map(field => ({
          [field]: {
            $regex: searchTerm,
            $options: 'i',
          },
        })),
      });
    }
    if (Object.entries(filtersData).length) {
      andCondition.push({
        $and:
          (_a = Object.entries(filtersData)) === null || _a === void 0
            ? void 0
            : _a.map(([field, value]) => ({
                [field]: [value],
              })),
      });
    }
    //sorting and pagination
    const { page, limit, skip, sortBy, sortOrder } =
      pagination_helper_1.paginationHelper.calculatePagination(
        paginationOptions,
      );
    const sortConditions = {};
    if (sortBy && sortOrder) {
      sortConditions[sortBy] = sortOrder;
    }
    const whereCondition =
      andCondition.length > 0 ? { $and: andCondition } : {};
    //find collection
    const result = yield modules_models_1.Module.find(whereCondition)
      .populate(['courseId', 'batchId'])
      .sort(sortConditions)
      .skip(skip)
      .limit(limit);
    if (!result) {
      throw new api_error_1.default(
        http_status_1.default.NOT_FOUND,
        'oops! modules is not found.',
      );
    }
    const total = yield modules_models_1.Module.countDocuments();
    return {
      meta: { page: page, limit: limit, total: total },
      data: result,
    };
  });
//get a batch by id
const getModuleById = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield modules_models_1.Module.findById(id).populate([
      'courseId',
      'batchId',
    ]);
    if (!result) {
      throw new api_error_1.default(
        http_status_1.default.NOT_FOUND,
        'oops! module is not found.',
      );
    }
    return result;
  });
//update a batch
const updateModules = (id, props) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield modules_models_1.Module.findByIdAndUpdate(id, props, {
      new: true,
    });
    if (!result) {
      throw new api_error_1.default(
        http_status_1.default.NOT_FOUND,
        'oops! module is not found.',
      );
    }
    return result;
  });
//delete a batch
const deleteModule = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield modules_models_1.Module.findByIdAndDelete(id);
    if (!result) {
      throw new api_error_1.default(
        http_status_1.default.BAD_REQUEST,
        'oops! modus deleting is failed.',
      );
    }
    return result;
  });
exports.ModuleService = {
  createModule,
  getAllModules,
  getModuleById,
  updateModules,
  deleteModule,
};

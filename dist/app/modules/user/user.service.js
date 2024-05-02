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
exports.UserService = void 0;
const api_error_1 = __importDefault(require('../../../errors/api.error'));
const pagination_helper_1 = require('../../../helpers/pagination.helper');
const user_constants_1 = require('./user.constants');
const user_models_1 = require('./user.models');
const user_utils_1 = require('./user.utils');
const http_status_1 = __importDefault(require('http-status'));
//crete user
const createUser = user =>
  __awaiter(void 0, void 0, void 0, function* () {
    // auto generated incremental id
    if (user.role === 'student') {
      const studentId = yield (0, user_utils_1.generateStudentId)();
      user.studentId = studentId;
    }
    const createdUser = yield user_models_1.User.create(user);
    if (!createdUser) {
      throw new api_error_1.default(400, 'Failed to create');
    }
    return createdUser;
  });
//get all user
const getAllUsers = (filters, paginationOptions) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { searchTerm } = filters,
      filtersData = __rest(filters, ['searchTerm']);
    const andCondition = [];
    if (searchTerm) {
      andCondition.push({
        $or: user_constants_1.userSearchableFields.map(field => ({
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
    const result = yield user_models_1.User.find(whereCondition)
      .sort(sortConditions)
      .skip(skip)
      .limit(limit);
    if (!result) {
      throw new api_error_1.default(
        http_status_1.default.NOT_FOUND,
        'oops! user not found.',
      );
    }
    const total = yield user_models_1.User.countDocuments();
    return {
      meta: { page: page, limit: limit, total: total },
      data: result,
    };
  });
//update user
const updateUser = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield user_models_1.User.findOneAndUpdate(
      { _id: id },
      payload,
      { new: true },
    );
    if (!updatedUser) {
      throw new api_error_1.default(
        http_status_1.default.BAD_REQUEST,
        'Oops! user update failed',
      );
    }
    return updatedUser;
  });
//block user
const blockUser = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const blockUser = yield user_models_1.User.findOneAndUpdate(
      { _id: id },
      { userStatus: 'blocked' },
      { new: true },
    );
    if (!blockUser) {
      throw new api_error_1.default(
        http_status_1.default.BAD_REQUEST,
        'Oops! user update failed',
      );
    }
    return blockUser;
  });
//delete user
const deleteUser = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_models_1.User.findByIdAndDelete(id);
    if (!result) {
      throw new api_error_1.default(
        http_status_1.default.BAD_REQUEST,
        'Oops! user deleting failed',
      );
    }
    return result;
  });
exports.UserService = {
  createUser,
  getAllUsers,
  updateUser,
  blockUser,
  deleteUser,
};

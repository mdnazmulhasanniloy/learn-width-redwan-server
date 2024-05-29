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
exports.LectureService = void 0;
const http_status_1 = __importDefault(require('http-status'));
const api_error_1 = __importDefault(require('../../../errors/api.error'));
const lecture_models_1 = require('./lecture.models');
const pagination_helper_1 = require('../../../helpers/pagination.helper');
const lecture_utils_1 = require('./lecture.utils');
const lecture_constants_1 = require('./lecture.constants');
const s3_1 = require('../../../shared/s3/s3');
//create lecture
const createLecture = (
  props,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  file,
) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const lectureId = yield (0, lecture_utils_1.generateLectureId)();
    const videoUrl = yield (0, s3_1.uploadToS3)({
      file,
      fileName: `videos/lecture/${lectureId}`,
    });
    props.id = lectureId;
    props.video = videoUrl;
    const result = yield lecture_models_1.Lecture.create(props);
    if (!result) {
      throw new api_error_1.default(
        http_status_1.default.BAD_REQUEST,
        'Oops! lecture creation is Failed',
      );
    }
    return result;
  });
//get all lecture
const getAllLectures = (filters, paginationOptions) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { searchTerm } = filters,
      filtersData = __rest(filters, ['searchTerm']);
    const andCondition = [];
    if (searchTerm) {
      andCondition.push({
        $or: lecture_constants_1.lectureSearchableFields.map(field => ({
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
    const result = yield lecture_models_1.Lecture.find(whereCondition)
      .populate(['courseId', 'moduleId', 'batchId'])
      .sort(sortConditions)
      .skip(skip)
      .limit(limit);
    if (!result) {
      throw new api_error_1.default(
        http_status_1.default.NOT_FOUND,
        'oops! lecture is not found.',
      );
    }
    const total = yield lecture_models_1.Lecture.countDocuments();
    return {
      meta: { page: page, limit: limit, total: total },
      data: result,
    };
  });
//get lecture by id
const getLectureById = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield lecture_models_1.Lecture.findById(id).populate([
      'courseId',
      'moduleId',
      'batchId',
    ]);
    if (!result) {
      throw new api_error_1.default(
        http_status_1.default.NOT_FOUND,
        'oops! lecture is not found.',
      );
    }
    return result;
  });
//update lecture
const updateLecture = (
  id,
  props,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  file,
) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const lecture = yield lecture_models_1.Lecture.findById(id);
    if (file) {
      const imageUrl = yield (0, s3_1.uploadToS3)({
        file,
        fileName: `videos/lecture/${lecture === null || lecture === void 0 ? void 0 : lecture.id}`,
      });
      props.video = imageUrl;
    }
    const result = yield lecture_models_1.Lecture.findByIdAndUpdate(id, props, {
      new: true,
    });
    if (!result) {
      throw new api_error_1.default(
        http_status_1.default.BAD_REQUEST,
        'Oops! lecture update is Failed',
      );
    }
    return result;
  });
//delete lecture
const deleteLecture = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const lecture = yield lecture_models_1.Lecture.findById(id);
    yield (0, s3_1.deleteFromS3)(
      `videos/lecture/${lecture === null || lecture === void 0 ? void 0 : lecture.id}`,
    );
    const result = yield lecture_models_1.Lecture.findByIdAndDelete(id);
    if (!result) {
      throw new api_error_1.default(
        http_status_1.default.BAD_REQUEST,
        'Oops! lecture delete is Failed',
      );
    }
    return result;
  });
exports.LectureService = {
  createLecture,
  getAllLectures,
  getLectureById,
  updateLecture,
  deleteLecture,
};

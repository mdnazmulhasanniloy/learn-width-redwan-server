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
exports.CourseService = void 0;
const pagination_helper_1 = require("../../../helpers/pagination.helper");
const course_models_1 = require("./course.models");
const http_status_1 = __importDefault(require("http-status"));
const api_error_1 = __importDefault(require("../../../errors/api.error"));
const course_utils_1 = require("./course.utils");
const course_constants_1 = require("./course.constants");
const s3_1 = require("../../../shared/s3/s3");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createCourse = (props, file) => __awaiter(void 0, void 0, void 0, function* () {
    // auto generated incremental id
    const courseId = yield (0, course_utils_1.generateCourseId)();
    const imageUrl = yield (0, s3_1.uploadToS3)({
        file,
        fileName: `images/courses/${courseId}`,
    });
    props.id = courseId;
    props.thumbnail = imageUrl;
    const course = yield course_models_1.Course.create(props);
    if (!course) {
        throw new api_error_1.default(400, 'Oops! Course creation is Failed');
    }
    return course;
});
//get all course
const getAllCourses = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            $or: course_constants_1.courseSearchableFields.map(field => ({
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
    const result = yield course_models_1.Course.find(whereCondition)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    if (!result) {
        throw new api_error_1.default(http_status_1.default.NOT_FOUND, 'oops! course is not found.');
    }
    const total = yield course_models_1.Course.countDocuments();
    return {
        meta: { page: page, limit: limit, total: total },
        data: result,
    };
});
//get course by id
const getCourseById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_models_1.Course.findById(id);
    if (!result) {
        throw new api_error_1.default(http_status_1.default.NOT_FOUND, 'oops! course is not found.');
    }
    return result;
});
//update course
const updateCourse = (id, props, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
file) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield course_models_1.Course.findById(id);
    if (file) {
        const imageUrl = yield (0, s3_1.uploadToS3)({
            file,
            fileName: `images/courses/${course === null || course === void 0 ? void 0 : course.id}`,
        });
        props.thumbnail = imageUrl;
    }
    const result = yield course_models_1.Course.findByIdAndUpdate(id, props, { new: true });
    if (!result) {
        throw new api_error_1.default(http_status_1.default.NOT_FOUND, 'oops! course is not found.');
    }
    return result;
});
//delete course
const deleteCourse = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield course_models_1.Course.findById(id);
    yield (0, s3_1.deleteFromS3)(`images/courses/${course === null || course === void 0 ? void 0 : course.id}`);
    const result = yield course_models_1.Course.findByIdAndDelete(id);
    if (!result) {
        throw new api_error_1.default(http_status_1.default.BAD_REQUEST, 'oops! course deleting is failed.');
    }
    return result;
});
exports.CourseService = {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
};

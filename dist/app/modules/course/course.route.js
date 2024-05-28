"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRouter = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const course_validation_1 = require("./course.validation");
const course_controller_1 = require("./course.controller");
const multer_1 = __importStar(require("multer"));
const parseFormDataTypes_1 = require("../../middlewares/parseFormDataTypes");
const router = (0, express_1.Router)();
const storage = (0, multer_1.memoryStorage)();
const upload = (0, multer_1.default)({ storage });
router.post('/create-course', upload.single('thumbnail'), parseFormDataTypes_1.parseFormDataTypes, (0, validateRequest_1.default)(course_validation_1.courseValidation.createCourseZodSchema), course_controller_1.CourseController.createCourse);
router.patch('/:id', upload.single('thumbnail'), parseFormDataTypes_1.parseFormDataTypes, (0, validateRequest_1.default)(course_validation_1.courseValidation.updateCourseZodSchema), course_controller_1.CourseController.updateCourse);
router.delete('/:id', course_controller_1.CourseController.deleteCourse);
router.get('/:id', course_controller_1.CourseController.getCourseById);
router.get('/', course_controller_1.CourseController.getAllCourses);
exports.CourseRouter = router;

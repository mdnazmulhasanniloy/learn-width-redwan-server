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
exports.LectureRouter = void 0;
const express_1 = require("express");
const lecture_controller_1 = require("./lecture.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const lecture_validation_1 = require("./lecture.validation");
const multer_1 = __importStar(require("multer"));
const parseFormDataTypes_1 = require("../../middlewares/parseFormDataTypes");
const router = (0, express_1.Router)();
const storage = (0, multer_1.memoryStorage)();
const upload = (0, multer_1.default)({ storage });
router.post('/create-lecture', upload.single('video'), parseFormDataTypes_1.parseFormDataTypes, (0, validateRequest_1.default)(lecture_validation_1.lectureValidator.createLectureZodSchema), lecture_controller_1.LectureController.createLecture);
router.patch('/:id', upload.single('video'), parseFormDataTypes_1.parseFormDataTypes, lecture_controller_1.LectureController.updateLecture);
router.delete('/:id', lecture_controller_1.LectureController.deleteLecture);
router.get('/:id', lecture_controller_1.LectureController.getLectureById);
router.get('/', lecture_controller_1.LectureController.getAllLectures);
exports.LectureRouter = router;

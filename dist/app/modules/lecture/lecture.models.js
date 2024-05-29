'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Lecture = void 0;
const mongoose_1 = require('mongoose');
const lectureSchema = new mongoose_1.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    lectureName: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    video: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    courseId: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: 'course',
      required: true,
    },
    batchId: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: 'Batch',
      required: true,
    },
    moduleId: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: 'Module',
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } },
);
exports.Lecture = (0, mongoose_1.model)('lecture', lectureSchema);

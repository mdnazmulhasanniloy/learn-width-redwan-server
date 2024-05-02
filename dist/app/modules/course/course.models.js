'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Course = void 0;
const mongoose_1 = require('mongoose');
const courseSchema = new mongoose_1.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    currentBatch: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
);
exports.Course = (0, mongoose_1.model)('course', courseSchema);

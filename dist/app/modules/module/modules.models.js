'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Module = void 0;
const mongoose_1 = require('mongoose');
const modulesSchema = new mongoose_1.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    moduleName: {
      type: String,
      required: true,
    },
    courseId: {
      type: mongoose_1.Schema.Types.ObjectId,
      required: true,
      ref: 'course',
    },
    batchId: {
      type: mongoose_1.Schema.Types.ObjectId,
      required: true,
      ref: 'Batch',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
);
exports.Module = (0, mongoose_1.model)('Module', modulesSchema);

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
    notice: {
      type: String,
    },
    lectureVideo: {
      liveLink: {
        type: String,
        required: true,
      },
      videoLink: {
        s3Hoster: {
          type: String,
        },
        vimeoHoster: {
          type: String,
        },
      },
    },
    type: {
      type: String,
      required: true,
    },
    startAt: {
      type: String,
      required: true,
    },
    endsAt: {
      type: String,
      required: true,
    },
    isOptional: {
      type: Boolean,
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
    courseId: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: 'course',
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } },
);
exports.Lecture = (0, mongoose_1.model)('lecture', lectureSchema);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Batch = void 0;
const mongoose_1 = require("mongoose");
const batchSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: [true, 'id is required'],
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'name is required'],
        unique: true,
    },
    thumbnail: {
        type: String,
    },
    description: {
        type: String,
    },
    duration: {
        type: Number,
        required: [true, 'duration is required'],
    },
    startedAt: {
        type: String,
        required: [true, 'startedAt is required'],
    },
    courseId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'course',
        required: [true, 'courseId is required'],
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
});
exports.Batch = (0, mongoose_1.model)('Batch', batchSchema);

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateBatchId = exports.findLastBatchId = void 0;
const batch_models_1 = require("./batch.models");
const findLastBatchId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastBatchId = yield batch_models_1.Batch.findOne().sort({ createdAt: -1 }).lean();
    return (lastBatchId === null || lastBatchId === void 0 ? void 0 : lastBatchId.id)
        ? lastBatchId === null || lastBatchId === void 0 ? void 0 : lastBatchId.id.substring(2)
        : // eslint-disable-next-line no-undefined
            undefined;
});
exports.findLastBatchId = findLastBatchId;
const generateBatchId = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield (0, exports.findLastBatchId)()) || (0).toString().padStart(5, '0');
    //increment by 1
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    incrementedId = `B-${incrementedId}`;
    return incrementedId.toString();
});
exports.generateBatchId = generateBatchId;

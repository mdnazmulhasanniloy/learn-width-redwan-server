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
Object.defineProperty(exports, '__esModule', { value: true });
exports.generateStudentId = exports.findLastStudentId = void 0;
//import { IUser } from './user.interface';
const user_models_1 = require('./user.models');
const findLastStudentId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const lastStudent = yield user_models_1.User.findOne({ role: 'student' })
      .sort({ createdAt: -1 })
      .lean();
    return (
      lastStudent === null || lastStudent === void 0
        ? void 0
        : lastStudent.studentId
    )
      ? lastStudent === null || lastStudent === void 0
        ? void 0
        : lastStudent.studentId.substring(5)
      : // eslint-disable-next-line no-undefined
        undefined;
  });
exports.findLastStudentId = findLastStudentId;
const generateStudentId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const currentId =
      (yield (0, exports.findLastStudentId)()) ||
      (0).toString().padStart(5, '0');
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    incrementedId = `USER-${incrementedId}`;
    return incrementedId.toString();
  });
exports.generateStudentId = generateStudentId;

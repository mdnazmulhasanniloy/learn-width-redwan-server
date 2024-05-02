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
exports.generateModuleId = void 0;
const modules_models_1 = require('./modules.models');
//modules generate id
const findLastModuleId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const lastModuleId = yield modules_models_1.Module.findOne(
      {},
      { id: 1, _id: 0 },
    )
      .sort({ createdAt: -1 })
      .lean();
    // eslint-disable-next-line no-undefined
    return (
      lastModuleId === null || lastModuleId === void 0
        ? void 0
        : lastModuleId.id
    )
      ? lastModuleId.id.substring(2)
      : undefined;
  });
const generateModuleId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const currentId =
      (yield findLastModuleId()) || (0).toString().padStart(5, '0');
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    incrementedId = `M-${incrementedId}`;
    return incrementedId;
  });
exports.generateModuleId = generateModuleId;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleRouter = void 0;
const express_1 = require("express");
const modules_controller_1 = require("./modules.controller");
const modules_validation_1 = require("./modules.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const router = (0, express_1.Router)();
router.post('/create-module', (0, validateRequest_1.default)(modules_validation_1.moduleValidations.createModuleZodSchema), modules_controller_1.ModuleController.createModule);
router.patch('/:id', (0, validateRequest_1.default)(modules_validation_1.moduleValidations.updateModuleZodSchema), modules_controller_1.ModuleController.updateModule);
router.delete('/:id', modules_controller_1.ModuleController.deleteModule);
router.get('/:id', modules_controller_1.ModuleController.getModuleById);
router.get('/', modules_controller_1.ModuleController.getAllModules);
exports.ModuleRouter = router;

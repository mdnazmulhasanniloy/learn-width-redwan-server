"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const router = express_1.default.Router();
router.post('/sign-up', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.signUpZodSchema), auth_controller_1.AuthController.signUp);
router.post('/sign-in', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.signInZodSchema), auth_controller_1.AuthController.signIn);
// router.post('/login-user');
router.post('/sign-out', auth_controller_1.AuthController.signOut);
exports.AuthRoutes = router;
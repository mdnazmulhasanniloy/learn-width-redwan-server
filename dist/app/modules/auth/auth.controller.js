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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const auth_service_1 = require("./auth.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const api_error_1 = __importDefault(require("../../../errors/api.error"));
//sign up  user
const signUp = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req === null || req === void 0 ? void 0 : req.body;
    const result = yield auth_service_1.AuthService.signUp(user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'user created successfully!',
        data: result,
    });
}));
//sign in user
const signIn = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthService.signIn(req.body);
    // (req.session as IUserSession).user = {
    //   id: (result as IUser)._id,
    //   email: (result as IUser).email,
    // }; // Store user data in session
    if (result === null || result === void 0 ? void 0 : result.accessToken) {
        req.cookies('JWT', result.accessToken, { httpOnly: true });
    }
    res.json();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'user login successful',
        data: result,
    });
}));
const signOut = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthService.signOut(req.body.id);
    if ((result === null || result === void 0 ? void 0 : result.loggedInDevice) === null) {
        throw new api_error_1.default(http_status_1.default.BAD_REQUEST, 'sign out filed');
    }
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            throw new api_error_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Internal Server Error');
        }
    });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'user logout successful',
    });
}));
exports.AuthController = {
    signUp,
    signIn,
    signOut,
};

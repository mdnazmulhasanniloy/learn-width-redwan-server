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
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const api_error_1 = __importDefault(require("../../../errors/api.error"));
const user_models_1 = require("../user/user.models");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../config"));
const user_utils_1 = require("../user/user.utils");
//sign up
const signUp = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user.role)
        user.role = 'student';
    if (user.role === 'student') {
        const studentId = yield (0, user_utils_1.generateStudentId)();
        user.studentId = studentId;
    }
    const deviceIdentifier = Math.floor(Math.random() * 1000000);
    if (deviceIdentifier)
        user.loggedInDevice = deviceIdentifier.toString();
    const createdUser = yield user_models_1.User.create(user);
    if (!createdUser) {
        throw new api_error_1.default(400, 'Failed to create');
    }
    const token = jsonwebtoken_1.default.sign({ userId: user._id }, config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.access_token, {
        expiresIn: '3d',
    });
    return Object.assign(Object.assign({}, createdUser._doc), { accessToken: token });
});
//login user
const signIn = (props) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, deviceIdentifier } = props;
    const user = yield user_models_1.User.findOne({ email });
    if (!user) {
        throw new api_error_1.default(http_status_1.default.UNAUTHORIZED, 'your email or password is incorrect');
    }
    const isPasswordMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new api_error_1.default(http_status_1.default.UNAUTHORIZED, 'your email or password is incorrect');
    }
    if (user.loggedInDevice && user.loggedInDevice !== deviceIdentifier) {
        throw new api_error_1.default(http_status_1.default.UNAUTHORIZED, 'User is already logged in from another device');
    }
    const token = jsonwebtoken_1.default.sign({ userId: user._id }, config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.access_token, {
        expiresIn: '3d',
    });
    const userId = user === null || user === void 0 ? void 0 : user._id;
    const result = yield user_models_1.User.findByIdAndUpdate(userId, {
        loggedInDevice: deviceIdentifier,
    });
    return Object.assign(Object.assign({}, result === null || result === void 0 ? void 0 : result._doc), { accessToken: token });
});
//sign out
const signOut = (props) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_models_1.User.findByIdAndUpdate(props, { loggedInDevice: null });
    if (!user) {
        throw new api_error_1.default(http_status_1.default.UNAUTHORIZED, 'Sign out fields');
    }
    return user._doc;
});
exports.AuthService = {
    signUp,
    signIn,
    signOut,
};

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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AuthService = void 0;
const http_status_1 = __importDefault(require('http-status'));
const api_error_1 = __importDefault(require('../../../errors/api.error'));
const user_models_1 = require('../user/user.models');
const bcrypt_1 = __importDefault(require('bcrypt'));
// import jwt from 'jsonwebtoken';
// import config from '../../../config';
const user_utils_1 = require('../user/user.utils');
//sign up
const signUp = user =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (!user.role) user.role = 'student';
    if (user.role === 'student') {
      const studentId = yield (0, user_utils_1.generateStudentId)();
      user.studentId = studentId;
    }
    // const deviceIdentifier = Math.floor(Math.random() * 1000000);
    // if (deviceIdentifier) user.loggedInDevice = deviceIdentifier.toString();
    const createdUser = yield user_models_1.User.create(user);
    if (!createdUser) {
      throw new api_error_1.default(400, 'Failed to create');
    }
    // const token = jwt.sign({ userId: user._id }, config?.access_token as string, {
    //   expiresIn: '3d',
    // });
    return createdUser;
  });
//login user
const signIn = props =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = props;
    const user = yield user_models_1.User.findOne({ email });
    if (!user) {
      throw new api_error_1.default(
        http_status_1.default.UNAUTHORIZED,
        'your email or password is incorrect',
      );
    }
    const isPasswordMatch = yield bcrypt_1.default.compare(
      password,
      user.password,
    );
    if (!isPasswordMatch) {
      throw new api_error_1.default(
        http_status_1.default.UNAUTHORIZED,
        'your email or password is incorrect',
      );
    }
    // if (!user?.isVerified) {
    //   throw new ApiError(httpStatus.UNAUTHORIZED, 'This email is not verified');
    // }
    return user;
    // //login device check
    // if (user.loggedInDevice && user.loggedInDevice !== deviceIdentifier) {
    //   throw new ApiError(
    //     httpStatus.UNAUTHORIZED,
    //     'User is already logged in from another device',
    //   );
    // }
    // //jwt sign
    // const token = jwt.sign({ userId: user._id }, config?.access_token as string, {
    //   expiresIn: '3d',
    // });
    // const userId = user?._id;
    // const result: IUser | null = await User.findByIdAndUpdate(userId, {
    //   loggedInDevice: deviceIdentifier,
    // });
    // return { ...result?._doc, accessToken: token };
  });
//sign out
const signOut = props =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_models_1.User.findByIdAndUpdate(props, {
      loggedInDevice: null,
    });
    if (!user) {
      throw new api_error_1.default(
        http_status_1.default.UNAUTHORIZED,
        'Sign out fields',
      );
    }
    return user._doc;
  });
exports.AuthService = {
  signUp,
  signIn,
  signOut,
};

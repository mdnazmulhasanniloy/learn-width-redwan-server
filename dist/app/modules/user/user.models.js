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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const user_constants_1 = require("./user.constants");
const bcrypt_1 = __importDefault(require("bcrypt"));
// import ApiError from '../../../errors/api.error';
// import httpStatus from 'http-status';
const userSchema = new mongoose_1.Schema({
    studentId: {
        type: String,
        unique: true,
        validate: {
            validator: function (studentId) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = yield exports.User.findOne({ studentId });
                    return !user;
                });
            },
            message: 'student Id must be unique', // Custom error message
        },
    },
    role: {
        type: String,
        enum: ['admin', 'student'],
        default: 'student',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (email) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = yield exports.User.findOne({ email });
                    return !user; // Return true if user doesn't exist (i.e., email is unique)
                });
            },
            message: 'Email address must be unique', // Custom error message
        },
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
    },
    gender: {
        type: String,
        enum: user_constants_1.gender,
    },
    presentAddress: {
        type: {
            country: {
                type: String,
                required: true,
            },
            district: {
                type: String,
                required: true,
            },
            street: {
                type: String,
                required: true,
            },
        },
    },
    permanentAddress: {
        type: {
            country: {
                type: String,
                required: true,
            },
            district: {
                type: String,
                required: true,
            },
            street: {
                type: String,
                required: true,
            },
        },
    },
    education: {
        type: {
            educationLevel: {
                type: String,
                required: true,
            },
            degreeTitle: {
                type: String,
                required: true,
            },
            institute: {
                type: String,
                required: true,
            },
            startDate: {
                type: String,
                required: true,
            },
            endDate: { type: String },
            currentlyStudying: {
                type: Boolean,
                required: true,
            },
        },
    },
    skills: { type: String },
    experience: {
        type: {
            designation: {
                type: String,
                required: true,
            },
            company: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            startDate: {
                type: String,
                required: true,
            },
            endDate: { type: String },
            currentlyWorking: {
                type: Boolean,
                required: true,
            },
        },
    },
    isVerified: {
        type: Boolean,
        default: false,
        required: true,
    },
    userStatus: {
        type: String,
        enum: ['active', 'blocked', 'deleted'],
        default: 'active',
    },
    loggedInDevice: {
        type: String,
        default: null, // Initially no device is logged in
    },
    photoUrl: {
        type: String,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
});
// user password hashing
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.password) {
            try {
                const hashedPassword = yield bcrypt_1.default.hash(this.password, 10);
                this.password = hashedPassword;
            }
            catch (error) {
                next(error);
            }
        }
        else {
            next();
        }
    });
});
exports.User = (0, mongoose_1.model)('User', userSchema);

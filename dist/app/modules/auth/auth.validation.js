"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = exports.signUpZodSchema = void 0;
const z = __importStar(require("zod"));
const user_constants_1 = require("../user/user.constants");
exports.signUpZodSchema = z.object({
    body: z.object({
        name: z.string({ required_error: 'name is required' }),
        email: z.string({ required_error: 'email is required' }).email(),
        password: z.string({ required_error: 'password is required' }),
        role: z.enum([...user_constants_1.userRole]).default('student'),
        isVerified: z
            .boolean({ required_error: 'is verified is required' })
            .default(false),
    }),
});
const signInZodSchema = z.object({
    body: z.object({
        email: z.string({ required_error: 'email is required' }).email(),
        password: z.string({ required_error: 'password is required' }),
        deviceIdentifier: z
            .string({
            required_error: 'device identity is required',
        })
            .optional(),
    }),
});
exports.AuthValidation = {
    signInZodSchema,
    signUpZodSchema: exports.signUpZodSchema,
};

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
exports.deleteFromS3 = exports.uploadToS3 = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const config_1 = __importDefault(require("../../config"));
const api_error_1 = __importDefault(require("../../errors/api.error"));
const http_status_1 = __importDefault(require("http-status"));
const aws_1 = require("../../constants/aws");
const uploadToS3 = (_a) => __awaiter(void 0, [_a], void 0, function* (
// eslint-disable-next-line @typescript-eslint/no-explicit-any
{ file, fileName }) {
    const command = new client_s3_1.PutObjectCommand({
        Bucket: config_1.default.aws.bucket,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
    });
    try {
        const key = yield aws_1.s3Client.send(command);
        if (!key) {
            throw new api_error_1.default(http_status_1.default.BAD_REQUEST, 'File Upload failed');
        }
        const url = `https://${config_1.default.aws.bucket}.s3.${config_1.default.aws.region}.amazonaws.com/${fileName}`;
        return url;
    }
    catch (error) {
        throw new api_error_1.default(http_status_1.default.BAD_REQUEST, 'File Upload failed');
    }
});
exports.uploadToS3 = uploadToS3;
//delete file from s3 bucket
const deleteFromS3 = (key) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const command = new client_s3_1.DeleteObjectCommand({
            Bucket: config_1.default.aws.bucket,
            Key: key,
        });
        yield aws_1.s3Client.send(command);
    }
    catch (error) {
        throw new api_error_1.default(http_status_1.default.BAD_REQUEST, 's3 file delete failed');
    }
});
exports.deleteFromS3 = deleteFromS3;

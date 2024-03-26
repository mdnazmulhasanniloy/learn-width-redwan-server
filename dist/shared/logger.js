"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLogger = exports.logger = void 0;
const winston_1 = require("winston");
const config_1 = __importDefault(require("../config"));
const path_1 = __importDefault(require("path"));
const moment_1 = __importDefault(require("moment"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const { combine, timestamp, label, printf,
// prettyPrint
 } = winston_1.format;
// custom logger format
const myFormat = printf(({ level, message, label, timestamp }) => {
    const time = (0, moment_1.default)(timestamp).format('MMMM Do YYYY, h:mm:ss a');
    return `{${time} } [${label}] ${level} ${message} `;
});
const logger = (0, winston_1.createLogger)({
    level: 'info',
    format: combine(label({ label: 'PH' }), timestamp(), myFormat),
    transports: [
        new winston_daily_rotate_file_1.default({
            filename: path_1.default.join(process.cwd(), 'logs', 'winston', 'successes', 'UMS-%DATE%-success.log'),
            datePattern: 'YYYY-DD-MM-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
        }),
    ],
});
exports.logger = logger;
const errorLogger = (0, winston_1.createLogger)({
    level: 'error',
    format: combine(label({ label: 'PH' }), timestamp(), myFormat),
    transports: [
        new winston_daily_rotate_file_1.default({
            filename: path_1.default.join(process.cwd(), 'logs', 'winston', 'errors', 'UMS-%DATE%-error.log'),
            datePattern: 'YYYY-DD-MM-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '1d',
        }),
    ],
});
exports.errorLogger = errorLogger;
if ((config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.nod_env) !== 'production') {
    logger.add(new winston_1.transports.Console({
        format: combine(label({ label: 'UMS' }), timestamp(), myFormat),
    }));
}

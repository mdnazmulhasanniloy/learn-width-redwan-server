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
const express_1 = __importDefault(require('express'));
const cors_1 = __importDefault(require('cors'));
const globalErrorHandler_1 = __importDefault(
  require('./middlewares/globalErrorHandler'),
);
const routs_1 = __importDefault(require('./app/routs'));
const http_status_1 = __importDefault(require('http-status'));
const app = (0, express_1.default)();
app.use(
  (0, cors_1.default)({
    credentials: true,
    origin: 'http://localhost:3000',
  }),
);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/v1/', routs_1.default);
app.get('/', (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      res.send(`simple server is running`);
    } catch (error) {
      next(error);
    }
  }),
);
//test
app.post('/ipn', (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      // const data = req.body;
      console.log('Received IPN notification:', req.body);
      res.status(200);
    } catch (error) {
      next(error);
    }
  }),
);
// rout not found!
app.use((req, res, next) => {
  res.status(http_status_1.default.NOT_FOUND).json({
    status: http_status_1.default.NOT_FOUND,
    success: false,
    message: 'Not Found!',
    errorMessages: [
      {
        path: req === null || req === void 0 ? void 0 : req.originalUrl,
        message: `Api not found!`,
      },
    ],
  });
  next();
});
//middlewares
app.use(globalErrorHandler_1.default);
exports.default = app;

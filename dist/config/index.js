'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const dotenv_1 = __importDefault(require('dotenv'));
const path_1 = __importDefault(require('path'));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
const ssl = {
  store_id: process.env.STORE_ID,
  store_passwd: process.env.STORE_PASSWORD,
  is_live: process.env.IS_LIVE,
  url: process.env.STORE_URL,
};
const aws = {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  bucket: process.env.AWS_BUCKET_NAME,
};
exports.default = {
  port: process.env.PORT || 2000,
  mongo_uri: process.env.DB_URL || 'mongodb://localhost:27017/test',
  default_user_pass: process.env.DEFAULT_USER_FASS,
  nod_env: process.env.NODE_ENV,
  access_token: process.env.ACCESS_TOKEN,
  ssl,
  aws,
};

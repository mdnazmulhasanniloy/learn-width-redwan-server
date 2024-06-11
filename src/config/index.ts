import dotenv from 'dotenv';
import Path from 'path';
dotenv.config({ path: Path.join(process.cwd(), '.env') });
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

const origin = {
  local_origin: process.env.LOCAL_ORIGIN,
  live_origin: process.env.LIVE_ORIGIN,
};

export default {
  port: process.env.PORT || 2000,
  mongo_uri: process.env.DB_URL || 'mongodb://localhost:27017/test',
  default_user_pass: process.env.DEFAULT_USER_FASS,
  node_env: process.env.NODE_ENV,
  access_token: process.env.ACCESS_TOKEN,
  access_token_expires: process.env.ACCESS_TOKEN_EXPIRES,
  refers_token: process.env.REFERS_TOKEN,
  refers_token_expires: process.env.REFERS_TOKEN_EXPIRES,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  ssl,
  aws,
  origin,
  nodemailer_host_email: process.env.NODEMAILER_HOST_EMAIL,
  nodemailer_host_pass: process.env.NODEMAILER_HOST_PASS,
  secret_key1: process.env.SECRET_KEY1,
  secret_key2: process.env.SECRET_KEY2,
};

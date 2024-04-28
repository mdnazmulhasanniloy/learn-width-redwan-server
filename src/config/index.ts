import dotenv from 'dotenv';
import Path from 'path';
dotenv.config({ path: Path.join(process.cwd(), '.env') });
const ssl = {
  store_id: process.env.STORE_ID,
  store_passwd: process.env.STORE_PASSWORD,
  is_live: process.env.IS_LIVE,
  url: process.env.STORE_URL,
};
export default {
  port: process.env.PORT || 2000,
  mongo_uri: process.env.DB_URL || 'mongodb://localhost:27017/test',
  default_user_pass: process.env.DEFAULT_USER_FASS,
  nod_env: process.env.NODE_ENV,
  access_token: process.env.ACCESS_TOKEN,
  ssl,
};

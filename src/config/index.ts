import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join((process.cwd(), '.env')),
});

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_uri: process.env.DATABASE_URI,
  default_password: process.env.DEFAULT_PASSWORD,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
};

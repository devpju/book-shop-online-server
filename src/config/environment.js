import dotenv from 'dotenv';

dotenv.config();

export const env = {
  SERVER_PORT: process.env.SERVER_PORT,
  CLIENT_PORT: process.env.CLIENT_PORT,
  HOST: process.env.HOST,

  ACCESS_TOKEN_SECRET_KEY: process.env.ACCESS_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY: process.env.REFRESH_TOKEN_SECRET_KEY,
  RESET_PASSWORD_TOKEN_SECRET_KEY: process.env.RESET_PASSWORD_TOKEN_SECRET_KEY,

  NODE_ENV: process.env.NODE_ENV || 'development',

  NODE_MAILER_SENDER: process.env.NODE_MAILER_SENDER,
  NODE_MAILER_SENDER_PASSWORD: process.env.NODE_MAILER_SENDER_PASSWORD,

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,

  MONGO_DB_URI: process.env.MONGO_DB_URI
};

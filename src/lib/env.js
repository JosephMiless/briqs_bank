import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: process.env.PORT,
  db_url: process.env.DATABASE_URL,
  a_secret: process.env.JWT_SECRET,
  apiKey: process.env.API_KEY,
  nodeEnv: process.env.NODE_ENV,
};
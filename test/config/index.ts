import * as dotenv from 'dotenv';

dotenv.config();

export const testConfig = {
  baseURL: process.env.APP_URL,
};

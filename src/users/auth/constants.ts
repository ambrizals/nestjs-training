import * as dotenv from 'dotenv';

dotenv.config();

export const jwtConstant = {
  secret: process.env.JWT_KEY,
};

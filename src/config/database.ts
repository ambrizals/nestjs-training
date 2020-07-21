import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

dotenv.config();

@Injectable()
export class databaseConfig implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    switch (process.env.NODE_ENV) {
      case 'testing':
        return {
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: process.env.DB_USER,
          database: process.env.DB_NAME_TESTING,
          password: process.env.DB_PASSWORD,
          entities: ['dist/entities/*{.ts,.js}'],
          synchronize: true,
        };

      default:
        return {
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: process.env.DB_USER,
          database: process.env.DB_NAME,
          password: process.env.DB_PASSWORD,
          entities: ['dist/entities/*{.ts,.js}'],
          synchronize: true,
        };
    }
  }
}

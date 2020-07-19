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
          type: 'sqlite',
          database: 'data/nestjs.sqlite',
          entities: ['dist/entities/*{.ts,.js}'],
          synchronize: true,
        };

      default:
        return {
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          database: 'sitemanager_v5',
          password: 'Sabunkuada5',
          entities: ['dist/entities/*{.ts,.js}'],
          synchronize: true,
        };
    }
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './config/database';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: databaseConfig,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}

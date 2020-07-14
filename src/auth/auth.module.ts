import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthEntity } from './auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AuthEntity])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { UsersEntity } from './users.entity';

// Type ORM
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users.service';
import { AuthController } from './auth/auth.controller';
import { UsersController } from './users.controller';
import { ValidationService } from './validation/validation.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  providers: [AuthService, UsersService, ValidationService],
  controllers: [AuthController, UsersController],
})
export class UsersModule {}

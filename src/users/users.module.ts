import { Module } from '@nestjs/common';
import { UsersEntity } from './users.entity';

// Type ORM
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users.service';
import { AuthController } from './auth/auth.controller';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  providers: [AuthService, UsersService],
  controllers: [AuthController, UsersController],
})
export class UsersModule {}

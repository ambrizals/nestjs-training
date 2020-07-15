import { Module } from '@nestjs/common';
import { UsersEntity } from './users.entity';

// Type ORM
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ValidationService } from './validation/validation.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity]), AuthModule],
  providers: [UsersService, ValidationService],
  controllers: [UsersController],
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '../../entities/users';
import { AuthService } from './auth.service';
import { ValidationService } from './validation/validation.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstant } from './constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstant.secret,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  providers: [AuthService, ValidationService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}

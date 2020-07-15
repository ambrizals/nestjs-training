import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
// import { responseDto } from 'src/dto/responseDto';
import { ValidationService } from '../auth/validation/validation.service';
import { createAuthDto } from './dto/createAuthDto';
import { JwtService } from '@nestjs/jwt';
import { responseDto } from 'src/dto/responseDto';
// import { responseDto } from 'src/dto/responseDto';

@Injectable()
export class AuthService {
  constructor(
    private validationService: ValidationService,
    private jwtService: JwtService,
  ) {}

  async create(loginValue: createAuthDto): Promise<responseDto> {
    try {
      const payload = await this.validationService.checkAuth(
        loginValue.email,
        loginValue.password,
      );
      return {
        status: 200,
        message: {
          access_token: this.jwtService.sign(payload),
          info: 'Login is successfull !',
        },
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

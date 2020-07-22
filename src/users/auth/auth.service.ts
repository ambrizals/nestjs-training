import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { ValidationService } from '../auth/validation/validation.service';
import { createAuthDto } from './dto/createAuthDto';
import { JwtService } from '@nestjs/jwt';
import { responseDto } from 'src/dto/responseDto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/entities/users';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { jwtConstant } from './constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
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
        statusCode: 200,
        response: {
          payload: this.jwtService.sign(payload),
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

  async findOne(id: number): Promise<UsersEntity> {
    return this.userRepository.findOne(id);
  }

  async validate(id: number): Promise<any> {
    try {
      const data = await this.findOne(id);
      if (data) return true;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Anda tidak memiliki ijin',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async getUser(token: string): Promise<any> {
    const data: any = await jwt.verify(token.substr(7), jwtConstant.secret);
    return this.findOne(data.id);
  }
}

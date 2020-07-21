import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../entities/users';
import { Repository } from 'typeorm';
import { CreateUsersDto } from './dto/createUsers';
import { ModifyUsersDto } from './dto/modifyUsers';
import { modifyPasswordDto } from './dto/modifyPassword';
import * as bcrypt from 'bcrypt';
import { responseDto } from 'src/dto/responseDto';
import { ValidationService } from './validation/validation.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
    private validationService: ValidationService,
  ) {}

  // Main Query

  findAll(): Promise<UsersEntity[]> {
    return this.userRepository.find();
  }

  async create(userData: CreateUsersDto): Promise<responseDto> {
    try {
      await this.validationService.duplicate(userData.name, userData.email);
      const user = new UsersEntity();
      user.name = userData.name;
      user.email = userData.email;
      user.password = userData.password;
      user.status = true;
      const data = await this.userRepository.save(user);

      return {
        statusCode: HttpStatus.OK,
        response: {
          info: 'User is created',
          payload: data,
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

  async updateData(userData: ModifyUsersDto, id: number): Promise<responseDto> {
    try {
      await this.validationService.duplicate(userData.fullname, userData.mail);
      const user = await this.userRepository.findOne(id);

      user.name = userData.fullname;
      user.email = userData.mail;
      await this.userRepository.save(user);
      return {
        statusCode: HttpStatus.OK,
        message: 'Data is updated !',
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

  async changeState(id: number): Promise<responseDto> {
    const user = await this.userRepository.findOne(id);
    user.status = !user.status;
    await this.userRepository.save(user);

    return {
      statusCode: HttpStatus.OK,
      message: 'User state has changed !',
    };
  }

  async updatePassword(
    userData: modifyPasswordDto,
    id: number,
  ): Promise<responseDto> {
    const user = await this.userRepository.findOne(id);
    if (userData.newPassword == userData.confirmPassword) {
      user.password = await bcrypt.hash(userData.confirmPassword, 10);
      await this.userRepository.save(user);
      return {
        statusCode: HttpStatus.OK,
        message: 'User password has changed !',
      };
    } else {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Password and Confirmation Password is not same !',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteUsers(id: number): Promise<responseDto> {
    try {
      const user = await this.userRepository.findOne(id);
      await this.userRepository.remove(user);
      return {
        statusCode: HttpStatus.OK,
        message: 'User has deleted !',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

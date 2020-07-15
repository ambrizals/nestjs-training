import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
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

  // Query Validation

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
      await this.userRepository.save(user);

      return {
        status: HttpStatus.OK,
        message: 'Data is created !',
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

  async updateData(userData: ModifyUsersDto, id: number): Promise<UsersEntity> {
    try {
      await this.validationService.duplicate(userData.name, userData.email);
      const user = await this.userRepository.findOne(id);
      user.name = userData.name;
      user.email = userData.email;
      return await this.userRepository.save(user);
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

  async changeState(id: number): Promise<UsersEntity> {
    const user = await this.userRepository.findOne(id);
    user.status = !user.status;
    return await this.userRepository.save(user);
  }

  async updatePassword(
    userData: modifyPasswordDto,
    id: number,
  ): Promise<UsersEntity> {
    const user = await this.userRepository.findOne(id);
    if (userData.newPassword == userData.confirmPassword) {
      user.password = await bcrypt.hash(userData.confirmPassword, 10);
      return await this.userRepository.save(user);
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
}

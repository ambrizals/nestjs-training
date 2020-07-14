import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUsersDto } from './dto/createUsers';
import { ModifyUsersDto } from './dto/modifyUsers';
import { modifyPasswordDto } from './dto/modifyPassword';
import * as bcrypt from 'bcrypt';
import { responseDto } from 'src/dto/responseDto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
  ) {}

  // Query Validation
  async checkDuplicate(fullname: string, mail: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { name: fullname, email: mail },
    });
    if (user) {
      return Promise.reject('exists');
    }
    return Promise.resolve('true');
  }

  // Main Query

  findAll(): Promise<UsersEntity[]> {
    return this.userRepository.find();
  }

  async create(userData: CreateUsersDto): Promise<responseDto> {
    try {
      await this.checkDuplicate(userData.name, userData.email);
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
          error: 'Your user data is already taken!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateData(userData: ModifyUsersDto, id: number): Promise<UsersEntity> {
    const user = await this.userRepository.findOne(id);
    user.name = userData.name;
    user.email = userData.email;
    return await this.userRepository.save(user);
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

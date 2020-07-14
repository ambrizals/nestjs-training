import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUsersDto } from './dto/createUsers';
import { ModifyUsersDto } from './dto/modifyUsers';
import { modifyPasswordDto } from './dto/modifyPassword';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
  ) {}

  // Query Validation
  async checkDuplicate(fullname: string): Promise<boolean> {
    try {
      let user = await this.userRepository.findOne({
        where: { name: fullname },
      });
      console.log(user);
      if (user) {
        console.log('sama');
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Name is already registered !',
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return true;
      }
    } catch (error) {}
  }

  // Main Query

  findAll(): Promise<UsersEntity[]> {
    return this.userRepository.find();
  }

  create(userData: CreateUsersDto): Promise<UsersEntity> {
    this.checkDuplicate(userData.name);
    let user = new UsersEntity();
    user.name = userData.name;
    user.email = userData.email;
    user.password = userData.password;
    user.status = true;
    return this.userRepository.save(user);
  }

  async updateData(userData: ModifyUsersDto, id: number): Promise<UsersEntity> {
    let user = await this.userRepository.findOne(id);
    user.name = userData.name;
    user.email = userData.email;
    return await this.userRepository.save(user);
  }

  async changeState(id: number): Promise<UsersEntity> {
    let user = await this.userRepository.findOne(id);
    user.status = !user.status;
    return await this.userRepository.save(user);
  }

  async updatePassword(
    userData: modifyPasswordDto,
    id: number,
  ): Promise<UsersEntity> {
    let user = await this.userRepository.findOne(id);
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

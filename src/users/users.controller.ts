import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import { CreateUsersDto } from './dto/createUsers';
import { ModifyUsersDto } from './dto/modifyUsers';
import { modifyPasswordDto } from './dto/modifyPassword';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  index(): Promise<UsersEntity[]> {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() user: CreateUsersDto): object {
    this.userService.create(user);
    return {
      status: 200,
      message: 'Data has created !',
    };
  }

  @Put(':id')
  update(@Body() user: ModifyUsersDto, @Param() params): object {
    this.userService.updateData(user, params.id);
    return {
      status: 200,
      message: 'Profile has updated !',
    };
  }

  @Put(':id/password')
  password(@Body() user: modifyPasswordDto, @Param() params): object {
    this.userService.updatePassword(user, params.id);
    return {
      status: 200,
      message: 'Password has changed !',
    };
  }

  @Put(':id/status')
  changeStatus(id): object {
    this.userService.changeState(id);
    return {
      status: 200,
      message: 'User status is changed !',
    };
  }
}

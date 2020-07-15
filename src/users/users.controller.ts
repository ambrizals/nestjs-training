import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import { CreateUsersDto } from './dto/createUsers';
import { ModifyUsersDto } from './dto/modifyUsers';
import { modifyPasswordDto } from './dto/modifyPassword';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { responseDto } from 'src/dto/responseDto';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  index(): Promise<UsersEntity[]> {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() user: CreateUsersDto): Promise<responseDto> {
    return this.userService.create(user);
  }

  @Put(':id')
  update(
    @Body() user: ModifyUsersDto,
    @Param('id') params,
  ): Promise<responseDto> {
    return this.userService.updateData(user, params.id);
  }

  @Put(':id/password')
  password(
    @Body() user: modifyPasswordDto,
    @Param() params,
  ): Promise<responseDto> {
    return this.userService.updatePassword(user, params.id);
  }

  @Put(':id/status')
  changeStatus(id): Promise<responseDto> {
    return this.userService.changeState(id);
  }
}

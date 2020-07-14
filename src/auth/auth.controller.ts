import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthEntity as Auth } from './auth.entity';
import { CreateUserDto } from './dto/createDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  index(): Promise<Auth[]> {
    return this.authService.findAll();
  }

  @Post()
  create(@Body() createUser: CreateUserDto): any {
    return this.authService.create(createUser);
  }
}

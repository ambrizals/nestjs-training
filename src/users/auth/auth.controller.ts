import {
  Controller,
  Body,
  Post,
  Get,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { createAuthDto } from './dto/createAuthDto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  store(@Body() login: createAuthDto): any {
    return this.authService.create(login);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Headers() header: any): any {
    return this.authService.getUser(header.authorization);
  }
}

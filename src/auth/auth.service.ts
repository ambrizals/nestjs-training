import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthEntity } from './auth.entity';
import { CreateUserDto } from './dto/createDto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private authRepository: Repository<AuthEntity>,
  ) {}

  findAll(): Promise<AuthEntity[]> {
    return this.authRepository.find();
  }

  create(createUserDto: CreateUserDto): Promise<AuthEntity> {
    const user = new AuthEntity();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    return this.authRepository.save(user);
  }
}

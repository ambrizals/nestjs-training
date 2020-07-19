import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../../entities/users';
import { Repository } from 'typeorm';

@Injectable()
export class ValidationService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
  ) {}

  async duplicate(fullname: string, mail: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { name: fullname, email: mail },
    });
    if (user) {
      const error = [];
      if (fullname == user.name)
        error.push({
          field: 'fullname',
          message: 'Username is already taken !',
        });
      if (mail == user.email)
        error.push({ field: 'email', message: 'Email is already taken !' });
      return Promise.reject(error);
    }
    return Promise.resolve('true');
  }
}

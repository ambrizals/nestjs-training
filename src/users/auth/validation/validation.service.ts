import { Injectable } from '@nestjs/common';
import { UsersEntity } from '../../../entities/users';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ValidationService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
  ) {}

  async checkAuth(mail: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email: mail } });
    let payload;
    if (user) {
      payload = await bcrypt.compare(password, user.password);
    } else {
      payload = 'EMAIL_NOT_FOUND';
    }

    return new Promise((resolve, reject) => {
      switch (payload) {
        case true:
          resolve({
            id: user.id,
            name: user.name,
            email: user.email,
          });
          break;

        case false:
          reject({
            field: 'password',
            message: 'Your password is not correct !',
          });
          break;

        default:
          reject({
            field: 'email',
            message: 'Your email is not registered !',
          });
          break;
      }
    });
  }
}

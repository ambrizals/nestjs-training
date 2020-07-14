import { MinLength, IsEmail } from 'class-validator';

export class CreateUsersDto {
  @MinLength(3)
  name: string;

  @IsEmail()
  email: string;

  @MinLength(5)
  password: string;
}

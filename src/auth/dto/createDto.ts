import { MinLength, IsEmail } from 'class-validator';

export class CreateUserDto {
  @MinLength(1)
  name: string;

  @IsEmail()
  email: string;

  @MinLength(1)
  password: string;
}

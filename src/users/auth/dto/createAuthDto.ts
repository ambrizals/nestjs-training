import { MinLength, IsEmail } from 'class-validator';

export class createAuthDto {
  @IsEmail()
  @MinLength(3)
  email: string;

  @MinLength(5)
  password: string;
}

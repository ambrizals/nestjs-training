import { MinLength, IsEmail } from 'class-validator';

export class ModifyUsersDto {
  @MinLength(3)
  name: string;

  @IsEmail()
  email: string;
}

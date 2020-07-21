import { MinLength, IsEmail } from 'class-validator';

export class ModifyUsersDto {
  @MinLength(3)
  fullname: string;

  @IsEmail()
  mail: string;
}

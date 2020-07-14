import { MinLength } from 'class-validator';

export class modifyPasswordDto {
  @MinLength(5)
  newPassword: string;

  @MinLength(5)
  confirmPassword: string;
}

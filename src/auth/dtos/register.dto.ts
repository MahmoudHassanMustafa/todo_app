import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { REGEX } from 'src/common/constants';

export class RegisterDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(REGEX.PASSWORD, { message: 'Password is too weak' })
  password: string;
}

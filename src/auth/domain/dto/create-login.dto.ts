import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { LoginInterface } from '../entities';

export class CreateLoginDTO implements LoginInterface {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  passwordUser: string;
}

import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserRoleEnum } from './user-role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => String)
  @IsEnum([UserRoleEnum.ADMIN, UserRoleEnum.USER])
  role: string;
}

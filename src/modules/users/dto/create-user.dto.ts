import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase().trim())
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase().trim())
  lastName: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase().trim())
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  avatar?: string;
}

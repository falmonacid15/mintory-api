import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Ingrese un email valido' })
  @IsNotEmpty({ message: 'Ingrese un email' })
  @IsString({})
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Ingrese su contraseña' })
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsOptional()
  avatar?: string;
}

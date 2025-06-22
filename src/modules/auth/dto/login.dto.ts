import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Ingrese un email valido' })
  @IsNotEmpty({ message: 'Ingrese un email' })
  email: string;

  @IsNotEmpty({ message: 'Ingrese su contraseña' })
  password: string;
}

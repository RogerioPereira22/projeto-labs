import { IsEmail, IsString, MinLength } from 'class-validator';
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  @MinLength(6)
  password: string;
}
export class Hotel extends CreateUserDto {
  @IsString()
  hotelUsuario: string;
}
export class Reserva extends Hotel {
  @IsString()
  reservaUsuario: string;
}

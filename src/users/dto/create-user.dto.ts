import { IsEmail, IsString, MinLength } from 'class-validator';
export class CreateUserDto implements Hotel {
  @IsString()
  reserva: string;
  @IsString()
  hotel: string;
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  @MinLength(6)
  password: string;


}
export class Hotel implements Reserva {
  reserva: string;
  @IsString()
  hotel: string;
}
export class Reserva  {
 
  @IsString()
  reserva: string;
}

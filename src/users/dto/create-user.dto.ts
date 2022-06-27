import { IsEmail, IsString, MinLength } from 'class-validator';
import { Hotel } from '../entities/hotel.entity';
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



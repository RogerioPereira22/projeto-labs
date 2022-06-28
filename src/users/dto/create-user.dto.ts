import { IsEmail, IsString, MinLength } from 'class-validator';
import { Hotel } from '../interfaces/hotel.interfacests';
export class CreateUserDto  {
 
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  @MinLength(6)
  password: string;


}



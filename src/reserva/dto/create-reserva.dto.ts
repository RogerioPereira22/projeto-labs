import { IsDate, IsNumber, IsString } from 'class-validator';
export class CreateReservaDto {
  @IsString()
  hotel: string;
  @IsString()
  guest: string;
  @IsDate()
  checkIn: Date;
  @IsDate()
  checkOut: Date;
  @IsNumber()
  amount: number;
  
}

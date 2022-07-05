import { IsString } from 'class-validator';
export class CreateHotelDto {
  @IsString()
  name: string;
  @IsString()
  hotelId: string;
  @IsString()
  location: [number, number];
  @IsString()
  avalicao?: number;
 
}

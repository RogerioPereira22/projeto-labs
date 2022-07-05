import { IsString } from 'class-validator';
export class CreateHotelDto {
  @IsString()
  hotel: string;
  @IsString()
  placeId: string;
  @IsString()
  location: [number, number];
  @IsString()
  avalicao?: number;
}

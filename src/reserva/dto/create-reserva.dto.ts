import { IsString } from 'class-validator';
export class CreateReservaDto {
  @IsString()
  reserva: string;
}

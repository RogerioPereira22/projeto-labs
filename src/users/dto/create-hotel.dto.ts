import { IsString } from "class-validator"; 
import { Reserva } from "../entities/reserva.entity";
export class CreateHotelDto implements Reserva {
    reserva: string;
    @IsString()
    hotel: string;
  }
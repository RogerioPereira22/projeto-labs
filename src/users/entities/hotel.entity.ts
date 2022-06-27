import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString } from 'class-validator';
import { Document } from 'mongoose';
import { Reserva } from './reserva.entity';

export type HotelDocument = Hotel & Document;
@Schema()
export class Hotel implements Reserva {
  @IsString()
  reserva: string;
  @IsString()
  hotel: string;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);

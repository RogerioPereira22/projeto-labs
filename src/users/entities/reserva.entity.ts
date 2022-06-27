import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReservaDocument = Reserva & Document;
@Schema()
export class Reserva {
  @Prop()
  reserva: string;
}

export const  ReservaSchema = SchemaFactory.createForClass(Reserva);

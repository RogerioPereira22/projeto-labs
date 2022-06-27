import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = Reserva & Document;
@Schema()
export class Reserva {
  @Prop()
  reserva: string;
}

export const UserSchema = SchemaFactory.createForClass(Reserva);

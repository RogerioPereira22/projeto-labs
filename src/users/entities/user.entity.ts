import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Hotel } from './hotel.entity';

export type UserDocument = User & Document;
@Schema()
export class User implements Hotel {
  reserva: string;
  hotel: string;
  @Prop()
  name: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop()
  name: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
}
export class Hotel extends User {
  @Prop()
  hotelUsuario: string;
}

export class Reserva extends Hotel {
  @Prop()
  reservaUsuario: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

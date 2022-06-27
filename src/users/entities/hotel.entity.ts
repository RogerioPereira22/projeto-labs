import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString } from 'class-validator';
import { Document } from 'mongoose';

export type UserDocument = Hotel & Document;
@Schema()
export class Hotel {
  @IsString()
  reserva: string;
  @IsString()
  hotel: string;
}

export const UserSchema = SchemaFactory.createForClass(Hotel);

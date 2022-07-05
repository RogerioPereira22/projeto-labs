import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import mongoose, { Document } from 'mongoose';
import { ReservasDataObject } from '../objects';

export type ReservaDocument = Reserva &
  Document & {
    plainToInstance: () => ReservasDataObject;
    timestamp: Date;
  };

@Schema()
export class Reserva {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
  })
  hotel: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guest',
  })
  guest: string;

  @Prop({ type: Date, required: true })
  checkIn: Date;

  @Prop({ type: Date, required: true })
  checkOut: Date;

  @Prop({
    required: true,
  })
  amount: number;
}

export const ReservaSchema = SchemaFactory.createForClass(Reserva);

ReservaSchema.index({ hotel: 1 });
ReservaSchema.index({ checkIn: 1 });
ReservaSchema.index({ checkOut: 1 });

ReservaSchema.method('plainToInstance', function () {
  return plainToInstance(ReservasDataObject, this.toObject());
});

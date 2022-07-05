import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Document } from 'mongoose';
import { HotelDataObject } from '../object/hotel.object';

export type HotelDocument = Hotel &
  Document & {
    plainToInstance: () => HotelDataObject;
    timestamp: Date;
  };

@Schema()
export class Hotel {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  hotelId: string;

  @Prop({
    required: true,
  })
  location: number[];

  @Prop()
  rating: number;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);

HotelSchema.index({ hotelId: 'text' });
HotelSchema.index({ location: '2dsphere' });

HotelSchema.method('plainToInstance', function () {
  return plainToInstance(HotelDataObject, this.toObject());
});

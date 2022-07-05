import { Module } from '@nestjs/common';
import { HotelService } from '../service/hotel.service';
import { HotelController } from '../controller/hotel.controller';
import { GoogleMapsModule } from 'src/config/google-maps';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservaModule } from 'src/reserva';
import { UsersModule } from 'src/users';
import { Hotel, HotelSchema } from '../schema/hotel.schema';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Hotel.name, schema: HotelSchema }]),
    GoogleMapsModule,
    ReservaModule,
    UsersModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
  ],
  controllers: [HotelController],
  providers: [HotelService],
})
export class HotelModule {}

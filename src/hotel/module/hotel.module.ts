import { Module } from '@nestjs/common';
import { HotelService } from '../service/hotel.service';
import { HotelController } from '../controller/hotel.controller';
import { DatabaseModule } from 'src/database/database.module';
import { GoogleMapsModule } from 'src/config/google-maps';


@Module({
  imports: [imports: [
    MongooseModule.forFeature([{ name: Hotel.name, schema: HotelSchema }]),
    GoogleMapsModule,
    ReservasModule,
    GuestModule,
  ],],
  controllers: [HotelController],
  providers: [HotelService],
})
export class HotelModule {}

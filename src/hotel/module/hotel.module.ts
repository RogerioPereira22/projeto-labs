import { Module } from '@nestjs/common';
import { HotelService } from '../service/hotel.service';
import { HotelController } from '../controller/hotel.controller';
import { DatabaseModule } from 'src/database/database.module';
import { hotelProviders } from '../provider/hotel.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [HotelController],
  providers: [HotelService, ...hotelProviders],
})
export class HotelModule {}

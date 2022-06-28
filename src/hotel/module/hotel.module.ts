import { Module } from '@nestjs/common';
import { HotelService } from '../service/hotel.service';
import { HotelController } from '../controller/hotel.controller';

@Module({
  controllers: [HotelController],
  providers: [HotelService]
})
export class HotelModule {}

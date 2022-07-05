import { Module } from '@nestjs/common';
import { HotelService } from '../service/hotel.service';
import { HotelController } from '../controller/hotel.controller';
import { DatabaseModule } from 'src/database/database.module';


@Module({
  imports: [DatabaseModule],
  controllers: [HotelController],
  providers: [HotelService],
})
export class HotelModule {}

import { Module } from '@nestjs/common';
import { HotelService } from '../service/hotel.service';
import { HotelController } from '../controller/hotel.controller';
import { RouterModule } from '@nestjs/core';
import { ReservaModule } from 'src/reserva/module/reserva.module';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'hotel',
        module: HotelModule,
        children: [
          {
            path: 'reserva',
            module: ReservaModule,
          },
        ],
      },
    ]),
  ],
  controllers: [HotelController],
  providers: [HotelService],
})
export class HotelModule {}

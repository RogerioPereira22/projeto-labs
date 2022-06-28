import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/module/users.module';
import { HotelModule } from './hotel/module/hotel.module';
import { ReservaModule } from './reserva/reserva.module';

@Module({
  imports: [UsersModule, HotelModule, ReservaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

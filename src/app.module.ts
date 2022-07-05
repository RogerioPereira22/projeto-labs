import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelModule } from './hotel/module/hotel.module';
import { AppConfigModule, AppConfigService } from './config';
import { GoogleMapsModule } from './config/google-maps';
import { ReservaModule } from './reserva';
import { UsersModule } from './users';

@Module({
  imports: [
    AppConfigModule,
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (config: AppConfigService) => config.mongoDBOptions,
    }),
    GoogleMapsModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: async (config: AppConfigService) => config.googleMapsOptions,
    }),
    HotelModule,
    ReservaModule,
    UsersModule,
  ],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from 'src/database/database.module';
import { RouterModule } from '@nestjs/core';
import { UsersModule } from 'src/users/module/users.module';
import { HotelModule } from 'src/hotel/module/hotel.module';
import { ReservaModule } from 'src/reserva/module/reserva.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule,ConfigService } from '@nestjs/config';
import Configuration from './config/configuration';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigurationKeys } from './config/configuration.keys'


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [Configuration]
      }), 
      ThrottlerModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          ttl: config.get<number>(ConfigurationKeys.THROTTLE_TTL),
          limit: config.get<number>(ConfigurationKeys.THROTTLE_LIMIT),
        }),
      }),
    RouterModule.register([
      {
        path: 'user',
        module: UsersModule,
        children: [
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
        ],
      },
    ]),
    DatabaseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

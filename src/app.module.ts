import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from 'src/database/database.module';
import { RouterModule } from '@nestjs/core';
import { UsersModule } from 'src/users/module/users.module';
import { HotelModule } from 'src/hotel/module/hotel.module';
import { ReservaModule } from 'src/reserva/module/reserva.module';

@Module({
  imports: [
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

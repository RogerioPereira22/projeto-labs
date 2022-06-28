import { Module } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { UsersController } from '../controller/users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { RouterModule } from '@nestjs/core';
import { HotelModule } from 'src/hotel/module/hotel.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

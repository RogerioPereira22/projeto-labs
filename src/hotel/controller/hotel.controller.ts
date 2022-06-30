import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HotelService } from '../service/hotel.service';
import { CreateHotelDto } from '../dto/create-hotel.dto';
import { UpdateHotelDto } from '../dto/update-hotel.dto';
import { ConfigurationKeys } from 'src/config/configuration.keys';

@Controller(ConfigurationKeys.hotel)
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Post()
  create(@Body() createHotelDto: CreateHotelDto) {
    return this.hotelService.create(createHotelDto);
  }

  @Get()
  findAll() {
    return this.hotelService.findAll();
  }

  @Get(ConfigurationKeys.id1)
  findOne(@Param(ConfigurationKeys.id) id: string) {
    return this.hotelService.findOne(id);
  }

  @Patch(ConfigurationKeys.id1)
  update(@Param(ConfigurationKeys.id) id: string, @Body() updateHotelDto: UpdateHotelDto) {
    return this.hotelService.update(id, updateHotelDto);
  }

  @Delete(ConfigurationKeys.id1)
  remove(@Param(ConfigurationKeys.id) id: string) {
    return this.hotelService.remove(id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { HotelService } from '../service/hotel.service';
import { CreateHotelDto } from '../dto/create-hotel.dto';
import { UpdateHotelDto } from '../dto/update-hotel.dto';
import { ConfigurationKeys } from 'src/config/configuration.keys';

@Controller(ConfigurationKeys.hotel)
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Post()
  create(@Body() createHotelDto: CreateHotelDto) {
    try{
    return this.hotelService.create(createHotelDto);
    }
    catch(error){
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  findAll() {
    try {
       return this.hotelService.findAll();
    }  catch(error){
      throw new BadRequestException(error.message);
    }
   
  }

  @Get(ConfigurationKeys.id1)
  findOne(@Param(ConfigurationKeys.id) id: string) {
    try{
    return this.hotelService.findOne(id);
    }
    catch(error){
      throw new BadRequestException(error.message);
    }
  }

  @Patch(ConfigurationKeys.id1)
  update(@Param(ConfigurationKeys.id) id: string, @Body() updateHotelDto: UpdateHotelDto) {
    try{
    return this.hotelService.update(id, updateHotelDto);
    }
    catch(error){
      throw new BadRequestException(error.message);
    }
  }

  @Delete(ConfigurationKeys.id1)
  remove(@Param(ConfigurationKeys.id) id: string) {
    try{
    return this.hotelService.remove(id);
    }
    catch(error){
      throw new BadRequestException(error.message);
    }
  }
}

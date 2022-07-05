import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ReservaService } from 'src/reserva';
import { MapsService } from 'src/config/google-maps'; 
import { CreateInputEntrada } from '../entrada/created.reservabyuser'; 
import { HotelService } from '../service/hotel.service';
import { ApiBody, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { UsersService } from 'src/users';
import { HotelGuard } from '../guards/hotel.guard';
import { QueryRequired } from '../decorators'; 

@Controller()
export class HotelController {
  constructor(
    private readonly hotelsService: HotelService,
    private readonly mapsService: MapsService,
    private readonly reservaService: ReservaService,
    private readonly usersService: UsersService,
  ) {}

  @Post('hotels')
  @ApiOperation({
    operationId: 'AddHotels',
    summary: 'Add nearby hotels based on location',
    description: 'Search hotels from google maps api and add to DB.',
  })
  @ApiQuery({
    name: 'latitude',
    type: Number,
    example: 48.130323,
    description: 'latitude',
  })
  @ApiQuery({
    name: 'longitude',
    type: Number,
    example: 11.576362,
    description: 'longitude',
  })
  async addHotels(
    @QueryRequired('latitude') latitude: number,
    @QueryRequired('longitude') longitude: number,
  ) {
    const hotelsInfo = await this.mapsService.getHotels(
      latitude,
      longitude,
    );

    return Promise.all(
      hotelsInfo.map((hotel) => this.hotelsService.upsertByPlaceId(hotel)),
    );
  }

  @Get('hotels')
  @ApiOperation({
    operationId: 'GetHotels',
    summary: 'Retrieve nearby hotels based on location',
    description: 'Search nearby hotels based on location from the DB.',
  })
  @ApiQuery({
    name: 'latitude',
    type: Number,
    example: 48.130323,
    description: 'latitude',
  })
  @ApiQuery({
    name: 'longitude',
    type: Number,
    example: 11.576362,
    description: 'longitude',
  })
  async getHotels(
    @QueryRequired('latitude') latitude: number,
    @QueryRequired('longitude') longitude: number,
  ) {
    return this.hotelsService.findAll({
      longitude,
      latitude,
    });
  }

  @Get('hotel/:hotelId/reservas')
  @UseGuards(HotelGuard)
  @ApiOperation({
    operationId: 'GetHotelReservas',
    summary: 'Retrieve hotel booking',
    description: 'get all bookings of particular hotel by hotelId.',
  })
  async getHotelBookings(@Param('hotelId') hotelId: string) {
    return this.reservaService.get(hotelId);
  }

  @Post('hotel/:hotelId/reserva')
  @UseGuards(HotelGuard)
  @ApiOperation({
    operationId: 'ReservaHotel',
    summary: 'Book hotel for guest',
    description: 'Book hotel for specific days for specifc guest.',
  })
  @ApiBody({ type: CreateInputEntrada })
  async bookHotel(
    @Param('hotelId') hotelId: string,
    @Body() createInputEntrada: CreateInputEntrada,
  ) {
    const { name, email, phoneNumber,password } = createInputEntrada;
    const guest = await this.usersService.upsert({
      name,
      email,
      phoneNumber,
      password
      
    });

    const { checkIn, checkOut, amount } = createInputEntrada;
    return this.reservaService.create({
      hotel: hotelId,
      guest: guest.id,
      checkIn,
      checkOut,
      amount,
    });
  }
}

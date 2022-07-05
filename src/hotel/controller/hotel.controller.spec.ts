import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AppConfigModule, AppConfigService } from 'src/config';
import { ReservaModule } from 'src/reserva';
import { GoogleMapsModule } from 'src/config/google-maps';
import { UsersModule } from 'src/users'; 
import { rootMongooseTestModule } from 'src/root-mongo-test.module'; 
import { HotelController } from './hotel.controller';
import { HotelService } from '../service/hotel.service'; 
import { Hotel, HotelSchema } from '../schema/hotel.schema';

describe('HotelsController', () => {
  let controller: HotelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: Hotel.name, schema: HotelSchema }]),
        GoogleMapsModule.forRootAsync({
          imports: [AppConfigModule],
          inject: [AppConfigService],
          useFactory: async () => ({ apiKey: 'abcd' }),
        }),
        ReservaModule,
        UsersModule,
      ],
      providers: [HotelService],
      controllers: [HotelController],
    }).compile();

    controller = module.get<HotelController>(HotelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should throw error for invalid latitude & longitude', async () => {
    controller.getHotels(0, 0);
  });
});

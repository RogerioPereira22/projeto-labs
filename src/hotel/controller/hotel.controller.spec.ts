import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationKeys } from 'src/config/configuration.keys';
import { HotelService } from '../service/hotel.service';
import { HotelController } from './hotel.controller';
 

describe(ConfigurationKeys.HotelController, () => {
  let controller: HotelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HotelController],
      providers: [HotelService],
    }).compile();

    controller = module.get<HotelController>(HotelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

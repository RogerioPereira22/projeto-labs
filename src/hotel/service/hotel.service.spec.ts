import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationKeys } from 'src/config/configuration.keys';
import { HotelService } from './hotel.service';

describe(ConfigurationKeys.HotelService, () => {
  let service: HotelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HotelService],
    }).compile();

    service = module.get<HotelService>(HotelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationKeys } from 'src/config/configuration.keys';
import { ReservaService } from './reserva.service';

describe(ConfigurationKeys.ReservaService, () => {
  let service: ReservaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservaService],
    }).compile();

    service = module.get<ReservaService>(ReservaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

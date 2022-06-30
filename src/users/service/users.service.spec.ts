import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationKeys } from 'src/config/configuration.keys';
import { UsersService } from './users.service';

describe(ConfigurationKeys.UsersService, () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

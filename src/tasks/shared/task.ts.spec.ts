import { Test, TestingModule } from '@nestjs/testing';
import { TaskTs } from './task.ts';

describe('TaskTs', () => {
  let provider: TaskTs;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskTs],
    }).compile();

    provider = module.get<TaskTs>(TaskTs);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});

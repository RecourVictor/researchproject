import { Test, TestingModule } from '@nestjs/testing';
import { DisiplinesService } from './disiplines.service';

describe('DisiplinesService', () => {
  let service: DisiplinesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DisiplinesService],
    }).compile();

    service = module.get<DisiplinesService>(DisiplinesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

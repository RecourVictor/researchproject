import { Test, TestingModule } from '@nestjs/testing';
import { DisiplinesResolver } from './disiplines.resolver';
import { DisiplinesService } from './disiplines.service';

describe('DisiplinesResolver', () => {
  let resolver: DisiplinesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DisiplinesResolver, DisiplinesService],
    }).compile();

    resolver = module.get<DisiplinesResolver>(DisiplinesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { AthletesResolver } from './athletes.resolver';
import { AthletesService } from './athletes.service';

describe('AthletesResolver', () => {
  let resolver: AthletesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AthletesResolver, AthletesService],
    }).compile();

    resolver = module.get<AthletesResolver>(AthletesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

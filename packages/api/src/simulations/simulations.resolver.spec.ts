import { Test, TestingModule } from '@nestjs/testing';
import { SimulationsResolver } from './simulations.resolver';
import { SimulationsService } from './simulations.service';

describe('SimulationsResolver', () => {
  let resolver: SimulationsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SimulationsResolver, SimulationsService],
    }).compile();

    resolver = module.get<SimulationsResolver>(SimulationsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

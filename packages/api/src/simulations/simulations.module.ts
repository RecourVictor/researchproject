import { Module } from '@nestjs/common';
import { SimulationsService } from './simulations.service';
import { SimulationsResolver } from './simulations.resolver';

@Module({
  providers: [SimulationsResolver, SimulationsService],
})
export class SimulationsModule {}

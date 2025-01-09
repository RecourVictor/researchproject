import { Module } from '@nestjs/common';
import { SimulationsService } from './simulations.service';
import { SimulationsResolver } from './simulations.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Simulation } from './entities/simulation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Simulation])],
  providers: [SimulationsResolver, SimulationsService],
  exports: [SimulationsService],
})
export class SimulationsModule {}

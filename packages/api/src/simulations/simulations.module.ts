import { forwardRef, Module } from '@nestjs/common'
import { SimulationsService } from './simulations.service'
import { SimulationsResolver } from './simulations.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Simulation } from './entities/simulation.entity'
import { AthletesModule } from 'src/athletes/athletes.module'
import { DisiplinesModule } from 'src/disiplines/disiplines.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Simulation]),
    forwardRef(() => AthletesModule),
    forwardRef(() => DisiplinesModule),
  ],
  providers: [SimulationsResolver, SimulationsService],
  exports: [SimulationsService, TypeOrmModule],
})
export class SimulationsModule {}

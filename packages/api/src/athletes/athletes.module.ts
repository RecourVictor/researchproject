import { forwardRef, Module } from '@nestjs/common';
import { AthletesService } from './athletes.service';
import { AthletesResolver } from './athletes.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Athlete } from './entities/athlete.entity';
import { DisiplinesModule } from 'src/disiplines/disiplines.module';
import { CountryModule } from 'src/country/country.module';
import { SimulationsModule } from 'src/simulations/simulations.module';

@Module({
  imports: [TypeOrmModule.forFeature([Athlete]), forwardRef(() => DisiplinesModule), forwardRef(() => CountryModule), SimulationsModule],
  providers: [AthletesResolver, AthletesService],
  exports: [AthletesService, TypeOrmModule],
})
export class AthletesModule {}

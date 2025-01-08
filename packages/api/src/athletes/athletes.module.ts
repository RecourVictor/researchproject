import { Module } from '@nestjs/common';
import { AthletesService } from './athletes.service';
import { AthletesResolver } from './athletes.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Athlete } from './entities/athlete.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Athlete])],
  providers: [AthletesResolver, AthletesService],
  exports: [AthletesService],
})
export class AthletesModule {}

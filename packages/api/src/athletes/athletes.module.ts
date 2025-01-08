import { Module } from '@nestjs/common';
import { AthletesService } from './athletes.service';
import { AthletesResolver } from './athletes.resolver';

@Module({
  providers: [AthletesResolver, AthletesService],
})
export class AthletesModule {}

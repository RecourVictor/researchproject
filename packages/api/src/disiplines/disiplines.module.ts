import { Module } from '@nestjs/common';
import { DisiplinesService } from './disiplines.service';
import { DisiplinesResolver } from './disiplines.resolver';

@Module({
  providers: [DisiplinesResolver, DisiplinesService],
})
export class DisiplinesModule {}

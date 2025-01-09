import { Module } from '@nestjs/common';
import { DisiplinesService } from './disiplines.service';
import { DisiplinesResolver } from './disiplines.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Disipline } from './entities/disipline.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Disipline])],
  providers: [DisiplinesResolver, DisiplinesService],
  exports: [DisiplinesService],
})
export class DisiplinesModule {}

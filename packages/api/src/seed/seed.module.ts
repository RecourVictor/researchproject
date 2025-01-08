import { Module } from '@nestjs/common';
import { AthletesModule } from 'src/athletes/athletes.module';
import { CommandModule } from 'nestjs-command'
import { SeedService } from './seed.service';
import { DatabaseSeedCommand } from './seed.command';

@Module({
    imports: [AthletesModule, CommandModule],
    providers: [DatabaseSeedCommand, SeedService],
})
export class SeedModule {}

import { Module } from '@nestjs/common';
import { AthletesModule } from 'src/athletes/athletes.module';
import { CommandModule } from 'nestjs-command'
import { SeedService } from './seed.service';
import { DatabaseSeedCommand } from './seed.command';
import { CountryModule } from 'src/country/country.module';

@Module({
    imports: [CountryModule, AthletesModule, CommandModule],
    providers: [DatabaseSeedCommand, SeedService],
})
export class SeedModule {}

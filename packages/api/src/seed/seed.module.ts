import { Module } from '@nestjs/common'
import { AthletesModule } from 'src/athletes/athletes.module'
import { CommandModule } from 'nestjs-command'
import { SeedService } from './seed.service'
import { DatabaseSeedCommand } from './seed.command'
import { CountryModule } from 'src/country/country.module'
import { DisiplinesModule } from 'src/disiplines/disiplines.module'
import { SettingsModule } from 'src/settings/settings.module'

@Module({
  imports: [CountryModule, AthletesModule, DisiplinesModule, SettingsModule, CommandModule],
  providers: [DatabaseSeedCommand, SeedService],
})
export class SeedModule {}

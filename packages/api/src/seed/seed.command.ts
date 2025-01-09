import { Command } from 'nestjs-command'
import { Injectable } from '@nestjs/common'
import { SeedService } from './seed.service'

@Injectable()
export class DatabaseSeedCommand {
  constructor(private readonly seedService: SeedService) {}

  // Countries
  @Command({
    command: 'seed:database:countries',
    describe: 'Seed the database with countries',
  })
  async seedCountries() {
    console.info('🪺 Start seeding of countries')
    const countries = await this.seedService.addCountriesFromJson()
    console.info(`🐣 ${countries.length} countries are added`)
  }

  @Command({
    command: 'seed:reset:countries',
    describe: 'Delete all data from the countries table',
  })
  async deleteCountries() {
    console.info('🔪 Start deleting countries')
    await this.seedService.deleteAllCountries()
    console.info('🪶 Removed countries')
  }

  // Athletes
  @Command({
    command: 'seed:database:athletes',
    describe: 'Seed the database with athletes',
  })
  async seedAthletes() {
    console.info('🪺 Start seeding of athletes')
    const athletes = await this.seedService.addAthletesFromJson()
    console.info(`🐣 ${athletes.length} athletes are added`)
  }

  @Command({
    command: 'seed:reset:athletes',
    describe: 'Delete all data from the athletes table',
  })
  async deleteAthletes() {
    console.info('🔪 Start deleting athletes')
    await this.seedService.deleteAllAthletes()
    console.info('🪶 Removed athletes')
  }
}

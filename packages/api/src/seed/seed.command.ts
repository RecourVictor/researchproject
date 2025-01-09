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

  // Disiplines
  @Command({
    command: 'seed:database:disiplines',
    describe: 'Seed the database with disiplines',
  })
  async seedDisiplines() {
    console.info('🪺 Start seeding of disiplines')
    const disiplines = await this.seedService.addDisiplinesFromJson()
    console.info(`🐣 ${disiplines.length} disiplines are added`)
  }

  @Command({
    command: 'seed:reset:disiplines',
    describe: 'Delete all data from the disiplines table',
  })
  async deleteDisiplines() {
    console.info('🔪 Start deleting disiplines')
    await this.seedService.deleteAllDisiplines()
    console.info('🪶 Removed disiplines')
  }

  // Settings
  @Command({
    command: 'seed:database:settings',
    describe: 'Seed the database with settings',
  })
  async seedSettings() {
    console.info('🪺 Start seeding of settings')
    const settings = await this.seedService.addSettingsFromJson()
    console.info(`🐣 ${settings.length} settings are added`)
  }

  @Command({
    command: 'seed:reset:settings',
    describe: 'Delete all data from the settings table',
  })
  async deleteSettings() {
    console.info('🔪 Start deleting settings')
    await this.seedService.deleteAllSettings()
    console.info('🪶 Removed settings')
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

  // Simulations
  @Command({
    command: 'seed:database:simulations',
    describe: 'Seed the database with simulations',
  })
  async seedSimulations() {
    console.info('🪺 Start seeding of simulations')
    const simulations = await this.seedService.addSimulationsFromJson()
    console.info(`🐣 ${simulations.length} simulations are added`)
  }

  @Command({
    command: 'seed:reset:simulations',
    describe: 'Delete all data from the simulations table',
  })
  async deleteSimulations() {
    console.info('🔪 Start deleting simulations')
    await this.seedService.deleteAllSimulations()
    console.info('🪶 Removed simulations')
  }
}

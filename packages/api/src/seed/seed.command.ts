import { Command } from 'nestjs-command'
import { Injectable } from '@nestjs/common'
import { SeedService } from './seed.service'

@Injectable()
export class DatabaseSeedCommand {
  constructor(private readonly seedService: SeedService) {}

  @Command({
    command: 'seed:database:athletes',
    describe: 'Seed the database with athletes',
  })
  async seedBirds() {
    console.info('🪺 Start seeding of athletes')
    const athletes = await this.seedService.addAthletesFromJson()
    console.info(`🐣 ${athletes.length} athletes are added`)
  }

  @Command({
    command: 'seed:reset:athletes',
    describe: 'Delete all data from the athletes table',
  })
  async delete() {
    console.info('🔪 Start deleting athletes')
    await this.seedService.deleteAllAthletes()
    console.info('🪶 Removed athletes')
  }
}
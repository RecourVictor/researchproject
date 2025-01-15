import { Injectable } from '@nestjs/common'
import { AthletesService } from 'src/athletes/athletes.service'
import { Athlete, Gender } from 'src/athletes/entities/athlete.entity'
import { CountryService } from 'src/country/country.service'
import { Country } from 'src/country/entities/country.entity'
import { DisiplinesService } from 'src/disiplines/disiplines.service'
import { Disipline } from 'src/disiplines/entities/disipline.entity'
import { SettingsService } from 'src/settings/settings.service'
import { Setting } from 'src/settings/entities/setting.entity'
import { Record } from 'src/athletes/entities/record.entity'
import { SimulationsService } from 'src/simulations/simulations.service'
import { Simulation } from 'src/simulations/entities/simulation.entity'

import * as athletes from './data/athletes.json' // set  "resolveJsonModule": true in tsconfig.json
import * as countries from './data/countries.json' // set  "resolveJsonModule": true in tsconfig.json
import * as disiplines from './data/disiplines.json' // set  "resolveJsonModule": true in tsconfig.json
import * as settings from './data/settings.json' // set  "resolveJsonModule": true in tsconfig.json
import * as simulations from './data/simulations.json' // set  "resolveJsonModule": true in tsconfig.json
import { ObjectId } from 'mongodb'

@Injectable()
export class SeedService {
  constructor(
    private athletesService: AthletesService,
    private countryService: CountryService,
    private disiplineService: DisiplinesService,
    private settingsService: SettingsService,
    private simulationService: SimulationsService,
  ) {}

  //  Countries
  async addCountriesFromJson(): Promise<Country[]> {
    const theCountries: Country[] = []
    for (const country of countries) {
      const c = new Country()
      c.countryName = country.countryName
      c.countryCode = country.countryCode

      theCountries.push(c)
    }

    return this.countryService.saveAll(theCountries)
  }

  async deleteAllCountries(): Promise<void> {
    return this.countryService.truncate()
  }

  //   Disiplines
  async addDisiplinesFromJson(): Promise<Disipline[]> {
    const theDisiplines: Disipline[] = []
    for (const disipline of disiplines) {
      const d = new Disipline()
      d.name = disipline.name
      d.rounds = disipline.rounds

      theDisiplines.push(d)
    }

    return this.disiplineService.saveAll(theDisiplines)
  }

  async deleteAllDisiplines(): Promise<void> {
    return this.disiplineService.truncate()
  }

  //   Settings
  async addSettingsFromJson(): Promise<Setting[]> {
    const theSettings: Setting[] = []
    for (const setting of settings) {
      const s = new Setting()
      s.name = setting.name
      s.value = setting.value

      theSettings.push(s)
    }

    return this.settingsService.saveAll(theSettings)
  }

  async deleteAllSettings(): Promise<void> {
    return this.settingsService.truncate()
  }

  //   Athletes
  async addAthletesFromJson(): Promise<Athlete[]> {
    const theAthletes: Athlete[] = []
    for (const athlete of athletes) {
      const a = new Athlete()
      a.name = athlete.name
      a.surname = athlete.surname
      a.birthDate = new Date(athlete.dateOfBirth)
      a.gender = Gender[athlete.gender]
      const country = await this.countryService.findByCountryCode(
        athlete.nationality,
      )
      a.nationalityId = new ObjectId(country.id)
      a.records = []
      for (const record of athlete.disciplines) {
        const r = new Record()
        const disipline = await this.disiplineService.findByName(record.name)
        r.disciplineId = new ObjectId(disipline.id)
        r.PB = record.personalBest
        a.records.push(r)
      }

      theAthletes.push(a)
    }

    return this.athletesService.saveAll(theAthletes)
  }

  async deleteAllAthletes(): Promise<void> {
    return this.athletesService.truncate()
  }

  //  Simulations
  async addSimulationsFromJson(): Promise<Simulation[]> {
    const theSimulations: Simulation[] = []

    for (const simulation of simulations) {
      const s = new Simulation()
      s.name = simulation.name
      s.athletes = [] // Gebruik het nieuwe 'athletes' veld met gekoppelde objecten en tijden

      // Voeg atleten toe met gekoppelde ID's en tijden
      for (const athlete of simulation.athletes) {
        const a = await this.athletesService.findByName(
          athlete.name,
          athlete.surname,
        )
        if (!a) {
          throw new Error(
            `Athlete ${athlete.name} ${athlete.surname} not found`,
          )
        }

        s.athletes.push({
          athleteId: new ObjectId(a.id),
          time: athlete.time ?? 0, // Tijd koppelen aan ID
        })
      }

      // Koppel de discipline aan de simulatie
      const disipline = await this.disiplineService.findByName(
        simulation.disipline,
      )
      if (!disipline) {
        throw new Error(`Disipline ${simulation.disipline} not found`)
      }
      s.disiplineId = new ObjectId(disipline.id)

      theSimulations.push(s)
    }

    // Sla alle simulaties in één keer op
    return this.simulationService.saveAll(theSimulations)
  }

  async deleteAllSimulations(): Promise<void> {
    return this.simulationService.truncate()
  }
}

import { Injectable } from '@nestjs/common'
import { AthletesService } from 'src/athletes/athletes.service'
import { Athlete } from 'src/athletes/entities/athlete.entity'
import { CountryService } from 'src/country/country.service'
import { Country } from 'src/country/entities/country.entity'
import { DisiplinesService } from 'src/disiplines/disiplines.service'
import { Disipline } from 'src/disiplines/entities/disipline.entity'
import { SettingsService } from 'src/settings/settings.service'
import { Setting } from 'src/settings/entities/setting.entity'

import * as athletes from './data/athletes.json' // set  "resolveJsonModule": true in tsconfig.json
import * as countries from './data/countries.json' // set  "resolveJsonModule": true in tsconfig.json
import * as disiplines from './data/disiplines.json' // set  "resolveJsonModule": true in tsconfig.json
import * as settings from './data/settings.json' // set  "resolveJsonModule": true in tsconfig.json

@Injectable()
export class SeedService {
  constructor(
    private athletesService: AthletesService,
    private countryService: CountryService,
    private disiplineService: DisiplinesService,
    private settingsService: SettingsService
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

      theAthletes.push(a)
    }

    return this.athletesService.saveAll(theAthletes)
  }

  async deleteAllAthletes(): Promise<void> {
    return this.athletesService.truncate()
  }
}

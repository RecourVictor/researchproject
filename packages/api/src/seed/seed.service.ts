import { Injectable } from '@nestjs/common'
import { AthletesService } from 'src/athletes/athletes.service'
import { Athlete } from 'src/athletes/entities/athlete.entity'
import { CountryService } from 'src/country/country.service'
import { Country } from 'src/country/entities/country.entity'

import * as athletes from './data/athletes.json' // set  "resolveJsonModule": true in tsconfig.json
import * as countries from './data/countries.json' // set  "resolveJsonModule": true in tsconfig.json


@Injectable()
export class SeedService {
  constructor(
    private athletesService: AthletesService,
    private countryService: CountryService
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

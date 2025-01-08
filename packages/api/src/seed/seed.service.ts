import { Injectable } from '@nestjs/common'
import { AthletesService } from 'src/athletes/athletes.service'
import { Athlete } from 'src/athletes/entities/athlete.entity'

import * as athletes from './data/athletes.json' // set  "resolveJsonModule": true in tsconfig.json

@Injectable()
export class SeedService {
  constructor(private athletesService: AthletesService) {}

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

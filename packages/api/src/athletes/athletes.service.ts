import { Injectable } from '@nestjs/common'
import { CreateAthleteInput } from './dto/create-athlete.input'
import { UpdateAthleteInput } from './dto/update-athlete.input'
import { Athlete } from './entities/athlete.entity'
import { In, MongoRepository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Record } from './entities/record.entity'
import { DisiplinesService } from 'src/disiplines/disiplines.service'
import { ObjectId } from 'mongodb'
import { Disipline } from 'src/disiplines/entities/disipline.entity'

@Injectable()
export class AthletesService {
  constructor(
    @InjectRepository(Athlete)
    private readonly athleteRepository: MongoRepository<Athlete>,
    private readonly disiplineService: DisiplinesService,
  ) {}

  async create(createAthleteInput: CreateAthleteInput) {
    const athlete = new Athlete()
    athlete.name = createAthleteInput.name
    athlete.surname = createAthleteInput.surname
    athlete.birthDate = createAthleteInput.birthDate
    athlete.gender = createAthleteInput.gender
    athlete.nationalityId = new ObjectId(createAthleteInput.nationalityId)

    const records: Record[] = []
    for (const record of createAthleteInput.records) {
      const newRecord = new Record()
      const disipline = await this.disiplineService.findOne(record.disiplineId)
      if (!disipline) {
        throw new Error('Disipline not found')
      }
      newRecord.disiplineId = new ObjectId(disipline.id)
      newRecord.PB = record.PB
    }
    athlete.records = records
    return this.athleteRepository.save(athlete)
  }

  findAll() {
    return this.athleteRepository.find()
  }

  findOne(id: string) {
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid ID')
    }

    const objId = new ObjectId(id)
    return this.athleteRepository.findOneBy({ _id: objId })
  }

  findBySearchString(searchString: string) {
    const terms = searchString.split(' ').filter(Boolean) // Remove empty strings

    if (terms.length === 0) {
      return this.athleteRepository.find({})
    }

    const searchStrings = terms.map(term => {
      return { name: { $regex: term, $options: 'i' } }
    })

    return this.athleteRepository.find({ $or: searchStrings })
  }

  update(updateAthleteInput: UpdateAthleteInput) {
    if (!ObjectId.isValid(updateAthleteInput.id)) {
      throw new Error('Invalid ID')
    }

    const objId = new ObjectId(updateAthleteInput.id)

    return this.athleteRepository
      .findOneBy({ _id: objId })
      .then(async athlete => {
        if (!athlete) {
          throw new Error('Athlete not found')
        }

        athlete.name = updateAthleteInput.name
        athlete.surname = updateAthleteInput.surname
        athlete.birthDate = updateAthleteInput.birthDate
        athlete.gender = updateAthleteInput.gender
        athlete.nationalityId = new ObjectId(updateAthleteInput.nationalityId)

        const records: Record[] = []
        for (const record of updateAthleteInput.records) {
          const newRecord = new Record()
          const disipline = await this.disiplineService.findOne(
            record.disiplineId,
          )
          if (!disipline) {
            throw new Error('Disipline not found')
          }
          newRecord.disiplineId = new ObjectId(disipline.id)
          newRecord.PB = record.PB
        }
        athlete.records = records

        return this.athleteRepository.save(athlete)
      })
  }

  async remove(id: string) {
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid ID')
    }

    const objId = new ObjectId(id)
    const athlete = await this.athleteRepository.findOneBy({ _id: objId })

    if (!athlete) {
      throw new Error('Athlete not found')
    }

    await this.athleteRepository.remove(athlete)
    return athlete
  }

  // Function for seeding
  saveAll(athletes: Athlete[]): Promise<Athlete[]> {
    return this.athleteRepository.save(athletes)
  }

  truncate(): Promise<void> {
    return this.athleteRepository.clear()
  }

  findByName(name: string, surname: string) {
    return this.athleteRepository.findOneBy({ name: name, surname: surname })
  }
}

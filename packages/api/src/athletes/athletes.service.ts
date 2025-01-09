import { Injectable } from '@nestjs/common';
import { CreateAthleteInput } from './dto/create-athlete.input';
import { UpdateAthleteInput } from './dto/update-athlete.input';
import { Athlete } from './entities/athlete.entity';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AthletesService {
  constructor(
    @InjectRepository(Athlete)
    private readonly athleteRepository: MongoRepository<Athlete>,
  ) {}
  

  create(createAthleteInput: CreateAthleteInput) {
    return 'This action adds a new athlete';
  }

  findAll() {
    return this.athleteRepository.find()
  }

  findOne(id: string) {
    return `This action returns a #${id} athlete`;
  }

  update(updateAthleteInput: UpdateAthleteInput) {
    return `This action updates a #${updateAthleteInput.id} athlete`;
  }

  remove(id: string) {
    return `This action removes a #${id} athlete`;
  }

  
  // Function for seeding
  saveAll(athletes: Athlete[]): Promise<Athlete[]> {
    return this.athleteRepository.save(athletes)
  }

  truncate(): Promise<void> {
    return this.athleteRepository.clear()
  }

  findByName(name: string, surname: string) {
    return this.athleteRepository.findOneBy({ name: name, surname: surname})
  }
}

import { Injectable } from '@nestjs/common';
import { CreateAthleteInput } from './dto/create-athlete.input';
import { UpdateAthleteInput } from './dto/update-athlete.input';

@Injectable()
export class AthletesService {
  create(createAthleteInput: CreateAthleteInput) {
    return 'This action adds a new athlete';
  }

  findAll() {
    return `This action returns all athletes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} athlete`;
  }

  update(id: number, updateAthleteInput: UpdateAthleteInput) {
    return `This action updates a #${id} athlete`;
  }

  remove(id: number) {
    return `This action removes a #${id} athlete`;
  }
}

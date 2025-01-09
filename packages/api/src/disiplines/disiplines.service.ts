import { Injectable } from '@nestjs/common'
import { CreateDisiplineInput } from './dto/create-disipline.input'
import { UpdateDisiplineInput } from './dto/update-disipline.input'
import { Disipline } from './entities/disipline.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { MongoRepository } from 'typeorm'

@Injectable()
export class DisiplinesService {
  constructor(
    @InjectRepository(Disipline)
    private readonly disiplineRepository: MongoRepository<Disipline>,
  ) {}

  create(createDisiplineInput: CreateDisiplineInput) {
    return 'This action adds a new disipline'
  }

  findAll() {
    return `This action returns all disiplines`
  }

  findOne(id: string) {
    return `This action returns a #${id} disipline`
  }

  update(updateDisiplineInput: UpdateDisiplineInput) {
    return `This action updates a #${updateDisiplineInput.id} disipline`
  }

  remove(id: string) {
    return `This action removes a #${id} disipline`
  }

  // Function for seeding
  saveAll(disiplines: Disipline[]): Promise<Disipline[]> {
    return this.disiplineRepository.save(disiplines)
  }

  truncate(): Promise<void> {
    return this.disiplineRepository.clear()
  }
}

import { Injectable } from '@nestjs/common'
import { CreateDisiplineInput } from './dto/create-disipline.input'
import { UpdateDisiplineInput } from './dto/update-disipline.input'
import { Disipline } from './entities/disipline.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { MongoRepository } from 'typeorm'
import { ObjectId } from 'mongodb'

@Injectable()
export class DisiplinesService {
  constructor(
    @InjectRepository(Disipline)
    private readonly disiplineRepository: MongoRepository<Disipline>,
  ) {}

  findAll() {
    return this.disiplineRepository.find()
  }

  findOne(id: string) {
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid id')
    }

    const objId = new ObjectId(id)
    return this.disiplineRepository.findOneBy({ _id: objId })
  }

  findOneByName(name: string) {
    return this.disiplineRepository.findOneBy({ name: name })
  }

  findBySearchString(searchString: string) {
    const terms = searchString.split(' ').filter(Boolean) // Remove empty strings

    if (terms.length === 0) {
      return this.disiplineRepository.find({})
    }

    const searchStrings = terms.map(term => {
      return { name: { $regex: term, $options: 'i' } }
    })

    return this.disiplineRepository.find({ $or: searchStrings })
  }

  // Function for seeding
  saveAll(disiplines: Disipline[]): Promise<Disipline[]> {
    return this.disiplineRepository.save(disiplines)
  }

  truncate(): Promise<void> {
    return this.disiplineRepository.clear()
  }

  findByName(name: string) {
    return this.disiplineRepository.findOneBy({ name: name})
  }
}

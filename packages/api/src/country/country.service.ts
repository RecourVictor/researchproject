import { Injectable } from '@nestjs/common'
import { Country } from './entities/country.entity'
import { MongoRepository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { ObjectId } from 'mongodb'

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: MongoRepository<Country>,
  ) {}

  findAll() {
    return this.countryRepository.find()
  }

  findOne(id: string) {
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid id')
    }

    const objId = new ObjectId(id)
    return this.countryRepository.findOneBy({ _id: objId })
  }

  findCountriesBySearchString(searchString: string) {
    const terms = searchString.split(' ').filter(Boolean) // Remove empty strings

    if (terms.length === 0) {
      return this.countryRepository.find({})
    }

    const searchStrings = terms.map(term => {
      return { countryName: { $regex: term, $options: 'i' } }
    })

    return this.countryRepository.find({ $or: searchStrings })
  }

  findByCode(countryCode: string) {
    return this.countryRepository.findOneBy({ countryCode: countryCode })
  }

  findOneByName(name: string) {
    return this.countryRepository.findOneBy({ countryName: name })
  }

  // Function for seeding
  saveAll(countries: Country[]): Promise<Country[]> {
    return this.countryRepository.save(countries)
  }

  truncate(): Promise<void> {
    return this.countryRepository.clear()
  }

  findByCountryCode(countryCode: string) {
    return this.countryRepository.findOneBy({ countryCode: countryCode })
  }
}

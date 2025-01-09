import { Injectable } from '@nestjs/common'
import { CreateCountryInput } from './dto/create-country.input'
import { UpdateCountryInput } from './dto/update-country.input'
import { Country } from './entities/country.entity'
import { MongoRepository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: MongoRepository<Country>,
  ) {}

  create(createCountryInput: CreateCountryInput) {
    return 'This action adds a new country'
  }

  findAll() {
    return `This action returns all country`
  }

  findOne(id: string) {
    return `This action returns a #${id} country`
  }

  update(updateCountryInput: UpdateCountryInput) {
    return `This action updates a #${updateCountryInput.id} country`
  }

  remove(id: string) {
    return `This action removes a #${id} country`
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

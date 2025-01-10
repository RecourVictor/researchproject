import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CountryService } from './country.service';
import { Country } from './entities/country.entity';

@Resolver(() => Country)
export class CountryResolver {
  constructor(private readonly countryService: CountryService) {}

  @Query(() => [Country], { name: 'countries' })
  findAll() {
    return this.countryService.findAll();
  }

  @Query(() => Country, { name: 'country' })
  findOne(@Args('id', { type: () => String}) id: string) {
    return this.countryService.findOne(id);
  }

  @Query(() => [Country], { name: 'countriesBySearchString' })
  findCountriesBySearchString(@Args('searchString', { type: () => String }) searchString: string) {
    return this.countryService.findCountriesBySearchString(searchString);
  }

  @Query(() => Country, { name: 'countryByName' })
  findOneByName(@Args('name', { type: () => String }) name: string) {
    return this.countryService.findOneByName(name);
  }

  @Query(() => Country, { name: 'countryByCode' })
  findOneByCode(@Args('code', { type: () => String }) code: string) {
    return this.countryService.findByCode(code);
  }
}

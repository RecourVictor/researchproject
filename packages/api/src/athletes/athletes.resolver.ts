import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { AthletesService } from './athletes.service'
import { Athlete } from './entities/athlete.entity'
import { CreateAthleteInput } from './dto/create-athlete.input'
import { UpdateAthleteInput } from './dto/update-athlete.input'
import { Country } from 'src/country/entities/country.entity'
import { CountryService } from 'src/country/country.service'
import { Record } from './entities/record.entity'
import { DisiplinesService } from 'src/disiplines/disiplines.service'
import { Disipline } from 'src/disiplines/entities/disipline.entity'

@Resolver(() => Athlete)
export class AthletesResolver {
  constructor(
    private readonly athletesService: AthletesService,
    private readonly countryService: CountryService,
    private readonly disciplineService: DisiplinesService,
  ) {}

  @Mutation(() => Athlete)
  createAthlete(
    @Args('createAthleteInput') createAthleteInput: CreateAthleteInput,
  ) {
    return this.athletesService.create(createAthleteInput)
  }

  @Query(() => [Athlete], { name: 'athletes' })
  findAll() {
    return this.athletesService.findAll()
  }

  @Query(() => Athlete, { name: 'athlete' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.athletesService.findOne(id)
  }

  @Query(() => [Athlete], { name: 'athletessBySearchString' })
  findBySearchString(
    @Args('searchString', { type: () => String }) searchString: string,
  ) {
    return this.athletesService.findBySearchString(searchString)
  }

  @Mutation(() => Athlete)
  updateAthlete(
    @Args('updateAthleteInput') updateAthleteInput: UpdateAthleteInput,
  ) {
    return this.athletesService.update(updateAthleteInput)
  }

  @Mutation(() => Athlete)
  removeAthlete(@Args('id', { type: () => String }) id: string) {
    return this.athletesService.remove(id)
  }

  // Resolvers for relations
  @ResolveField()
  nationality(@Parent() athlete: Athlete): Promise<Country> {
    return this.countryService.findOne(athlete.nationalityId.toString())
  }

  @ResolveField()
  async records(@Parent() athlete: Athlete): Promise<Record[]> {
    console.log('athlete', athlete)
    for (const record of athlete.records) {
      record.discipline = await this.disciplineService.findOne(record.disciplineId.toString())
    }
    return athlete.records
  }
}

import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AthletesService } from './athletes.service';
import { Athlete } from './entities/athlete.entity';
import { CreateAthleteInput } from './dto/create-athlete.input';
import { UpdateAthleteInput } from './dto/update-athlete.input';

@Resolver(() => Athlete)
export class AthletesResolver {
  constructor(private readonly athletesService: AthletesService) {}

  @Mutation(() => Athlete)
  createAthlete(@Args('createAthleteInput') createAthleteInput: CreateAthleteInput) {
    return this.athletesService.create(createAthleteInput);
  }

  @Query(() => [Athlete], { name: 'athletes' })
  findAll() {
    // return this.athletesService.findAll();
    return [
      {
        id: '1',
        name: 'Duif',
        fullname: 'Duif',
        category: 'Roekoes',
        // url: 'test',
        observations: 1,
        // description: 'test',
        // active: true,
        // createdAt: new Date(),
        // updatedAt: new Date(),
      },
    ]
  }

  @Query(() => Athlete, { name: 'athlete' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.athletesService.findOne(id);
  }

  @Mutation(() => Athlete)
  updateAthlete(@Args('updateAthleteInput') updateAthleteInput: UpdateAthleteInput) {
    return this.athletesService.update(updateAthleteInput.id, updateAthleteInput);
  }

  @Mutation(() => Athlete)
  removeAthlete(@Args('id', { type: () => Int }) id: number) {
    return this.athletesService.remove(id);
  }
}

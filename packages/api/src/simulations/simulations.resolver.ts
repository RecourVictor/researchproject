import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { SimulationsService } from './simulations.service'
import { Simulation } from './entities/simulation.entity'
import { CreateSimulationInput } from './dto/create-simulation.input'
import { UpdateSimulationInput } from './dto/update-simulation.input'
import { Athlete } from 'src/athletes/entities/athlete.entity'
import { AthletesService } from 'src/athletes/athletes.service'
import { DisiplinesService } from 'src/disiplines/disiplines.service'
import { Disipline } from 'src/disiplines/entities/disipline.entity'

@Resolver(() => Simulation)
export class SimulationsResolver {
  constructor(
    private readonly simulationsService: SimulationsService,
    private readonly athletesService: AthletesService,
    private readonly disiplinesService: DisiplinesService,
  ) {}

  @Mutation(() => Simulation)
  createSimulation(
    @Args('createSimulationInput') createSimulationInput: CreateSimulationInput,
  ) {
    return this.simulationsService.create(createSimulationInput)
  }

  @Query(() => [Simulation], { name: 'simulations' })
  findAll() {
    return this.simulationsService.findAll()
  }

  @Query(() => Simulation, { name: 'simulation' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.simulationsService.findOne(id)
  }

  @Query(() => [Simulation], { name: 'simulationsBySearchString' })
  findBySearchString(
    @Args('searchString', { type: () => String }) searchString: string,
  ) {
    return this.simulationsService.findBySearchString(searchString)
  }

  @Mutation(() => Simulation)
  updateSimulation(
    @Args('updateSimulationInput') updateSimulationInput: UpdateSimulationInput,
  ) {
    return this.simulationsService.update(updateSimulationInput)
  }

  @Mutation(() => Simulation)
  removeSimulation(@Args('id', { type: () => Int }) id: string) {
    return this.simulationsService.remove(id)
  }

  // Resolve fields
  @ResolveField()
  disipline(@Parent() simulation: Simulation): Promise<Disipline> {
    return this.disiplinesService.findOne(simulation.disiplineId.toString())
  }
}

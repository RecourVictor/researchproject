import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SimulationsService } from './simulations.service';
import { Simulation } from './entities/simulation.entity';
import { CreateSimulationInput } from './dto/create-simulation.input';
import { UpdateSimulationInput } from './dto/update-simulation.input';

@Resolver(() => Simulation)
export class SimulationsResolver {
  constructor(private readonly simulationsService: SimulationsService) {}

  @Mutation(() => Simulation)
  createSimulation(@Args('createSimulationInput') createSimulationInput: CreateSimulationInput) {
    return this.simulationsService.create(createSimulationInput);
  }

  @Query(() => [Simulation], { name: 'simulations' })
  findAll() {
    return this.simulationsService.findAll();
  }

  @Query(() => Simulation, { name: 'simulation' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.simulationsService.findOne(id);
  }

  @Mutation(() => Simulation)
  updateSimulation(@Args('updateSimulationInput') updateSimulationInput: UpdateSimulationInput) {
    return this.simulationsService.update(updateSimulationInput.id, updateSimulationInput);
  }

  @Mutation(() => Simulation)
  removeSimulation(@Args('id', { type: () => Int }) id: number) {
    return this.simulationsService.remove(id);
  }
}

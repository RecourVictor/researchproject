import { Injectable } from '@nestjs/common'
import { CreateSimulationInput } from './dto/create-simulation.input'
import { UpdateSimulationInput } from './dto/update-simulation.input'
import { Simulation } from './entities/simulation.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { MongoRepository } from 'typeorm'

@Injectable()
export class SimulationsService {
  constructor(
    @InjectRepository(Simulation)
    private readonly simulationsRepository: MongoRepository<Simulation>,
  ) {}

  create(createSimulationInput: CreateSimulationInput) {
    return 'This action adds a new simulation'
  }

  findAll() {
    return `This action returns all simulations`
  }

  findOne(id: string) {
    return `This action returns a #${id} simulation`
  }

  update(updateSimulationInput: UpdateSimulationInput) {
    return `This action updates a #${updateSimulationInput.id} simulation`
  }

  remove(id: string) {
    return `This action removes a #${id} simulation`
  }

  // Function for seeding
  saveAll(simulation: Simulation[]): Promise<Simulation[]> {
    return this.simulationsRepository.save(simulation)
  }

  truncate(): Promise<void> {
    return this.simulationsRepository.clear()
  }
}

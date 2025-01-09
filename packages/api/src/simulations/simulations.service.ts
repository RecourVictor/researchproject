import { Injectable } from '@nestjs/common';
import { CreateSimulationInput } from './dto/create-simulation.input';
import { UpdateSimulationInput } from './dto/update-simulation.input';

@Injectable()
export class SimulationsService {
  create(createSimulationInput: CreateSimulationInput) {
    return 'This action adds a new simulation';
  }

  findAll() {
    return `This action returns all simulations`;
  }

  findOne(id: string) {
    return `This action returns a #${id} simulation`;
  }

  update(updateSimulationInput: UpdateSimulationInput) {
    return `This action updates a #${updateSimulationInput.id} simulation`;
  }

  remove(id: string) {
    return `This action removes a #${id} simulation`;
  }
}

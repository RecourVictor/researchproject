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

  findOne(id: number) {
    return `This action returns a #${id} simulation`;
  }

  update(id: number, updateSimulationInput: UpdateSimulationInput) {
    return `This action updates a #${id} simulation`;
  }

  remove(id: number) {
    return `This action removes a #${id} simulation`;
  }
}

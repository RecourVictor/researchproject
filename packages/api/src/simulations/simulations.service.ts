import { Injectable } from '@nestjs/common'
import { CreateSimulationInput } from './dto/create-simulation.input'
import { UpdateSimulationInput } from './dto/update-simulation.input'
import { Simulation } from './entities/simulation.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { MongoRepository } from 'typeorm'
import { ObjectId } from 'mongodb'
import { DisiplinesService } from 'src/disiplines/disiplines.service'
import { AthletesService } from 'src/athletes/athletes.service'

@Injectable()
export class SimulationsService {
  constructor(
    @InjectRepository(Simulation)
    private readonly simulationsRepository: MongoRepository<Simulation>,
    private readonly disiplineService: DisiplinesService,
    private readonly athletesService: AthletesService,
  ) {}

  async create(createSimulationInput: CreateSimulationInput) {
    const simulation = new Simulation()
    simulation.name = createSimulationInput.name
    // Check of the disipline exists
    const disipline = await this.disiplineService.findOne(createSimulationInput.disiplineId)
    if (!disipline) {
      throw new Error('Disipline not found')
    }
    simulation.disiplineId = new ObjectId(disipline.id)
    simulation.athletesId = []
    // Check of the athletes exists
    for (const athleteId of createSimulationInput.athletesId) {
      const athlete = await this.athletesService.findOne(athleteId)
      if (!athlete) {
        throw new Error('Athlete not found')
      }
      simulation.athletesId.push(new ObjectId(athlete.id))
    }

    return this.simulationsRepository.save(simulation)
  }

  async findAll() {
    try {
      const simulations = await this.simulationsRepository.find()
      console.log(simulations)
      return simulations
    } catch (error) {
      console.log(error)
    }
  }

  findOne(id: string) {
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid ID')
    }

    const objId = new ObjectId(id)
    return this.simulationsRepository.findOneBy({ _id: objId })
  }

  findBySearchString(searchString: string) {
    const terms = searchString.split(' ').filter(Boolean) // Remove empty strings

    if (terms.length === 0) {
      return this.simulationsRepository.find({})
    }

    const searchStrings = terms.map(term => {
      return { name: { $regex: term, $options: 'i' } }
    })

    return this.simulationsRepository.find({ $or: searchStrings })
  }

  update(updateSimulationInput: UpdateSimulationInput) {
    if (!ObjectId.isValid(updateSimulationInput.id)) {
      throw new Error('Invalid ID')
    }

    const objId = new ObjectId(updateSimulationInput.id)

    return this.simulationsRepository.findOneBy({ _id: objId }).then(async simulation => {
      if (!simulation) {
        throw new Error('Simulation not found')
      }

      simulation.name = updateSimulationInput.name
      // Check of the disipline exists
      const disipline = await this.disiplineService.findOne(updateSimulationInput.disiplineId)
      if (!disipline) {
        throw new Error('Disipline not found')
      }
      simulation.disiplineId = new ObjectId(disipline.id)
      simulation.athletesId = []
      // Check of the athletes exists
      for (const athleteId of updateSimulationInput.athletesId) {
        const athlete = await this.athletesService.findOne(athleteId)
        if (!athlete) {
          throw new Error('Athlete not found')
        }
        simulation.athletesId.push(new ObjectId(athlete.id))
      }

      return this.simulationsRepository.save(simulation)
    })
  }

  async remove(id: string) {
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid ID')
    }

    const objId = new ObjectId(id)
    const simulation = await this.simulationsRepository.findOneBy({ _id: objId })

    if (!simulation) {
      throw new Error('Simulation not found')
    }

    await this.simulationsRepository.remove(simulation)
    return simulation
  }

  // Function for seeding
  saveAll(simulation: Simulation[]): Promise<Simulation[]> {
    return this.simulationsRepository.save(simulation)
  }

  truncate(): Promise<void> {
    return this.simulationsRepository.clear()
  }
}

import { Injectable } from '@nestjs/common'
import { CreateSimulationInput } from './dto/create-simulation.input'
import { UpdateSimulationInput } from './dto/update-simulation.input'
import { Simulation } from './entities/simulation.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { MongoRepository } from 'typeorm'
import { ObjectId } from 'mongodb'
import { DisiplinesService } from 'src/disiplines/disiplines.service'
import { AthletesService } from 'src/athletes/athletes.service'
import { AthletePerformance } from './entities/athleteperformance.entity'

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

    // Check of de discipline bestaat
    const disipline = await this.disiplineService.findOne(
      createSimulationInput.disiplineId,
    )
    if (!disipline) {
      throw new Error('Disipline not found')
    }
    simulation.disiplineId = new ObjectId(disipline.id)

    // Initialize de athletes array
    simulation.athletes = []

    // Controleer of de atleten bestaan en voeg ze toe met een default time
    for (const athleteInput of createSimulationInput.athletes) {
      const athlete = await this.athletesService.findOne(athleteInput.athleteId)
      if (!athlete) {
        throw new Error(`Athlete with ID ${athleteInput.athleteId} not found`)
      }

      // Voeg het AthletePerformance object toe aan de athletes array
      const performance = new AthletePerformance()
      performance.athleteId = new ObjectId(athlete.id)
      performance.time = athleteInput.time ?? 0

      simulation.athletes.push(performance)
    }

    return this.simulationsRepository.save(simulation)
  }

  async findAll() {
    try {
      const simulations = await this.simulationsRepository.find()
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

  async update(updateSimulationInput: UpdateSimulationInput): Promise<Simulation> {
    // Controleer of het meegegeven ID geldig is
    if (!ObjectId.isValid(updateSimulationInput.id)) {
      throw new Error('Invalid ID');
    }
  
    const objId = new ObjectId(updateSimulationInput.id);
  
    // Zoek de bestaande simulatie
    const simulation = await this.simulationsRepository.findOneBy({
      _id: objId,
    });
  
    if (!simulation) {
      throw new Error('Simulation not found');
    }
  
    // Update velden
    simulation.name = updateSimulationInput.name;
  
    // Update discipline
    const disipline = await this.disiplineService.findOne(updateSimulationInput.disiplineId);
    if (!disipline) {
      throw new Error('Disipline not found');
    }
    simulation.disiplineId = new ObjectId(disipline.id);
  
    // Update athletes array (indien nodig)
    const updatedAthletes: AthletePerformance[] = [];
  
    for (const athleteInput of updateSimulationInput.athletes) {
      const athlete = await this.athletesService.findOne(athleteInput.athleteId);
      if (!athlete) {
        throw new Error(`Athlete with ID ${athleteInput.athleteId} not found`);
      }
  
      // Controleer of de atleet al in de lijst staat en werk de tijd bij
      const existingPerformance = simulation.athletes.find(
        (performance) => performance.athleteId.toHexString() === athlete.id
      );
  
      if (existingPerformance) {
        // Als de atleet al bestaat, werk de tijd bij
        existingPerformance.time = athleteInput.time ?? 0;
        updatedAthletes.push(existingPerformance);
      } else {
        // Anders maak een nieuw AthletePerformance object aan
        const performance = new AthletePerformance();
        performance.athleteId = new ObjectId(athlete.id);
        performance.time = athleteInput.time ?? 0;
        updatedAthletes.push(performance);
      }
    }
  
    // Update de athletes array
    simulation.athletes = updatedAthletes;
    
    // Sla de wijzigingen op zonder een nieuw ID te genereren
    await this.simulationsRepository.updateOne({ _id: objId }, { $set: simulation });
    return simulation;
  }

  async remove(id: string) {
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid ID')
    }

    const objId = new ObjectId(id)
    const simulation = await this.simulationsRepository.findOneBy({
      _id: objId,
    })

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

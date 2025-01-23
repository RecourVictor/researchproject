import type { AthletePerformance } from './athleteperformance.interface'
import type { disipline } from './disipline.interface'

export interface Simulation {
  id: string
  disipline: disipline
  name: string
  athletes: [AthletePerformance]
}

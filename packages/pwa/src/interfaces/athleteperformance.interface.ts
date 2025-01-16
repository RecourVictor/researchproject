export interface AthletePerformance {
    id: string
    athlete: {
      id: string
      name: string
      surname: string
      nationality: {
        countryCode: string
        countryName: string
        id: string
      }
    }
    time: number
  }
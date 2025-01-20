export interface AthletePerformance {
    id: string
    athlete: {
      id: string
      name: string
      surname: string
      records: {
        discipline: {
          id: string
          name: string
        }
        PB: number
      }
      nationality: {
        countryCode: string
        countryName: string
        id: string
      }
    }
    time: number
  }
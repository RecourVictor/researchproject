import gql from 'graphql-tag'

export const CREATE_ATHLETE = gql`
  mutation athletes($athleteInput: CreateAthleteInput!) {
    createAthlete(createAthleteInput: $athleteInput) {
      id
      name
      surname
      gender
      nationality {
        id
        countryCode
        countryName
        __typename
      }
      records {
        disiplineId
        PB
      }
      __typename
    }
  }
`

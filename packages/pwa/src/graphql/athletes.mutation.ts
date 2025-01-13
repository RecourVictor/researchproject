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

export const UPDATE_ATHLETE = gql`
  mutation athletes($athleteInput: UpdateAthleteInput!) {
    updateAthlete(updateAthleteInput: $athleteInput) {
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

export const DELETE_ATHLETE = gql`
  mutation athletes($id: String!) {
    removeAthlete(id: $id){
      name
    }
  }
`
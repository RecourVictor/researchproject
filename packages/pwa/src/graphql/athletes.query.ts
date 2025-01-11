import gql from 'graphql-tag'

export const GET_ATHLETES = gql`
  query athletes($searchString: String!) {
    athletessBySearchString(searchString: $searchString) {
      id
      name
      surname
      gender
      birthDate
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

export const GET_ALL_ATHLETES = gql`
  query {
    athletes {
      id
      name
      surname
      gender
      birthDate
      nationality {
        id
        countryCode
        countryName
      }
      records {
        disiplineId
        PB
      }
    }
  }
`

export const GET_ATHLETE_BY_ID = gql`
  query athlete($id: String!) {
    athlete(id: $id) {
      id
      name
      surname
      gender
      birthDate
      nationality {
        id
        countryCode
        countryName
      }
      records {
        disiplineId
        PB
      }
    }
  }
`

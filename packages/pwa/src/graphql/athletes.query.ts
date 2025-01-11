import gql from 'graphql-tag'

export const GET_ATHLETES = gql`
  query athletes($searchString: String!) {
    athletessBySearchString(searchString: $searchString) {
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

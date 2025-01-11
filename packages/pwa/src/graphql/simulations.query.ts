import gql from 'graphql-tag'

export const GET_SIMULATIONS = gql`
  query simulations($searchString: String!) {
    simulationsBySearchString(searchString: $searchString) {
      id
      name
      disipline {
        name
        __typename
        id
      }
      __typename
    }
  }
`

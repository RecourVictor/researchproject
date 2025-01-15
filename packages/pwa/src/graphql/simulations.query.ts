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

export const GET_SIMULATION_BY_ID = gql`
  query simulation($id: String!) {
    simulation(id: $id) {
      id
      name
      disipline {
        name
        rounds
        __typename
        id
      }
      athletes {
        time
        athlete {
          id
          name
          surname
        }
      }
      __typename
    }
  }
`

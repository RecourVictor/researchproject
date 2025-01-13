import gql from 'graphql-tag'

export const CREATE_SIMULATION = gql`
  mutation simulations($simulationInput: CreateSimulationInput!) {
    createSimulation(createSimulationInput: $simulationInput) {
      id
      name
      disipline {
        name
      }
      athletes {
        time
        athleteId
      }
      __typename
    }
  }
`

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

export const UPDATE_SIMULATION = gql`
  mutation simulations($simulationInput: UpdateSimulationInput!) {
    updateSimulation(updateSimulationInput: $simulationInput) {
      id
      name
      disipline {
        name
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

export const DELETE_SIMULATION = gql`
  mutation simulations($id: String!) {
    removeSimulation(id: $id) {
      name
    }
  }
`

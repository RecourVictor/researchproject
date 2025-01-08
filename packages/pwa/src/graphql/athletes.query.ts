import gql from 'graphql-tag'

export const GET_ATHLETES = gql`
  query getAthletes {
    athletes {
      id
      name
    }
  }
`
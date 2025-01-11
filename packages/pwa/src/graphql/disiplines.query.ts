import gql from 'graphql-tag'

export const GET_DISIPLINES = gql`
  query {
    disiplines {
      id
      name
      rounds
      __typename
    }
  }
`

import gql from 'graphql-tag'

export const GET_SETTINGS = gql`
  query {
    settings {
      id
      name
      value
      __typename
    }
  }
`

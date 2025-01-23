import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client/core'

const httpLink = createHttpLink({
  // uri: 'http://[::1]:3000/graphql', // will fix this later with environment variables
  uri: `${import.meta.env.VITE_BACKEND_URL}/graphql`,
})

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

export default () => {
  return {
    apolloClient,
  }
}

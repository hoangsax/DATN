// apolloClient.ts
import { RootState } from '@/store';
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useSelector } from 'react-redux';

const httpLink = new HttpLink({ uri: 'http://172.28.13.181:4000/' });

const authLink = setContext((_, { headers }) => {
const token = null
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;

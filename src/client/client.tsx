// apolloClient.ts
import {
    ApolloClient,
    InMemoryCache,
    HttpLink,
    ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = new HttpLink({
    uri: "https://gateway-arbitrum.network.thegraph.com/api/[92c1c28985478798e08f1d4210230d9a]/subgraphs/id/HR13Bc8T7SZA9iB6qdDfP1iUazsmwiESXY5UxkLZG74Z",
});

const authLink = setContext((_, { headers }) => {
    const token = null;
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

const local = "http://172.28.13.181:5000/graphql";
const graph =
    "https://api.studio.thegraph.com/query/80646/gnode/version/latest";

const client = new ApolloClient({
    uri: graph,
    cache: new InMemoryCache(),
});

const localClient = new ApolloClient({
    uri: local,
    cache: new InMemoryCache(),
});

export default client;
export { client, localClient };

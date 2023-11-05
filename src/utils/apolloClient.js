import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";
import Constants from "expo-constants";

import { setContext } from "@apollo/client/link/context";

export const uri = Constants.manifest.extra.uri;

//To describe Apollo Client, how to merge the existing repositories in the cache with the next set of repositories, we can use a field policy.
//In general, field policies can be used to customize the cache behavior during read and write operations with read and merge functions.
//As mentioned earlier, the format of the pagination's result object and the arguments are based on the Relay's pagination specification.
//Luckily, Apollo Client provides a predefined field policy, relayStylePagination, which can be used in this case.

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                repositories: relayStylePagination(),
            },
        },
        Repository: {
            fields: {
                reviews: relayStylePagination(),
            },
        },
    },
});

const httpLink = createHttpLink({
    // Replace the IP address part with your own IP address!
    uri: uri,
});

const createApolloClient = (authStorage) => {
    const authLink = setContext(async (_, { headers }) => {
        try {
            const accessToken = await authStorage.getAccessToken();
            return {
                headers: {
                    ...headers,
                    authorization: accessToken ? `Bearer ${accessToken}` : "",
                },
            };
        } catch (e) {
            console.log(e);
            return {
                headers,
            };
        }
    });
    return new ApolloClient({
        link: authLink.concat(httpLink),
        cache,
    });
};

export default createApolloClient;
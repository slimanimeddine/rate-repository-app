import { GET_ACCESS_TOKEN } from "../graphql/mutations";
import { ApolloClient, useMutation } from "@apollo/client";
import { useContext } from "react";
import  AuthStorageContext from "../contexts/authStorageContext";
import { useApolloClient } from "@apollo/client";

export const useSignIn = () => {
	const [mutate, result] = useMutation(GET_ACCESS_TOKEN);
	const authStorage = useContext(AuthStorageContext);
	const apolloClient = useApolloClient();

	const signIn = async ({ username, password }) => {
		const { data } = await mutate({
			variables: {
				credentials: {
					username,
					password
				}
			},
		});

		if (data) {
			await authStorage.setAccessToken(data.authenticate.accessToken);
			apolloClient.resetStore();
		}

		return data
	};

	return [signIn, result];
};
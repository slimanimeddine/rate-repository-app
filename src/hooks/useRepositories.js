import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (selected, debouncedSearch) => {
	let variables = {};

	//clearly i don't understand what ascend and descend mean but it works lol
	if (selected === "ASC") {
		variables = {
			orderBy: "RATING_AVERAGE",
			orderDirection: "DESC",
			searchKeyword: debouncedSearch ? debouncedSearch : "",
			first: 4,
			after: "",
		};
	} else if (selected === "DESC") {
		variables = {
			orderBy: "RATING_AVERAGE",
			orderDirection: "ASC",
			searchKeyword: debouncedSearch ? debouncedSearch : "",
			first: 4,
			after: "",
		};
	} else if (selected === "LATEST") {
		variables = {
			orderBy: "CREATED_AT",
			orderDirection: "ASC",
			searchKeyword: debouncedSearch ? debouncedSearch : "",
			first: 4,
			after: "",
		};
	}

	const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
		fetchPolicy: "cache-and-network",
		variables,
	});

	const handleFetchMore = () => {
		const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

		if (!canFetchMore) {
			return;
		}
		

		variables = {
			...variables,
			after: data.repositories.pageInfo.endCursor,
		};
		
		fetchMore({
			variables: {
				after: data.repositories.pageInfo.endCursor,
				...variables,
			},
		});
	};

	if (loading) {
		return { loading: true };
	}

	return {
		repositories: data?.repositories,
		loading: false,
		fetchMore: handleFetchMore,
		...result,
	};
};

export default useRepositories;
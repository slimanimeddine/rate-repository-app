import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
    query Repository(
        $orderBy: AllRepositoriesOrderBy
        $orderDirection: OrderDirection
        $searchKeyword: String
        $first: Int
        $after: String
    ) {
        repositories(
            orderBy: $orderBy
            orderDirection: $orderDirection
            searchKeyword: $searchKeyword
            first: $first
            after: $after
        ) {
            edges {
                node {
                    id
                    reviewCount
                    stargazersCount
                    ownerAvatarUrl
                    description
                    name
                    forksCount
                    ratingAverage
                    language
                    fullName
                }
                cursor
            }
            pageInfo {
                hasNextPage
                startCursor
                endCursor
            }
        }
    }
`;

export const GET_REPOSITORY = gql`
    query Repository($repositoryId: ID!, $first: Int, $after: String) {
        repository(id: $repositoryId) {
            url
            ratingAverage
            reviewCount
            stargazersCount
            ownerAvatarUrl
            fullName
            language
            description
            forksCount
            name
            reviews(first: $first, after: $after) {
                edges {
                    node {
                        id
                        text
                        rating
                        createdAt
                        user {
                            id
                            username
                        }
                    }
                }
                pageInfo {
                    hasNextPage
                    endCursor
                }
            }
        }
    }
`;

export const LOGIN_STATUS = gql`
    query Me {
        me {
            id
            username
        }
    }
`;

export const MY_REVIEWS = gql`
    query Reviews {
        me {
            reviews {
                edges {
                    node {
                        rating
                        repository {
                            name
							id
                        }
                        createdAt
                        text
						id
                    }
                }
            }
        }
    }
`;
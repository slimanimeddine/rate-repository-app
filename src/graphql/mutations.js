import { gql } from "@apollo/client";

export const GET_ACCESS_TOKEN = gql`
    mutation Authenticate($credentials: AuthenticateInput) {
        authenticate(credentials: $credentials) {
            accessToken
        }
    }
`;

export const ADD_REVIEW = gql`
    mutation CreateReview($review: CreateReviewInput) {
        createReview(review: $review) {
            rating
        }
    }
`;

export const SIGN_UP = gql`
    mutation CreateReview($user: CreateUserInput) {
        createUser(user: $user) {
            username
        }
    }
`;

export const DELETE_REVIEW = gql`
    mutation DeleteReview($deleteReviewId: ID!) {
        deleteReview(id: $deleteReviewId)
    }
`;
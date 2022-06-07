import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  mutation SIGN_In($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

export const SIGN_UP = gql`
  mutation SIGN_UP($user: CreateUserInput) {
    createUser(user: $user) {
      username
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CREATE_REVIEW($review: CreateReviewInput) {
    createReview(review: $review) {
      id
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation DELETE_REVIEW($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId)
  }
`;

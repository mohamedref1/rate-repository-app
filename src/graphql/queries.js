import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query GET_REPOSITORIES($first: Int, $after: String) {
    repositories(first: $first, after: $after) {
      edges {
        node {
          id
          fullName
          description
          language
          stargazersCount
          forksCount
          ratingAverage
          ratingAverage
          ownerAvatarUrl
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const ME = gql`
  query ME {
    me {
      id
      username
    }
  }
`;

import { gql } from "@apollo/client";

import {
  PAGE_INFO_FIELDS,
  REPOSITORY_MAIN_FIELDS,
  REVIEWS_MAIN_FIELDS,
} from "./fragments";

export const GET_REPOSITORIES = gql`
  query GET_REPOSITORIES(
    $first: Int
    $after: String
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      first: $first
      after: $after
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          ...REPOSITORY_MAIN_FIELDS
        }
      }
      pageInfo {
        ...PAGE_INFO_FIELDS
      }
    }
  }

  ${REPOSITORY_MAIN_FIELDS}
  ${PAGE_INFO_FIELDS}
`;

export const GET_REPOSITORY = gql`
  query GET_REPOSITORY($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      ...REPOSITORY_MAIN_FIELDS
      reviews(first: $first, after: $after) {
        edges {
          node {
            ...REVIEWS_MAIN_FIELDS
            user {
              id
              username
            }
          }
        }
        pageInfo {
          ...PAGE_INFO_FIELDS
        }
      }
    }
  }

  ${REPOSITORY_MAIN_FIELDS}
  ${REVIEWS_MAIN_FIELDS}
  ${PAGE_INFO_FIELDS}
`;

export const ME = gql`
  query ME($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...REVIEWS_MAIN_FIELDS
            repository {
              fullName
              id
            }
          }
        }
        pageInfo {
          ...PAGE_INFO_FIELDS
        }
      }
    }
  }
  ${REVIEWS_MAIN_FIELDS}
  ${PAGE_INFO_FIELDS}
`;

import { gql } from "@apollo/client";

export const REPOSITORY_MAIN_FIELDS = gql`
  fragment REPOSITORY_MAIN_FIELDS on Repository {
    id
    fullName
    description
    language
    stargazersCount
    forksCount
    ratingAverage
    reviewCount
    ownerAvatarUrl
    url
  }
`;

export const REVIEWS_MAIN_FIELDS = gql`
  fragment REVIEWS_MAIN_FIELDS on Review {
    id
    text
    rating
    createdAt
  }
`;

export const PAGE_INFO_FIELDS = gql`
  fragment PAGE_INFO_FIELDS on PageInfo {
    hasNextPage
    endCursor
  }
`;

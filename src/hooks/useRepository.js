import { useQuery } from "@apollo/client";

import { GET_REPOSITORIES } from "../graphql/queries";

export const sortOptions = {
  latest: {
    orderBy: "CREATED_AT",
    orderDirection: "DESC",
  },
  highestRate: {
    orderBy: "RATING_AVERAGE",
    orderDirection: "DESC",
  },
  lowestRate: {
    orderBy: "RATING_AVERAGE",
    orderDirection: "ASC",
  },
};

const useRepository = ({ sortBy, searchKeyword }) => {
  if (!Object.values(sortOptions).includes(sortBy)) {
    sortBy = sortOptions.latest;
  }

  const variables = {
    ...sortBy,
    searchKeyword,
    first: 10,
  };

  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables,
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepository;

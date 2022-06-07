import { useQuery } from "@apollo/client";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { GET_REPOSITORY } from "../graphql/queries";

import RepositoryItem from "./RepositoryItem"
import ReviewItem from "./ReviewItem";

const styles = StyleSheet.create({
  separator: {
    height: 10
  }
})

const ItemSeparator = () => <View style={styles.separator} />;

const Repository = ({route}) => {
  const id = route.params.itemId;
  const { data, loading, fetchMore } = useQuery(GET_REPOSITORY, {
      fetchPolicy: 'cache-and-network',
      variables: { 
        id,
        first: 10
      }
    }
  );

  if (loading) {
    return <Text>Loading...</Text>
  }

  const reviews = data?.repository?.reviews?.edges?.map((edge) => edge.node)

  const onEndReached = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage
    
    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        id,
        after:data?.repository.reviews.pageInfo.endCursor,
        first: 10
      }
    })
  }

  return (
    <FlatList 
      data={reviews}
      renderItem={(item) => <ReviewItem review={item} />}
      keyExtractor={({id}) => id}
      ListHeaderComponent={() => <RepositoryItem item={data?.repository} isLink/>}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  )
}

export default Repository;
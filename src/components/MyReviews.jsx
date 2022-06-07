import { useQuery } from "@apollo/client";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { ME } from "../graphql/queries";

import ReviewItem from "./ReviewItem";

const styles = StyleSheet.create({
  separator: {
    height: 10
  }
})

const ItemSeparator = () => <View style={styles.separator} />;


const MyReviews = () => {
  const { data, loading } = useQuery(ME, {
      fetchPolicy: 'cache-and-network',
      variables: { 
        includeReviews: true,
      }
    }
  );

  if (loading) {
    return <Text>Loading...</Text>
  }
  
  const reviews = data?.me?.reviews?.edges?.map((edge) => {
    return {
      ...edge.node,
      user: {
        id: data.me.id,
        username: data.me.username
      }
    }
  })

  return (
    <FlatList 
      data={reviews}
      renderItem={(item) => <ReviewItem review={item} hasActions />}
      keyExtractor={({id}) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
}

export default MyReviews;
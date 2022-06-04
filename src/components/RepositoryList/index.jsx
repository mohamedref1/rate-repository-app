import { FlatList, StyleSheet, View } from "react-native";
import useRepository from "../../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
  separator: {
    height: 10
  },
  list: {
    marginHorizontal: 10,
  }
})

const RepositoryList = () => {
  const { repositories } = useRepository()

  const repositoryNodes = repositories
  ? repositories.edges.map(edge => edge.node)
  : [];

  const renderItem = ({item}) => <RepositoryItem item={item} />
  
  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <FlatList 
      data={repositoryNodes}
      renderItem={renderItem}
      ItemSeparatorComponent={ItemSeparator}
      style={styles.list}
    />
  )
}

export default RepositoryList;
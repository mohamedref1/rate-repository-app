import React, { useState } from "react";
import { useDebounce } from "use-debounce";
import { FlatList, StyleSheet, View } from "react-native";

import useRepository, {sortOptions} from "../hooks/useRepository";

import RepositoryItem from "./RepositoryItem";
import RepositoryListHeader from "./RepositoryListHeader";

const styles = StyleSheet.create({
  separator: {
    height: 10
  },
})

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { setSortBy, setSearchKeyword } = this.props

    return (
      <RepositoryListHeader 
          setSortBy={setSortBy} 
          setSearchKeyword={setSearchKeyword}
      />
    )
  }

  renderItem = ({item}) => {
    return (
      <RepositoryItem item={item} />
    )
  }

  ItemSeparator = () => {
    return (
      <View style={styles.separator} />
    )
  }

  render = () => {
    const {repositories, fetchMore} = this.props;

    const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];
        
    const onEndReached = () => {
      fetchMore();
    }

    return (
      <FlatList 
        data={repositoryNodes}
        renderItem={this.renderItem}
        ItemSeparatorComponent={this.ItemSeparator}
        ListHeaderComponent={this.renderHeader}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
      />
    )
  
  }
}

const RepositoryList = () => {
  const [sortBy, setSortBy] = useState(sortOptions.latest)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500)
  const { repositories, fetchMore } = useRepository({
    sortBy, 
    searchKeyword: debouncedSearchKeyword
  })
  
  return <RepositoryListContainer 
            repositories={repositories} 
            fetchMore={fetchMore}
            setSortBy={setSortBy}
            setSearchKeyword={setSearchKeyword}
          />
}

export default RepositoryList;
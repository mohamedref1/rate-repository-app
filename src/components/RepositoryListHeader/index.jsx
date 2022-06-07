import { View } from "react-native";

import SearchBar from './SearchBar';
import SortingMenu from './SortingMenu'

const RepositoryListHeader = ({setSortBy, setSearchKeyword}) => {
  return (
    <View>
      <SearchBar setSearchKeyword={setSearchKeyword} />
      <SortingMenu setSortBy={setSortBy} />
    </View>
  )
};

export default RepositoryListHeader
import { useState } from 'react';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';

const SearchBar = ({setSearchKeyword}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = query => {
    setSearchQuery(query)
    setSearchKeyword(query)
  };

  return (
    <View style={{
      display: 'flex',
      alignItems: 'center'
    }}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{
          width: '90%',
          marginTop: 30,
        }}
        inputStyle={{
          textAlign: 'left'
        }}
      />
    </View>
  );
};

export default SearchBar;

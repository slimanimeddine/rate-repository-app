import { View, Text } from 'react-native'
import { Searchbar } from 'react-native-paper'
import {memo} from 'react'

function SearchDefault({search, setSearch}) {
  return (
    <View>
        <Searchbar
            placeholder="Search"
            onChangeText={query => setSearch(query)}
            value={search}
        />
    </View>
  )
}

export const Search = SearchDefault
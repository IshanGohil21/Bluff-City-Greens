import { StyleSheet, Text, View, TextInput, Dimensions } from 'react-native';
import React from 'react';
import { Colors, Icons, Images } from '../CommonConfig/CommonConfig'
import  Ionicons  from 'react-native-vector-icons/Ionicons';

const SearchBarScreen3 = () => {
  return (
    <View style={styles.searchContainer}>
                <View style={styles.vwSearch}>
                  <Ionicons name="search-outline" size={20} color="grey" />
                </View>

                <TextInput
                  //  value={query}
                  placeholder="Search"
                  style={styles.textInput}
                />
              </View>
  )
}

export default SearchBarScreen3;

const styles = StyleSheet.create({
    searchContainer:
  {
    // width: Dimensions.get('window').width,
    // width: '100%',
    width: Dimensions.get('window').width*0.62,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: Colors.white,
    borderRadius: 5,
    marginBottom: 10
  },
  vwSearch: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
})
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Searchbar from '../../../../components/SearchBar';

import { Colors, Images, Icons } from '../../../../CommonConfig/CommonConfig';

const AddNewAddress2Screen = (props) => {
  const [value, setValue] = useState();
  const [query, setQuery] = useState();

  return (
    <View style={styles.main}>
      <StatusBar  backgroundColor={Colors.primary} />
      { /* Title */}
      <View style={styles.header} >
        <View style={styles.text} >
        <TouchableOpacity onPress={() => { props.navigation.goBack() }} >
          <Ionicons name={Icons.BACK_ARROW} size={30} color={Colors.white} />
        </TouchableOpacity>

      <TouchableOpacity>
        <Ionicons   name='search-outline' size={30} color={Colors.white} />
      </TouchableOpacity>
      </View>

        { /* Header */}
        <Text style={styles.title} >Add New Address</Text>
      </View>
      {/* Body */}
      <View style={styles.body} >
        <Searchbar
          value={value}
          style={{ margin: 20 }}
        />
      
      <View style={styles.searchContainer2} onPress={() => { props.navigation.goBack() }} >
          <Ionicons name="navigate" size={20} color={Colors.grey} />
          <Text style={styles.text3} onPress={() => { props.navigation.goBack() }} > Use current location </Text>
      </View>

    <Image source={Images.address2}
        style={styles.image}
    />

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  header: {
    padding: 10,
    backgroundColor: Colors.primary,
    flex: 0.8,
    marginTop: 20
  },
  title: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 28,
    marginTop: 70
  },
  body: {
    flex: 3,
    alignItems: 'flex-start'
  },
  searchContainer2: {
    width: '90%',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 25,
      
  },
  vwSearch: {
 // flex: 1,
  justifyContent: 'center',
  alignItems: 'flex-start',
  flexDirection: 'row',
  width: 40,
  },
  text3:{
    fontSize: 18,
    color: Colors.grey
  },
  image: {
    height: 300,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
    marginLeft: 40, 
  },
  text: {
    flexDirection: 'row',
    justifyContent:'space-between',
    marginBottom: 20
  }
});

export default AddNewAddress2Screen;
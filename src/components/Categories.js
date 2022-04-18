import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'

import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Icons, Images } from '../CommonConfig/CommonConfig';

const CategoriesScreen = (props) => {
  return (
    <View>
      <TouchableOpacity key={props.id} style={styles.categories}>
        <Image source={props.image} style={styles.catoContainer} />
        <Text style={{ color: props.color }} > {props.name} </Text>
      </TouchableOpacity>
    </View>
  )
}

export default CategoriesScreen

const styles = StyleSheet.create({
    categories: {
        alignItems: 'center',
        padding: 10,
        marginHorizontal: 10,
        elevation: 1.5,
        backgroundColor: Colors.white
      },
      catoContainer: {
        height: 50, 
        width: 50,
      }
})
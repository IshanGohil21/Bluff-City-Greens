import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import React from 'react'

import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Icons, Images } from '../CommonConfig/CommonConfig';

var randomColor = Math.floor(Math.random()*16777215).toString(16);
//console.log(randomColor);

const height = width * 100 / 0.6;

const { width } = Dimensions.get('window')


const CategoriesScreen = (props) => {
  return (
    <View  style={styles.mains} >
      <TouchableOpacity key={props.id} style={styles.categories} onPress={props.onClick} >
        <Image source={{  uri : props.image}} style={styles.catoContainer} />
        <Text style={{ color:Colors.black , marginVertical: 5 }} > {props.name} </Text>
      </TouchableOpacity>
    </View>
  )
}

export default CategoriesScreen

const styles = StyleSheet.create({
    categories: {
        alignItems: 'center',
        padding: 5,
        marginHorizontal: 5,
        marginVertical: 10,
        elevation:10
      },
      catoContainer: {
        height: 50, 
        width: 50,
        borderRadius: 10,
        borderWidth: 30,
      },
      mains:{
        backgroundColor:Colors.white,
        borderRadius:10,
        paddingHorizontal:5,
        margin:10,
        elevation:15
      }
})
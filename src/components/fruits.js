import { View, Text, StyleSheet, TouchableOpacity, StatusBar,  TextInput, Image, Dimensions } from 'react-native';
import React from 'react'

import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Icons, Images } from '../CommonConfig/CommonConfig';

const { width } = Dimensions.get('window')
const height = width * 100 / 0.6

const fruitsComp = (props) => {
  return (
    <View  style={styles.ordersScreen}>
        <Image source={props.img} style={styles.image2} />
    </View>
  )
}

export default fruitsComp;

const styles = StyleSheet.create({
    ordersScreen: { 
        padding: 10,
        justifyContent:'flex-start',
        marginHorizontal: 5
      },
      image2: {
        width: width * 0.25, 
        height: width * 0.25,
        borderRadius: 20 
      },
})
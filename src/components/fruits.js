import { View, Text, StyleSheet, TouchableOpacity, StatusBar,  TextInput, Image, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react'

import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Icons, Images } from '../CommonConfig/CommonConfig';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

// const height = width * 100 / 0.6

const WIDTH = Dimensions.get('window').width

const FruitsComp = (props) => {
  
  return (
    
    <View key={props.id} style={styles.mappingComp} >
      
        <TouchableOpacity  onPress={props.onClick}  >
        <Image source={{uri : props.img}} style={styles.imageCato} />
        </TouchableOpacity>
        
        <Text>{props.nameF}</Text>
        
    
    </View>
  )
}

export default FruitsComp;

const styles = StyleSheet.create({
  imageCato: {
    height: 110,
    width: WIDTH*0.4,
    // borderRadius: 10,
    
},
  mappingComp:{
    alignItems:'center',
    elevation: 10,
    overflow:'hidden',
    borderRadius:10,
    backgroundColor:Colors.white,
    margin:20,
    paddingVertical:10


  }
})
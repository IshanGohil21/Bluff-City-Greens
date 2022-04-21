import { View, Text, StyleSheet, TouchableOpacity, StatusBar,  TextInput, Image, Dimensions } from 'react-native';
import React from 'react'

import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Icons, Images } from '../CommonConfig/CommonConfig';


// const height = width * 100 / 0.6

const WIDTH = Dimensions.get('window').width

const FruitsComp = (props) => {
  return (
    <View key={props.id} style={styles.mappingComp} >
        <TouchableOpacity  onPress={props.onClick} >
        <Image source={props.img} style={styles.imageCato} />
        </TouchableOpacity>
        <Text>{props.nameF}</Text>
    </View>
  )
}

export default FruitsComp;

const styles = StyleSheet.create({
  imageCato: {
    height: 150,
    width: 150,
    borderRadius: 10,
},
mappingComp:{
    padding: 5,
    marginTop: 10,
    alignItems: 'center',
    margin:10,
}
})
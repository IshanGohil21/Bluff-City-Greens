import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'

import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Icons, Images } from '../CommonConfig/CommonConfig';


const Cat2Screen = (props) => {
  return (
    <View style={{width:'100%'}}>
      <TouchableOpacity key={props.id} style={styles.categories}>
        <View style={{...styles.imageWidth , borderColor: props.color}} >
            <Image source={props.image} style={styles.catoContainer} />
        </View>
        <Text style={{ fontSize: 18 , color: Colors.black}} > {props.name} </Text>
        <Ionicons name={Icons.DOWN_ARROW} color={Colors.grey} size={24} />
      </TouchableOpacity>
    </View>
  )
}

export default Cat2Screen;

const styles = StyleSheet.create({
    categories: {
        alignItems: 'center',
        padding: 10,
        marginHorizontal: 10,
        backgroundColor: Colors.white,
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      catoContainer: {
        height: 50, 
        width: 50,
      },
      imageWidth: {
          borderRadius: 10,
          borderWidth: 1,
          padding: 5
      }
})
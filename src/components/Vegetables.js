import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import React, { useRef, useState } from 'react'
import { Colors, Icons } from '../CommonConfig/CommonConfig';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';


const { width } = Dimensions.get('window')
const height = width * 100 / 0.6

const VegetablesComp = (props) => {

  return (
    <View key={props.id} style={styles.main} >
      <Image source={props.image} style={styles.imageCato} />
      <View style={styles.hori} >
        <Text style={styles.name} >{props.name}</Text>

        <View style={styles.container} >
          <TouchableOpacity style={styles.button} >
            <Text style={styles.weight} >{props.weight[0]}</Text>
            <Ionicons name={Icons.DOWN_ARROW} size={24} color={Colors.grey} />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', flex:1}} >
          <View style={{flex:1}}>
            <Text style={styles.price} >{props.price}</Text>
            <Text style={styles.discount} >{props.disPrice}</Text>
          </View>
          <TouchableOpacity style={{flex:1}}>
            <Text> Add </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageCato: {
    height: 100,
    width: 100,
    borderRadius: 10,
    // flex: 1
  },
  main: {
    flex: 1,
    flexDirection: 'row',
    padding: 10
  },
  name: {
    color: Colors.grey,
    fontWeight: 'bold',

  },
  price: {
    color: Colors.grey,
    fontSize: 14,
    textDecorationLine: 'line-through',

  },
  discount: {
    fontWeight: 'bold',
    fontSize: 18
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15
  },
  button: {
    flexDirection: 'row',
    borderColor: Colors.grey,
    borderWidth: 0.5,
    width: '60%',
    justifyContent: 'space-between',
    borderRadius: 10,
    padding: 5
  },
  container: {
    marginTop: 10,
    marginBottom: 10
  },
  hori: {
    paddingHorizontal: 20
  },
  weight: {
    fontSize: 16,
    color: Colors.grey,
    marginHorizontal: 10,
  }
})

export default VegetablesComp;
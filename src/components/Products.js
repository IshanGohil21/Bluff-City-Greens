import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

import { Colors } from '../CommonConfig/CommonConfig';

const Products = (props) => {
  return (
    <View style={styles.main} >
      <Text style={styles.name} >{props.title}</Text>
      <View style={styles.all} >
        <Image source={{ uri: props.image }} style={styles.image} />
        <View style={{ marginRight: 80 }}>
          <Text style={styles.title} >{props.name}</Text>
          <Text style={styles.net} >Net wt: {props.size}</Text>
          <Text style={styles.net} >Qty: {props.qty}</Text>
        </View>
        <View style={{ marginRight: 30 }} >
          <Text style={styles.price} >${props.price}</Text>
        </View>
      </View>
      <View style={styles.line} />
    </View>
  )
}

export default Products

const styles = StyleSheet.create({
  main: {
    flex: 1
  },
  name: {
    fontSize: 14,
    padding: 5,
    color: Colors.black
  },
  image: {
    padding: 10,
    marginBottom: 10,
    height: 70,
    width: 70
  },
  all: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 16,
    color: Colors.grey,
    fontWeight: 'bold'
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.grey
  },
  line: {
    height: 0,
    borderColor: Colors.grey,
    borderWidth: 0.5,
    width: '100%',
  },
  net: {
    color: Colors.grey
  }
})
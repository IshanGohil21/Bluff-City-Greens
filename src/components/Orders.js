import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, TextInput, Image, Dimensions } from 'react-native';
import React from 'react'

import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Icons, Images } from '../CommonConfig/CommonConfig';

import { useSelector, useDispatch } from 'react-redux';
import * as CartActions from '../Redux/Action/Cart';


const { width } = Dimensions.get('window')
const height = width * 100 / 0.6

const Orders = (props) => {
  const cartItems = useSelector( state => {
    const updatedCartItems = [];
    for ( const key in state.Cart.items ) {
        updatedCartItems.push({
            ...state.Cart.items[key]
        });
    }
    return updatedCartItems.sort( (a,b) => a.id > b.id ? 1 : -1);
})

    return (
        <View>
    <TouchableOpacity style={styles.orders} onPress={props.onHeart} >
        <Ionicons name='heart' size={30} color={Colors.red} />
    </TouchableOpacity>
    <TouchableOpacity style={ styles.orderContainer} onPress={props.onClick} >
        <View  style={styles.ordersScreen}>
        <Image source={props.image} style={styles.image2} />
        {/* Text Container */}
        <View style={styles.textContainer} >
        {/* Title Weight */}
        <View>
            <Text style={styles.text} >{props.name}</Text>
            <Text style={styles.text2}>Net wt. {props.weight}</Text>
        </View>
        {/* Price */}
        <View>
            <Text style={styles.price1} >{props.price}</Text>
        </View>
        </View>
        </View>
        {/* Button */}
         <TouchableOpacity style={styles.addButton}  >
            <Ionicons  name={Icons.CART} size={24} color={Colors.white}/>
            <Text style={styles.button} >ADD</Text>
        </TouchableOpacity> 
    </TouchableOpacity>
    </View>
    )
}

export default Orders

const styles = StyleSheet.create({
    main: {
      flex: 1,
      justifyContent: 'center',
    },
    header: {
      // flex: 1,
      justifyContent: 'flex-start',
      backgroundColor: Colors.primary,
      flexDirection: 'row',
      marginTop: 20
    },
    title: {
      flex: 1,
      justifyContent: 'flex-start',
      backgroundColor: Colors.primary,
  
    },
    drawer: {
      padding: 20
    },
    deliver: {
      color: Colors.white,
      marginTop: 25,
    },
    address: {
      fontWeight: 'bold',
      fontSize: 18,
      color: Colors.white
    },
    location: {
      flexDirection: 'row'
    },
    notify: {
      marginTop: 40,
      marginLeft: 10
    },
    searchContainer:
    {
      width: '80%',
      height: 30,
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: Colors.white,
      //marginTop: 10,
      borderRadius: 5,
      marginBottom: 10
    },
    vwSearch: {
      flex: 0.2,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    textInput: {
      // backgroundColor: 'green',
      flex: 1,
    },
    filter: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginTop: 10,
      padding: 5
    },
    body: {
      flex: 3
    },
    imageContainer: {
      width: '100%',
      height: 300
    },
    paging: {
      color: Colors.grey,
      margin: 5,
    },
    pagingActive: {
      color: Colors.white,
      margin: 5,
    },
    scroll: {
      flexDirection: 'row',
      position: 'absolute',
      bottom: 0,
      alignSelf: 'center',
      zIndex: 10
    },
    discount: {
      width: '100%',
      height: 160,
    },
    common: {
      fontSize: 20,
      fontWeight: '900',
    },
    commonContainer: {
      padding: 10
    },
    categories: {
      alignItems: 'center',
      padding: 10,
      marginHorizontal: 10,
      backgroundColor: Colors.white
    },
    text: {
      fontSize: 16,
      fontWeight: '600',
      color: Colors.grey
    },
    text2: {
      color: Colors.grey,
      fontWeight: '300',
      fontSize: 12
    },
    price1: {
      fontSize: 20,
      marginHorizontal: 30,
      fontWeight: 'bold'
    },
    orders: {
      position: 'absolute', 
      bottom: 170, 
      left: width * 0.5 - 15, 
      zIndex: 10  
    },
    orderContainer: {
      flex: 1, 
      width: width * 0.50, 
      height: 200, 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      marginHorizontal: 15, 
      borderBottomRightRadius: 15, 
      borderBottomLeftRadius: 15 
    },
    addButton: {
      flexDirection: 'row',
      backgroundColor: Colors.primary, 
      width: '100%', 
      alignItems:'center', 
      justifyContent:'center',
      padding: 10,  
      borderBottomRightRadius: 15, 
      borderBottomLeftRadius: 15
    },
    button: {
      color:Colors.white, 
      fontSize: 20,
      fontWeight: '700'
    },
    image2: {
      width: width * 0.25, 
      height: width * 0.25 
    },
    heading: {
      flexDirection: 'row', 
      padding: 10 
    },
    view: {
      color: Colors.primary,
      fontSize: 16
    },
    textContainer: {
      flexDirection: 'row',
    },
    ordersScreen: {
      alignItems:'center', 
      padding: 10
    }
  });
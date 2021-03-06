import { View, Text, StyleSheet, TouchableOpacity, StatusBar,  TextInput, Image, Dimensions } from 'react-native';
import React from 'react'

import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Icons, Images } from '../CommonConfig/CommonConfig';


const { width } = Dimensions.get('window')
const height = width * 100 / 0.6

const randomColor = Math.floor(Math.random()*16777215).toString(16);
// console.log(randomColor);

const ShopProductsScreen = (props) => {
    return (
    <View style={styles.popularMain} >
            {/* Image Container */}
            <TouchableOpacity  onPress={props.onPress} activeOpacity={0.5} style={styles.images} >
            
        <View  style={{...styles.ordersScreen,  borderColor: `#${randomColor}` }}>
            <Image source={{uri : props.images}} style={styles.image2} />
        </View>
        {/* Name */}
        <Text style={styles.pname} >{props.Pname}</Text>
        {/* Button */}
        <Ionicons name={Icons.RIGHT} size={28} color={Colors.grey} />
            </TouchableOpacity>
    </View>
    )
}

export default ShopProductsScreen;

const styles = StyleSheet.create({
    
    image2: {
      width: width * 0.13, 
      height: width * 0.13,
      
    },
    ordersScreen: { 
      padding: 5,
      marginHorizontal: 5,
      borderRadius: 10,
      borderWidth: 1,
      padding: 5,
    },
    images:{
        flexDirection: 'row', 
        alignItems: 'center',
        padding:10,
        justifyContent: 'space-between',
        paddingRight: 30,
        paddingLeft: 5,
    },
    pname:{
        fontSize: 16,
        fontWeight: '800',
        color: Colors.black 

    },
});


import { View, Text, StyleSheet, TouchableOpacity, StatusBar,  TextInput, Image, Dimensions } from 'react-native';
import React from 'react'

import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Icons, Images } from '../CommonConfig/CommonConfig';


const { width } = Dimensions.get('window')
const height = width * 100 / 0.6

const ShopProductsScreen = (props) => {
    return (
    <View style={styles.popularMain} >
            {/* Image Container */}
            <TouchableOpacity  onPress={props.onPress} activeOpacity={0.5} style={styles.images} >
            
        <View  style={{...styles.ordersScreen,  borderColor: props.color }}>
            <Image source={props.images} style={styles.image2} />
        </View>
        {/* Name */}
        <Text style={styles.pname} >{props.Pname}</Text>
        {/* Button */}
        <Ionicons name={Icons.RIGHT} size={30} color={Colors.grey} />
            </TouchableOpacity>
    </View>
    )
}

export default ShopProductsScreen;

const styles = StyleSheet.create({
    
    image2: {
      width: width * 0.20, 
      height: width * 0.20,
      
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
        padding:15,
        justifyContent: 'space-between',
        paddingRight: 30,
        paddingLeft: 5,
    },
    pname:{
        fontSize: 20,
        fontWeight: '600', 
    },
});


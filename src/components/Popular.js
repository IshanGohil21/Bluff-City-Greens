import { View, Text, StyleSheet, TouchableOpacity, StatusBar,  TextInput, Image, Dimensions } from 'react-native';
import React from 'react'

import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Icons, Images } from '../CommonConfig/CommonConfig';


const { width } = Dimensions.get('window')
const height = width * 100 / 0.6

const Popular = (props) => {
    return (
    <View style={styles.popularMain} >
            {/* Image Container */}
        <View style={styles.imageContainer} >
        <View  style={styles.ordersScreen}>
            <Image source={props.image} style={styles.image2} />
        </View>
        {/* Name, Weight & Price */}
        
        <View >
            <Text style={styles.name} >{props.name}</Text>
            <Text style={styles.weight} >Net wt. {props.weight[0]}</Text>
            <Text style={styles.price} >${props.price}</Text>
        </View>
        </View>
        {/* Addition */}
        
            <TouchableOpacity activeOpacity={0.5}>
                <Ionicons name={Icons.ADD} size={35} color={Colors.primary} style={styles.addition} />
            </TouchableOpacity>
    </View>
    )
}

export default Popular;

const styles = StyleSheet.create({
    
    image2: {
      width: width * 0.25, 
      height: width * 0.25,
      borderRadius: 20 
    },
    ordersScreen: { 
      padding: 10,
      justifyContent:'flex-start',
      marginHorizontal: 5
    },
    popularMain: {
        flexDirection: 'row',
        alignItems: 'center',
         justifyContent:'space-between',
         paddingRight:25,
        paddingLeft: 5
    },
    addition: {
        borderRadius: 10,
        backgroundColor: Colors.transparentGreen ,
    },
    name: {
        fontSize: 14,
        fontWeight: '700',
        color: Colors.grey
    },
    weight: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors.grey
    },
    price: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 20,
        color: Colors.grey
    },
    imageContainer: {
        flexDirection: 'row', 
        alignItems: 'center'
    }
});
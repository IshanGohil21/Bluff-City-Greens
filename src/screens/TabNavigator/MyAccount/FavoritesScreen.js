import React,{useEffect, useState} from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TextInput, Alert, Button, View, Image, TouchableOpacity, Animated, Dimensions } from 'react-native';


import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient  from 'react-native-linear-gradient';

import { RangeSlider } from '@sharcoux/slider'

 const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

 const { width } = Dimensions.get('window')

const FavoritesScreen = props => {
    // const [loding, setLoading] = useState(true);
    // useEffect( () => {
    //     setTimeout( () => {
    //         setLoading(false)
    //     },5000 )
    // },[])
    

    return (
        <View style={{alignItems:'center', justifyContent:'center', marginTop:600}} >

        {/* { loding ? 
        <ShimmerPlaceholder LinearGradient={LinearGradient} height={width} width={width} /> 
:
        <Text>This is a Demo for Shimmer</Text>} */}



        </View>
    
    )
}

const styles= StyleSheet.create({
    track:{
        
    },
    all:{
        flex:1,
        marginHorizontal:50
    }
})

export default FavoritesScreen;
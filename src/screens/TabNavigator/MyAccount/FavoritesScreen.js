import React,{useEffect, useState} from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TextInput, Alert, Button, View, Image, TouchableOpacity, Animated, Dimensions, ToastAndroid } from 'react-native';


import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient  from 'react-native-linear-gradient';
import { RangeSlider } from '@sharcoux/slider';
import { Colors, Icons, Images } from '../../../CommonConfig/CommonConfig';
import { getRequest } from '../../../Helper/ApiHelper'; 
import { FlatList } from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast';

const { width } = Dimensions.get('window')

const FavoritesScreen = props => {
    useEffect( async () => {
        getFav();
    },[])

    const [Favorites, setFavorites] = useState([]);

    const getFav = async () => {
        const response = await getRequest('/customer/get-favourites');
        // console.log("\n\nFavorites                 ", response);

        if(response.success){
            setFavorites(response.data.data)
            // console.log("\n\n\nResponse.data.data for Fav           ", response.data.data);
        }
        else {
            Toast.show('No Favorite Products Found');
        }
    }

    return (
        <View  style={styles.main}>
            {/* Main */}
            <View style={styles.header} >
            {/* Header & Title */}
                <TouchableOpacity style={styles.back} onPress={() => {props.navigation.goBack()} } >
                        <Ionicons name={Icons.BACK_ARROW} size={24} color={Colors.white} style={{marginTop:20}} />
                </TouchableOpacity>   
                <Text style={styles.fav} >Favorites</Text>
            </View>
            {/* Body */}
            <View style={styles.body} >

                <FlatList 
                data={Favorites}
                renderItem={ (item) => {
                    console.log("\n\nItems       ",item);
                    return (
                        <View>
                            <Text>{item.item.name}</Text>
                        </View>
                    )
                } }
                />

            </View>
        </View>
    )
}

const styles= StyleSheet.create({
    main:{
        flex:1,
        // backgroundColor: Colors.primary
    },
    header:{
        flex:1,
        justifyContent:'space-between',
        backgroundColor:Colors.primary,
        padding:10
    },
    back:{
        justifyContent:'space-between', 
    },
    fav:{
        fontSize:24,
        fontWeight:'bold',
        color:Colors.white
    },
    body:{
        flex:3
    }
})

export default FavoritesScreen;
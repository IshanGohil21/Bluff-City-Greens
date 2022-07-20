import React,{useEffect, useState} from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TextInput, Alert, Button, View, Image, TouchableOpacity, Animated, Dimensions, ToastAndroid } from 'react-native';

import { RangeSlider } from '@sharcoux/slider';
import { Colors, Icons, Images } from '../../../CommonConfig/CommonConfig';
import { getRequest } from '../../../Helper/ApiHelper'; 
import { FlatList } from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast';
import Favi from '../../../components/Favi';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import RecommendedProductsCommon from '../../../components/RecommendedProducts';

const { width } = Dimensions.get('window')
const numColumns = 2

const FavoritesScreen = props => {
    useEffect( async () => {
        getFav();
    },[])

    const [Favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getFav = async () => {
        const response = await getRequest('/customer/get-favourites');
        // console.log("\n\nFavorites                 ", response);

        if(response.success){
            setFavorites(response.data.data)
            //  console.log("\n\n\nResponse.data.data for Fav           ", response.data.data);
        }
        else {
            Toast.show('No Favorite Products Found');
        }
        setIsLoading(false)
    }

    return (
        <View  style={styles.main}>
            {/* Main */}
            <View style={styles.header} >
            {/* Header & Title */}
                <TouchableOpacity style={styles.back} onPress={() => {props.navigation.goBack()} }>
                        <Ionicons name={Icons.BACK_ARROW} size={24} color={Colors.white}  />
                </TouchableOpacity>   
                <Text style={styles.fav} >Favorites</Text>
            </View>
            {/* Body */}
            <View style={styles.body} >
            {isLoading ? <ShimmerPlaceholder LinearGradient={LinearGradient} height={800} width={width} /> :
                <FlatList 
                data={Favorites}
                numColumns={2}
                renderItem={ (item) => {
                    //  console.log("\n\nItems       ",item);
                    return (
                        <View key ={item.id} style={styles.favi}>
                            <Favi
                                item={item.item}
                                name={item.item.name}
                                image={item.item.item_images[0]?.image}
                                weight={item.item.item_sizes[0]?.size}
                                price={item.item.item_sizes[0]?.price}
                                onClick={() => { props.navigation.navigate('Recommended_Products', { recommended: item.item, recommendId: item.item.id }) }}
                            />
                        </View>
                    )
                } }
                />
            }
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
        flex:0.6,
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
    },
})

export default FavoritesScreen;
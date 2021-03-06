import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, FlatList, Alert, ScrollView , Image, Dimensions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SearchBarScreen from '../../../components/Slider/SearchBar2';
import { Colors, Images, Icons } from '../../../CommonConfig/CommonConfig';
import Products from '../../../dummy-data/Products';
import ShopProductScreen from '../../../components/Shop';
import { getMainRequest } from '../../../Helper/ApiHelper';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

const { width } = Dimensions.get('window')

const ShopScreen = (props) => {
    const [categories, setCategories] = useState({});
    const [isLoading, setIsLoading] = useState(true);
        
    useEffect( () => {
        getCategoriesShop();
    }, []);

    useEffect( () => {
        setTimeout( () => {
            setIsLoading(false)
        },3000 )
    },[])

    const getCategoriesShop = async() => {
        const response = await getMainRequest('/customer/get-homepage')
        //    console.log("\n\n\n\nShop    ", response.data.categories); 
        let errorMsg = "No Categories to show Right Now"
    
    if (response.success) {
        setCategories(response.data.categories)
    }
    else{
        Alert.alert("Error", errorMsg, [{ text: "Okay" }])
    }
}
    return (
        <View style={styles.main} >
            <StatusBar backgroundColor={Colors.primary} />
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { props.navigation.navigate('Home') }} >
                    <Ionicons name={Icons.BACK_ARROW} size={24} color={Colors.white} style={styles.back} />
                </TouchableOpacity>
                <Text style={styles.shop} > Shop </Text>
            </View>
            {/* Body */}
            <View style={styles.body} >
                <View style={styles.search} >
                    <SearchBarScreen />
                </View>
                {/* Flatlist */}
                  
                <View>
                     <FlatList
                        data={categories}
                        renderItem={({ item, index }) => {
                            console.log("\n\n\n\n\nShop Cato     ",item);
                            return (
                                <View key={index}> 
                                 { isLoading ?  <ShimmerPlaceholder LinearGradient={LinearGradient} height={100} width={width}   /> :
                                    <ShopProductScreen
                                        item={item}
                                        id={item.id}
                                        images={item.image}
                                        Pname={item.title}
                                        color={item.color}
                                        onPress={() => {props.navigation.navigate('Fruits',  {shop: item, shopId: item.id }) }}
                                    />}
                                    <View style={styles.line} />
                                </View>
                            )
                        }}
                    /> 
                </View>
                    
                {/* ScrollView to test wether the called API is running or not */}
                {/* <ScrollView>
                        {
                            categories.map( (item, index) => {
                                console.log("\n\n\n\nHeloooo       ",item);
                                return (
                                    <View key={index} >
                                        <Text>{item.title}</Text>
                                        <Text>{item.items}</Text>
                                        {/* <Image source={{ uri:item.image }} /> */}
                                    {/* </View> */}
                                {/* )

                            } )
                        } */}
                {/* </ScrollView>  */}

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingBottom: 65,
    },
    header: {
        flex: 0.6,
        backgroundColor: Colors.primary,
        justifyContent: 'space-between',
    },
    back: {
        padding:10,
        marginTop:20
    },
    shop: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.white,
    },
    body: {
        flex: 3
    },
    search: {
        justifyContent: 'flex-start',
        padding: 10,
        marginHorizontal:20
    },
    line:{
        height: 0,
        borderColor: Colors.grey,
        borderWidth: 0.5,
        width: '100%',
        marginVertical: 10,
    }

});

export default ShopScreen;

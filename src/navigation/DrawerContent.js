import { StyleSheet, Text, View, StatusBar, TouchableOpacity, FlatList, ScrollView, Alert, Dimensions } from 'react-native'
import React,{ useState, useEffect } from 'react'
import { DrawerContentScrollView, DrawerItem, getIsDrawerOpenFromState } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Icons, Images, Colors } from '../CommonConfig/CommonConfig'
import AccordianProducts from '../components/Accordian(PRODUCTS)';
import Products from '../dummy-data/Products';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SearchBarScreen2 from '../components/SearchBar3';
import { getRequest } from '../Helper/ApiHelper';

import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

const { width } = Dimensions.get('window')

const DrawerContentScreen = (props) => {
    const [isLoading, setIsLoading] = useState({});

    useEffect( () => {
        getDrawer();
    },[])

    useEffect( () => {
        setTimeout( () => {
            setIsLoading(false)
        },6000 )
    },[])

    const [categories, setCategories] = useState([]);

    const getDrawer = async() => {
        const response = await getRequest('/customer/get-homepage');
        // console.log("\n\n\nDrawer Content                 ", response.data);
        let errorMsg = "Something Went Wrong Cant find Home Screen APIs"

        if(response.success){
            setCategories(response.data.categories)
          //  console.log("\n\n\nDrawer and Categories         ", response.data.categories);
        }
        else {
            Alert.alert("Error", errorMsg, [{text: 'Okay'}])
        }
    }

    const renderAccordiansProducts = () => {
        const products = [];
        for (const item of categories) {
            products.push(
                <AccordianProducts
                    Pname={item.title}
                    sub_categories={item.sub_categories}
                    item={item}
                    image={item.image}
                    color={item.color}
                    onClick={() => { props.navigation.navigate('Shop',{ screen: 'Fruits', params:{ shop:item, shopId: item.id  } } ) } }
                />
            )
        }
        
        return products
    }

    return (

        <View style={styles.main} >
           
            <ScrollView showsVerticalScrollIndicator={false}>
            <StatusBar backgroundColor={Colors.primary} />
            {/* Header */}
            
            <View style={styles.mainHeader} >
                <View style={styles.header} >
                    <Text style={styles.categories} >Categories</Text>
                    <TouchableOpacity onPress={() => { props.navigation.goBack() }} >
                        <Ionicons name={Icons.MENU} size={30} color={Colors.white} />
                    </TouchableOpacity>
                </View>
                <View style={styles.search} >
                    <SearchBarScreen2 />
                </View>
            </View>

            {/* Body */}
                { isLoading ?  <ShimmerPlaceholder LinearGradient={LinearGradient} height={600} width={width} />    : 
                <View style={styles.body} >
                    {renderAccordiansProducts()}
                </View>
            }
            </ScrollView>
            
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop:10
    },
    categories: {
        fontSize: 24,
        color: Colors.white,
        fontWeight: '700'
    },
    body: {
        flex: 3,
        backgroundColor: Colors.white,
    },
    mainHeader: {
        flex: 1.5,
        backgroundColor: Colors.primary,
        padding: 20,
    },
    search: {
        marginTop: 40
    },
    mapping: {
        alignItems: 'flex-start',
        marginTop: 10,
        flexDirection: 'row'
    }
})

export default DrawerContentScreen;


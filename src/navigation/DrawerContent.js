import { StyleSheet, Text, View, StatusBar, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Icons, Images, Colors } from '../CommonConfig/CommonConfig'
import AccordianProducts from '../Components/Accordian(PRODUCTS)';
import Products from '../dummy-data/Products';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SearchBarScreen3 from '../Components/SearchBar3';

const DrawerContentScreen = (props) => {
    const renderAccordiansProducts = () => {
        const products = [];
        for (const item of Products) {
            products.push(
                <AccordianProducts
                    Pname={item.Pname}
                    subname={item.subname}
                    image={item.images}
                    color={item.color}
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
                    <SearchBarScreen3 />
                </View>
            </View>

            {/* Body */}
            
                <View style={styles.body} >
                    {renderAccordiansProducts()}
                </View>
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
        justifyContent: 'space-between'
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
        marginTop: 20,
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


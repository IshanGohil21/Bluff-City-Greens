import { StyleSheet, Text, View, StatusBar, TouchableOpacity, ScrollView, FlatList, Dimensions } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'

import { Colors, Icons, Images } from '../../../CommonConfig/CommonConfig';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchBarScreen from '../../../components/Slider/SearchBar2';
import VegetablesComp from '../../../components/Vegetables';
import VeggiComp from '../../../components/VeggiMain';

import RBSheet from "react-native-raw-bottom-sheet";
import { RadioButton } from 'react-native-paper';
import { useSelector } from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

const { width } = Dimensions.get('window')

const VegetableScreen = (props) => {
    const refRBSheet = useRef();
    const [checked, setChecked] = useState('first')
    const [isLoading, setIsLoading] = useState(true)

    const cartItems = useSelector(state => {
        const updatedCartItems = [];
        for (const key in state.Cart.items) {
            updatedCartItems.push({
                ...state.Cart.items[key]
            });
        }
        return updatedCartItems.sort((a, b) => a.id > b.id ? 1 : -1);
    })
    // console.log(cartItems);

    const subTotal = (cartItems.length ? cartItems.reduce((a, c) => a + c.itemTotal, 0) : 0)
    //  console.log("\n\nsub total                 ",subTotal);

    const veggieId = props.route.params.vegiId
    // console.log(veggieId);

    const veggiAll = props.route.params.vegi
    //console.log("\n\n\n\nAll Products    ", veggiAll.title);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }, [])

    return (
        <>
            <View style={styles.main} >
                <StatusBar backgroundColor={Colors.primary} />
                {/* Header */}
                <View style={styles.header} >
                    <View style={styles.row} >
                        <TouchableOpacity onPress={() => { props.navigation.goBack() }} >
                            <Ionicons name={Icons.BACK_ARROW} size={28} color={Colors.white} style={styles.back} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { props.navigation.navigate('Checkout') }} >
                            <Ionicons name={Icons.CART} size={28} color={Colors.white} style={styles.back} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.heading} >
                        <Text style={styles.titleFruit} >{veggiAll.title}</Text>
                        <TouchableOpacity onPress={() => { props.navigation.navigate('Filter') }} >
                            <Ionicons name={Icons.OPTIONS} size={35} color={Colors.white} />
                        </TouchableOpacity>
                    </View>

                </View>
                {/* Body */}
                <View style={styles.body} >
                    <ScrollView>
                        <View style={styles.search} >
                            <SearchBarScreen />

                        </View>
                        <View>
                            <FlatList
                                data={veggiAll.items}
                                renderItem={({ item }) => {
                                    //  console.log("\n\n\n\nFinal Products "        , item);
                                    return (
                                        <View key={item.id} >
                                            {isLoading ? <ShimmerPlaceholder LinearGradient={LinearGradient} height={150} width={width} contentStyle={styles.content} /> :
                                                <VeggiComp
                                                    item={item}
                                                    id={item.id}
                                                    image={item.item_images[0].image}
                                                    name={item.name}
                                                    weight={item.item_sizes[0].size}
                                                    price={item.item_sizes[0].price}
                                                    disPrice={item.item_sizes[0].price}
                                                    onPress={() => { }}
                                                />
                                            }
                                            <View style={styles.line} />
                                        </View>
                                    )
                                }}
                            />
                        </View>
                    </ScrollView>
                </View>
            </View>

        </>
    )
}

export default VegetableScreen

const styles = StyleSheet.create({
    main: {
        flex: 1,
        // backgroundColor:Colors.white
    },
    header: {
        flex: 0.5,
        backgroundColor: Colors.primary,
        justifyContent: 'space-between',
        paddingVertical: 10
    },
    back: {
        marginTop: 20,
        padding: 10
    },
    title: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-end',
    },
    titleFruit: {
        fontSize: 30,
        fontWeight: 'bold',
        color: Colors.white
    },
    heading: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10
    },
    body: {
        flex: 3
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    search: {
        padding: 20
    },
    line:{
        height: 0,
        borderColor: Colors.grey,
        borderWidth: 0.5,
        width: '95%',
        marginVertical: 10,
        marginTop: 20,
        flexDirection: 'row',
        marginLeft: 10
    }
})
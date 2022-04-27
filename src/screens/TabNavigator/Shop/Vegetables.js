import { StyleSheet, Text, View, StatusBar, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useRef, useState } from 'react'

import { Colors, Icons, Images } from '../../../CommonConfig/CommonConfig';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchBarScreen from '../../../Components/Slider/SearchBar2';
import Vegetables from '../../../dummy-data/Vegetables';
import VegetablesComp from '../../../Components/Vegetables';
import VeggiComp from '../../../Components/VeggiMain';

import RBSheet from "react-native-raw-bottom-sheet";
import { RadioButton } from 'react-native-paper';
import { useSelector } from 'react-redux';

const VegetableScreen = (props) => {
    const refRBSheet = useRef();
    const [checked, setChecked] = useState('first')

    // const cartItems = useSelector(state => state.Cart.items)

    const cartItems = useSelector( state => {
        const updatedCartItems = [];
        for ( const key in state.Cart.items ) {
            updatedCartItems.push({
                ...state.Cart.items[key]
            });
        }
        return updatedCartItems.sort( (a,b) => a.id > b.id ? 1 : -1);
    })
    console.log(cartItems);

    const subTotal = (cartItems.length ? cartItems.reduce( (a,c) => a + c.itemTotal, 0 ) : 0)
    console.log(subTotal);

    return (

        <>
            <ScrollView>
                <View style={styles.main} >
                    <StatusBar backgroundColor={Colors.primary} />
                    {/* Header */}
                    <View style={styles.header} >
                        <View style={styles.row} >
                            <TouchableOpacity onPress={() => { props.navigation.goBack() }} >
                                <Ionicons name={Icons.BACK_ARROW} size={28} color={Colors.white} style={styles.back} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {props.navigation.navigate('Checkout')}} >
                                <Ionicons name={Icons.CART} size={28} color={Colors.white} style={styles.back} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.heading} >
                            <Text style={styles.titleFruit} >Fresh Vegetables</Text>
                            <TouchableOpacity onPress={() => { props.navigation.navigate('Filter') }} >
                                <Ionicons name={Icons.OPTIONS} size={35} color={Colors.white} />
                            </TouchableOpacity>
                        </View>

                    </View>
                    {/* Body */}
                    <View style={styles.body} >
                        <View style={styles.search} >
                            <SearchBarScreen />
                            
                        </View>
                        <View>
                            <FlatList
                                data={Vegetables}
                                renderItem={({ item }) => {
                                    return (
                                        <View key={item.id} >
                                             <VeggiComp 
                                                item = {item}
                                                image={item.image}
                                                name={item.name}
                                                weight={item.weight}
                                                price={item.price}
                                                disPrice={item.disPrice}  
                                                onPress={ () =>{}}
                                            />
                                            
                                        </View> 
                                    )
                                }}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

export default VegetableScreen

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    header: {
        flex: 1,
        backgroundColor: Colors.primary,
        justifyContent: 'space-between'
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
    }
})
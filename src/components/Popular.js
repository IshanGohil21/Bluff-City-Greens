import { View, Text, StyleSheet, TouchableOpacity, StatusBar, TextInput, Image, Dimensions } from 'react-native';
import React, { useState } from 'react'

import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Icons, Images } from '../CommonConfig/CommonConfig';
import * as CartActions from '../Redux/Action/Cart';
import { useDispatch, useSelector } from 'react-redux'

const { width } = Dimensions.get('window')
const height = width * 100 / 0.6

const Popular = (props) => {

    const items = props.item
    // console.log("props common\n",items);
    const [weight, setWeight] = useState(items?.item_sizes[0])
    // console.log(weight);

    const cartItems = useSelector(state => {
        const updatedCartItems = [];
        for (const key in state.Cart.items) {
            updatedCartItems.push({
                ...state.Cart.items[key]
            });
        }
        return updatedCartItems.sort((a, b) => a.id > b.id ? 1 : -1);
    })
    //    console.log("Recommended",cartItems);

    const dispatch = useDispatch();
    const x = cartItems.find(item => item?.itemSizeId === weight.id);
    //    console.log(x);

    return (
        <View style={styles.popularMain} >
            {/* Image Container */}
            <View style={styles.imageContainer} >
                <TouchableOpacity style={styles.ordersScreen} onPress={props.onClick} >
                    <Image source={{ uri: props.image }} style={styles.image2} />
                </TouchableOpacity>
                {/* Name, Weight & Price */}

                <View >
                    <Text style={styles.name} >{props.name}</Text>
                    <Text style={styles.weight} >Net wt. {props.weight}</Text>
                    <Text style={styles.price} >${props.price}</Text>
                </View>
            </View>

            <View>

                {x ?
                    <View style={{ flexDirection: 'row', }} >
                        <TouchableOpacity activeOpacity={0.5} onPress={() => { dispatch(CartActions.addToCart(items, weight)) }} >
                            <Ionicons name={Icons.ADD} size={28} color={Colors.primary} />
                        </TouchableOpacity>

                        <Text style={styles.qtyText} > {x?.qty} </Text>

                        <TouchableOpacity activeOpacity={0.5} onPress={() => { dispatch(CartActions.removeFromCart(items, weight)) }} >
                            <Ionicons name={Icons.SUB} size={28} color={Colors.primary} />
                        </TouchableOpacity>
                    </View>
                    :

                    <TouchableOpacity activeOpacity={0.5} onPress={() => { dispatch(CartActions.addToCart(items, weight)) }} >
                        <Ionicons name={Icons.ADD} size={35} color={Colors.primary} style={styles.addition} />
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

export default Popular;

const styles = StyleSheet.create({

    image2: {
        width: width * 0.2,
        height: width * 0.2,
        borderRadius: 20,
        backgroundColor: Colors.white
    },
    ordersScreen: {
        padding: 10,
        justifyContent: 'flex-start',
        marginHorizontal: 5,
       
    },
    popularMain: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 25,
        paddingLeft: 5
    },
    addition: {
        borderRadius: 10,
        backgroundColor: Colors.transparentGreen,
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
        alignItems: 'center',

    },
    qtyText: {
        color: Colors.grey,
        fontSize: 16,
        fontWeight: 'bold',
        alignItems:'center'
    },
});
import React from 'react';
import { View,Text, StyleSheet, TouchableOpacity, StatusBar, FlatList, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Icons, Colors } from '../../../CommonConfig/CommonConfig';
import Vegetables  from '../../../dummy-data/Vegetables';
import Cartcomp from '../../../Components/Cartcomp';
import { useDispatch, useSelector } from 'react-redux';

const CheckoutScreen = (props) => {
    const cartItems = useSelector( state => {
        const updatedCartItems = [];
        for ( const key in state.Cart.items ) {
            updatedCartItems.push({
                ...state.Cart.items[key]
            });
        }
        return updatedCartItems.sort( (a,b) => a.id > b.id ? 1 : -1);
    })
    // console.log(cartItems);

    const subTotal = (cartItems.length ? cartItems.reduce( (a,c) => a + c.itemTotal, 0 ) : 0)
    // console.log(subTotal);

    const Delivery = 0.5

    return (
        <ScrollView>
        <View style={styles.main} >
            <StatusBar backgroundColor={Colors.primary} />
            {/* Header */}
            <View style={styles.header} >
                <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
                    <Ionicons name={Icons.BACK_ARROW} size={24} color={Colors.white} />
                </TouchableOpacity>
                <Text style={styles.cartext} >Cart</Text>
            </View>
            {/* Body */}
            <View style={styles.body} >
                <View>

                    <FlatList
                        data={cartItems}
                        renderItem={({ item }) => {
                            return (
                                <View key={item.id} >
                                    <Cartcomp
                                        item={item}
                                        id={item.id}
                                        image={item.image}
                                        name={item.name}
                                        weight={item.weight}
                                        price={item.price}
                                        disPrice={item.disPrice}
                                        onPress={() => { }}
                                    />
                                </View>
                            )
                        }}
                    />
                    <View style={styles.total} >
                        <Text style={styles.text2} >Sub Total</Text>
                        <Text style={styles.text3} >${subTotal.toFixed(2)}</Text>
                    </View>
                    <View style={styles.total} >
                        <Text style={styles.text2} >Delivery Charges</Text>
                        <Text style={styles.text3} >${Delivery}</Text>
                    </View>

                    <View style={styles.total} >
                        <Text style={styles.bold} >Total Amount</Text>
                        <Text style={styles.bold2} >${(Delivery + subTotal).toFixed(2) }</Text>
                    </View>

                    <View style={styles.final} >
                    <TouchableOpacity style={styles.signin} onPress={() => {props.navigation.navigate('DeliveryCheckout')} } >
                        <Text style={styles.CheckboxButton} >CHECKOUT</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonContinue}  onPress={() => {props.navigation.navigate('Home')}} >
                        <Text style={styles.continue} >Continue Shopping</Text>
                    </TouchableOpacity>
                    </View>


                </View> 
            </View>
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    main: {
        flex:1
    },
    header:{
        flex: 1,
        backgroundColor: Colors.primary,
        justifyContent:'space-between',
        padding:10,
        marginTop: 20
    },
    cartext:{
        fontSize:24,
        color:Colors.white,
        fontWeight:'bold'
    },
    body:{
        flex: 3
    },
     total: {
         marginTop: 20,
         flexDirection: 'row',
         justifyContent: 'space-between',
         padding: 5,
         paddingHorizontal: 20
     },
     text2: {
         color: Colors.grey,
         fontSize: 16,
         fontWeight: '800'
     },
     text3: {
        color: Colors.black,
        fontSize: 16,
        fontWeight: '800'
     },
     bold: {
        color: Colors.grey,
        fontSize: 20,
        fontWeight: 'bold'
     },
     bold2: {
        color: Colors.black,
        fontSize: 20,
        fontWeight: 'bold'  
     },
     signin: {
        width: "80%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.primary,
        textAlign: 'center',
        padding: 10,
        borderRadius: 10,
        overflow: 'hidden',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 20
    },
    CheckboxButton: {
        fontSize: 20,
        color: Colors.white,
        fontWeight: '800'
    },
    continue:{
        fontSize: 20,
        fontWeight: '800',
        color: Colors.primary
    },
    buttonContinue: {
        alignSelf: 'center',
    },
    final: {
        justifyContent:'space-between',
        alignItems : 'center',
        marginTop: 30
    }
});

export default CheckoutScreen;

import { StyleSheet, Text, View, StatusBar, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { useSelector } from 'react-redux';

import { Icons, Colors, Images } from '../../../../CommonConfig/CommonConfig';
import * as CartActions from '../../../../Redux/Action/Cart';
import RBSheet from "react-native-raw-bottom-sheet";
import Address from '../../../../dummy-data/Address';
import SelectAddComp from '../../../../components/SelectAddComp';
import Products from '../../../../components/Products';

const OrderDetailsScreenAccount = (props) => {
    const orderId = props.route.params.orderId
    const order = props.route.params.order
    // console.log("\n\n\n\n\n\n Orders Details             " ,order);

    const refRBSheet = useRef()

    const [date, setDate] = useState(null);
    const [week, setWeek] = useState(null);

    var RandomNumber = Math.floor(Math.random() * 100) + 100;
    var RandomNumber2 = Math.floor(Math.random() * 1000) + 1000;
    var RandomNumber3 = Math.floor(Math.random() * 100000) + 100000

    const cartItems = useSelector(state => {
        const updatedCartItems = [];
        for (const key in state.Cart.items) {
            updatedCartItems.push({
                ...state.Cart.items[key]
            });
        }
        return updatedCartItems.sort((a, b) => a.id > b.id ? 1 : -1);
    });
    // const x = Address.find(item => item.id  === activeId)
    // // console.log(x);


    const total = useSelector(state => state.Cart.qty)

    const subTotal = (cartItems.length ? cartItems.reduce((a, c) => a + c.itemTotal, 0) : 0);
    const delivery = 0.5;

    const activeId = useSelector(state => state.Address.activeAddress)

    const x = Address.find(item => item.id === activeId)
    // console.log(x);

    return (

        <View style={styles.main} >
            {/* Header & Back Button */}
            <View style={styles.title} >
                <TouchableOpacity onPress={() => { props.navigation.goBack() }} >
                    <Ionicons name={Icons.BACK_ARROW} size={30} color={Colors.white} style={styles.back} />
                </TouchableOpacity>
                <Text style={styles.heading} >Order Details</Text>
            </View>

            {/* Body */}
            <View style={styles.body} >
                <ScrollView>
                    <View style={styles.orderMain} >
                        <View style={styles.order}>
                            <Text style={styles.orderIn} >Order Date :          </Text>
                            <Text style={styles.orderTxt} >{moment(order.item.delivery_date).format('do MMMM YYYY ')}</Text>

                        </View>

                        <View style={styles.order} >
                            <Text style={styles.orderIn} >Order Number :    </Text>
                            <Text style={styles.orderTxt} >{RandomNumber}-{RandomNumber2} </Text>
                        </View>

                        <View style={styles.order} >
                            <Text style={styles.orderIn}>Order Status:        </Text>
                            <Text style={styles.orderTxt}>Order {order.item.status}</Text>
                        </View>

                    </View>

                    
                    <Text style={styles.add}>Product Details</Text>
                    <View style={styles.flat} >
                    <FlatList
                        data={order.item.order_items}
                        showsVerticalScrollIndicator={false}
                        renderItem={(item) => {
                            //console.log("\n\n\n\nProduct Details               ",item);
                            return (
                                <View>
                                    <Products
                                        title={item.item.sub_category.title}
                                        image={item.item.item.item_images[0].image}
                                        name={item.item.item.name}
                                        size={item.item.item_size.size}
                                        qty={item.item.quantity}
                                        price={item.item.item_size.price}
                                    />
                                </View>
                            )
                        }}
                    />
                    </View>

                    <Text style={styles.add} >Delivery Address</Text>

                    {x ?
                        <View style={styles.overall} >
                            <Ionicons name={Icons.PIN_FILLED} size={35} color={Colors.primary} />
                            <View style={{ padding: 10 }} >
                                <Text style={styles.heading1} >  {x.tag} - {x.name}</Text>
                                <Text style={styles.texting} > {x.address} </Text>
                                <Text style={styles.texting} > {x.country} </Text>
                            </View>

                        </View>
                        :
                        <TouchableOpacity style={styles.other} onPress={() => { props.navigation.goBack() }}>
                            <Text style={styles.please} >Please Select Address</Text>
                        </TouchableOpacity>
                    }

                    <Text style={styles.add} >Delivery Date and Time</Text>
                    <View style={styles.del} >
                        <View style={styles.delivery} >
                            <Ionicons name={Icons.CALANDER} size={24} color={Colors.grey} />
                            <Text style={styles.orderIn} >    Delivery Date :</Text>
                            <Text style={styles.week} >{moment(order.item.delivery_date).format('do MMMM YYYY ')}</Text>
                        </View>

                        <View style={styles.delivery2} >
                            <Ionicons name={Icons.TIME} size={24} color={Colors.grey} />
                            <Text style={styles.orderIn} >    Delivery Time:</Text>
                            <Text style={styles.week}>{order.item.delivery_time}</Text>
                        </View>
                    </View>
                    <Text style={styles.add} >Payment Details</Text>

                    <View style={styles.details0} >
                        <View style={styles.details} >
                            <Text style={styles.invoice} >Invoice Number</Text>
                            <Text style={styles.randomNum} >MBPI-{RandomNumber3}</Text>
                        </View>

                        <View style={styles.details} >
                            <Text style={styles.invoice} >Payment Option</Text>
                            <Text style={styles.randomNum} >PayUMoney Wallet</Text>
                        </View>

                        <View style={styles.details} >
                            <Text style={styles.invoice} >Order Items</Text>
                            {/* {y  ?   */}
                            <Text style={styles.randomNum} >{order.item.order_items.length} items</Text>
                            {/* // : null } */}
                        </View>

                        <View style={styles.details} >
                            <Text style={styles.invoice} >Sub Total</Text>
                            <Text style={styles.randomNum}>${order.item.sub_total}</Text>
                        </View>

                        <View style={styles.details} >
                            <Text style={styles.invoice} >Delivery Charges</Text>
                            <Text style={styles.randomNum}>${order.item.delivery_charge}</Text>
                        </View>

                        <View style={styles.details1} >
                            <Text style={styles.total} >Total Amount</Text>
                            <Text style={styles.amt} >${order.item.total_amount}</Text>
                        </View>

                    </View>

                    <View>
                        <TouchableOpacity style={styles.signin} onPress={() => {props.navigation.navigate('Report')}} >
                            <Text style={styles.confirm} >REPORT ISSUE</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    title: {
        flex: 0.5,
        justifyContent: 'space-between',
        backgroundColor: Colors.primary,
        paddingVertical: 10,
        padding: 10
    },
    back: {
        marginTop: 30
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.white
    },
    body: {
        flex: 3,
    },
    order: {
        alignItems: 'center',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    orderIn: {
        fontSize: 18,
        fontWeight: '800'
    },
    orderTxt: {
        fontSize: 18,
        color: Colors.grey,
        fontWeight: '700'
    },
    orderMain: {
        marginLeft:20,
        marginRight:20,
        marginTop:20,
        padding:20,
        elevation: 10,
        overflow:'hidden',
        borderRadius:10,
        backgroundColor:Colors.white
    },
    flat:{
        marginLeft:20,
        marginRight:20,
        marginTop:20,
        padding:20,
        elevation: 10,
        overflow:'hidden',
        borderRadius:10,
        backgroundColor:Colors.white
    },
    del:{
        marginLeft:20,
        marginRight:20,
        marginTop:10,
        padding:10,
        elevation: 10,
        overflow:'hidden',
        borderRadius:10,
        backgroundColor:Colors.white
    },
    add: {
        padding: 10,
        fontSize: 22,
        justifyContent: 'flex-start',
        fontWeight: 'bold',
        marginTop: 10
    },
    delivery: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 20,
        alignItems: 'center'
    },
    week: {
        paddingHorizontal: 20,
        color: Colors.grey
    },
    delivery2: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20
    },
    details0: {
       marginTop:10
    },
    invoice: {
        fontWeight: '600',
        color: Colors.grey,
        fontSize: 16,
        padding: 5
    },
    randomNum: {
        fontSize: 19,
        color: Colors.black
    },
    total: {
        fontWeight: 'bold',
        color: Colors.grey,
        fontSize: 20
    },
    details1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 20
    },
    amt: {
        fontWeight: 'bold',
        fontSize: 20,
        color: Colors.black
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
        marginTop: 25,
        marginBottom: 30
    },
    confirm: {
        fontSize: 18,
        color: Colors.white,
        fontWeight: 'bold'
    },
    placed: {
        fontSize: 20,
        fontWeight: '600',
        padding: 10
    },
    confirm1: {
        fontSize: 20,
        color: Colors.primary,
    },
    signin2: {
        width: "80%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.primary,
        textAlign: 'center',
        padding: 10,
        borderRadius: 10,
        overflow: 'hidden',
        alignSelf: 'center',
        // marginTop: 5,
        // marginBottom: 30
    },
    signin3: {
        alignItems: 'center',
        marginTop: 10
    },
    overall: {
        flexDirection: 'row',
        // padding: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 15
    },
    heading1: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    texting: {
        fontSize: 13,
        color: Colors.grey,
    },
    other: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    please: {
        fontSize: 20,
        fontWeight: '800',
        color: Colors.red,
    }

});

export default OrderDetailsScreenAccount;
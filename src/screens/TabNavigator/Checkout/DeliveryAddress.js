import { StyleSheet, Text, View, StatusBar, ScrollView, FlatList, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RadioButton } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { Icons, Colors, Images } from '../../../CommonConfig/CommonConfig';
import Address from '../../../dummy-data/Address';
import SelectAddComp from '../../../Components/SelectAddComp';
import Card from '../../../dummy-data/Card';
import CardsComp from '../../../Components/CardsComp';
import { getRequest } from '../../../Helper/ApiHelper';
import { Toast } from 'react-native-simple-toast';

const DeliveryAddressScreen = (props) => {
    const [checked, setChecked] = useState('first');

    const [state, setState] = useState('Card');

    const [isLoading, setIsLoading] = useState({});

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
    // console.log(subTotal);

    const Delivery = 0.5;

    const cardItems = useSelector(state => {
        const updatedCardItems = [];
        for (const key in state.Card.paymentMethods) {
            updatedCardItems.push({
                ...state.Card.paymentMethods[key]
            });
        }
        return updatedCardItems.sort((a, b) => a.id > b.id ? 1 : -1);
    })

    // console.log("CARD_ITEMS         ",cardItems);
    useEffect(() => {
        getCard();
        setIsLoading(false);
    },[]);

    const [credit, setCredit] = useState([]);
    const getCard = async() => {
        const response = await getRequest('/customer/get-card');
        //console.log("n\n\n\n\n\nCARD     ",response.data );
        let errorMsg = 'No Credit Cards to Show!';

        if(response.success){
            setCredit(response.data.cards.data);
           // console.log("\n\n\n\nMAIN_CARD_DETAILS"        ,response.data.cards.data);
        }
        else {
            // Toast.show('Initially add card to save & access the card ')
            Alert.alert("Error", errorMsg, [{ text: "Okay" }])
        }
    }

    return (
        <ScrollView>
            {/* // Main Screen Styling */}
            <View style={styles.main} >
                <StatusBar backgroundColor={Colors.primary} />
                {/* Header */}
                <View style={styles.header} >
                    <TouchableOpacity onPress={() => { props.navigation.goBack() }} >
                        <Ionicons name={Icons.BACK_ARROW} color={Colors.white} size={30} style={styles.back} />
                    </TouchableOpacity>
                    <Text style={styles.checkout} >Checkout</Text>
                </View>
                {/* Body */}
                <View style={styles.body} >
                    <View style={styles.headings} >
                        <Text style={styles.deliveryText} >Delivery Address</Text>
                        <TouchableOpacity   onPress={() =>  {props.navigation.navigate('MyAccount', {screen: 'AddNewAddress'})}} >
                            <Text style={styles.newAdd} >Add New</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={Address}
                            renderItem={({ item }) => {
                                return (
                                    <View key={item.id}  >
                                        <SelectAddComp
                                            item={item}
                                            id={item.id}
                                            tag={item.tag}
                                            name={item.name}
                                            address={item.address}
                                            country={item.country}
                                        />
                                    </View>
                                )
                            }}
                        />
                    </View>
                    {/* Delivery */}
                    <View style={styles.delivery} >
                        <Text style={styles.schedule} >Schedule Delivery</Text>
                    </View>
                    <TouchableOpacity style={styles.deliveryTime} onPress={() => {props.navigation.navigate('ScheduleDelivery')} }  >
                        <Image source={Images.timetable} style={styles.timetable} />
                        <Text>Date</Text>
                        <Text>Time</Text>
                        <Ionicons name={Icons.DOWN_ARROW} color={Colors.grey} size={24} />
                    </TouchableOpacity>

                    {/* Payment Method */}
                    <View style={styles.deliver0} >
                        <Text style={styles.schedule} >Payment Method</Text>
                        <TouchableOpacity onPress={()  => {props.navigation.navigate('AddCard')} } >
                            <Text style={styles.newAdd} >Add New</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.buttonContainer} >
                        <View style={styles.button} >
                            <RadioButton
                                value="first"
                                color={Colors.primary}
                                status={checked === 'first' ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setChecked('first')
                                    setState('Card')
                                }}
                            />
                            <Text>Card</Text>
                        </View>

                        <View style={styles.button} >
                            <RadioButton
                                value="second"
                                color={Colors.primary}
                                status={checked === 'second' ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setChecked('second')
                                    setState('Cash')
                                }}
                            />
                            <Text>Cash or EBT</Text>
                        </View>
                    </View>
                    {/* Adding Credit or Debit Card */}
                    {state === 'Card' ? <View>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={credit}
                            renderItem={({ item, index }) => {
                             //   console.log("\n\n\n\n\nCARD_ITEMDATA         ",item);
                                return (
                                    <View key={index} >
                                        <CardsComp
                                            item={item}
                                            id={item.id}
                                            number={item.last4}
                                            image={item.image}
                                            brand={item.brand}
                                        /> 
                                       
                                    </View>
                                )
                            }}
                        />

                    </View> :
                        <View style={styles.cod} >
                            <Image source={Images.money} style={styles.cash} />
                            <Text style={styles.codText} >Cash on Delivery</Text>
                        </View>
                    }

                        {/* To Test Wether the API Called is running or not */}
                    {/* <ScrollView>
                        {
                            credit.map( (item, index) => {
                              //  console.log(item);
                                return (
                                    <View key={index} style={{flexDirection:'row'}} >
                                        <Text>{item.last4}</Text>
                                        <Text>{item.brand}</Text>
                                    </View>
                                )
                            }

                            )
                        }
                    </ScrollView> */}
                    {/* Total */}
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
                        <Text style={styles.bold2} >${(Delivery + subTotal).toFixed(2)}</Text>
                    </View>

                    <TouchableOpacity style={styles.signin}  onPress={() => {props.navigation.navigate('Orders')} } >
                        <Text style={styles.CheckboxButton} >PLACE ORDER</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    header: {
        flex: 1,
        backgroundColor: Colors.primary,
        justifyContent: 'space-between',
        marginTop: 10
    },
    checkout: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.white
    },
    body: {
        flex: 3
    },
    headings: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        padding: 10
    },
    deliveryText: {
        fontSize: 10,
        fontWeight: '700',
        fontSize: 19
    },
    newAdd: {
        color: Colors.primary,
        fontSize: 14
    },
    delivery: {
        padding: 20
    },
    schedule: {
        fontSize: 19,
        color: Colors.black,
        fontWeight: 'bold'
    },
    deliveryTime: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
    },
    button: {
        color: Colors.white,
        fontSize: 20,
        fontWeight: '700',
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        marginHorizontal: 10,
    },
    deliver0: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 10
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
        marginTop: 40,
        marginBottom: 20
    },
    CheckboxButton: {
        fontSize: 20,
        color: Colors.white,
        fontWeight: '800',
    },
    back: {
        marginTop: 30
    },
    timetable: {
        height: 35,
        width: 35,
        
    },
    cod: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10
    },
    cash: {
        height: 60,
        width: 60,
        marginHorizontal: 50
    },
    codText: {
        fontSize: 19,
        color: Colors.grey
    }
});

export default DeliveryAddressScreen
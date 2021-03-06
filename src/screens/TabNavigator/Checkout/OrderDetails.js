import { StyleSheet, Text, View, StatusBar, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'react-moment';

import { Icons, Colors, Images } from '../../../CommonConfig/CommonConfig';
import { useSelector, useDispatch } from 'react-redux';
import RBSheet from "react-native-raw-bottom-sheet";
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderDetailsScreen = (props) => {
  const refRBSheet = useRef();
  const dispatch = useDispatch();

  const Order = props.route.params.order;
    // console.log("Oder reciept         ",Order);

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

  const abc = cartItems?.length;

  const subTotal = (cartItems.length ? cartItems.reduce((a, c) => a + c.itemTotal, 0) : 0);
  const delivery = 0.5;

  const date = useSelector(state => state.Order.date)
  const time = useSelector(state => state.Order.time)

  const [activeAddress, setActiveAddress] = useState({})
  // console.log("\n\nActive null        ", activeAddress)

  useEffect(async () => {
    setActiveAddress(JSON.parse(await AsyncStorage.getItem('activeAddress')))
  }, [])

  const tag = (address_type) => {
    if (address_type === 0) return "Home"
    if (address_type === 1) return "Work"
    if (address_type === 2) return "Other"
  }

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
              <Text style={styles.orderTxt} > {date}</Text>
            </View>

            <View style={styles.order} >
              <Text style={styles.orderIn} >Order Number :    </Text>
              <Text style={styles.orderTxt} >{RandomNumber}-{RandomNumber2} </Text>
            </View>
          </View>
          <Text style={styles.add} >Delivery Address</Text>

          {activeAddress !== null ?
            <View style={styles.overall} >
              <Ionicons name={Icons.PIN_FILLED} size={35} color={Colors.primary} />
              <View style={{ padding: 10 }} >
                <Text style={styles.heading1} >  {tag(activeAddress.address_type)} - {activeAddress.primary_address}</Text>
                <Text style={styles.texting} > {activeAddress.addition_address_info} </Text>
              </View>

            </View>
            :
            <TouchableOpacity style={styles.other} onPress={() => { props.navigation.goBack() }}>
              <Text style={styles.please} >Please Select Address</Text>
            </TouchableOpacity>
          }

          <Text style={styles.add} >Delivery Date and Time</Text>
          <View style={styles.delli} >
            <View style={styles.delivery} >
              <Ionicons name={Icons.CALANDER} size={24} color={Colors.grey} />
              <Text style={styles.orderIn} > Delivery Date :</Text>
              <Text style={styles.week} >{date}</Text>
            </View>

            <View style={styles.delivery2} >
              <Ionicons name={Icons.TIME} size={24} color={Colors.grey} />
              <Text style={styles.orderIn} > Delivery Time:</Text>
              <Text style={styles.week}>{time}</Text>
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
              <Text style={styles.randomNum} >{abc} items</Text>
            </View>

            <View style={styles.details} >
              <Text style={styles.invoice} >Sub Total</Text>
              <Text style={styles.randomNum} >${subTotal.toFixed(2)}</Text>
            </View>

            <View style={styles.details} >
              <Text style={styles.invoice} >Delivery Charges</Text>
              <Text style={styles.randomNum} >${delivery}</Text>
            </View>

            <View style={styles.details1} >
              <Text style={styles.total} >Total Amount</Text>
              <Text style={styles.amt} >${subTotal > 0 ? ((subTotal + delivery).toFixed(2)) : 0}</Text>
            </View>

          </View>

          <View>
            <TouchableOpacity style={styles.signin} onPress={() => refRBSheet.current.open()} >
              <Text style={styles.confirm} >CONFIRM ORDER</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity style={styles.signin0} onPress={() => {props.navigation.navigate('Cancel', {order: Order})}} >
              <Text style={styles.confirm} >CANCEL ORDER</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.rb} >
            <RBSheet
              ref={refRBSheet}
              closeOnDragDown={true}
              closeOnPressMask={false}
              customStyles={{
                wrapper: {
                  backgroundColor: 'rgba(0,0,0,0.5)',
                },
                draggableIcon: {
                  backgroundColor: Colors.grey,
                  width: 80,
                },
                container: {
                  borderTopLeftRadius: 30,
                  borderTopRightRadius: 30,
                }
              }}
            >
              <View style={{ alignItems: 'center', padding: 10 }} >
                <Ionicons name={Icons.CHECKMARK} color={Colors.primary} size={60} />
                <Text style={styles.placed} >Order Placed Successfully!</Text>
              </View>

              <View>
                <TouchableOpacity style={styles.signin2} onPress={() => { props.navigation.navigate('TrackOrder') }}  >
                  <Text style={styles.confirm} >TRACK ORDER</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.signin3} >
                  <Text style={styles.confirm1} >Continue Shopping</Text>
                </TouchableOpacity>
              </View>
            </RBSheet>
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
    paddingHorizontal: 20,
    paddingVertical: 20,
    elevation: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20
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
    padding: 15,
    alignItems: 'center'
  },
  week: {
    paddingHorizontal: 10,
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
    marginTop: 10
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
  },
  signin3: {
    alignItems: 'center',
    marginTop: 10
  },
  overall: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 15,
    elevation: 10,
    overflow: 'hidden',
    backgroundColor: Colors.white,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10
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
    alignItems: 'center',
  },
  please: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.red,
  },
  delli: {
    elevation: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: Colors.white,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    padding: 10,
  },
  signin0:{
      width: "80%",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: Colors.primary,
      textAlign: 'center',
      padding: 10,
      borderRadius: 10,
      overflow: 'hidden',
      alignSelf: 'center',
       marginTop: 5,
      marginBottom: 30
  }
});

export default OrderDetailsScreen;
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import React,{ useState, useEffect, useRef } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'react-moment';

import { Icons, Colors, Images } from '../../../CommonConfig/CommonConfig';
import * as CartActions from '../../../Redux/Action/Cart';
import { useSelector } from 'react-redux';
import RBSheet from "react-native-raw-bottom-sheet";
import { CardStyleInterpolators } from '@react-navigation/stack';

const OrderDetailsScreen = (props) => {
  const refRBSheet = useRef()

  const [date, setDate] = useState(null);
  const [week, setWeek] = useState(null);
  
  var RandomNumber = Math.floor(Math.random() * 100) + 100 ;
  var RandomNumber2 = Math.floor(Math.random() * 1000) + 1000;
  var RandomNumber3 = Math.floor(Math.random() * 100000 ) + 100000

  const cartItems = useSelector( state => {
    const updatedCartItems = [];
    for ( const key in state.Cart.items ) {
        updatedCartItems.push({
            ...state.Cart.items[key]
        });
    }
    return updatedCartItems.sort( (a,b) => a.id > b.id ? 1 : -1);
})

const x = cartItems.find(item => item.id  === props.id)
// console.log(x);

const subTotal = (cartItems.length ? cartItems.reduce((a, c) => a + c.itemTotal, 0) : 0);
const delivery = 0.5;

  useEffect(() => {
    let today = new Date();
    var monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"];
    var weekNames = ["Sun", 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    let date = today.getDate()+ '   '+monthNames[(today.getMonth() )]+ '  '+today.getFullYear();
    let week = weekNames[(today.getDate() )]+ '   '+today.getDate() +'   '+monthNames[(today.getMonth() )]+ '  '+today.getFullYear();
     
    setWeek(week);
    setDate(date);
  }, []);


  return (
     <ScrollView>
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
          <View style={styles.orderMain} > 
          <View  style={styles.order}>
            <Text style={styles.orderIn} >Order Date :          </Text>
            <Text style={styles.orderTxt} > {date}</Text>
          </View>

          <View style={styles.order} >
            <Text style={styles.orderIn} >Order Number :    </Text>
            <Text style={styles.orderTxt} >{RandomNumber}-{RandomNumber2} </Text>
          </View>
          </View>
          <Text style={styles.add} >Delivery Address</Text>

          <View>
            <Ionicons  name={Icons.PIN_FILLED} size={30} color={Colors.primary} />
          </View>
            <Text style={styles.add} >Delivery Date and Time</Text>
          <View>
              <View style={styles.delivery} >
                <Ionicons name={Icons.CALANDER} size={24} color={Colors.grey}  />
                <Text style={styles.orderIn} >    Delivery Date :</Text>
                <Text style={styles.week} > {week}</Text>
              </View>

            <View style={styles.delivery2} >
              <Ionicons name={Icons.TIME} size={24} color={Colors.grey} />
              <Text style={styles.orderIn} >    Delivery Time:</Text>
              <Text  style={styles.week}>07:30 AM to 01:00 PM </Text>
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
                <Text  style={styles.invoice} >Order Items</Text>
               <Text style={styles.randomNum} > 6 items</Text> 
              </View>

              <View style={styles.details} >
                <Text  style={styles.invoice} >Sub Total</Text>
                <Text  style={styles.randomNum} >${subTotal.toFixed(2)}</Text>
              </View>

              <View style={styles.details} >
                <Text  style={styles.invoice} >Delivery Charges</Text>
                <Text style={styles.randomNum} >${delivery}</Text>
              </View>

              <View style={styles.details1} >
                <Text style={styles.total} >Total Amount</Text>
                <Text style={styles.amt} >${(delivery + subTotal).toFixed(2)}</Text>
              </View>

            </View>

          <View>
            <TouchableOpacity style={styles.signin}  onPress={() =>  refRBSheet.current.open() } >
              <Text style={styles.confirm} >CONFIRM ORDER</Text>
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
                <View style={{alignItems: 'center', padding:10}} >
                  <Ionicons name={Icons.CHECKMARK} color={Colors.primary} size={60} />
                  <Text style={styles.placed} >Order Placed Successfully!</Text>
                  </View>

                  <View>
                    <TouchableOpacity style={styles.signin2} onPress={() => {props.navigation.navigate('TrackOrder')} }  >
                    <Text style={styles.confirm} >TRACK ORDER</Text>
                    </TouchableOpacity>

                    <TouchableOpacity   style={styles.signin3} >
                      <Text style={styles.confirm1} >Continue Shopping</Text>
                    </TouchableOpacity>
                  </View>



              </RBSheet>
            </View>


      </View>
      </View>
      
     </ScrollView>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  title: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: Colors.primary
  },
  back: {
    marginTop: 30
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white
  },
  body:{
    flex: 3,
  },
  order:{
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  orderIn:{
    fontSize: 18,
    fontWeight:'800'
  },
  orderTxt:{
    fontSize: 18,
    color: Colors.grey,
    fontWeight: '700'
    },
  orderMain:{
    paddingHorizontal:20,
    paddingVertical: 20
  },
  add:{
    padding: 10,
    fontSize: 22,
    justifyContent: 'flex-start',
    fontWeight: 'bold',
    marginTop: 10
  },
  delivery:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 20,
    alignItems :'center'
  },
  week:{
    paddingHorizontal: 20,
    color: Colors.grey
  },
  delivery2:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal : 20,
    alignItems: 'center',
  },
  details:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20
  },
  details0:{
    marginTop: 10
  },
  invoice:{
    fontWeight: '600',
    color: Colors.grey,
    fontSize: 16,
    padding: 5
  },
  randomNum:{
    fontSize: 19,
    color: Colors.black
  },
  total:{
    fontWeight: 'bold',
    color: Colors.grey,
    fontSize: 20
  },
  details1:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20
  },
  amt:{
    fontWeight: 'bold',
    fontSize: 20,
    color: Colors.black
  },
  signin:{
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
  confirm:{
    fontSize: 18,
    color: Colors.white,
    fontWeight: 'bold'
  },
  placed: {
    fontSize :20,
    fontWeight: '600',
    padding: 10
  },
  confirm1:{
      fontSize: 20,
      color: Colors.primary,
  },
  signin2:{
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
  signin3:{
    alignItems: 'center',
    marginTop: 10
  }

});

export default OrderDetailsScreen;
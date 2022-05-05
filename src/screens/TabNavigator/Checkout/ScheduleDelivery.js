import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, {  useEffect, useState  } from 'react';
import { Icons, Colors, Images } from '../../../CommonConfig/CommonConfig';
import Ionicons from 'react-native-vector-icons/Ionicons';

import moment from 'moment';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

const ScheduleDelivery = (props) => {
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const d = new Date();
let name = month[d.getMonth()];

const [isMoment,setisMoment ] = useState('');

// var result = moment("2020-02", "YYYY-MM").daysInMonth() 
  
// console.log("No of days in 2020-02 is:", result)
// useEffect(() => {
// // var result = moment().add(30, 'days') ;
// var result = moment().format('dddd MMM Mo YYYY ')
//                     //  .utcOffset('+5:30') 
//                     //  .format('hh:mm:ss a')

//   setisMoment(result)
//     }, [])

    var result = moment().format('dddd MMM Mo YYYY ')

return (
    <View style={styles.main} >
      <ScrollView>
      {/* Header & Back Button */}
      <View style={styles.head} >
        <TouchableOpacity onPress={() => {props.navigation.goBack()}} >
          <Ionicons name={Icons.BACK_ARROW} color={Colors.white} size={30} style={styles.back} />
        </TouchableOpacity>
        <Text style={styles.time} >Delivery Times</Text>
      </View>
      {/* Body */}
      <View style={styles.body} >
      {/* <CalendarList
       horizontal={true}
      /> */}
      {/* <Text> {isMoment} </Text> */}
      <Text> {result} </Text>
    
      </View>
      </ScrollView>
    </View> 
  )
}

export default ScheduleDelivery;

const styles = StyleSheet.create({
  main:{
    flex: 1,
  },
  head:{
    flex:1,
    backgroundColor: Colors.primary,
    justifyContent: 'space-between'
  },
  back:{
    marginTop: 30
  },
  time:{
    fontSize: 24,
    color: Colors.white,
    fontWeight: 'bold'
  },
  body:{
    flex: 3,
  }
});
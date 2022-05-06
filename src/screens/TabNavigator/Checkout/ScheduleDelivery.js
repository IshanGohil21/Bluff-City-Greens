import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, {  useEffect, useState  } from 'react';
import { Icons, Colors, Images } from '../../../CommonConfig/CommonConfig';
import Ionicons from 'react-native-vector-icons/Ionicons';

import moment from 'moment';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { FlatList } from 'react-native-gesture-handler';
import { Month } from 'react-native-month';

import WeeklyCalendar from 'react-native-weekly-calendar';

const ScheduleDelivery = (props) => {
//   const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// const d = new Date();
// let name = month[d.getMonth()];

// const [isMoment,setisMoment ] = useState('');

// var result = moment("2020-02", "YYYY-MM").daysInMonth() 
  
// console.log("No of days in 2020-02 is:", result)
// useEffect(() => {
// // var result = moment().add(30, 'days') ;
// var result = moment().format('dddd MMM Mo YYYY ')
//                     //  .utcOffset('+5:30') 
//                     //  .format('hh:mm:ss a')

//   setisMoment(result)
//     }, [])

    // var result = moment().format('dddd MMM Mo YYYY ')

    //  const created_at = moment(created_at).format('YYY/MM/DD HH:mm');
     
    // var Month = moment.months()

    // var weekDays = moment.weekdays()

    // const dateStr = '';

    // for (let i = 0; i < 7; i++) {
    //   console.log(week);
    //   const week = moment().startOf('week').add(i, 'days').format('ddd, MMM Do')
    // }

    let date = []
   for (let i = 0; i <= 31; i++) {
      // console.log(week);
      const week = moment().startOf('day').add(i, 'days').format('ddd, MMM Do')
      date.push(week)
    }
    console.log(date);
    
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
      {/* <Text> {result} </Text> */}

{/* <WeeklyCalendar/> */}
      <FlatList 
        data={date}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => {
          const day = item.substring(0,3)
          const month = item.substring(5,8)
          const monthdate = item.substring(9,13)
          
          return(
            <View style={{flexDirection:'row', padding: 10}} >
              <View style={{flex:1}} >  
                <Text>{month}</Text>
                <Text> {monthdate} </Text>
              </View>
                <View style={{flex:3}} >
                <Text>{day}</Text>
                </View>
                
              </View>
          )
        } }
      />


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
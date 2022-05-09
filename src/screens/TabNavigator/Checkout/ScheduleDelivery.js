import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, {  useEffect, useState  } from 'react';
import { Icons, Colors, Images } from '../../../CommonConfig/CommonConfig';
import Ionicons from 'react-native-vector-icons/Ionicons';

import moment from 'moment';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { FlatList } from 'react-native-gesture-handler';
import { Month } from 'react-native-month';
import { log } from 'react-native-reanimated';


const ScheduleDelivery = (props) => {
  

  const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded(!expanded)
    }


    let date = []
   for (let i = 0; i <= 31; i++) {
      // console.log(week);
      const week = moment().startOf('day').add(i, 'days').format('ddd, MMM Do')
      date.push(week)
    }
    // console.log(date);

       //Data
let x = {
  slotInterval: 2,
  openTime: '6:00 ',
  closeTime: '14:00 '
};

let startTime = moment(x.openTime, "HH:mm");

let endTime = moment(x.closeTime, "HH:mm").add(1, 'hour');

let allTimes = [];

while (startTime < endTime) {
  
  allTimes.push(startTime.format("HH:mm")); 
 
  startTime.add(x.slotInterval, 'hour');
}

//  console.log(allTimes);

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

      <FlatList 
        data={date}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => {
          const day = item.substring(0,3)
          const month = item.substring(5,8)
          const monthdate = item.substring(9,13)
          return(
            <View>
              <TouchableOpacity style={styles.sche}  onPress={ () => {toggleExpanded()} } >
              <View style={{flex:0.5,backgroundColor: Colors.blue, alignItems: 'center', justifyContent:'center'  }} >  
                <Text style={{fontSize: 16, color: Colors.white, fontWeight:'bold'}} >{month}</Text>
                <Text style={{fontSize: 12, color:Colors.white, fontWeight:'bold'}} > {monthdate} </Text>
              </View>
                <View style={{flex:3,}} >
                <Text style={{fontSize: 18, marginHorizontal: 20}} >{day}</Text>
                </View>
                <Ionicons name={Icons.DOWN_ARROW} color={Colors.grey} size={24} />
                </TouchableOpacity>

                {expanded &&
                  <FlatList 
                    data={allTimes}
                    keyExtractor={( item, index )  => index}
                    renderItem ={ ({ item }) => {
                      const time = item.substring(0,10)
                      return (
                        <View style={styles.select} >
                          <Text style={styles.times} >{time} to {time} </Text>
                          <TouchableOpacity onPress={() => {}} style={styles.signin}> 
                            <Text style={styles.select0} >SELECT </Text>
                          </TouchableOpacity>
                        </View>
                      )
                    } }
                  /> 
                }
                
              </View>
          )
        } 
      }
      />
      </View>

      <TouchableOpacity style={styles.continue} onPress={() => {props.navigation.navigate('Home')}} >
        <Text style={styles.select1} >CONTINUE SHOPPING</Text>
      </TouchableOpacity>
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
  },
  sche:{
    flexDirection:'row', height:60
  },
  select:{
    flexDirection: 'row',
    justifyContent:'space-between',
    padding: 10
  },
  signin:{
      width: "25%",
      alignItems: "center",
      backgroundColor: Colors.primary,
      textAlign: 'center',
      color: Colors.white,
      fontSize: 23,
      padding: 10,
      borderRadius: 10,
      overflow: 'hidden',
  },
  select0:{
    fontSize:16,
    fontWeight:'bold',
    color: Colors.white
  },
  times:{
    padding:5,
    marginHorizontal: 20,
    fontSize: 14,
    fontWeight:'900'
  },
  continue:{
      width: "85%",
      alignItems: "center",
      backgroundColor: Colors.primary,
      textAlign: 'center',
      color: Colors.white,
      fontSize: 23,
      padding: 15,
      borderRadius: 10,
      overflow: 'hidden',
      padding: 10,
      marginHorizontal: 30,
      marginTop: 30
  },
  select1:{
    fontSize:20,
    fontWeight:'bold',
    color: Colors.white
  }
});
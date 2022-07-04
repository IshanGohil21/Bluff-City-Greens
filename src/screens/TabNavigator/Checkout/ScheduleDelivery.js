import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';

import { Icons, Colors, Images } from '../../../CommonConfig/CommonConfig';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import AccordianDeliveryTime from '../../../components/Accordian(DeliveryTime)';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from 'react-native-simple-toast';

const ScheduleDelivery = (props) => {

  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  // Date For the whole Month 

  const date = []
  for (let i = 0; i <= 31; i++) {
    // console.log(week);
    const week = moment().startOf('day').add(i, 'days').format('ddd, MMM Do')
    date.push(week)
  }
  // console.log(date);


  //Time Data For 2 Hours Diff
  let x = {
    slotInterval: 2,
    openTime: '6:00 ',
    closeTime: '14:00 '
  };

  
  let startTime = moment(x.openTime, "HH:mm");

  let endTime = moment(x.closeTime, "HH:mm").add(1, 'hour');

  const allTimes = [];

  while (startTime < endTime) {

    allTimes.push(startTime.format("HH:mm"));

    startTime.add(x.slotInterval, 'hour');
  }

  //  console.log(allTimes);

  

  return (
    <View style={styles.main} >

      {/* Header & Back Button */}
      <View style={styles.head} >
        <TouchableOpacity onPress={() => { props.navigation.goBack() }} >
          <Ionicons name={Icons.BACK_ARROW} color={Colors.white} size={30} style={styles.back} />
        </TouchableOpacity>
        <Text style={styles.time} >Delivery Times</Text>
      </View>
      {/* Body */}

      <View style={styles.body} >

        <FlatList
          data={date}
          renderItem={({ item }) => {
            return (
              <View>
                {/* <Text>Hello</Text> */}
                <AccordianDeliveryTime
                  item={item}
                  onSelect={() => { props.navigation.goBack() }}
                />
              </View>
            )
          }
          }
        />
      </View>

      <TouchableOpacity style={styles.continue} onPress={() => { props.navigation.navigate('Home') }} >
        <Text style={styles.select1} >CONTINUE SHOPPING</Text>
      </TouchableOpacity>

    </View>
  )
}

export default ScheduleDelivery;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  head: {
    flex: 0.7,
    backgroundColor: Colors.primary,
    justifyContent: 'space-between',
    // marginTop:20,
    padding: 15
  },
  back: {
    marginTop: 30
  },
  time: {
    fontSize: 24,
    color: Colors.white,
    fontWeight: 'bold'
  },
  body: {
    flex: 3,
  },
  sche: {
    flexDirection: 'row', height: 60
  },
  select: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  signin: {
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
  select0: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white
  },
  times: {
    padding: 5,
    marginHorizontal: 20,
    fontSize: 14,
    fontWeight: '900'
  },
  continue: {
    width: "85%",
    alignItems: "center",
    backgroundColor: Colors.primary,
    textAlign: 'center',
    color: Colors.white,
    fontSize: 23,
    padding: 10,
    borderRadius: 10,
    overflow: 'hidden',
    padding: 10,
    marginHorizontal: 30,
    marginTop: 30
  },
  select1: {
    fontSize: 19,
    fontWeight: 'bold',
    color: Colors.white
  }
});
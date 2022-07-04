import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { date } from 'yup';
import moment from 'moment';
import { Icons, Colors, Images } from '../CommonConfig/CommonConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccordianDeliveryTime = (props) => {
  //Time Data For 2 Hours Diff

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

  let start = parseInt(x.openTime);
  let end = parseInt(x.closeTime)
  
  // console.log(start, end)

  //  console.log(allTimes);

  const itemsss = props.item
    // console.log(itemsss);
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  const day = itemsss.substring(0, 3)
  const month = itemsss.substring(5, 8)
  const monthdate = itemsss.substring(9, 13)

  // const [ activeTime, setActiveTime ] = useState( {} )
  // const [ activeDate, setActiveDate ] = useState( {} )
  //   console.log("\n\nActive Date          ",activeDate);
  //   console.log("\n\nActive Time          ",activeTime)

  // useEffect( async() => {
  //   setActiveDate( JSON.parse( await AsyncStorage.getItem('activeDate')))
  //   setActiveTime( JSON.parse( await AsyncStorage.getItem('activeTime')))
  // },[])

  return (
    <View>
      <TouchableOpacity style={styles.sche} onPress={() => { toggleExpanded() }} >
        <View style={{ flex: 0.5, backgroundColor: Colors.blue, alignItems: 'center', justifyContent: 'center' }} >
          <Text style={{ fontSize: 16, color: Colors.white, fontWeight: 'bold' }} >{month}</Text>
          <Text style={{ fontSize: 12, color: Colors.white, fontWeight: 'bold' }} > {monthdate} </Text>
        </View>
        <View style={{ flex: 3, }} >
          <Text style={{ fontSize: 18, marginHorizontal: 20 }} >{day}</Text>
        </View>
        <Ionicons name={Icons.DOWN_ARROW} color={Colors.grey} size={24} />
      </TouchableOpacity>

      {expanded &&
        <FlatList
          data={allTimes}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => {
            const time = item.substring(0, 10)
            return (
              <View style={styles.select} >
                <Text style={styles.times} > {time} to {time}</Text>
                <TouchableOpacity onPress={props.onSelect} style={styles.signin}>
                  <Text style={styles.select0} >SELECT </Text>
                </TouchableOpacity>
              </View>
            )
          }}
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: Colors.red,
  },
  main: {
    flex: 1,
  },
  head: {
    flex: 0.7,
    backgroundColor: Colors.primary,
    justifyContent: 'space-between'
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
})

export default AccordianDeliveryTime; 
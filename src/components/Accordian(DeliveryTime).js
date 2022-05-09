import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../CommonConfig/CommonConfig';

const AccordianDeliveryTime = (props) => {
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
  
  //Format the time
  let startTime = moment(x.openTime, "HH:mm");
  
  //Format the end time and the next day to it 
  let endTime = moment(x.closeTime, "HH:mm").add(1, 'hour');
  
  //Times
  let allTimes = [];
  
  //Loop over the times - only pushes time with 30 minutes interval
  while (startTime < endTime) {
    //Push times
    allTimes.push(startTime.format("HH:mm")); 
    //Add interval of 30 minutes
    startTime.add(x.slotInterval, 'hour');
  }
  
  // console.log(allTimes);

    return (
        <View>
            <FlatList
                data={date}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => {
                    const day = item.substring(0, 3)
                    const month = item.substring(5, 8)
                    const monthdate = item.substring(9, 13)
                    return (
                        <TouchableOpacity style={{ flexDirection: 'row', padding: 5, }} onPress={() => {toggleExpanded()}} >
                            <View style={{ flex: 0.5, }} >
                                <Text>{month}</Text>
                                <Text> {monthdate} </Text>
                            </View>
                            <View style={{ flex: 3, }} >
                                <Text>{day}</Text>
                                <Ionicons  name={expanded ?  'chevron-up-outline' : 'chevron-down-outline'} size={24} color={Colors.grey} />
                            </View>

                        </TouchableOpacity>
                    )
                }
                }
            />

        </View>
    )
}

const styles = StyleSheet.create({
    row:{
        flexDirection:'row',
        height:60,
        backgroundColor:Colors.red,
    }
})

export default AccordianDeliveryTime; 
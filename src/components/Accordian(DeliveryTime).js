import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../CommonConfig/CommonConfig';

const AccordianDeliveryTime = (props) => {
    const item = props.item
    // console.log(item);
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded(!expanded)
    }
        
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

const styles = StyleSheet.create({
    row:{
        flexDirection:'row',
        height:60,
        backgroundColor:Colors.red,
    }
})

export default AccordianDeliveryTime; 
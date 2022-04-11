import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../CommonConfig/CommonConfig';

const Accordian = (props) => {

const data = props.data
const[expanded, setExpanded] = useState(false);

const toggleExpanded = () => {
    setExpanded (!expanded) 
}
  return (
    <View>
        <TouchableOpacity  style={styles.row} onPress={() => {toggleExpanded()}}>
            <Text style={[styles.title, styles.font]} >{props.q}</Text>
            <Ionicons  name={expanded ? 'chevron-up-outline' : 'chevron-down-outline' } size={30} color={Colors.grey} />
        </TouchableOpacity>
        <View style={styles.parentHr}/>
            {
                expanded &&
                <View style={styles.child}>
                    <Text style={styles.font} >{props.data}</Text>    
                </View>
            }
    </View>
  )
}

export default Accordian

const styles = StyleSheet.create({
    title:{
        fontSize: 14,
      //  fontWeight:'bold',
        color: Colors.grey ,
    },
    row:{
        flexDirection: 'row',
        justifyContent:'space-between',
        height:56,
        paddingLeft:25,
        paddingRight:18,
        alignItems:'center',
        backgroundColor: Colors.white,
    },
    parentHr:{
        height:1,
        color: Colors.white,
        width:'100%'
    },
    child:{
        backgroundColor: Colors.white,
        padding:16,
    } ,
    font:{
        color: Colors.grey
    }
})
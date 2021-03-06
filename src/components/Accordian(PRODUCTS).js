import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../CommonConfig/CommonConfig';

const AccordianProducts = (props) => {
    const item = props.item
        // console.log("\n\n\n\nhelooooooo    ",item);
    const[expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded (!expanded) 
    }

  return (
    <View style={styles.accordian} >
        
     <TouchableOpacity style={styles.row} onPress={() => {toggleExpanded()}} >
         <View style={{...styles.imageContainer, borderColor: props.color }} >
         <Image source={{ uri : props.image}} style={{...styles.imageDimensions, borderColor: props.color }}/>
         </View>
         <Text style={styles.title} >{props.Pname}</Text>
         <Ionicons  name={expanded ? 'chevron-up-outline' : 'chevron-down-outline' } size={24} color={Colors.grey} />
     </TouchableOpacity>
     <View style={styles.parentHr} />
         {
             expanded && 
             item.sub_categories.map(item => {
                // console.log(item);
                 return (
                     <TouchableOpacity key={item.id} style={styles.containerText}  onPress={props.onClick} >
                         <Text style={styles.productStyles} >{item.title}</Text>
                     </TouchableOpacity>
                 )
             })
         }
          <View style={styles.line} />
    </View> 
  )
}

export default AccordianProducts;


const styles = StyleSheet.create({
    title:{
        fontSize: 16,
        color: Colors.black ,
    },
    row:{
        flexDirection: 'row',
        height:60,
        alignItems:'center',
        backgroundColor: Colors.white,
        justifyContent: 'space-between'
    },
    parentHr:{
        height:1,
        color: Colors.white,
        width:'100%'
    },
    child:{
        backgroundColor: Colors.white,
        // padding:10,
    } ,
    font:{
        color: Colors.red
    },
    imageContainer: {
        borderRadius: 10,
        borderWidth: 1,
        justifyContent: 'center',
        padding: 5
    },
    imageDimensions:{
        height: 50,
        width: 50,
    },
    accordian: {
        padding:10,
    },
    productStyles: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.grey
    },
    containerText: {
        justifyContent: 'flex-start',
        padding: 2,
        marginLeft: 40,
        marginTop: 10
    },
    line:{
        height: 0,
        borderColor: Colors.grey,
        borderWidth: 0.5,
        width: '100%',
        marginVertical: 10,
        marginTop: 10,
        flexDirection: 'row'
    }
})
import { StyleSheet, Text, View, ScrollView, StatusBar } from 'react-native'
import React from 'react'
import PastOrder from '../../../dummy-data/PastOrders'
import {Colors} from '../../../CommonConfig/CommonConfig'

const PastOrderScreen = (props) => {
   const pid = props.route.params.id
   const selectedItem = PastOrder.find(item => item.id === pid)

    return (
        <View style={styles.screen} >
            <StatusBar backgroundColor={selectedItem.bgColor} barStyle='light-content'/>
            
            {/* Header */}
            <View style={{...styles.header, backgroundColor:selectedItem.bgColor}} >
                
            </View>
            
            {/* Body */}
            <View style={{...styles.header, backgroundColor: selectedItem.bgColor}} >
                <View style={styles.body} >

                </View>

            </View>
        </View>
    )
}

export default PastOrderScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.white
     },
    header: {
        flex:1,
    },
    body:{
        flex:1,
        backgroundColor:Colors.white,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        paddingHorizontal:20,
        paddingVertical:30,
    },
})
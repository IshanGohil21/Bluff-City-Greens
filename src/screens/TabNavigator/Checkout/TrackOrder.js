import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Timeline from 'react-native-timeline-flatlist'

import { Icons, Colors, Images } from '../../../CommonConfig/CommonConfig';
import data from '../../../dummy-data/Timeline';
import Icon from 'react-native-ionicons';

const TrackOrderScreen = (props) => {
    var RandomNumber = Math.floor(Math.random() * 100) + 100 ;
  var RandomNumber2 = Math.floor(Math.random() * 1000) + 1000;

  return (
    <View style={styles.main} >
        {/* Title & Back Button */}
        <View style={styles.header} >
            <TouchableOpacity style={styles.back}  onPress={() => {props.navigation.goBack()} } >
                <Ionicons name={Icons.BACK_ARROW}  size={30} color={Colors.white} />
            </TouchableOpacity>
            <Text style={styles.track} >Track Order</Text>
        </View>
        {/* Body */}
        <View style={styles.body} >
            <View style={styles.order} >
                <Text  style={styles.num}>Order Number : </Text>
                <Text style={styles.ran} > {RandomNumber}-{RandomNumber2}</Text>
            </View>

            <View style={{flex:3, marginTop: 20, justifyContent:'space-between'}} >
            <Timeline
                data={data}
                //..other props
                circleSize={20}
                circleColor={Colors.primary}
                lineColor={Colors.primary}
                timeContainerStyle={{minWidth:52, marginTop:70}}
                descriptionStyle={{color:Colors.grey}}
                options={{
                    style:{paddingTop:5}
                }}
                isUsingFlatlist={true}
            />

            <View style={styles.driver} >
                <Ionicons  name={Icons.PERSON} size={40} color='#0000CD'/>
                <View style={{marginRight:130}} >    
                    <Text style={styles.details} >Driver Details</Text>
                    <Text style={styles.kunal} >Kunal Agarwal  </Text>
                </View>

                <Ionicons  name={Icons.CALL} size={40} color={Colors.primary}  style={styles.call} />
            </View>


            </View>


        </View>
    </View>
  )
}

export default TrackOrderScreen

const styles = StyleSheet.create({
    main:{
        flex:1,
    },
    header:{
        flex: 1,
        backgroundColor : Colors.primary,
        justifyContent:'space-between'
    },
    back:{
        marginTop: 30
    },
    track:{
        fontSize: 24,
        color: Colors.white,
        fontWeight: 'bold'
    },
    body:{
        flex:3
    },
    num:{
        fontSize: 17,
        fontWeight: '900',
        color: Colors.black
    },
    order:{
        flexDirection: 'row',
        justifyContent:'flex-start',
        padding: 20,
        flex: 0.2,
    },
    ran:{
        fontSize: 16,
        fontWeight :'bold',
        color:Colors.grey
    },
    driver:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        padding: 5,
        alignItems:'center',
        marginLeft: 20
    },
    details:{
        fontSize: 16,
        color: Colors.grey,
    },
    kunal:{
        fontSize: 18,
    },
})
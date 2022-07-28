import React, { useState, useRef, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet, Text, TextInput, Alert, Button, View, Image, TouchableOpacity, Animated, StatusBar, Dimensions } from 'react-native';
import LinearGradient  from 'react-native-linear-gradient';

import { Colors, Icons, Images } from '../../../CommonConfig/CommonConfig';

const { width } = Dimensions.get('window')

const val = Math.floor(1000 + Math.random() * 9000);
// console.log(val);

const ReferFriendScreen = (props) => {

    return (
        <View style={styles.main} >
            {/* Status bar */}
           <StatusBar backgroundColor={Colors.primary} />
           {/* Title */}
            <View style={styles.title} >
                <TouchableOpacity onPress={() => {props.navigation.goBack()}} >
                <Ionicons  name={Icons.BACK_ARROW} size={24} color={Colors.white} style={styles.back} />
                </TouchableOpacity>
                <View>
                    <Text style={styles.refer} >Refer A Friend</Text>
                    <Text style={styles.friend} >Refer a friend and earn.</Text>
                </View>
            </View> 
            {/* Body */}
            <View style={styles.body} >
                <View style={styles.all} >
                    <Image source={Images.refer}  style={styles.dost} />
                    <Text style={styles.a} >Invite A Friend</Text>
                    <Text style={styles.earn} >Invite a friend and earn $2</Text>
                </View>
                <TouchableOpacity style={styles.code} >
                    <Text style={styles.invite0} >GET INVITE CODE</Text>
                </TouchableOpacity>

                <Text style={styles.value} >{val}</Text>
                
                <View  style={styles.referal}>
                    <View style={styles.sharing}  />
                <Text style={styles.share} >SHARE VIA</Text>
                    <View style={styles.sharing} />
                </View>

                <View style={styles.mains} >

                    <TouchableOpacity >
                        <Image source={Images.facebook } style={styles.social} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={Images.google} style={styles.social}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={Images.whatsapp} style={styles.social} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={ Images.instagram }  style={styles.social} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image  source={Images.telegram} style={styles.social} />
                    </TouchableOpacity>
                </View>


            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main:{
        flex:1,
        backgroundColor:Colors.white
    },
    title:{
        flex:0.6,
        backgroundColor:Colors.primary,
        padding:10,
        justifyContent:'space-between',

    },
    refer:{
        fontSize:26,
        color:Colors.white,
        fontWeight: 'bold'
    },
    friend:{
        color:Colors.white,
        fontWeight:'900'
    },
    body:{
        flex:3,
        alignItems:'center'
    },
    invite:{
        justifyContent:'center',
        alignItems:'center'
    },
    a:{
        fontSize:20,
        color:Colors.black,
        fontWeight:'bold'
    },
    all:{
        alignItems:'center'
    },
    earn:{
        fontSize: 16,
        fontWeight:'bold',
        color:Colors.grey,
        padding:10
    },
    code:{
        backgroundColor:Colors.primary,
        width:'80%',
        alignItems:'center',
        padding:10,
        borderRadius:10,
        marginVertical: 20
    },
    invite0:{
        fontSize:20,
        color: Colors.white
    },
    value:{
        fontSize: 20,
        fontWeight:'bold'
    },
    share:{
        marginVertical:20,
        paddingHorizontal:20, 
        color:Colors.grey
    },
    social:{
        height:40,
         width:40 , 
         paddingHorizontal:20, 
         marginHorizontal:10
    },
    referal:{
        flexDirection:'row', 
        alignItems:'center', 
        width:'65%'
    },
    mains:{
        alignItems:'center', 
        justifyContent:'center', 
        flexDirection:'row'
    },
    sharing:{
        flex:1, 
        height:1, 
        backgroundColor:Colors.black
    },
    dost:{
        height:width-100, 
        width:width-100, 
        marginVertical:30
    },
    back:{
        marginTop:20
    }

})

export default ReferFriendScreen;
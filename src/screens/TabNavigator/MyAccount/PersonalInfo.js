import React, { useState, useRef, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet, Text, TextInput, Alert, Button, View, Image, TouchableOpacity, StatusBar } from 'react-native';
import { Formik } from "formik";
import * as yup from 'yup';
import PhoneInput from 'react-native-phone-number-input';
import User from '../../../dummy-data/User';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Icons, Colors } from '../../../CommonConfig/CommonConfig'

const personalInfoScreen = props => {
    
    const [user, setUser] = useState({})
    // const user = props.route.params.user
      console.log("                    ", user);
    const [phoneNumber, setphoneNumber] = useState('');
    const phoneInput = useRef(null);

    const getProfile = async() => {
        setUser(JSON.parse(await AsyncStorage.getItem("userInfo")))
    } 

    useEffect( () => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getProfile();
        })
        return unsubscribe;
    }, [props.navigation])

    // console.log("log user", user);

    return (
        <View style={styles.main}>
            <StatusBar backgroundColor={Colors.primary} />
            {/* Header */}
            <View style={styles.header}>
                
                <View style={{flexDirection:'row', justifyContent:'space-between'}} >
                <TouchableOpacity onPress={() => {props.navigation.goBack()}}  >
                    <Ionicons name={Icons.BACK_ARROW} color={Colors.white} size={30} style={styles.icon} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {props.navigation.navigate('EditInfo',{user})}}
                 style={{flexDirection:'row', justifyContent:'space-between'}} 
                 >
                    <Ionicons name='create-outline' color={Colors.white} size={30} style={styles.icon} />
                </TouchableOpacity>
                </View>

                {/*Title*/}
                    <Text style={styles.title}> Personal Information </Text>
            </View>
            { /* Body */}

            <View style={styles.mainWrapper}>
                <View  >
                    <Text style={styles.text}>Full Name</Text>
                    <Text style={styles.number} >{user.name}</Text>

                    <View style={styles.line} />

                    <Text style={styles.text} >Email</Text>
                    <Text style={styles.number} >{user.email}</Text>

                    <View style={styles.line} />

                    <Text style={styles.text}>Contact Number</Text>
                    <Text style={styles.number}>({user.country_code}) {user.phone}</Text>

                    <View style={styles.line} />

                </View>

                <TouchableOpacity onPress={() => { props.navigation.goBack() }} style={styles.save}>
                    <Text style={styles.signin}> SAVE </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 24,
    },
    mainWrapper: {
        flex: 1,
        padding: 25,
        justifyContent: 'space-between',
    },
    icon:{
        marginTop:20
    },
    signin: {
        width: "90%",
        backgroundColor: Colors.primary,
        textAlign: 'center',
        color: Colors.white,
        fontSize: 23,
        padding: 10,
        borderRadius: 10,
        borderColor: Colors.green,
        overflow: 'hidden',
    },
    number: {
        fontSize: 18,
        marginBottom: 10
    },
    header: {
        padding: 10,
        backgroundColor: Colors.primary,
        flex: 0.2,
        justifyContent:'space-between'
    },
    main: {
        flex: 1,
    },
    text: {
        color: Colors.grey,
        marginBottom: 10,
        marginTop:10
    },
    save: {
        marginLeft: 40
    },
    line: {
        height: 0,
        borderColor: Colors.grey,
        borderWidth: 0.5,
        width: '100%',
        flexDirection: 'row',
    }
})

export default personalInfoScreen;
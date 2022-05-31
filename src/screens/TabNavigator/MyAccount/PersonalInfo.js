import React, { useState, useRef } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet, Text, TextInput, Alert, Button, View, Image, TouchableOpacity } from 'react-native';
import { Formik } from "formik";
import * as yup from 'yup';
import PhoneInput from 'react-native-phone-number-input';
import User from '../../../dummy-data/User';

import { Icons, Colors } from '../../../CommonConfig/CommonConfig'

const personalInfoScreen = props => {
    const user = props.route.params.user
    console.log("                    ", user);
    const [phoneNumber, setphoneNumber] = useState('');
    const phoneInput = useRef(null);

    return (
        <View style={styles.main}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => {
                    props.navigation.goBack()
                }}
                >
                    <Ionicons name={Icons.BACK_ARROW} color={Colors.white} size={30} style={styles.icon} />
                </TouchableOpacity>
                {/*Title*/}
                <View>
                    <Text style={styles.title}> Personal Information </Text>
                </View>
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
        marginTop: 50
    },
    mainWrapper: {
        flex: 1,
        padding: 25,
        justifyContent: 'space-between',
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
        flex: 0.2
    },
    main: {
        flex: 1
    },
    text: {
        color: Colors.grey,
        marginBottom: 10,
        marginTop:10
    },
    save: {
        marginLeft: 40
    },
    icon: {
        marginTop: 10
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
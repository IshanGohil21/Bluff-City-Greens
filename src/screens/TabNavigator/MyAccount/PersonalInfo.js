import React, { useState, useRef, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet, Text, TextInput, Alert, Button, View, Image, TouchableOpacity, StatusBar, image } from 'react-native';
import { Formik } from "formik";
import * as yup from 'yup';
import PhoneInput from 'react-native-phone-number-input';
import User from '../../../Dummy-Data/User';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Icons, Colors, Images } from '../../../CommonConfig/CommonConfig'
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const personalInfoScreen = props => {

    const [user, setUser] = useState({})
    const [image, setImage] = useState(null)
    //   console.log("                    ", user);
    const [phoneNumber, setphoneNumber] = useState('');
    const phoneInput = useRef(null);

    const getProfile = async () => {
        setUser(JSON.parse(await AsyncStorage.getItem("userInfo")))
    }

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getProfile();
        })
        return unsubscribe;
    }, [props.navigation])

    //   console.log("log user", user);

    return (
        <View style={styles.main}>
            <StatusBar backgroundColor={Colors.primary} />
            {/* Header */}
            <View style={styles.header}>

                <View style={styles.iconic} >
                    <TouchableOpacity onPress={() => { props.navigation.goBack() }}  >
                        <Ionicons name={Icons.BACK_ARROW} color={Colors.white} size={30} style={styles.icon} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { props.navigation.navigate('EditInfo', { user }) }}
                        style={styles.iconic}
                    >
                        <Ionicons name='create-outline' color={Colors.white} size={30} style={styles.icon} />
                    </TouchableOpacity>
                </View>

                {/*Title*/}
                <Text style={styles.title}> Personal Information </Text>
            </View>
            { /* Body */}

            <View style={styles.mainWrapper}>
                <View>
                    <View style={styles.profile} >
                        <View
                            style={styles.avatarContainer}
                        >
                            <Image
                                source={{ uri: user.picture }}
                                style={styles.avatar}
                            />
                        </View>
                    </View>

                    <Text style={styles.text}>Full Name</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome name="user" color={Colors.black} size={20} style={{ marginRight: 20 }} />
                        <Text style={styles.number} >{user.name}</Text>
                    </View>
                    <View style={styles.line} />

                    <Text style={styles.text} >Email</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome name="envelope" color={Colors.black} size={20} style={{ marginRight: 20 }} />
                        <Text style={styles.number} >{user.email}</Text>
                    </View>

                    <View style={styles.line} />

                    <Text style={styles.text}>Contact Number</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome name="phone" color={Colors.black} size={20} style={{ marginRight: 20 }} />
                        <Text style={styles.number}>({user.country_code}) {user.phone}</Text>
                    </View>

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
    icon: {
        marginTop: 20
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
        justifyContent: 'space-between'
    },
    main: {
        flex: 1,
    },
    text: {
        color: Colors.grey,
        marginBottom: 10,
        marginTop: 10
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
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 10
    },
    profile: {
        alignItems: 'center',
        width: '100%',
    },
    iconic: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }

})

export default personalInfoScreen;
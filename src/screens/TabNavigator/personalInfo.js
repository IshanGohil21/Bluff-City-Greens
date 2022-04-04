import React,{ useState,useRef } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet, Text, TextInput, Alert, Button, View, Image, TouchableOpacity } from 'react-native';
import { Formik } from "formik";
import * as yup from 'yup';
import PhoneInput from 'react-native-phone-number-input';
import User from '../../dummy-data/User';

const personalInfoScreen = props => {
    const [phoneNumber, setphoneNumber] = useState('');
    const phoneInput = useRef(null);

    return (
        <View  style={{flex:1}}>
            {/* Header */}
            <View style={{ padding: 10, backgroundColor: '#259D57', flex:0.2 }}>
                <TouchableOpacity onPress={() => {
                    props.navigation.goBack()
                }}
                >
                    <Ionicons name='arrow-back-outline' color='white' size={30} style={{ marginTop: 10, }} />
                </TouchableOpacity>
                {/*Title*/}
                    <View>
                        <Text style={styles.title}> Personal Information </Text>
                    </View>
            </View>
            { /* Body */}
                            
                        <View style={styles.mainWrapper}>
                        <View  >
                            <Text style={{ color: 'grey', marginBottom: 5 }}>Full Name</Text>
                              <Text style={styles.number} >{User.username}</Text>

                            <Text style={{ color: 'grey' }} >Email</Text>
                                <Text style={styles.number} >{ User.email }</Text>
                            
                            <Text style={{ color: 'grey', marginBottom: 5 }}>Contact Number</Text>

                               <Text style={styles.number}>{User.phone_number}</Text>
                            </View>
                    
        <TouchableOpacity onPress={() => {props.navigation.goBack()}} style={{marginLeft:40}}>
                        <Text style={styles.signin}> SAVE </Text>
                    </TouchableOpacity>
                    </View>
                </View>
    )
}

const styles = StyleSheet.create({
    title: {
        color: 'white',
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
        backgroundColor: "#259D57",
        textAlign: 'center',
        color: 'white',
        fontSize: 23,
        padding: 10,
        borderRadius: 10,
        borderColor: 'green',
        overflow: 'hidden', 
    },
    number: {
        fontSize: 18,
        marginBottom: 30
    },
})

export default personalInfoScreen;
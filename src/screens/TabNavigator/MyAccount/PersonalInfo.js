import React,{ useState,useRef } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet, Text, TextInput, Alert, Button, View, Image, TouchableOpacity } from 'react-native';
import { Formik } from "formik";
import * as yup from 'yup';
import PhoneInput from 'react-native-phone-number-input';
import User from '../../../dummy-data/User';
import Colors from '../../../Colors/Colors';

const personalInfoScreen = props => {
    const [phoneNumber, setphoneNumber] = useState('');
    const phoneInput = useRef(null);

    return (
        <View  style={styles.main}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => {
                    props.navigation.goBack()
                }}
                >
                    <Ionicons name='arrow-back-outline' color='white' size={30} style={{ marginTop: 10 }} />
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
                              <Text style={styles.number} >{User.username}</Text>

                            <Text style={styles.text} >Email</Text>
                                <Text style={styles.number} >{ User.email }</Text>
                            
                            <Text style={styles.text}>Contact Number</Text>

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
        backgroundColor: Colors.primary,
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
    header:{
        padding: 10, 
        backgroundColor: Colors.primary, 
        flex:0.2 
    },
    main:{
        flex:1
    },
    text:{
        color: 'grey', marginBottom: 5
    }
})

export default personalInfoScreen;
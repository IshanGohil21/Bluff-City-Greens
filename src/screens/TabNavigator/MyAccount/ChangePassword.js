import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, Alert, Button, View, Image, TouchableOpacity, StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Formik } from 'formik';
import * as yup from 'yup';
import { ref } from 'yup';

import { Colors, Images, Icons } from '../../../CommonConfig/CommonConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postRequest, refreshToken } from '../../../Helper/ApiHelper';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ChangePasswordScreen = props => {

    const [eyeTouched, setEyeTouched] = useState(false);
    const [eyeTouched0, setEyeTouched0] = useState(false);
    const [eyeTouched1, setEyeTouched1] = useState(false);

    const onPressSave = async (values) => {
        console.log("\n\n\nValues   ", values);
        const data = {
            currentPassword: values.currentPass,
            newPassword: values.newPass
        }
        const response = await postRequest('/change-password', data)
        console.log("\n\n\n\nPassword  Show in Console     ", data);
        console.log("\n\n\n\nPassword                  ", response);

        if (!response.success) {
            let errorMessage = "Wrong Current Password";
            if (response.data.error === "No Current Password Found ") {
                errorMessage = "Enter Correct Password"
            }
            Alert.alert('Error', errorMessage, [{ text: 'Okay' }])
        } else {
            props.navigation.goBack();
        }
    }

    return (
        <View style={styles.main} >
            <StatusBar backgroundColor={Colors.primary} />
            {/* Main  */}

            {/* Header */}
            <View style={styles.header} >
                <TouchableOpacity onPress={() => { props.navigation.goBack() }} >
                    <Ionicons name={Icons.BACK_ARROW} size={24} color={Colors.white} style={{ marginTop: 20 }} />
                </TouchableOpacity>
                <Text style={styles.change} >Change Password</Text>
            </View>

            {/* Body */}
            <View style={styles.body} >

                <View style={styles.validation} >
                    {/* Formik Validation Schema */}
                    <Formik
                        initialValues={{
                            currentPass: '',
                            newPass: '',
                            confirmPass: ''
                        }}
                        onSubmit={values => onPressSave(values)}
                        validationSchema={yup.object().shape({
                            currentPass: yup.string().required('Current password is required.').min(6, 'Password must be atlease 6 characters long.'),
                            newPass: yup.string().required('New password is required.').min(6, 'Password must be atlease 6 characters long.'),
                            confirmPass: yup.string().required('Please confirm your password.').oneOf([ref("newPass")], "Passwords do not match.")
                        })}
                    >

                        {({ values, errors, setFieldTouched, touched, handleChange, isValid, handleSubmit }) => (
                            <View style={styles.wrapping}>
                                {/* Current */}
                                <View>
                                    <View style={styles.current}>
                                        <Text>Current Password</Text>
                                        <View style={styles.allDone} >
                                        {!eyeTouched ? <FontAwesome name="lock" color={Colors.black} size={20}/>  :  <FontAwesome name="unlock" color={Colors.black} size={20}/> }
                                            <TextInput
                                                value={values.currentPass}
                                                onBlur={() => setFieldTouched('currentPass')}
                                                onChangeText={handleChange('currentPass')}
                                                placeholder="Enter Current Password"
                                                secureTextEntry={eyeTouched ? false : true}
                                                style={{marginRight:80}}
                                            />
                                            <TouchableOpacity onPress={() => setEyeTouched(!eyeTouched)} style={{ marginRight: 10 }} >
                                                {!eyeTouched ? <Feather name="eye-off" color={Colors.black} size={20} /> : <Feather name="eye" color={Colors.primary} size={20} />}
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.line} />
                                    </View>
                                    {touched.currentPass && errors.currentPass && <Text style={styles.errors} >{errors.currentPass}</Text>}

                                    {/* New Password */}
                                    <View style={styles.current}>
                                        <Text>New Password</Text>
                                        <View style={styles.allDone} >
                                        {!eyeTouched0 ? <FontAwesome name="lock" color={Colors.black} size={20}/>  :  <FontAwesome name="unlock" color={Colors.black} size={20}/> }
                                            <TextInput
                                                value={values.newPass}
                                                onBlur={() => setFieldTouched('newPass')}
                                                onChangeText={handleChange('newPass')}
                                                placeholder="Enter New Password"
                                                secureTextEntry={eyeTouched ? false : true}
                                                style={{marginRight:80}}
                                            />
                                            <TouchableOpacity onPress={() => setEyeTouched0(!eyeTouched0)} style={{ marginRight: 10 }} >
                                                {!eyeTouched0 ? <Feather name="eye-off" color={Colors.black} size={20} /> : <Feather name="eye" color={Colors.primary} size={20} />}
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.line} />
                                    </View>
                                    {touched.newPass && errors.newPass && <Text style={styles.errors} >{errors.newPass}</Text>}

                                    {/* Re-enter new Password */}
                                    <View style={styles.current}>
                                        <Text>Re- enter New Password</Text>
                                        <View style={styles.allDone} >
                                        {!eyeTouched1 ? <FontAwesome name="lock" color={Colors.black} size={20}/>  :  <FontAwesome name="unlock" color={Colors.black} size={20}/> }
                                            <TextInput
                                                value={values.confirmPass}
                                                onBlur={() => setFieldTouched('confirmPass')}
                                                onChangeText={handleChange('confirmPass')}
                                                placeholder="Re- Enter New Password"
                                                secureTextEntry={eyeTouched ? false : true}
                                                style={{marginRight:80}}
                                            />
                                             <TouchableOpacity onPress={() => setEyeTouched1(!eyeTouched1)} style={{ marginRight: 10 }} >
                                                {!eyeTouched1 ? <Feather name="eye-off" color={Colors.black} size={20} /> : <Feather name="eye" color={Colors.primary} size={20} />}
                                            </TouchableOpacity>

                                        </View>
                                        <View style={styles.line} />
                                    </View>
                                    {touched.confirmPass && errors.confirmPass && <Text style={styles.errors} >{errors.confirmPass}</Text>}

                                </View>
                                {/* Save Button */}
                                <TouchableOpacity style={styles.save} onPress={handleSubmit} disabled={!isValid} >
                                    <Text style={styles.saveTxt} >SAVE</Text>
                                </TouchableOpacity>
                            </View>
                        )
                        }
                    </Formik>

                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    header: {
        flex: 0.5,
        backgroundColor: Colors.primary,
        justifyContent: 'space-between',
        padding: 10,
        // paddingVertical:10
    },
    body: {
        flex: 3,
    },
    change: {
        fontSize: 24,
        color: Colors.white,
        fontWeight: 'bold',
    },
    current: {
        padding: 20,
        marginHorizontal: 10
    },
    errors: {
        fontSize: 11,
        color: Colors.red,
        paddingHorizontal: 20,
        marginLeft: 10,
    },
    save: {
        alignItems: 'center',
        backgroundColor: Colors.primary,
        marginBottom: 20,
        padding: 10,
        width: '80%',
        borderRadius: 10,
        marginHorizontal: 35
    },
    saveTxt: {
        fontSize: 20,
        color: Colors.white
    },
    line: {
        height: 0,
        borderColor: Colors.grey,
        borderWidth: 0.5,
        width: '100%',
        flexDirection: 'row',
    },
    wrapping: {
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: 25
    },
    validation: {
        justifyContent: 'space-between',
        flex: 1
    },
    allDone:{
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginTop:10
    }
});

export default ChangePasswordScreen;
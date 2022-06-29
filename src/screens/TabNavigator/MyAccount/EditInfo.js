import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image, ScrollView, ImageBackground, Dimensions } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Formik } from 'formik';
import { Colors, Images, Icons } from '../../../CommonConfig/CommonConfig';
import { async } from '@firebase/util';
import EditInfoValidationSchema from '../../../Schema/EditInfoValidationSchema';
import { postRequest } from '../../../Helper/ApiHelper';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CardStyleInterpolators } from '@react-navigation/stack';

const EditInfoScreen = (props) => {

    const [user, setUser] = useState({})

    useEffect( () => {
        getProfile()
    },[])

    const getProfile = async() => {
        setUser(JSON.parse(await AsyncStorage.getItem("userInfo")))
    } 

    const onPressEdit = async (values) => {
        const data = {
            name: values?.name,
            phone: values?.phone
        }
        //  console.log('EDIT DATA          ', data)

        const EditResponse = await postRequest('/update-profile', data)
        //  console.log("EDIT Screen Response          ", EditResponse)

        if (EditResponse.success) {
            AsyncStorage.setItem("userInfo",JSON.stringify({...user, name: data.name, phone: data.phone}))
            Toast.show('Update customer successfully')
            props.navigation.goBack();
        }
        else {
            Toast.show('Unable to Update Information')
        }
    }

    return (
        // Home Screen
        <View style={styles.main} >
            <StatusBar backgroundColor={Colors.primary} />

            {/* Header */}

            <View style={styles.header} >
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Ionicons name={Icons.BACK_ARROW} size={24} color={Colors.white} style={styles.back} />
                </TouchableOpacity>
                <Text style={styles.titleFruit} >Edit Information</Text>
            </View>
            {/* Body  */}
            <View style={styles.mainWrapper}>
                <Formik
                    initialValues={{
                        name: '',
                        phone: '',
                    }}
                    onSubmit={values => { onPressEdit(values) }}
                    validationSchema={EditInfoValidationSchema}
                >
                    {({ values, errors, setFieldTouched, touched, handleChange, setFieldValue, isValid, handleSubmit }) => (

                        <View style={styles.wrapper} >
                            {/* Name */}
                            <View>
                            <Text style={styles.text}>Full Name</Text>
                            <TextInput
                                value={values.name}
                                onBlur={() => setFieldTouched('name')}
                                onChangeText={handleChange('name')}
                                placeholder='Enter Your Name'
                                style={styles.edit}
                            />
                            {touched.name && errors.name &&
                                <Text style={styles.error}>{errors.name}</Text>
                            }
                            <View style={styles.line} />

                            {/* Country Code & Phone */}

                            <Text style={styles.text} >Contact Number</Text>
                            <TextInput
                                value={values.phone}
                                onBlur={() => setFieldTouched('phone')}
                                onChangeText={handleChange('phone')}
                                keyboardType='numeric'
                                placeholder='Enter Phone Number'
                                maxLength={10}
                                style={styles.edit}
                            />
                            {touched.phone && errors.phone &&
                                <Text style={styles.error}>{errors.phone}</Text>
                            }

                            <View style={styles.line} />
                            </View>

                            <View style={{ alignItems: 'center', }} >
                                <TouchableOpacity onPress={handleSubmit}>
                                    <Text style={styles.signin} >APPLY</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                    )}
                </Formik>
            </View>

        </View>
    )
}

export default EditInfoScreen;

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    header: {
        flex: 0.6,
        backgroundColor: Colors.primary,
        justifyContent: 'space-between',
        padding: 15
    },
    back: {
        marginTop: 20,
    },
    titleFruit: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.white
    },
    mainWrapper: {
        flex: 3,
        padding: 25,
        //  justifyContent: 'space-between',
    },
    line: {
        height: 0,
        borderColor: Colors.grey,
        borderWidth: 0.5,
        width: '100%',
        flexDirection: 'row',
    },
    wrapper: {
        paddingHorizontal: 10,
        marginTop: 10,
        justifyContent: 'space-between',
    },
    edit: {
        paddingVertical: 10
    },
    text: {
        paddingVertical: 10
    },
    error: {
        fontSize: 12,
        color: Colors.red
    },
    signin: {
        width: 280,
        backgroundColor: Colors.primary,
        textAlign: 'center',
        color: Colors.white,
        fontSize: 23,
        padding: 10,
        borderRadius: 10,
        borderColor: Colors.green,
        overflow: 'hidden',
        marginTop:350
    },
})
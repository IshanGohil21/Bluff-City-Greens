import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button, Dimensions } from 'react-native';
import { Formik } from "formik";
import * as yup from 'yup';
import { Ionicons } from '@expo/vector-icons';
import LinearGradient from "react-native-linear-gradient";
import { StatusBar } from 'expo-status-bar';
import SignInValidationSchema from "../../Schema/SignInValidationSchema";
import {Images, Colors} from '../../CommonConfig/CommonConfig'

const SignInScreen = (props) => {

    const [rememberMe, setRememberMe] = useState(false);
    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            onSubmit={values => Alert.alert(JSON.stringify(values))}
            validationSchema={SignInValidationSchema}
        >
            {({ values, errors, setFieldTouched, touched, handleChange, isValid, handleSubmit }) => (
                <View style={styles.mainWrapper}>
                    <View>
                        <StatusBar style="auto" />
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => { props.navigation.navigate('MainTab',{screen: 'Home' } )}}>
                            <Text style={styles.skip} > SKIP </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.imageContainer}>
                        <Image
                            source={Images.spinach}
                            style={styles.image}
                            resizeMode='contain'
                        />
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.bluff}>Bluff City </Text></View>
                            <View><Text style={styles.greens}> GREENS </Text></View>
                        </View>
                    </View>

                    <Text style={{ textAlign: 'left', paddingVertical: 10, color: 'white' }}>Email id</Text>
                    <TextInput
                        value={values.email}
                        style={styles.customCss}
                        onBlur={() => setFieldTouched('email')}
                        onChangeText={handleChange('email')}
                        placeholder="E-mail"
                        color="white"
                        keyboardType='email-address'
                    />
                    {touched.email && errors.email &&
                        <Text style={styles.emailError}>{errors.email}</Text>
                    }
                    <Text style={{ color: Colors.white }} >Password</Text>
                    <TextInput
                        value={values.password}
                        style={styles.customCss}
                        placeholder="Password"
                        onBlur={() => setFieldTouched('password')}
                        onChangeText={handleChange('password')}
                        secureTextEntry={true}
                    />
                    {touched.password && errors.password &&
                        <Text style={styles.errors}>{errors.password}</Text>
                    }
                    <TouchableOpacity onPress={() => {
                        props.navigation.navigate('ForgotPassword')
                    }} >
                        <Text style={styles.forgot_password}> Forgot Password ? </Text>
                    </TouchableOpacity>

                    <View style={styles.rememberContainer}>
                        <TouchableOpacity onPress={() => { setRememberMe(!rememberMe) }}>
                            {rememberMe ? <Ionicons name="checkbox-outline" size={20} color='white' /> : <Ionicons name="square-outline" size={20} color='white' />}
                        </TouchableOpacity>
                        <Text style={styles.remember}> Remember me </Text>
                    </View>

                    <TouchableOpacity onPress={() => { props.navigation.navigate('DiscountCoupon') }} >
                        <Text style={styles.signin}> SIGN IN </Text>
                    </TouchableOpacity>

                    <View style={{ alignItems: 'center' }} >
                        <View style={styles.connect}>
                            <View style={styles.connectContainer} />
                            <View>
                                <Text style={styles.connectWith}>OR  CONNECT WITH</Text>
                            </View>
                            <View style={styles.body} />
                        </View>
                    </View>

                    <View style={styles.bodyContainer} >
                        <View>
                            <TouchableOpacity onPress={() => { }}>
                                <Image source={Images.facebook} style={styles.image2} />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => { }}>
                                <View style={styles.image3Container}>
                                    <Image source={Images.google} style={styles.image3} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.account}>
                        <Text style={{ color: Colors.white }}>Don't have account?</Text>
                        <TouchableOpacity onPress={() => {
                            props.navigation.navigate('SignUp')
                        }} >
                            <Text style={styles.signup} > SignUp </Text>
                        </TouchableOpacity>
                    </View>


                </View>
            )}
        </Formik>

    );
}

const styles = StyleSheet.create({
    mainWrapper: {
        flex: 1,
        padding: 40,
        justifyContent: 'center',
        backgroundColor: Colors.primary
    },
    customCss: {
        padding: 10,
        marginBottom: 12,
        borderColor: '#cccccc',
        borderRadius: 10,
        marginTop: 5,
        width: '100%',
        backgroundColor: 'rgba(50,75,255,0.25)'
    },
    forgot_password: {
        height: 30,
        marginBottom: 30,
        textAlign: 'right',
        fontSize: 14,
        color: Colors.white
    },
    signin: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.green,
        textAlign: 'center',
        color: Colors.white,
        fontSize: 23,
        padding: 10,
        borderRadius: 10,
        borderColor: Colors.green,
        overflow: 'hidden',
        width: '100%'
    },
    remember: {
        height: 20,
        marginBottom: 20,
        textAlign: 'left',
        fontSize: 14,
        color: Colors.white,
        
    },
    image: {
        flexDirection: 'row',
        width: 120,
        height: 120,
    },
    skip: {
        textAlign: 'right',
        color: Colors.white,
        padding: 10
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 70
    },
    bluff: {
        color: Colors.white,
        fontSize: 40,
        padding: 10,
        fontWeight: '600'
    },
    greens: {
        color: Colors.white,
        fontSize: 50,
        fontWeight: 'bold'
    },
    errors: {
        fontSize: 11,
        color: Colors.red
    },
    rememberContainer: {
        flexDirection: 'row',
        marginBottom: 40
    },
    connect: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 30,
        width: '65%'
    },
    emailError: {
        fontSize: 11,
        color: Colors.red
    },
    connectContainer: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.white
    },
    connectWith: {
        width: 150,
        textAlign: 'center',
        color: Colors.white,
        fontSize: 14
    },
    body: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.white
    },
    bodyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    image2: {
        height: 50,
        width: 50
    },
    image3: {
        height: 40,
        width: 40
    },
    account: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    signup: {
        color: Colors.lightGreen,
        fontWeight: 'bold',
        fontSize: 20
    },
    image3Container: {
        borderRadius: 25,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default SignInScreen;
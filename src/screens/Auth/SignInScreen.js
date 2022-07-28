import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions, Alert, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { Formik } from "formik";
import * as yup from 'yup';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import SignInValidationSchema from "../../Schema/SignInValidationSchema";
import { Images, Colors, Button } from '../../CommonConfig/CommonConfig'
import { postRequest, getRequest } from '../../Helper/ApiHelper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from '@react-native-firebase/messaging';

const SignInScreen = (props) => {

    const [isLoading, setisLoading] = useState(false);

    const onPressLogin = async (values) => {
        setisLoading(true);
        const data = {
            email: values.email,
            password: values.password,
        };
        const response = await postRequest('/login', data);
        //  console.log( "helooooooo",response);
        if (!response.success) {
            setisLoading(false);
            let errorMessage = "Something went wrong!";
            if (response.data.error === "User does not exist!") {
                errorMessage = "User does not exist!"
            }
            if (response.data.error === "Invalid Password!") {
                errorMessage = "Invalid Password!"
            }
            Alert.alert('Error', errorMessage, [{ text: "Okay" }])
        } else {
            setisLoading(false);
            await AsyncStorage.setItem('token', response.data.access_token)
            // console.log("\n\n\n\n\ALL DATA             ", response.data);
            // console.log("\n\n\n\n\nACCESS             ", response.data.access_token) 
            await AsyncStorage.setItem('refreshToken', response.data.refresh_token)
            // console.log("\n\n\n\n\nREFRESH            ", response.refresh_token);
            await AsyncStorage.setItem('userInfo', JSON.stringify(response.data.user))
            // console.log("\n\n\n\n\n USER        ", response.data.user);
            await AsyncStorage.setItem('isLogin', "true")
            props.navigation.navigate('MainTab', { screen: 'Home' })
        }
    }

    const [rememberMe, setRememberMe] = useState(false);
    return (

        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            onSubmit={(values) => onPressLogin(values)}
            validationSchema={SignInValidationSchema}
        >
            {({ values, errors, setFieldTouched, touched, handleChange, isValid, handleSubmit }) => (
                <View style={styles.mainWrapper}>
                    <View>
                        <StatusBar style="auto" />
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => props.navigation.navigate('MainTab', { screen: 'Home', params: { skipped: true } })}>
                            <Text style={styles.skip}> SKIP </Text> 
                        </TouchableOpacity>
                    </View>

                    <View style={styles.imageContainer}>
                        <Image
                            source={Images.logo1}
                            style={styles.image}
                            resizeMode='contain'
                        />
                        
                        <View style={styles.siginnn} >
                            <View style={styles.signInStyle}>
                                <Text style={styles.bluff}>Bluff City </Text></View>
                            <View><Text style={styles.greens}> GREENS </Text></View>
                        </View>
                    </View>


                    <Text style={styles.emailId}>Email id</Text>
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
                        color="white"
                        onBlur={() => setFieldTouched('password')}
                        onChangeText={handleChange('password')}
                        secureTextEntry={true}
                    />

                    {touched.password && errors.password &&
                        <Text style={styles.errors}>{errors.password}</Text>
                    }

                    <View style={styles.rememberContainer} >

                        <View style={styles.flexing} >
                            <TouchableOpacity onPress={() => { setRememberMe(!rememberMe) }}>
                                {rememberMe ? <Ionicons name="checkbox-outline" size={20} color={Colors.white} /> : <Ionicons name="square-outline" size={20} color={Colors.white} />}
                            </TouchableOpacity>
                            <Text style={styles.remember}> Remember me </Text>
                        </View>

                        <TouchableOpacity onPress={() => {
                            props.navigation.navigate('ForgotPassword')
                        }} >
                            <Text style={styles.forgot_password}> Forgot Password ? </Text>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.alignment} >
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

                    <TouchableOpacity onPress={handleSubmit} >
                        <View style={styles.signin}>
                            {isLoading ? <ActivityIndicator size="small" color={Colors.white} /> :
                                <Text style={styles.siginFont} >  SIGN IN </Text>}
                        </View>
                    </TouchableOpacity>

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
        padding: 30,
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
        backgroundColor: Colors.white,
        color: Colors.black
    },
    forgot_password: {
        height: 30,
        textAlign: 'right',
        fontSize: 14,
        color: Colors.white
    },
    signin: {
        width: "90%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.green,
        textAlign: 'center',
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 20,
        marginVertical: 40
    },
    remember: {
        height: 20,
        textAlign: 'left',
        fontSize: 14,
        color: Colors.white,

    },
    image: {
        flexDirection: 'row',
        width: 140,
        height: 140,
        marginLeft: 15
    },
    skip: {
        textAlign: 'right',
        color: Colors.white,
        padding: 5,
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        padding: 20
    },
    bluff: {
        color: Colors.white,
        fontSize: 30,
        padding: 5,
        fontWeight: '600',
        marginRight: 30
    },
    greens: {
        color: Colors.white,
        fontSize: 45,
        fontWeight: 'bold'
    },
    errors: {
        fontSize: 11,
        color: Colors.red
    },
    rememberContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5
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
        backgroundColor: Colors.white,
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
    },
    siginnn:{
        alignItems: 'center', 
        justifyContent: 'center', 
        marginRight: 60 
    },
    emailId:{
        textAlign: 'left', 
        paddingVertical: 10, 
        color: Colors.white
    },
    signinFont:{
        fontSize: 24, 
        color: Colors.white 
    },
    signInStyle:{
        flexDirection: 'row',
         justifyContent: 'center', 
         alignItems: 'center'
    },
    alignment:{
        alignItems: 'center' 
    },
    flexing:{
        flexDirection: 'row' 
    },

});

export default SignInScreen;
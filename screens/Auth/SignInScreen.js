import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button, Dimensions,SafeAreaView } from 'react-native';
import { Formik } from "formik";
import * as yup from 'yup';
import { Ionicons } from '@expo/vector-icons';
import LinearGradient from "react-native-linear-gradient";

const SignInScreen = (props) => {
    const [rememberMe, setRememberMe] = useState(false);
    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            onSubmit={values => Alert.alert(JSON.stringify(values))}
            validationSchema={yup.object().shape({
                email: yup
                    .string()
                    .email()
                    .required('Email is required.'),
                mobile: yup
                    .number()
                    .max(10)
                    .required(),
                password: yup
                    .string()
                    .min(3, 'Password can not be less than 3 characters.')
                    .max(11, 'Password can not be more than 12 characters long.')
                    .required(),
            })}
        >
            {({ values, errors, setFieldTouched, touched, handleChange, isValid, handleSubmit }) => (
                <View style={styles.mainWrapper}>
                    <View>
                        <TouchableOpacity onPress={() => {}}>
                            <Text style={{textAlign:'right', color:'white', padding: 10}} > SKIP </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 70 }}>
                        <Image
                            source={require('../../assets/icon/icons8-spinach-100.png')}
                            style={styles.image}
                            resizeMode='contain'
                        />
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ color: 'white', fontSize: 40, padding: 10, fontWeight: '600' }}>Bluff City </Text></View>
                            <View><Text style={{ color: 'white', fontSize: 50, fontWeight: 'bold' }}> GREENS </Text></View>
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
                        <Text style={{ fontSize: 11, color: 'red' }}>{errors.email}</Text>
                    }
                    <Text style={{ color: 'white' }} >Password</Text>
                    <TextInput
                        value={values.password}
                        style={styles.customCss}
                        placeholder="Password"
                        onBlur={() => setFieldTouched('password')}
                        onChangeText={handleChange('password')}
                        secureTextEntry={true}
                    />
                    {touched.password && errors.password &&
                        <Text style={{ fontSize: 11, color: 'red' }}>{errors.password}</Text>
                    }
                    <TouchableOpacity onPress={() => {
                        props.navigation.navigate('ForgotPassword')
                    }} >
                        <Text style={styles.forgot_password}> Forgot Password ? </Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => { setRememberMe(!rememberMe) }}>
                            {rememberMe ? <Ionicons name="checkbox-outline" size={20} color='white' /> : <Ionicons name="square-outline" size={20} color='white' />}
                        </TouchableOpacity>
                        <Text style={styles.remember}> Remember me </Text>
                    </View>

                    <TouchableOpacity>
                        <Text style={styles.signin}> SIGN IN </Text>
                    </TouchableOpacity>

                    <View style={{ alignItems: 'center' }} >
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 30, width: '65%' }}>
                            <View style={{ flex: 1, height: 1, backgroundColor: 'white' }} />
                            <View>
                                <Text style={{ width: 150, textAlign: 'center', color: 'white' }}>OR  CONNECT WITH</Text>
                            </View>
                            <View style={{ flex: 1, height: 1, backgroundColor: 'white' }} />
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }} >
                        <View>
                            <TouchableOpacity onPress={() => { }}>
                                <Image source={require('../../assets/icon/icons8-facebook-circled-100.png')} style={{ height: 50, width: 50 }} />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => { }}>
                                <View style={{ borderRadius: 25, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                                    <Image source={require('../../assets/icon/icons8-google-100.png')} style={{ height: 40, width: 40 }} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View  style={{flexDirection: 'row', justifyContent:'center', alignItems:'center', marginTop: 10}}>
                            <Text style={{color:'white'}} >Don't have account?</Text>
                            <TouchableOpacity onPress={() => {
                                props.navigation.navigate('SignUp')
                            }} > 
                        <Text style={{color:'#4ef001', fontWeight:'bold', fontSize:20}} > SignUp </Text>
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
        backgroundColor: '#259D57'
    },
    customCss: {
        padding: 10,
        marginBottom: 12,
        borderColor: '#cccccc',
        borderRadius: 10,
        marginTop: 5,
        width: '100%',
        backgroundColor: 'rgba(50,0,255,0.3)'
    },
    forgot_password: {
        height: 30,
        marginBottom: 30,
        textAlign: 'right',
        fontSize: 18,
        color: 'white'
    },
    signin: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "green",
        textAlign: 'center',
        color: 'white',
        fontSize: 23,
        padding: 10,
        borderRadius: 10,
        borderColor: 'green',
        overflow: 'hidden',
        width: '100%'
    },
    remember: {
        height: 30,
        marginBottom: 20,
        textAlign: 'left',
        fontSize: 18,
        color: 'white'
    },
    image: {
        flexDirection: 'row',
        width: 120,
        height: 120,
    },

});


export default SignInScreen;
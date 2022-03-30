import React, { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View, Image, TextInput, SafeAreaView, TouchableOpacity, ScrollView, Button, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Formik } from "formik";
import * as yup from 'yup';
import ProfilePicture from 'react-native-profile-picture';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import PhoneInput from 'react-native-phone-number-input';
// import * as  ImagePicker from 'react-native-image-picker';
//import * as Permissions from 'expo-permissions';
import PhoneVerificationScreen from './PhoneVerification'



const SignUpScreen = props => {

    const [phoneNumber, setphoneNumber] = useState('');
    const phoneInput = useRef(null);
      

    return (
       // <SafeAreaView>
            <ScrollView>
                <View style={{ flex: 1 }}>

                    <TouchableOpacity onPress={() => {
                        props.navigation.goBack()
                    }
                    }
                        style={{ backgroundColor: '#259D57' }}
                    >
                        <Ionicons name='arrow-back-outline' color='white' size={24} style={{ marginBottom: 20 }} />
                    </TouchableOpacity>

                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            mobile: '',
                            password: ''
                        }}
                        onSubmit={values => Alert.alert(JSON.stringify(values))}
                        validationSchema={yup.object().shape({
                            name: yup
                                .string()
                                .required('Name is required.'),
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
                            passwordConfirm: yup
                                .string()
                                .label('Password Confirm')
                                .required()
                                .oneOf([yup.ref('password')], 'Passwords does not match'),
                        })}
                    >
                        {({ values, errors, setFieldTouched, touched, handleChange, isValid, handleSubmit }) => (
                            <View style={styles.mainWrapper}>

                                <View style={styles.profile} >
                                    <TouchableOpacity
                                        style={styles.avatarContainer}
                                        onPress={() => { }}
                                    >
                                        <Image
                                            source={require('../../assets/icon/cr7.png')}
                                            style={styles.avatar}
                                        />
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity onPress={() => { }}
                                    style={styles.camera}
                                    onPress={ () => {}}
                                >
                                    <Ionicons name='camera' color='#259D57' size={25} />
                                </TouchableOpacity>

                                <View>
                                    <Text style={{ color: 'white' }}>Name</Text>
                                    <TextInput
                                        value={values.name}
                                        style={styles.customCss}
                                        onBlur={() => setFieldTouched('name')}
                                        onChangeText={handleChange('name')}
                                        placeholder="Name"

                                    />
                                    {touched.name && errors.name &&
                                        <Text style={{ fontSize: 11, color: 'red' }}>{errors.name}</Text>
                                    }

                                    <Text style={{ color: 'white' }} >Email</Text>
                                    <TextInput
                                        value={values.email}
                                        style={styles.customCss}
                                        onBlur={() => setFieldTouched('email')}
                                        onChangeText={handleChange('email')}
                                        placeholder="E-mail"
                                        keyboardType='email-address'
                                    />
                                    {touched.email && errors.email &&
                                        <Text style={{ fontSize: 11, color: 'red' }}>{errors.email}</Text>
                                    }

                                    <Text style={{ color: 'white', marginBottom: 5 }}>Phone Number</Text>


                                    <PhoneInput
                                        ref={phoneInput}
                                        style={styles.customCss}
                                        defaultValue={phoneNumber}
                                        defaultCode="IN"
                                        layout="first"
                                        withShadow
                                        //autoFocus
                                        containerStyle={styles.phoneContainer}
                                        textContainerStyle={styles.textInput}
                                        onChangeFormattedText={text => {
                                            setphoneNumber(text);
                                        }}
                                    />
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
                                    <Text style={{ color: 'white' }}> Confirm Password </Text>
                                    <TextInput
                                        value={values.passwordConfirm}
                                        style={styles.customCss}
                                        placeholder='confirm Password'
                                        onBlur={() => setFieldTouched('passwordConfirm')}
                                        onChangeText={handleChange('passwordConfirm')}
                                        secureTextEntry={true}
                                    />
                                    {touched.passwordConfirm && errors.passwordConfirm &&
                                        <Text style={{ fontSize: 11, color: 'red' }} >{errors.passwordConfirm}</Text>
                                    }
                                </View>


                                <TouchableOpacity  onPress={() => {
                                    props.navigation.navigate('PhoneVerification')
                                }}>
                                    <Text style={styles.signin}> SIGN UP </Text>
                                </TouchableOpacity>

                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 40 }}>
                                    <Text style={{ color: 'white' }}> Already have account? </Text>
                                    <TouchableOpacity onPress={() => {
                                        props.navigation.goBack()
                                    }} >
                                        <Text style={{ color: '#4ef001', fontWeight: 'bold', fontSize: 20 }} >  SignIn </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </Formik>
                </View>
            </ScrollView>
     //   </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    mainWrapper: {
        flex: 1,
        padding: 25,
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
        width: '100%',
    },
    profile: {

        alignItems: 'center',
        width: '100%',
        marginBottom: 50
    },
    avatar: {
        // position: 'absolute',
        width: 160,
        height: 160,
        borderRadius: 10
    },
    camera: {
        position: 'absolute',
        right: Dimensions.get('window').width * 0.250,
        top: Dimensions.get('window').width * 0.35,
        borderRadius: 25,
        borderWidth: 4,
        borderColor: '#259D57',
        overflow: 'hidden',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 50,
        width: 50,
        justifyContent: 'center'
    },
    phoneContainer: {
        width: '100%',
        height: 50,
        marginBottom: 15,
        backgroundColor: '#259D57'
    },
    textInput: {
        paddingVertical: 0,
        backgroundColor: 'rgba(50,0,255,0.3)'
    },
});

export default SignUpScreen;
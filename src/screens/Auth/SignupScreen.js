import React, { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View, Image, TextInput, Modal, SafeAreaView, TouchableOpacity, ScrollView, Dimensions, Alert, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Formik } from "formik";
import * as yup from 'yup';
import ProfilePicture from 'react-native-profile-picture';
import PhoneInput from 'react-native-phone-number-input';
import PhoneVerificationScreen from './PhoneVerification'
import ImagePicker from 'react-native-image-crop-picker';
import SignUpValidationSchema from '../../Schema/SignUpValidationSchema';
import { Colors, Images, Icons, Button } from '../../CommonConfig/CommonConfig';
import RBSheet from "react-native-raw-bottom-sheet";
import CountryPicker from 'react-native-country-codes-picker';
import * as Animatable from 'react-native-animatable';

import * as AuthActions from '../../Redux/Action/AuthAction';
import { useDispatch } from 'react-redux';
import { postRequest } from '../../Helper/ApiHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather';

const SignUpScreen = props => {

    const [show, setShow] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [image, setImage] = useState(null);
    const [countryCode, setCountryCode] = useState('+91');
    const [isLoading, setisLoading] = useState(false);
    const refRBSheet = useRef();

    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            
        }).then(image => {
            console.log(image);
            // dispatch(AuthAction.addImage(image))
            setImage(image)
            setModalVisible(!modalVisible)
        });
    };

    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            // dispatch(AuthAction.addImage(image))
            setImage(image)
            console.log(image);
            setModalVisible(!modalVisible)
        });
    };

    const dispatch = useDispatch();

    const pressHandler = async (countryCode, mobile, xyz) => {
        setisLoading(true);
        
        const OTPData = {
            country_code: countryCode,
            phone_number: mobile,
            channel: "sms"
        }
        const response = await postRequest('/generate-OTP', OTPData);
        console.log("SMS Response  ",response)
        let errorMsg = 'Something went wrong!';
        if (response.success) {
            setisLoading(false);
            dispatch(AuthActions.addDetails(xyz));
            props.navigation.navigate('PhoneVerification', { countryCode: countryCode, mobile: mobile , xyz})
        } else {
            setisLoading(false);
            Alert.alert("Error", errorMsg, [{ text: "Okay" }])
        }
    }

    return (
        <>
            <ScrollView>
                <View style={styles.main}>

                    <TouchableOpacity onPress={() => {
                        props.navigation.goBack()
                    }
                    }
                        style={styles.back}
                    >
                        <Ionicons name={Icons.BACK_ARROW} color={Colors.white} size={28} style={styles.backArrow} />
                    </TouchableOpacity>

                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            mobile: '',
                            password: '',
                            passwordConfirm: '',
                        }}

                        onSubmit={values => {
                            const xyz = { name: values.name, email: values.email, password: values.password, country_code: countryCode, phone: values.mobile, image: image}
                            dispatch(AuthActions.addDetails(xyz));
                            pressHandler(countryCode, values.mobile, xyz)
                            // onPressRegister(countryCode,values.mobile,xyz)
                        }
                    }
                        
                        validationSchema={SignUpValidationSchema}
                    >
                        {({ values, errors, setFieldTouched, touched, handleChange, isValid, handleSubmit }) => (
                            <View style={styles.mainWrapper}>

                                <View style={styles.profile} >
                                    <View
                                        style={styles.avatarContainer}
                                    >
                                        {image && <Image
                                            source={{ uri: image.path }}
                                            style={styles.avatar}
                                        />}
                                        {!image &&
                                            <Image source={Images.userPic0} style={styles.avatar} />
                                        }
                                    </View>
                                </View>
                                
                                <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={modalVisible}
                                >
                                    <View style={styles.centeredView}>
                                        <View style={styles.modalView}>

                                            <Text style={styles.modalText}>Choose From</Text>
                                            <TouchableOpacity
                                                style={[styles.button, styles.buttonClose]}
                                                onPress={choosePhotoFromLibrary}
                                            >
                                                <Text style={styles.textStyle}>Gallery</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={[styles.button, styles.buttonClose]}
                                                onPress={takePhotoFromCamera}
                                            >
                                                <Text style={styles.textStyle}>Camera</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={[styles.button, styles.buttonClose]}
                                                onPress={() => { setModalVisible(false) }}
                                            >
                                                <Text style={styles.textStyle}>Close</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </Modal>


                                <TouchableOpacity
                                    style={styles.camera}
                                    onPress={() => setModalVisible(true)}
                                >
                                    <Ionicons name='camera' color={Colors.primary} size={24} />
                                </TouchableOpacity>

                                <View>
                                    <Text style={styles.emailContainer}>Name</Text>
                                    
                                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}} >
                                    
                                    <TextInput
                                        value={values.name}
                                        style={styles.customCss}
                                        onBlur={() => setFieldTouched('name')}
                                        onChangeText={handleChange('name')}
                                        placeholder="Name"
                                        
                                    />
                                    {touched.name ? (!errors.name ? <Animatable.View animation="bounceIn" ><Feather name="check-circle" color={Colors.lightYellow} size={20} /></Animatable.View> : null) : null}
                                    </View>

                                    {touched.name && errors.name &&
                                        <Text style={styles.error}>{errors.name}</Text>
                                    }

                                    <Text style={styles.emailContainer}>Email</Text>
                                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',}} >
                                    <TextInput
                                        value={values.email}
                                        style={styles.customCss}
                                        onBlur={() => setFieldTouched('email')}
                                        onChangeText={handleChange('email')}
                                        placeholder="E-mail"
                                        keyboardType='email-address'
                                    />
                                         {touched.email ? (!errors.email ? <Animatable.View animation="bounceIn" ><Feather name="check-circle" color={Colors.lightYellow} size={20} /></Animatable.View> : null) : null}
                                    </View>
                                    {touched.email && errors.email &&
                                        <Text style={styles.errorEmail}>{errors.email}</Text>
                                    }

                                    <Text style={styles.phone}>Phone Number</Text>

                                    <View style={styles.phoneCont} >

                                        <TouchableOpacity onPress={() => setShow(true)} style={styles.flexing}><Ionicons name="caret-down-outline" size={20} color={Colors.black} /></TouchableOpacity>
                                        
                                        <Text style={{ flex: 0.5, fontWeight: 'bold' }}>{countryCode}</Text>
                                        <TextInput
                                            style={{ flex: 3.5,}}
                                            // style={styles.customCss}
                                            keyboardType="phone-pad"
                                            maxLength={10}
                                            color="black"
                                            placeholder='Enter your Phone Number'
                                            onBlur={() => setFieldTouched('mobile')}
                                            onChangeText={handleChange('mobile')}
                                        />
                                         {touched.mobile ? (!errors.mobile ? <Animatable.View animation="bounceIn" ><Feather name="check-circle" color={Colors.primary} size={20} /></Animatable.View> : null) : null}
                                    </View>

                                    <Text style={styles.password} >Password</Text>

                                    <TextInput
                                        value={values.password}
                                        style={styles.customCss}
                                        placeholder="Password"
                                        onBlur={() => setFieldTouched('password')}
                                        onChangeText={handleChange('password')}
                                        secureTextEntry={true}
                                    />
                                    {touched.password && errors.password &&
                                        <Text style={styles.passwordContainer}>{errors.password}</Text>
                                    }
                                    <Text style={{ color: Colors.white }}> Confirm Password </Text>
                                    <TextInput
                                        value={values.passwordConfirm}
                                        style={styles.customCss}
                                        placeholder='Confirm Password'
                                        onBlur={() => setFieldTouched('passwordConfirm')}
                                        onChangeText={handleChange('passwordConfirm')}
                                        secureTextEntry={true}
                                    />
                                    {touched.passwordConfirm && errors.passwordConfirm &&
                                        <Text style={styles.errorPassword} >{errors.passwordConfirm}</Text>
                                    }
                                </View>
                               
                                    <TouchableOpacity onPress={handleSubmit} disabled={!isValid} >
                                        <View style={styles.signin}>
                                            {isLoading ? <ActivityIndicator size='small' color={Colors.white} /> :
                                                <Text style={{ fontSize: 24, color: Colors.white }}  > SIGN UP </Text>}
                                        </View>
                                    </TouchableOpacity>
                             
                                <View style={styles.account}>
                                    <Text style={styles.emailContainer}> Already have account? </Text>
                                    <TouchableOpacity onPress={() => {
                                        props.navigation.goBack()
                                    }} >
                                        <Text style={styles.signIn} >  SignIn </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </Formik>

                </View>
            </ScrollView>
            <CountryPicker
                show={show}
                style={{
                    modal: {
                        height: 500,

                    },
                    countryButtonStyles: {
                        height: 50,
                        backgroundColor: Colors.white
                    },
                    flag: {
                        fontSize: 20,
                    },
                    dialCode: {
                        fontSize: 18,
                        fontWeight: 'bold'
                    },
                    countryName: {
                        fontSize: 18
                    },
                     getFlag: true
                }}
                pickerButtonOnPress={(item) => {
                    setCountryCode(item.dial_code);
                    setShow(false);
                }}
            />
        </>
    );
}

const styles = StyleSheet.create({
    mainWrapper: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: Colors.primary
    },
    customCss: {
        padding: 10,
        marginBottom: 12,
        borderRadius: 10,
        marginTop: 5,
        width: '100%',
        backgroundColor: Colors.white,
        color:Colors.black
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
        marginVertical: 10
    },
    profile: {
        alignItems: 'center',
        width: '100%',
        marginBottom: 50
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 10
    },
    camera: {
        position: 'absolute',
        right: Dimensions.get('window').width * 0.300,
        top: Dimensions.get('window').width * 0.25,
        borderRadius: 25,
        borderWidth: 4,
        borderColor: Colors.primary,
        overflow: 'hidden',
        alignItems: 'center',
        backgroundColor: Colors.white,
        height: 50,
        width: 50,
        justifyContent: 'center'
    },
    phoneContainer: {
        width: '100%',
        height: 50,
        marginBottom: 15,
        backgroundColor: 'rgba(25,20,200,0.35)',
    },
    textInput: {
        paddingVertical: 0,
        backgroundColor: 'rgba(25,20,200,0.35)',
        borderColor: '#cccccc'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        backgroundColor: Colors.white,
        borderRadius: 40,
        padding: 25,
        alignItems: "center",
        shadowColor: "#000",
        height: 280,
        width: 270,
    },
    button: {
        borderRadius: 50,
        padding: 10,
        elevation: 2,
        marginTop: 20,
        width: 150
    },
    buttonOpen: {
        backgroundColor: Colors.primary,
    },
    buttonClose: {
        backgroundColor: Colors.primary,
        justifyContent: 'center'
    },
    textStyle: {
        color: Colors.white,
        fontWeight: "bold",
        textAlign: "center",
        padding: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 20
    },
    main: {
        flex: 1
    },
    back: {
        backgroundColor: Colors.primary
    },
    backArrow: {
        marginTop: 30,
        marginLeft: 10
    },
    error: {
        fontSize: 11,
        color: Colors.red
    },
    phone: {
        color: Colors.white,
        marginBottom: 5
    },
    password: {
        color: Colors.white
    },
    signIn: {
        color: Colors.lightGreen,
        fontWeight: 'bold',
        fontSize: 20
    },
    errorPassword: {
        fontSize: 11,
        color: Colors.red
    },
    errorEmail: {
        fontSize: 11,
        color: Colors.red
    },
    account: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 40
    },
    passwordContainer: {
        fontSize: 11,
        color: Colors.red
    },
    emailContainer: {
        color: Colors.white
    },
    phoneCont: {
        flexDirection: 'row',
        marginBottom: 12,
        borderRadius: 10,
        padding: 10,
        backgroundColor:Colors.white,
        alignItems: 'center'
    },
    flexing:{
        flex: 0.5 
    },
    phoneCont0:{
        flexDirection:'row',
        alignItems:'center',
    }
});

export default SignUpScreen;
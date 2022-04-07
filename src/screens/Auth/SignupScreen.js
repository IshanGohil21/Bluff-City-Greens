import React, { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View, Image, TextInput, Modal, SafeAreaView, TouchableOpacity, ScrollView, Button, Dimensions, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Formik } from "formik";
import * as yup from 'yup';
import ProfilePicture from 'react-native-profile-picture';
import { backgroundColor, borderColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import PhoneInput from 'react-native-phone-number-input';
import PhoneVerificationScreen from './PhoneVerification'
import ImagePicker from 'react-native-image-crop-picker';
import SignUpValidationSchema from '../../Schema/SignUpValidationSchema';
import { Colors, Images } from '../../CommonConfig/CommonConfig';
import RBSheet from "react-native-raw-bottom-sheet";
import CountryPicker from "react-native-country-codes-picker";


const SignUpScreen = props => {

    const [show, setShow] = useState(false);
    const [countryCode, setCountryCode] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [image, setImage] = useState(Images.ronaldo);
    const [phoneNumber, setphoneNumber] = useState('');
    const phoneInput = useRef(null);
    const refRBSheet = useRef();

    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            console.log(image);
            setImage(image.path)
            setModalVisible(!modalVisible)
        });
    };

    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image);
            setImage(image.path)
            setModalVisible(!modalVisible)
        });
    };

    return (
        // <SafeAreaView>
        <ScrollView>
            <View style={styles.main}>

                <TouchableOpacity onPress={() => {
                    props.navigation.goBack()
                }
                }
                    style={styles.back}
                >
                    <Ionicons name='arrow-back-outline' color={Colors.white} size={28} style={styles.backArrow} />
                </TouchableOpacity>

                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        mobile: '',
                        password: ''
                    }}
                    onSubmit={values => Alert.alert(JSON.stringify(values))}
                    validationSchema={SignUpValidationSchema}

                >
                    {({ values, errors, setFieldTouched, touched, handleChange, isValid, handleSubmit }) => (
                        <View style={styles.mainWrapper}>

                            <View style={styles.profile} >
                                <View
                                    style={styles.avatarContainer}

                                >
                                    <Image
                                        source={{ uri: image }}
                                        style={styles.avatar}
                                    />
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
                                <TextInput
                                    value={values.name}
                                    style={styles.customCss}
                                    onBlur={() => setFieldTouched('name')}
                                    onChangeText={handleChange('name')}
                                    placeholder="Name"

                                />
                                {touched.name && errors.name &&
                                    <Text style={styles.error}>{errors.name}</Text>
                                }

                                <Text style={styles.emailContainer}>Email</Text>
                                <TextInput
                                    value={values.email}
                                    style={styles.customCss}
                                    onBlur={() => setFieldTouched('email')}
                                    onChangeText={handleChange('email')}
                                    placeholder="E-mail"
                                    keyboardType='email-address'
                                />
                                {touched.email && errors.email &&
                                    <Text style={styles.errorEmail}>{errors.email}</Text>
                                }

                                <Text style={styles.phone}>Phone Number</Text>
                                
                                <View style={{flex:1}} >
                                    <View style={{flex:0.5}} >
                                    {touched.mobile &&  <RBSheet
                                    ref={refRBSheet}
                                    closeOnDragDown={true}
                                    closeOnPressMask={false}
                                    customStyles={{
                                        wrapper: {
                                            backgroundColor: "transparent"
                                        },
                                        draggableIcon: {
                                            backgroundColor: "#000"
                                        }
                                    }}
                                    >
                                        <CountryPicker
                                        show={show}
                                        // when picker button press you will get the country object with dial code
                                        pickerButtonOnPress={(item) => {
                                        setCountryCode(dial_code);
                                        setShow(false);                                

                                        }}
                                    />

                                </RBSheet>
                            }

                                    </View>

                                    <View style={{flex: 0.5}}>

                                <TextInput 
                                    value={values.mobile}
                                    style={styles.customCss}
                                    onBlur={() => setFieldTouched('mobile')}
                                    onChangeText={handleChange('moblie')}
                                    placeholder= 'Phone Number'
                                    keyboardType='phone-pad'
                                />
                                </View>
                                
                                </View>

                                {/* <PhoneInput
                                onPress={() => {

                                   
                                }}

                                    ref={phoneInput}

                                    containerStyle={styles.phoneContainer}
                                    textContainerStyle={styles.textInput}
                                    onChangeFormattedText={text => {
                                        setphoneNumber(text);
                                    }}
                                /> */}


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
                                        placeholder='confirm Password'
                                        onBlur={() => setFieldTouched('passwordConfirm')}
                                        onChangeText={handleChange('passwordConfirm')}
                                        secureTextEntry={true}
                                    />
                                    {touched.passwordConfirm && errors.passwordConfirm &&
                                        <Text style={styles.errorPassword} >{errors.passwordConfirm}</Text>
                                    }
                            </View>


                            <TouchableOpacity onPress={() => {
                                props.navigation.navigate('PhoneVerification')
                            }}>
                                <Text style={styles.signin}> SIGN UP </Text>
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
        //   </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    mainWrapper: {
        flex: 1,
        padding: 25,
        justifyContent: 'center',
        backgroundColor: Colors.primary
    },
    customCss: {
        padding: 10,
        marginBottom: 12,
        borderRadius: 10,
        marginTop: 5,
        width: '100%',
        backgroundColor: 'rgba(50,75,255,0.25)'
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
        width: '100%',
    },
    profile: {

        alignItems: 'center',
        width: '100%',
        marginBottom: 50
    },
    avatar: {
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
        backgroundColor: 'rgba(50,75,255,0.25)'
    },
    textInput: {
        paddingVertical: 0,
        backgroundColor: 'rgba(50,105,255,0.25)',
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
    }
});

export default SignUpScreen;
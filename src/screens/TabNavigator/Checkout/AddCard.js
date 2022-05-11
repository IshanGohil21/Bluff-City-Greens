import { StyleSheet, Text, View, TouchableOpacity, TextInput, Modal, Alert, ToastAndroid } from 'react-native'
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Formik } from 'formik';
import * as yup from 'yup';
import * as Animatable from 'react-native-animatable';
import MonthPicker from 'react-native-month-picker'
import moment from 'moment'
import Feather from 'react-native-vector-icons/Feather';

import { Icons, Colors, Images } from '../../../CommonConfig/CommonConfig';
import CardValidationSchema from '../../../Schema/CardValidationSchema';
import * as CardAction from '../../../Redux/Action/CardAction';
import SwitchToggle from "react-native-switch-toggle";
import { useDispatch, useSelector } from 'react-redux';
import { postRequest } from '../../../Helper/ApiHelper';
import Toast from 'react-native-simple-toast';

const AddCard = (props) => {
    const dispatch = useDispatch();

    const activeId = useSelector(state => state.Address.activatePayment)
    
    const [isLoading, setIsLoading] = useState(false)
    const [isEnabled, setisEnabled] = useState(false);
    const placeholder = "Select expiry date";
    const [isOpen, toggleOpen] = useState(false);
    const [value, onChange] = useState();

    const onPressAddCard = async(details) => {
        setIsLoading(true)
        const arr = details.expiryDate.split('/')
        // console.log(arr);
        const year = arr[1].substring(2)
        const data = {
            number: details.cardNumber,
            exp_month: arr[0],
            exp_year: year,
            cvv: details.cvv,
        }
        console.log(data);
        const response = await postRequest('/customer/add-card', data)
        console.log(response);
        let errorMsg = 'Something went wrong!';
        if(!response.success){
            
            console.log("Error in adding card!");
        } else {
            
            //  dispatch(CardAction.addCard(details));
            Toast.show('Card Added Successfully!')
             props.navigation.goBack()
        }
        setIsLoading(false);
    }
    
    return (
        //   Home styling
        <View style={styles.main} >
            {/* Header */}
            <View style={styles.header} >
                <TouchableOpacity onPress={() => { props.navigation.goBack() }}>
                    <Ionicons name={Icons.BACK_ARROW} color={Colors.white} size={30} style={styles.back} />
                </TouchableOpacity>
                <Text style={styles.add} >Add New Card</Text>
            </View>
            {/* Body */}
            <View style={styles.body} >
                <Formik
                    initialValues={{
                        cardNumber: '',
                        expiryDate: '',
                        cvv: '',
                        name: '',
                        isActive: false
                    }}
                    onSubmit={(values) => { 
                        onPressAddCard(values)
                        // const xyz = {
                        //     number: values.cardNumber,
                        //     expiryDate: values.expiryDate,
                        //     cvv: values.cvv,
                        //     name: values.name,
                        //     isActive: values.isActive
                        // }
                        // dispatch(CardAction.addCard(xyz))
                        // onPressAddCard(xyz)
                        // props.navigation.goBack();
                    }}
                    validationSchema={CardValidationSchema}
                >
                    {({ values, errors, setFieldTouched, touched, handleChange, setFieldValue, isValid, handleSubmit }) => (
                        <View style={styles.mainFormik}>

                            {/* Card Number */}
                            <Text style={styles.title}>Card Number</Text>
                            <View style={styles.container}>
                                <TextInput
                                    value={values.cardNumber}
                                    onBlur={() => setFieldTouched('cardNumber')}
                                    onChangeText={handleChange('cardNumber')}
                                    placeholder="Enter card number"
                                    keyboardType='number-pad'
                                    maxLength={16}
                                />
                                {touched.cardNumber ? (!errors.cardNumber ? <Animatable.View animation="bounceIn" ><Feather name="check-circle" color="green" size={20} /></Animatable.View> : null) : null}
                            </View>
                            {touched.cardNumber && errors.cardNumber &&
                                <Text style={{ fontSize: 11, color: Colors.red, margin: 10 }} >{errors.cardNumber}</Text>
                            }
                            {/* EXPIRY & CVV */}
                                <View style={{ marginHorizontal: 5 }}>

                                    {/* Expiry Date */}
                                    <Text style={styles.title}>Valid Until</Text>
                                    <View style={styles.container}>
                                        <TouchableOpacity onPress={() => toggleOpen(true)} style={{ padding: 5 }}>
                                            <Text style={styles.placeholder} >{value ? moment(value).format('MM/YYYY') : placeholder}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <Modal
                                        transparent
                                        animationType="fade"
                                        visible={isOpen}
                                        onRequestClose={() => {
                                            toggleOpen(false)
                                        }}>
                                        <View style={styles.contentContainer}>
                                            <View style={styles.content}>
                                                <MonthPicker
                                                    selectedDate={value || new Date()}
                                                    onMonthChange={onChange}
                                                    minDate={moment('04-2022', 'MM-YYYY')}
                                                    maxDate={moment('04-2050', 'MM-YYYY')}
                                                    nextIcon={<Ionicons name="chevron-forward" size={35} color={Colors.primary} />}
                                                    prevIcon={<Ionicons name="chevron-back" size={35} color={Colors.primary} />}
                                                />
                                                
                                                <TouchableOpacity style={styles.confirmButton} onPress={() => {
                                                    toggleOpen(false);
                                                    setFieldTouched('expiryDate');
                                                    setFieldValue('expiryDate', moment(value).format('MM/YYYY'));
                                                }}>
                                                    <Text style={styles.confirm} >Confirm</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </Modal>
                                    {touched.expiryDate && errors.expiryDate &&
                                        <Text style={{ fontSize: 11, color: Colors.red, margin: 10 }} >{errors.expiryDate}</Text>
                                    }
                                </View>

                            <View style={{  marginHorizontal: 5, marginTop:10 }}>
                                {/* CVV */}
                                <Text style={styles.title}>CVV</Text>
                                <View style={styles.container}>
                                    <TextInput
                                        value={values.cvv}
                                        onBlur={() => setFieldTouched('cvv')}
                                        onChangeText={handleChange('cvv')}
                                        placeholder="Enter CVV"
                                        secureTextEntry={true}
                                        maxLength={3}
                                        keyboardType="number-pad"
                                    />
                                    {touched.cvv ? (!errors.cvv ? <Animatable.View animation="bounceIn" ><Feather name="check-circle" color="green" size={20} /></Animatable.View> : null) : null}
                                </View>
                                {touched.cvv && errors.cvv &&
                                    <Text style={{ fontSize: 11, color: Colors.red, margin: 10 }} >{errors.cvv}</Text>
                                }
                            </View>

                            {/* Cardholder Name */}
                            <Text style={styles.title}>Card Holder</Text>
                            <View style={styles.container}>
                                <TextInput
                                    value={values.name}
                                    onBlur={() => setFieldTouched('name')}
                                    onChangeText={handleChange('name')}
                                    placeholder="Enter your name"
                                />
                                {touched.name ? (!errors.name ? <Animatable.View animation="bounceIn" ><Feather name="check-circle" color="green" size={20} /></Animatable.View> : null) : null}
                            </View>
                            {touched.name && errors.name &&
                                <Text style={{ fontSize: 11, color: Colors.red, margin: 10 }} >{errors.name}</Text>
                            }
                            <View style={styles.switch} >

                                <Text style={styles.toggle} > Make this my default payment </Text>
                                <SwitchToggle
                                    switchOn={isEnabled}
                                    onPress={() => {
                                        setisEnabled(!isEnabled)
                                        setFieldValue('isActive', isEnabled)
                                    }}
                                    circleColorOff={Colors.white}
                                    circleColorOn={Colors.white}
                                    backgroundColorOn={Colors.primary}
                                    backgroundColorOff={Colors.grey}
                                    containerStyle={{
                                        marginTop: 16,
                                        width: 60,
                                        height: 35,
                                        borderRadius: 25,
                                        padding: 2,
                                    }}
                                    circleStyle={{
                                        width: 30,
                                        height: 30,
                                        borderRadius: 20,
                                    }}
                                />
                            </View>

                            {/* CONFIRM BUTTON */}
                            <TouchableOpacity onPress={handleSubmit} disabled={!isValid}>
                                <View style={styles.button}>
                                    <Text style={styles.buttonText}>ADD CARD</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}

                </Formik>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    header: {
        flex: 1,
        backgroundColor: Colors.primary,
        justifyContent: 'space-between'
    },
    back: {
        marginTop: 30
    },
    add: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.white
    },
    body: {
        flex: 3,
    },
    title: {
        fontSize: 14,
        color: Colors.grey,
        marginTop: 10
    },
    container: {
    marginTop:10,
    elevation: 1,
    borderRadius: 0.5,
    //borderWidth: 0.1,
    padding:5
    },
    button: {
        width: "80%",
        alignItems: "center",
        backgroundColor: Colors.primary,
        textAlign: 'center',
        color: Colors.white,
        // fontSize: 23,
        padding: 10,
        borderRadius: 10,
        marginTop: 50,
        marginHorizontal: 30
    },
    buttonText: {
        fontSize: 20,
        color: Colors.white
    },
    contentContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)', 
    },
    content: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginVertical: 70,
    },
    toggle: {
        fontSize: 16,
        color: Colors.grey
    },
    switch:{
         flexDirection: 'row', 
         alignItems: 'center', 
         justifyContent: 'space-between' 
    },
    placeholder:{
        color:Colors.grey
    },
    confirm:{
        width: "60%",
        alignItems: "center",
        backgroundColor: Colors.primary,
        textAlign: 'center',
        color: Colors.white,
        // fontSize: 23,
        padding: 10,
        borderRadius: 10,
        marginTop: 50,
        marginHorizontal: 70,
        marginBottom: 20
    },
    mainFormik:{
        marginTop: 30, 
        padding: 10, 
        flex: 3, 
        marginHorizontal: 20
    }
});

export default AddCard;
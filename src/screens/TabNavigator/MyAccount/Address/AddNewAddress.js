import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert, StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ActivityIndicator, RadioButton, TextInput } from 'react-native-paper';

import { Icons, Images, Colors } from '../../../../CommonConfig/CommonConfig'
import * as Address from '../../../../Redux/Action/Address';
import { postRequest } from '../../../../Helper/ApiHelper';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import GetLocation from 'react-native-get-location';
import Toast from 'react-native-simple-toast';
import addressValidationSchema from '../../../../Schema/AddressValidationSchema';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';


const AddNewAddressScreen = (props) => {

    const [checked, setChecked] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const [latitudes, setLatitudes] = useState();
    const [longitudes, setLongitudes] = useState();
    const [radio, setRadio] = useState()

    const onPressAddress = async (values) => {
        // console.log("\n\nValues          ", values);
        const data = {
            primary_address: values?.primary_address,
            addition_address_info: values.addition_address_info,
            latitude: latitudes,
            longitude: longitudes,
            is_select: values.address_type,
            zip: values.zip
        }
        console.log("DATA            ", data);
        const AddressResponse = await postRequest('/add-address', data)
        // console.log("\n\nAddress        ", AddressResponse.data.data);
        if (AddressResponse.success) {
            dispatch(Address.addAddress(values))
            Toast.show('Address added successfully.')
            props.navigation.navigate('DeliveryCheckout');
        }
        else {
            Toast.show('Unable to Add new Address')
        }
    }

    useEffect(() => {

        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
        })
            .then(location => {
                    // console.log("location        ", location);
                setLatitudes(location.latitude)
                setLongitudes(location.longitude)
            })
            .catch(error => {
                const { code, message } = error;
                // console.warn(code, message);
            })
    }, [longitudes, latitudes])

    return (
        <ScrollView>
            <View style={styles.main}>
                <StatusBar backgroundColor={Colors.primary} />
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.mainContainer} >
                        <TouchableOpacity onPress={() => {
                            props.navigation.goBack()
                        }}
                        >
                            <Ionicons name={Icons.BACK_ARROW} color={Colors.white} size={30} style={styles.margining} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { props.navigation.navigate('DeliveryCheckout') }} >
                            <Ionicons name={Icons.SEARCH} size={28} color={Colors.white} style={styles.back} />
                        </TouchableOpacity>
                    </View>
                    {/*Title*/}
                    <View>
                        <Text style={styles.title}>Add New Address </Text>
                    </View>
                </View>
                { /* Body */}
                <View style={styles.body} >

                    <View>

                        <MapView
                            provider={PROVIDER_GOOGLE}
                            style={styles.map}
                        />
                    </View>
                    <Formik
                        initialValues={{
                            primary_address: '',
                            zip: '',
                            addition_address_info: '',
                            address_type: '',
                        }}
                        onSubmit={values => { onPressAddress(values) }}
                        validationSchema={addressValidationSchema}
                    >
                        {({ values, errors, setFieldTouched, touched, handleChange, setFieldValue, isValid, handleSubmit }) => (
                            <View style={styles.bodyContainer} >
                                <View style={styles.detailContainer} >
                                    <Text style={styles.details} >Street Name, Flat No., Society/Office Name</Text>

                                    <TextInput
                                        value={values.primary_address}
                                        onBlur={() => setFieldTouched('primary_address')}
                                        onChangeText={handleChange('primary_address')}
                                        placeholder='Enter Address'
                                        keyboardType='default'
                                        backgroundColor={Colors.white}
                                    />
                                    {touched.primary_address && errors.primary_address &&
                                        <Text style={styles.errorValidate} >{errors.primary_address}</Text>
                                    }

                                    <Text style={styles.details} > Zip Code </Text>
                                    <TextInput
                                        value={values.zip}
                                        onBlur={() => setFieldTouched('zip')}
                                        onChangeText={handleChange('zip')}
                                        placeholder='Enter Zip Code'
                                        keyboardType='numeric'
                                        backgroundColor={Colors.white}
                                    />
                                    {touched.zip && errors.zip &&
                                        <Text style={styles.errorValidate} >{errors.zip}</Text>
                                    }

                                    <Text style={styles.details} > Nearest Landmark (Optional) </Text>
                                    <TextInput
                                        value={values.addition_address_info}
                                        onBlur={() => setFieldTouched('addition_address_info')}
                                        onChangeText={handleChange('addition_address_info')}
                                        placeholder='Enter any Landmark '
                                        keyboardType='default'
                                        backgroundColor={Colors.white}
                                    />
                                    {touched.addition_address_info && errors.addition_address_info &&
                                        <Text style={styles.errorValidate} >{errors.addition_address_info}</Text>
                                    }

                                </View>
                                <Text style={styles.radioContainer} > Tag this address as: </Text>
                                <View style={{ flexDirection: 'row', }} >
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}>
                                        {radio === 0 ?
                                            <Ionicons name='radio-button-on' size={25} color={Colors.primary} />
                                            :
                                            <TouchableOpacity onPress={() => {
                                                setRadio(0)
                                                setFieldTouched('address_type')
                                                setFieldValue('address_type', 0)
                                            }}  >
                                                <Ionicons name='radio-button-off' size={25} color={Colors.grey} />
                                            </TouchableOpacity>
                                        }
                                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: Colors.grey }}> Home</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                        {radio === 1 ?
                                            <Ionicons name='radio-button-on' size={25} color={Colors.primary} />
                                            :
                                            <TouchableOpacity onPress={() => {
                                                setRadio(1)
                                                setFieldTouched('address_type')
                                                setFieldValue('address_type', 1)
                                            }}>
                                                <Ionicons name='radio-button-off' size={25} color={Colors.grey} />
                                            </TouchableOpacity>
                                        }
                                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: Colors.grey }}> Work</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, color: Colors.grey }}>
                                        {radio === 2 ?
                                            <Ionicons name='radio-button-on' size={25} color={Colors.primary} />
                                            :
                                            <TouchableOpacity onPress={() => {
                                                setRadio(2)
                                                setFieldTouched('address_type')
                                                setFieldValue('address_type', 2)
                                            }}>
                                                <Ionicons name='radio-button-off' size={25} color={Colors.grey} />
                                            </TouchableOpacity>
                                        }
                                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: Colors.grey }}> Others</Text>
                                    </View>
                                </View>
                                {touched.address_type && errors.address_type &&
                                    <Text style={styles.errorValidate} >{errors.address_type}</Text>
                                }

                                <TouchableOpacity onPress={handleSubmit} disabled={!isValid} >
                                    {
                                        isLoading ? <ActivityIndicator size={'small'} color={Colors.white} />
                                            :
                                            <Text style={styles.signin} > ADD ADDRESS </Text>
                                    }
                                </TouchableOpacity>

                            </View>
                        )}
                    </Formik>
                </View>
            </View >
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    header: {
        padding: 10,
        backgroundColor: Colors.primary,
    },
    title: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 28,
        marginTop: 40
    },
    body: {
        flex: 3,
        backgroundColor: Colors.white
    },
    map: {
        height: 300,
        width: 400,
    },
    details: {
        color: Colors.grey
    },
    detailContainer: {
        borderColor: Colors.white,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        padding: 10,
    },
    address: {
        padding: 5,
        marginBottom: 10
    },
    radioContainer: {
        fontWeight: 'bold',
        padding: 10,
    },
    bodyContainer: {
        flex: 1
    },
    radio: {
        //   marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    signin: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.primary,
        textAlign: 'center',
        fontSize: 23,
        padding: 10,
        borderRadius: 10,
        overflow: 'hidden',
        width: '80%',
        marginLeft: 30,
        marginBottom: 30,
        color: Colors.white,
        marginTop: 30
    },
    mainContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    margining:{
        marginTop: 20 
    },
    errorValidate:{
        fontSize: 11, 
        color: Colors.red, 
        margin: 10 
    }
});

export default AddNewAddressScreen;

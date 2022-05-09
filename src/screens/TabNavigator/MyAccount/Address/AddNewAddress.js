import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Address from '../../../../dummy-data/Address';
import { ActivityIndicator, RadioButton, TextInput } from 'react-native-paper';

import { Icons, Images, Colors } from '../../../../CommonConfig/CommonConfig'
import { ScrollView } from 'react-native-gesture-handler';
// import RadioButtonScreen from '../../../../Components/RadioButton';
import { postRequest } from '../../../../Helper/ApiHelper';
import AddressValidationSchema from '../../../../Schema/AddressValidationSchema';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';

const AddNewAddressScreen = (props) => {

    const [checked, setChecked] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const [radio, setRadio] = useState()

    return (
        <ScrollView>
            <View style={styles.main}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.mainContainer} >
                        <TouchableOpacity onPress={() => {
                            props.navigation.goBack()
                        }}
                        >
                            <Ionicons name={Icons.BACK_ARROW} color={Colors.white} size={30} style={styles.back} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { props.navigation.navigate('AddNewAddress2') }} >
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
                        <Image
                            source={Images.address}
                            style={styles.map}
                        />
                    </View>
                    <Formik
                        initialValues={{
                            address_type: '',
                            address: '',
                            zip: ''
                        }}
                        onSubmit={ () => {props.naivation.goBack()} }
                        validationSchema={AddressValidationSchema}
                    >
                        {({ values, errors, setFieldTouched, touched, handleChange, setFieldValue, isValid, handleSubmit }) => (
                            <View style={styles.bodyContainer} >
                                <View style={styles.detailContainer} >
                                    <Text style={styles.details} > Stree Name, Flat No., Society/Office Name </Text>

                                    <TextInput 
                                    value={values.address}
                                    onBlur={ () => setFieldTouched('address')}
                                    onChangeText={handleChange('address')}
                                    placeholder= 'Enter Address'
                                    keyboardType='default'
                                    />
                                  {touched.address && errors.address && 
                                    <Text style={{ fontSize: 11, color: Colors.red, margin:10 }} >{errors.address}</Text>
                                  }  

                                    <Text style={styles.details} > Zip Code </Text>
                                    <TextInput 
                                    value={values.zip}
                                    onBlur={ () => setFieldTouched('zip')}
                                    onChangeText={handleChange('zip')}
                                    placeholder= 'Enter Zip Code'
                                    keyboardType='numeric'
                                    />
                                    {touched.address && errors.address && 
                                    <Text style={{ fontSize: 11, color: Colors.red, margin:10 }} >{errors.zip}</Text>
                                  }

                                    <Text style={styles.details} > Nearest Landmark (Optional) </Text>
                                    <TextInput 
                                    placeholder='Enter any Landmark '
                                    keyboardType='default'
                                    />

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
                                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Home</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Work</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}>
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
                                        <Text style={{fontWeight:'bold' ,fontSize: 16 }}>Others</Text>
                                    </View>
                                </View>
                                {touched.address_type && errors.address_type &&
                                    <Text style={{ fontSize: 11, color: Colors.red, margin: 10 }} >{errors.address_type}</Text>
                                }

                                <TouchableOpacity onPress={handleSubmit}  disabled={!isValid} >
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
        flex: 3
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
        //   borderWidth: 5,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        padding: 10,
    },
    address: {
        padding: 5,
        marginBottom: 10
    },
    back: {
        marginTop: 20
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
    }
});

export default AddNewAddressScreen;

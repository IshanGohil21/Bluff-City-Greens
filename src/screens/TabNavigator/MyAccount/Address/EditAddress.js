import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput, StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { RadioButton } from 'react-native-paper';
import { Images, Colors, Icons } from '../../../../CommonConfig/CommonConfig'
import EditAddressValidationSchema  from '../../../../Schema/EditAddressValidationSchema';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-simple-toast';
import { Formik } from 'formik';
import { postRequest } from '../../../../Helper/ApiHelper';

const EditAddressScreen = (props) => {

    const [checked, setChecked] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const [radio, setRadio] = useState();

    const edit = props.route.params.edit;
    //  console.log("\n\nEDIT_PARAMS             ", edit);

    const editId = props.route.params.editId
    // console.log('\n\nEDIT_ID                 ', editId)

    const onPressEdit = async (values) => {
        // console.log("\n\nValues   ",values)
        const data = {
            primary_address : values.primary_address,
            addition_address_info : values.addition_address_info,
            zip: values.zip,
            is_select : values.is_select
        }
        // console.log("\n\nDATA    ",data);
        const EditResponse = await postRequest(`/update-address/${editId}`, data)
        //  console.log("\n\nEDIT_API_RESPONSE           ", EditResponse.data.data);
        if(EditResponse.success){
            Toast.show("Address Edited Successfully !!!")
             props.navigation.goBack();
        }
        else {
            Toast.show('Unable to edit the address.')
        }
    }

    return (
        <ScrollView>
            <View style={styles.main}>
                <StatusBar backgroundColor={Colors.primary} />
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => {
                        props.navigation.goBack()
                    }}
                    >
                        <Ionicons name={Icons.BACK_ARROW} color={Colors.white} size={30} style={styles.back} />
                    </TouchableOpacity>
                    {/*Title*/}
                    <View>
                        <Text style={styles.title}>Edit Address </Text>
                    </View>
                </View>
                { /* Body */}
                <View style={styles.body} >
                    <View>
                        <MapView
                            provider={PROVIDER_GOOGLE}
                            style={styles.map}
                        >
                            <Marker
                                coordinate={{
                                    latitude: 37.7882,
                                    longitude: -122.4324,
                                }}
                            />
                        </MapView>
                    </View>

                    <Formik
                        initialValues={{
                            primary_address: '',
                            zip: '',
                            addition_address_info: '',
                            is_select: '',
                        }}
                        onSubmit={values => { onPressEdit(values) }}
                        validationSchema={EditAddressValidationSchema}
                    >
                        {({ values, errors, setFieldTouched, touched, handleChange, setFieldValue, isValid, handleSubmit }) => (
                            <View style={styles.bodyContainer} >
                                <View style={styles.detailContainer} >
                                    <Text style={styles.details} >Street Name, Flat No., Society/Office Name</Text>

                                    <TextInput
                                        value={values.primary_address}
                                        onBlur={() => setFieldTouched('primary_address')}
                                        onChangeText={handleChange('primary_address')}
                                        placeholder={edit.item.primary_address}
                                        keyboardType='default'
                                        backgroundColor={Colors.white}
                                        style={{padding:10}}
                                    />
                                    {touched.primary_address && errors.primary_address &&
                                        <Text style={{ fontSize: 11, color: Colors.red, margin: 10 }} >{errors.primary_address}</Text>
                                    }

                                    <Text style={styles.details} > Zip Code </Text>
                                    <TextInput
                                        value={values.zip}
                                        onBlur={() => setFieldTouched('zip')}
                                        onChangeText={handleChange('zip')}
                                        placeholder='Please Enter you Zip Code again'
                                        keyboardType='numeric'
                                        backgroundColor={Colors.white}
                                        style={{padding:10}}
                                    />
                                    {touched.zip && errors.zip &&
                                        <Text style={{ fontSize: 11, color: Colors.red, margin: 10 }} >{errors.zip}</Text>
                                    }

                                    <Text style={styles.details} > Nearest Landmark (Optional) </Text>
                                    <TextInput
                                        value={values.addition_address_info}
                                        onBlur={() => setFieldTouched('addition_address_info')}
                                        onChangeText={handleChange('addition_address_info')}
                                        placeholder={edit.addition_address_info}
                                        keyboardType='default'
                                        backgroundColor={Colors.white}
                                        style={{padding:10}}
                                    />
                                    {touched.addition_address_info && errors.addition_address_info &&
                                        <Text style={{ fontSize: 11, color: Colors.red, margin: 10 }} >{errors.addition_address_info}</Text>
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
                                                setFieldTouched('is_select')
                                                setFieldValue('is_select', 0)
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
                                                setFieldTouched('is_select')
                                                setFieldValue('is_select', 1)
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
                                                setFieldTouched('is_select')
                                                setFieldValue('is_select', 2)
                                            }}>
                                                <Ionicons name='radio-button-off' size={25} color={Colors.grey} />
                                            </TouchableOpacity>
                                        }
                                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: Colors.grey }}> Others</Text>
                                    </View>
                                </View>
                                {touched.address_type && errors.address_type &&
                                    <Text style={{ fontSize: 11, color: Colors.red, margin: 10 }} >{errors.address_type}</Text>
                                }

                                <TouchableOpacity onPress={handleSubmit}  >
                                    <Text style={styles.signin} >EDIT ADDRESS</Text>
                                </TouchableOpacity>

                            </View>
                        )}
                    </Formik>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    header: {
        padding: 10,
        backgroundColor: Colors.primary,
        justifyContent: 'space-between',
        flex: 1

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
});

export default EditAddressScreen;

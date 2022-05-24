import React from 'react';
import { StyleSheet, Text, TextInput, Alert, Button, View, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { ref } from 'yup';

import { Colors, Images, Icons } from '../../../CommonConfig/CommonConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postRequest, refreshToken } from '../../../Helper/ApiHelper';

const ChangePasswordScreen = props => {
    const onPressSave = async (values) => {
        console.log("\n\n\nValues   ",values);
        const data = {
            currentPassword: values.currentPass,
            newPassword: values.newPass
        }
        const response = await postRequest('/change-password', data)
        console.log( "\n\n\n\nPassword  Show in Console     ", data );
        console.log("\n\n\n\nPassword                  ", response);

        if(!response.success){
            let errorMessage= "Wrong Current Password";
            if(response.data.error   === "No Current Password Found " ){
                errorMessage="Enter Correct Password"
            }
            Alert.alert('Error', errorMessage, [{text: 'Okay'}])
        } else {
            props.navigation.goBack();
        }

        // if(!response.success){
        //     if(response.data.error === "User not Authenticated" ){
        //         const refToken = await AsyncStorage.getItem('refreshToken')
        //         const refreshData = {
        //             refreshToken: refToken
        //         }
        //         const refrehResponse = await refreshToken(refreshData)
        //         if(!refrehResponse.success){
        //             console.log("\n\n\n\n\n Unable to refresh  ", refrehResponse );
        //         }
        //         else {
        //             await AsyncStorage.setItem('token', refrehResponse.data.access_token)
        //              console.log("\n\n\n\n\nACCESS             ", refrehResponse.data.access_token)
        //             const reResponse = await postRequest('/change-password', data)
        //             if(!reResponse.success){
        //                 if(reResponse.data.error === 'Invalid Current Password'){
        //                     Toast.show('Invalid Password Entered')
        //                 }
        //             } else {
        //                 Toast.show('Password Changed Successfully')
        //                 props.navigation.goBack();
        //             }
        //         }
        //     } 
        // }
        // Invalid Password Error
        // if(response.data.error  === 'Invalid Password' ){
        //     Toast.show('Invalid Password ')
        // }
        // else {
        //     Toast.show('Password Changed Successfully')
        //     props.navigation.goBack();
        // }
    }
    

    return (
        <View style={styles.main} >
            {/* Main  */}

            {/* Header */}
            <View style={styles.header} >
                <TouchableOpacity onPress={ () => {props.navigation.goBack()} } >
                    <Ionicons name={Icons.BACK_ARROW} size={24} color={Colors.white} style={styles.back} />
                </TouchableOpacity>
                    <Text style={styles.change} >Change Password</Text>
            </View>

            {/* Body */}
            <View style={styles.body} >

                <View style={{justifyContent:'space-between', flex:1}} >
                {/* Formik Validation Schema */}
                <Formik 
                initialValues={{
                    currentPass: '',
                    newPass: '',
                    confirmPass: ''                    
                }} 
                onSubmit= { values => onPressSave(values) }
                validationSchema= { yup.object().shape({
                    currentPass: yup.string().required('Current password is required.').min(6,'Password must be atlease 6 characters long.'),
                    newPass: yup.string().required('New password is required.').min(6,'Password must be atlease 6 characters long.'),
                    confirmPass : yup.string().required('Please confirm your password.').oneOf([ref("newPass")],"Passwords do not match.")
                })}
                >

                    { ({values, errors, setFieldTouched, touched, handleChange, isValid, handleSubmit}) => (
                        <View style={{ flex:1, justifyContent:'space-between', paddingBottom:25 }}>
                            {/* Current */}
                            <View>
                            <View style={styles.current}>
                                <Text>Current Password</Text>
                                <View>
                                    <TextInput 
                                         value={values.currentPass}
                                        onBlur={() => setFieldTouched('currentPass')}
                                        onChangeText={handleChange('currentPass')}
                                        placeholder="Enter Current Password"
                                        secureTextEntry={true}
                                    />
                                </View>
                            </View>
                            { touched.currentPass && errors.currentPass && <Text style={styles.errors} >{errors.currentPass}</Text> }

                            {/* New Password */}
                            <View style={styles.current}>
                                <Text>New Password</Text>
                                <View>
                                    <TextInput 
                                         value={values.newPass}
                                        onBlur={() => setFieldTouched('newPass')}
                                        onChangeText={handleChange('newPass')}
                                        placeholder="Enter New Password"
                                        secureTextEntry={true}
                                    />
                                </View>
                            </View>
                            { touched.newPass && errors.newPass && <Text style={styles.errors} >{errors.newPass}</Text> }

                            {/* Re-enter new Password */}
                            <View style={styles.current}>
                                <Text>Re- enter New Password</Text>
                                <View>
                                    <TextInput 
                                         value={values.confirmPass}
                                        onBlur={() => setFieldTouched('confirmPass')}
                                        onChangeText={handleChange('confirmPass')}
                                        placeholder="Re- Enter New Password"
                                        secureTextEntry={true}
                                    />
                                </View>
                            </View>
                            { touched.confirmPass && errors.confirmPass && <Text style={styles.errors} >{errors.confirmPass}</Text> }

                                </View>
                                {/* Save Button */}
                                <TouchableOpacity  style={styles.save} onPress={handleSubmit} disabled={!isValid} >
                                    <Text style={styles.saveTxt} >SAVE</Text>
                                </TouchableOpacity>
                            </View>
                    )
                }
                </Formik>  
                    
                </View>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main:{
        flex:1,
    },
    back:{
        marginTop: 30,
        marginHorizontal:10
    },
    header:{
        flex:1,
        backgroundColor:Colors.primary,
        justifyContent:'space-between',
        padding:10,
        // paddingVertical:10
    },
    body:{
        flex:3,
    },
    change:{
        fontSize:24,
        color: Colors.white,
        fontWeight: 'bold',
    },
    current:{
        padding:20,
        marginHorizontal:10
    },
    errors:{
        fontSize:11,
        color:Colors.red,
        paddingHorizontal:20,
        marginLeft:10,
    },
    save:{
        alignItems:'center',
        backgroundColor:Colors.primary,
        marginBottom:20,
        padding:10,
        width:'80%',
        borderRadius:10,
        marginHorizontal:35
    },
    saveTxt:{
        fontSize:20,
        color:Colors.white
    }
});

export default ChangePasswordScreen;
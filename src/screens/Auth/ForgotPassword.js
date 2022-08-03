import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { StyleSheet, Text, TextInput, Alert, Button, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Formik } from 'formik'
import * as yup from 'yup' 
import  { Colors, Images, Icons } from '../../CommonConfig/CommonConfig'
import  ForgotPasswordvalidationSchema from '../../Schema/ForgotPasswordValidationSchema'
import { postRequest } from '../../Helper/ApiHelper';

const ForgotPasswordScreen = props => {
  const [isLoading, setisLoading] = useState(false);

  const onPressLogin = async (values) => {
    setisLoading(true);
    const data = {
        email: values.email,
        // password: values.password,
    };

    const response = await postRequest('/forgot-password', data);
    console.log(response);
    if (!response.success) {
        setisLoading(false);
    
        let errorMessage = "Something went wrong!";
        if (response.data.error === "No account found for this email!") {
            errorMessage = "No account found for this email!"
        }
        // if (response.data.error === "Invalid Password!") {
        //     errorMessage = "Invalid Password!"
        // }
        Alert.alert('Error', errorMessage, [{ text: "Okay" }])
    } else{
        setisLoading(false);
        props.navigation.navigate('SignIn')
    }
}

  return (
    <>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {
          props.navigation.goBack()
        }}
        >
          <Ionicons name={Icons.BACK_ARROW} color='white' size={28} style={styles.margins} />
        </TouchableOpacity>
        {/*Title*/}
        <View>
          <View style={styles.forgot}>
            <Text style={styles.title}>Forgot Password </Text>
          </View>
          <View>
            <Text style={styles.service}> Enter the email address </Text>
          </View>
        </View>
      </View>

      <Formik
        initialValues={{
          email: '',
        }}
        // onSubmit={values => props.navigation.goBack()}
        onSubmit={ (values) => onPressLogin(values) }
        validationSchema={ForgotPasswordvalidationSchema}
        
      >
        {({ values, errors, setFieldTouched, touched, handleChange, isValid, handleSubmit }) => (
          <View style={styles.mainWrapper}>

            <View style={styles.body}>
              <Image
                source={Images.forgotPassword}
                style={styles.image}
                resizeMode='contain'
              />
            </View>
            <View>
              <Text style={styles.text} > Enter the email address associated with your account. </Text>
            </View>

            <Text style={styles.email}>Email id</Text>
            <TextInput
              value={values.email}
              style={styles.customCss}
              onBlur={() => setFieldTouched('email')}
              onChangeText={handleChange('email')}
              placeholder="E-mail"
            />
            {touched.email && errors.email &&
              <Text style={styles.emailContainer}>{errors.email}</Text>
            }
            <View>
              <TouchableOpacity onPress={handleSubmit} style={styles.margins0}>
                <View style={styles.signin} >
                { isLoading ? <ActivityIndicator size='small' color={Colors.white} /> :
                <Text style={{fontSize: 24, color: Colors.white}}> SUBMIT </Text> }
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </>
  );

}

const styles = StyleSheet.create({
  mainWrapper: {
    padding: 40
  },
  customCss: {
    borderBottomWidth: 1,
    padding: 10,
    marginBottom: 12,
    borderColor: '#cccccc',
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
  title: {
    color: 'white',
    fontSize: 30,
    padding: 10,
    fontWeight: '600',
    //  marginTop: 40,
    fontWeight: 'bold',
  },
  service: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: Colors.primary
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30
  },
  text: {
    color: 'grey',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 50
  },
  email: {
    textAlign: 'left',
    paddingVertical: 10,
    color: 'grey',
    fontWeight: 'bold'
  },
  emailContainer: {
    fontSize: 11,
    color: 'red'
  },
  forgot: {
    flexDirection: 'row', 
    marginTop: 30
  },
  margins:{
    marginTop: 10
  },
  margins0:{
    marginTop: 50
  }
});

export default ForgotPasswordScreen;
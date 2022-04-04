import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import { StyleSheet, Text, TextInput, Alert, Button, View, Image, TouchableOpacity } from 'react-native';
import { Formik } from 'formik'
import * as yup from 'yup'

const ForgotPasswordScreen = props => {
    return (
        <>
       {/* Header */}
       <View style={{ flexDirection: 'row', padding: 10, backgroundColor: '#259D57' }}>
       <TouchableOpacity onPress={() => {
          props.navigation.goBack()
        }}
        >
          <Ionicons name='arrow-back-outline' color='white' size={28} style={{ marginTop: 10}} />
        </TouchableOpacity>
                {/*Title*/}
                <View>
                    <View style={{ flexDirection: 'row', marginTop: 30 }}>
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
        onSubmit={values => props.navigation.goBack() }
        validationSchema={yup.object().shape({  
          email: yup
            .string()
            .email()
            .required('Email is required.'),
        })}
       >
        {({ values, errors, setFieldTouched, touched, handleChange, isValid, handleSubmit }) => (
          <View style={styles.mainWrapper}>

<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 30 }}>
                        <Image
                            source={require('../../assets/icon/icons8-forgot-password-100.png')}
                            style={styles.image}
                            resizeMode='contain'
                        />
                        </View>
                        <View>
                            <Text style={{color: 'grey', fontSize: 18, textAlign: 'center', marginBottom: 50}} > Enter the email address associated with your account. </Text>
                        </View>

            <Text style={{ textAlign: 'left', paddingVertical: 10, color: 'grey', fontWeight: 'bold'}}>Email id</Text>
            <TextInput
              value={values.email}
              style={styles.customCss}
              onBlur={() => setFieldTouched('email')}
              onChangeText={handleChange('email')}
              placeholder="E-mail"
            />
            {touched.email && errors.email &&
              <Text style={{ fontSize: 11, color: 'red' }}>{errors.email}</Text>
            }
            <View>
            <TouchableOpacity onPress={ handleSubmit } style={{marginTop: 50}}>
                    <Text style={styles.signin}> SUBMIT </Text>
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
    marginBottom:10
  },
});

export default ForgotPasswordScreen;
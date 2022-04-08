import React, { useRef,useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../CommonConfig/Colors';
import OTPTextInput from "react-native-otp-textinput"; 
import { Icons } from '../../CommonConfig/CommonConfig';

import { StyleSheet, Text, TextInput, View ,TouchableOpacity } from 'react-native';


const PhoneVerificationScreen = (props) => {
  const otpInput = useRef(null);

  return (
    <>
    <View style={styles.main} >
      <View style={styles.backButton} >
        <TouchableOpacity onPress={() => {
          props.navigation.goBack()
        }}
        >
          <Ionicons name={Icons.BACK_ARROW} color={Colors.white} size={28} style={{ marginTop: 30, marginLeft:10 }} />
        </TouchableOpacity>
        <Text style={styles.verify} > Phone Verification</Text>
        <Text style={styles.optEnter} > Enter your OTP code here </Text>
      </View>

      <View style={styles.otp}>
        <View style={styles.optContainer}>
          <OTPTextInput 
          ref={otpInput}
          />
        </View>

        <TouchableOpacity onPress={() => { props.navigation.navigate('DiscountCoupon') }} style={styles.navigate}>
          <Text style={styles.signin}> VERIFY </Text>
        </TouchableOpacity>

        <View style={styles.code}>
          <Text style={styles.codeContainer} >Didn't recieved code?</Text>
          <TouchableOpacity onPress={() => {
            props.navigation.navigate('SignUp')
          }} >
            <Text style={styles.resend} > Resend </Text>
          </TouchableOpacity>
        </View>
      </View>
      </View>
    </>
  )
};

const styles = StyleSheet.create({
  Home: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  signin: {
    width: 300,
   
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
    marginTop: 40
  },
  optContainer: {
    flex: 0.6, 
    justifyContent: 'space-evenly', 
    flexDirection: 'row'
  },
  backButton:{
    flex: 1.5, 
    backgroundColor:Colors.primary, 
    alignItems: 'flex-start'
  },
  verify: {
    justifyContent: 'center', 
    color: Colors.white, 
    fontSize: 25, 
    fontWeight: 'bold', 
    marginTop:50
  },
  optEnter:{
    justifyContent: 'center', 
    color: Colors.white,
     fontSize: 18
  },
  otp: {
    justifyContent:'center',
    alignItems: 'center',
    flex: 3
  },
  resend: {
    color: Colors.green, 
    fontWeight: 'bold', 
    fontSize: 20
  },
  code: {
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 50
  },
  codeContainer: {
    color: Colors.grey
  },
  main:{
    flex:1
  },
  navigate:{
    marginTop: 50, 
    marginHorizontal: 30
  }
});

export default PhoneVerificationScreen;
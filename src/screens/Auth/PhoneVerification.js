import React, { useRef,useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../CommonConfig/Colors/Colors';

import { StyleSheet, Text, TextInput, View ,TouchableOpacity } from 'react-native';

const PhoneVerificationScreen = (props) => {
  const pin1ref = useRef(null);
  const pin2ref = useRef(null);
  const pin3ref = useRef(null);
  const pin4ref = useRef(null);

  return (
    <>
      <View style={styles.backButton} >
        <TouchableOpacity onPress={() => {
          props.navigation.goBack()
        }}
        >
          <Ionicons name='arrow-back-outline' color={Colors.white} size={28} style={{ marginTop: 30, marginLeft:10 }} />
        </TouchableOpacity>
        <Text style={styles.verify} > Phone Verification</Text>
        <Text style={styles.optEnter} > Enter your OTP code here </Text>
      </View>

      <View style={styles.otp}>
        <View style={styles.optContainer}>
          <TextInput
          ref={pin1ref}
            autoFocus={true}
            maxLength={1}
            keyboardType='phone-pad'  
          onKeyPress={({nativeEvent}) => {
          nativeEvent.key === 'Backspace' ? null : pin2ref.current.focus();
          }}
            style={styles.opt}
          />

          <TextInput
          ref={pin2ref}
          maxLength={1}
          keyboardType='numeric'
        
         onKeyPress={({nativeEvent}) => {
           nativeEvent.key === 'Backspace' ? pin1ref.current.focus() : pin3ref.current.focus();
       }}
            style={styles.opt}
          />

          <TextInput
          ref={pin3ref}
          maxLength={1}
          keyboardType='numeric'
          onKeyPress={({nativeEvent}) => {
            nativeEvent.key === 'Backspace' ? pin2ref.current.focus() : pin4ref.current.focus();
        }}
            style={styles.opt}
          />

          <TextInput
          ref={pin4ref}
          maxLength={1}
          keyboardType='numeric'
          onKeyPress={({nativeEvent}) => {
            nativeEvent.key === 'Backspace' ? pin3ref.current.focus() : pin4ref.current.blur();
        }}
            style={styles.opt}
          />
        </View>

        <TouchableOpacity onPress={() => { props.navigation.navigate('DiscountCoupon') }} style={{ marginTop: 50, marginHorizontal: 30 }}>
          <Text style={styles.signin}> VERIFY </Text>
        </TouchableOpacity>

        <View style={styles.code}>
          <Text style={{ color: 'grey' }} >Didn't recieved code?</Text>
          <TouchableOpacity onPress={() => {
            props.navigation.navigate('SignUp')
          }} >
            <Text style={styles.resend} > Resend </Text>
          </TouchableOpacity>
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
    width: '100%'
  },
  opt:{
    fontWeight: '600', 
    alignSelf: 'center', 
    padding: 10, 
    fontSize: 20, 
    height: 55, 
    borderBottomColor: 'grey', 
    borderBottomWidth: 2, 
    justifyContent: 'center', 
    textAlign: 'center'
  },
  optContainer: {
    flex: 0.6, 
    justifyContent: 'space-evenly', 
    flexDirection: 'row'
  },
  backButton:{
    flex: 0.25, 
    backgroundColor:Colors.primary, 
    alignItems: 'flex-start'
  },
  verify: {
    justifyContent: 'center', 
    color: Colors.white, 
    fontSize: 25, 
    fontWeight: 'bold', 
    marginBottom: 10
  },
  optEnter:{
    justifyContent: 'center', 
    color: Colors.white,
     fontSize: 18
  },
  otp: {
    flexDirection: 'row' 
  },
  resend: {
    color: Colors.lightGreen, 
    fontWeight: 'bold', 
    fontSize: 20
  },
  code: {
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 50
  }
});

export default PhoneVerificationScreen;
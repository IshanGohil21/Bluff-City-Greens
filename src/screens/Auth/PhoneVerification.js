import React, { useRef,useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../CommonConfig/Colors';
import { Icons } from '../../CommonConfig/CommonConfig';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import { postRequest, postFormDataRequest } from '../../Helper/ApiHelper';

import { StyleSheet, Text, TextInput, View ,TouchableOpacity, Alert } from 'react-native';
import { useSelector } from 'react-redux';

const PhoneVerificationScreen = (props) => {
  const otpInput = useRef(null);
  const [isLoading, setisLoading] = useState(false);
  const [otpValue, setotpValue] = useState('');

  const country_code = props.route.params.countryCode;
  const mobile = props.route.params.mobile;

  const users = useSelector( state => state.Auth)
  // console.log(users);
  const userFormData = new FormData();
  userFormData.append("name", users.name)
  userFormData.append("email", users.email)
  userFormData.append("password", users.password)
  userFormData.append("country_code", country_code)
  userFormData.append("phone_number", mobile)
  console.log(userFormData);
  
  const onPressVerify = async () => {
    setisLoading(true);
    const data = {
      otpValue: otpValue,
      country_code: country_code,
      phone_number: mobile
    }
    console.log(data);

  const response = await postRequest('/verifyOTP', data);
  const resData = response.data;
  let errorMsg = 'Something went wrong';
  console.log(response);
    if (response.success) {
      const registerResponse = await postFormDataRequest('/register', userFormData)
      console.log(registerResponse);
      if (!registerResponse.success) {
        if (registerResponse.data.error === 'USER ALERADY EXISTS') {
          errorMsg = "The credentials entered already exist. Please check the details.";
        }
        Alert.alert("Error!", errorMsg, [{text: "Okay"}]);
      }else{
        props.navigation.navigate('DiscountCoupon');
      }
      }else{
        if (resData.error === "Invalid OTP entered!") {
          errorMsg = "Invalid OTP entered!"
        }
        Alert.alert("Error", errorMsg, [{ text: "Okay" }])
      }
    }

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
        <OTPInputView
            style={styles.head}
            pinCount={4}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled = {(code) => {setotpValue(code)}}
        />

        </View>

        <TouchableOpacity onPress={onPressVerify} style={styles.navigate}>
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
  signin: {
    width: 300, 
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    textAlign: 'center',
    color: Colors.white,
    fontSize: 23,
    padding: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  optContainer: {
    flex: 1, 
    justifyContent: 'space-between', 
    flexDirection: 'row'
  },  
  backButton:{
    flex: 1, 
    backgroundColor:Colors.primary, 
    justifyContent: 'space-between'
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
  },
  underlineStyleBase: {
     borderWidth: 0,
    borderBottomWidth: 5,
    borderBottomColor: Colors.grey,
    fontSize: 24,
    color: Colors.black,
    fontWeight: 'bold'
  },

  underlineStyleHighLighted: {
    borderBottomColor: Colors.grey,
    borderWidth:0,
    borderBottomWidth: 5,
  },
  head:{
    width: '80%', 
    height: 200
  }
});

export default PhoneVerificationScreen;
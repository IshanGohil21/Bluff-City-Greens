import React, { useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../CommonConfig/Colors';
import { Icons } from '../../CommonConfig/CommonConfig';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { postRequest} from '../../Helper/ApiHelper';

import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { LocaleConfig } from 'react-native-calendars';


const PhoneVerificationScreen = (props) => {


  const makeid = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const otpInput = useRef(null);
  const [isLoading, setisLoading] = useState(false);
  const [otpValue, setotpValue] = useState('');

  const params = props.route.params.xyz
  console.log(params);
  const country_code = props.route.params.countryCode;
  const mobile = props.route.params.mobile;

  const onPressVerify = async () => {
    setisLoading(true);
    const data = {
      otp: otpValue,
      country_code: country_code,
      phone_number: mobile,
    }
    console.log(data);

    const response = await postRequest('/verify-OTP', data);
    const resData = response.data;
    let errorMsg = 'Something went wrong';
    // console.log(response);
    if (response.success) {
      setisLoading(false);
      const registerData = new FormData();
      registerData.append('image', { uri: params?.image.path, type: params.image.mime, name: makeid(10) })
      registerData.append('email', params.email)
      registerData.append('password', params.password)
      registerData.append('name', params.name)
      registerData.append('country_code', country_code)
      registerData.append('phone', mobile)
      console.log("REGISTER FORM DATA\n", registerData);

      const res = await fetch('https://thank-greens-city.herokuapp.com/register', {
        method: 'POST',
        headers: {
          "Content-Type": "multipart/form-data"
        },
        body: registerData
      })
      const registerResponse = await res.json()
      // console.log("REFISTERRRRRRRRR", registerResponse);
      if (registerResponse.status === 1) {
        const loginData = {
          email: params.email,
          password: params.password,
        }
        const loginRes = await postRequest('/login', loginData)
        console.log(loginRes);
        const resData = loginRes.data

        //  console.log(resData)

        if (loginRes.success) {
          setisLoading(false);
          try {
            await AsyncStorage.setItem('token', resData.access_token)
            await AsyncStorage.setItem('refreshToken', resData.refresh_token)
            await AsyncStorage.setItem('userInfo', JSON.stringify(resData.user))
            await AsyncStorage.setItem('isLogin', "true")
          } catch (error) {
            console.log(error)
          }
          props.navigation.navigate('AccessibilityPolicy');

        } else {
          setisLoading(false);
          if (resData.error === 'Invalid OTP entered!') {
            setisLoading(false);
            Toast.show(" Invalid OTP entered! ");
            
          } else if (resData.error === 'USER ALERADY EXISTS') {
            setisLoading(false);
            Toast.show("The credentials entered already exist. Please check the details.")
            
          }
        }
      }
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
            <Ionicons name={Icons.BACK_ARROW} color={Colors.white} size={28} style={styles.margin0} />
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
              onCodeFilled={(code) => { setotpValue(code) }}
            />
            
          </View>
          
          <TouchableOpacity onPress={onPressVerify} style={styles.navigate}>
            { isLoading ? <ActivityIndicator size='small' color={Colors.primary} />: 
            <Text style={styles.signin}> VERIFY </Text> }
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
  backButton: {
    flex: 1.2,
    backgroundColor: Colors.primary,
    justifyContent: 'space-between'
  },
  verify: {
    justifyContent: 'center',
    color: Colors.white,
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 50
  },
  optEnter: {
    justifyContent: 'center',
    color: Colors.white,
    fontSize: 18
  },
  otp: {
    justifyContent: 'center',
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
  main: {
    flex: 1
  },
  navigate: {
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
    borderWidth: 0,
    borderBottomWidth: 5,
  },
  head: {
    width: '80%',
    height: 200
  },
  margin0: {
    marginTop: 30,
    marginLeft: 10
  }
});

export default PhoneVerificationScreen;
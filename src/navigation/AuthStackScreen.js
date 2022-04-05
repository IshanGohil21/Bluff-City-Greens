import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ForgotPasswordScreen from '../Screens/Auth/ForgotPassword';
import SignInScreen from '../Screens/Auth/SignInScreen';
import SignUpScreen from '../Screens/Auth/SignupScreen';
import PhoneVerificationScreen from '../Screens/Auth/PhoneVerification';
import DiscountCouponScreen from '../Screens/Auth/DiscountCoupon';
import AccessibilityPolicyScreen from '../Screens/Auth/AccessibilityPolicyScreen';
import LocationScreen from '../Screens/Auth/LocationScreen';
import PickCurrentLocationScreen from '../Screens/Auth/PickCurrentLocationScreen';
import SplashScreen from '../Screens/Auth/SplashScreen';

const AuthStack = createStackNavigator();

const AuthStackScreen = ({ navigation }) => {
    return(
        <AuthStack.Navigator headerMode='none' initialRouteName='Location' >
            <AuthStack.Screen name="Location" component={LocationScreen} />
             <AuthStack.Screen name="SignIn" component={SignInScreen} />
             <AuthStack.Screen name="SignUp" component={SignUpScreen} />
            <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <AuthStack.Screen name="PhoneVerification" component={PhoneVerificationScreen} />
            <AuthStack.Screen name="DiscountCoupon" component={DiscountCouponScreen}/>
            <AuthStack.Screen name="AccessibilityPolicy" component={AccessibilityPolicyScreen} />
            <AuthStack.Screen name="PickCurrentLocation" component={PickCurrentLocationScreen} />
            <AuthStack.Screen name='Splash' component={SplashScreen} />
        </AuthStack.Navigator>
    );
}
export default AuthStackScreen;

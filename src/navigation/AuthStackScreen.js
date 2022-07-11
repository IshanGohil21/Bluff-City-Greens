import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ForgotPasswordScreen from '../screens/Auth/ForgotPassword';
import SignInScreen from '../screens/Auth/SignInScreen';
import SignUpScreen from '../screens/Auth/SignupScreen';
import PhoneVerificationScreen from '../screens/Auth/PhoneVerification';
import DiscountCouponScreen from '../screens/Auth/DiscountCoupon';
import AccessibilityPolicyScreen from '../screens/Auth/AccessibilityPolicyScreen';
import LocationScreen from '../screens/Auth/LocationScreen';
import PickCurrentLocationScreen from '../screens/Auth/PickCurrentLocationScreen';
import SplashScreen from '../screens/SplashScreen';

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
            <AuthStack.Screen name="Splash" component={SplashScreen} />
            
        </AuthStack.Navigator>
    );
}
export default AuthStackScreen;

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ForgotPasswordScreen from './ForgotPassword';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignupScreen';
import PhoneVerificationScreen from './PhoneVerification';
import DiscountCouponScreen from './DiscountCoupon';
import AccessibilityPolicyScreen from './AccessibilityPolicyScreen';
import LocationScreen from './LocationScreen';
import PickCurrentLocationScreen from './PickCurrentLocationScreen';
import SplashScreen from './SplashScreen';

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

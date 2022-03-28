import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ForgotPasswordScreen from './ForgotPassword';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignupScreen';

const AuthStack = createStackNavigator();

const AuthStackScreen = ({ navigation }) => {
    return(
        <AuthStack.Navigator headerMode='none' >
             <AuthStack.Screen name="SignIn" component={SignInScreen} />
             <AuthStack.Screen name="SignUp" component={SignUpScreen} />
            <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        </AuthStack.Navigator>
    );
}
export default AuthStackScreen;

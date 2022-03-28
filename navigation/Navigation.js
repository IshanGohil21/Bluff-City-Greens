import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AuthStackScreen from "../screens/Auth/AuthStackScreen";

const AppStack = createStackNavigator();

const AppNavigator = props => {
    return(
        <NavigationContainer>
            <AppStack.Navigator headerMode='none'>
                <AppStack.Screen name='Auth' component={AuthStackScreen} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator;
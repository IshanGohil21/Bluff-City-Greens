import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AuthStackScreen from "./AuthStackScreen";
import MainTabScreen from "./MainTabScreen";
import SplashScreen from "../Screens/SplashScreen";


const AppStack = createStackNavigator();

const AppNavigator = props => {
    return(
        <NavigationContainer>
            <AppStack.Navigator headerMode='none' initialRouteName='Splash'>
                <AppStack.Screen name='Auth' component={AuthStackScreen} />
                <AppStack.Screen name='MainTab' component={MainTabScreen} />
                <AppStack.Screen name ='Splash' component={SplashScreen} />
             
            </AppStack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator;
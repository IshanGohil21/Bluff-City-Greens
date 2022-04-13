import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet } from 'react-native'
import { Icon } from 'react-native-vector-icons';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from '../Screens/TabNavigator/HomeScreen';
import CheckoutScreen from '../Screens/TabNavigator/Checkout';
import ShopScreen from '../Screens/TabNavigator/Shop';
import DeliveryLocationScreen from '../Screens/TabNavigator/DeliveryLocationScreen';
import FilterScreen from '../Screens/TabNavigator/FilterScreen';
import NotificationScreen from '../Screens/TabNavigator/NotificationScreen';

{ /* Contact US Screen */ }
import ContactScreen from '../Screens/TabNavigator/Contact';
import FAQScreen from '../Screens/TabNavigator/FAQ';

{ /* My Account Screens */ }
import MyAccountScreen from '../Screens/TabNavigator/MyAccount/MyAccount';
import personalInfoScreen from '../Screens/TabNavigator/MyAccount/PersonalInfo';
import SavedAddressScreen from '../Screens/TabNavigator/MyAccount/Address/SavedAddressScreen';
import MyOrdersScreen from '../Screens/TabNavigator/MyAccount/MyOrdersScreen';
import FavoritesScreen from '../Screens/TabNavigator/MyAccount/FavoritesScreen';
import PaymentScreen from '../Screens/TabNavigator/MyAccount/PaymentScreen';
import ReferFriendScreen from '../Screens/TabNavigator/MyAccount/ReferFriend';
import ChangePasswordScreen from '../Screens/TabNavigator/MyAccount/ChangePassword';
import AddNewAddressScreen from '../Screens/TabNavigator/MyAccount/Address/AddNewAddress';
import EditAddressScreen from '../Screens/TabNavigator/MyAccount/Address/EditAddress';
import AddNewAddress2Screen from '../Screens/TabNavigator/MyAccount/Address/AddAddress2';
import PastOrderScreen from '../Screens/TabNavigator/Home/PastOrderScreen';

const Tab = createBottomTabNavigator();
const MainTabScreen = () => {
    const getTabBarVisibility = (route) => {
        const routeName = getFocusedRouteNameFromRoute(route);
        const hideOnScreens = ['AddNewAddress', 'EditAddress', 'AddNewAddress2','Past_Orders']
        if(hideOnScreens.indexOf(routeName) > -1) return false;
        return true;
    };
    return (
        <Tab.Navigator tabBarOptions={{activeTintColor: 'green'}}>
            <Tab.Screen 
            name='Home' 
            component={HomeStackScreen} 
            options={ ({route}) => ({ 
                tabBarVisible: getTabBarVisibility(route),
                tabBarIcon: ({color}) => (
                    <Ionicons name='home' size={24} color={color}/>
                    )
                })} 
            />
            <Tab.Screen 
            name='Shop' 
            component={ShopStackScreen} 
            options={{
                tabBarIcon: ({color}) => (
                    < Ionicons name='business' size={24} color={color}/>
                    )
                }} 
            />
            <Tab.Screen 
            name='Checkout' 
            component={CheckoutStackScreen} 
            options={{
                tabBarIcon: ({color}) => (
                    <Ionicons name='cart' size={24} color={color} />
                    )
                }} 
            />
            <Tab.Screen 
            name='Contact' 
            component={ContactStackScreen}
            options={{
                tabBarIcon: ({color}) => (
                    <Ionicons name='help-circle' size={24} color={color} />
                    ),
                }} 
            />
            <Tab.Screen 
            name='MyAccount' 
            component={MyAccountStackScreen} 
            options={ ({route}) => ({ 
                tabBarVisible: getTabBarVisibility(route),
                tabBarIcon: ({color}) => (
                    <Ionicons name='person' size={24} color={color} />
                    )
                })} 
            />
        </Tab.Navigator>
    );
}

export default MainTabScreen;

const HomeDrawer = createDrawerNavigator();
const HomeDrawerScreen = () => {
    return (
        <HomeDrawer.Navigator >
            <HomeDrawer.Screen name='Home' component={HomeScreen} />
        </HomeDrawer.Navigator>   
        )
}

const HomeStack = createStackNavigator();
const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator  headerMode='none'>
            <HomeStack.Screen 
                name='Home' 
                component={HomeDrawerScreen} 
                options={{
                    headerLeft: () => null,
                    color:"green"
                }}
            />
            <HomeStack.Screen name='DeliveryLocation' component={DeliveryLocationScreen} />
            <HomeStack.Screen name='Filter' component={FilterScreen} />
            <HomeStack.Screen name='Notification' component={NotificationScreen} />
            <HomeStack.Screen name='Past_Orders' component={PastOrderScreen} />
        </HomeStack.Navigator>
    )
}

const ShopStack = createStackNavigator();
const ShopStackScreen = () => {
    return (
        <ShopStack.Navigator  headerMode='none'>
            <ShopStack.Screen name='Shop' component={ShopScreen} />
        </ShopStack.Navigator>
    )
}

const CheckoutStack = createStackNavigator();
const CheckoutStackScreen = () => {
    return (
        <CheckoutStack.Navigator  headerMode='none'>
            <CheckoutStack.Screen name='Checkout' component={CheckoutScreen} />
        </CheckoutStack.Navigator>
    )
}

const MyAccountStack = createStackNavigator();
const MyAccountStackScreen = () => {
    return (
        <MyAccountStack.Navigator headerMode='none'>
            <MyAccountStack.Screen name='MyAccount' component={MyAccountScreen} />
            <MyAccountStack.Screen name='personalInfo' component={personalInfoScreen} />
            <MyAccountStack.Screen name='SavedAddress' component={SavedAddressScreen} />
            <MyAccountStack.Screen  name='Payment' component={PaymentScreen} />
            <MyAccountStack.Screen  name='MyOrders' component={MyOrdersScreen} />
            <MyAccountStack.Screen  name='Favorites' component={FavoritesScreen} />
            <MyAccountStack.Screen  name='ReferFriend' component={ReferFriendScreen} />
            <MyAccountStack.Screen  name='ChangePassword' component={ChangePasswordScreen} />
            <MyAccountStack.Screen name='AddNewAddress' component={AddNewAddressScreen} />
            <MyAccountStack.Screen name='EditAddress' component={EditAddressScreen} />
            <MyAccountStack.Screen name= 'AddNewAddress2' component={AddNewAddress2Screen} />
            <MyAccountStack.Screen name='FAQ' component={FAQScreen} />
        </MyAccountStack.Navigator>
    )
}

const ContactStack = createStackNavigator();
const ContactStackScreen = () => {
    return (
        <ContactStack.Navigator headerMode='none'>
            <ContactStack.Screen name='Contact' component={ContactScreen} />

            <ContactStack.Screen name='FAQ' component={FAQScreen}/>
        </ContactStack.Navigator>
    )
}

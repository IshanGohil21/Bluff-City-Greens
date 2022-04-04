import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet } from 'react-native'
import { Icon } from 'react-native-vector-icons';

import HomeScreen from '../screens/TabNavigator/HomeScreen';
import CheckoutScreen from '../screens/TabNavigator/Checkout';
import ShopScreen from '../screens/TabNavigator/Shop';
import MyAccountScreen from '../screens/TabNavigator/MyAccount';
import ContactScreen from '../screens/TabNavigator/Contact';
import FAQScreen from '../screens/TabNavigator/FAQ';
import personalInfoScreen from '../screens/TabNavigator/personalInfo';
import SavedAddressScreen from '../screens/TabNavigator/SavedAddressScreen';
import MyOrdersScreen from '../screens/TabNavigator/MyOrdersScreen';
import FavoritesScreen from '../screens/TabNavigator/FavoritesScreen';
import PaymentScreen from '../screens/TabNavigator/PaymentScreen';
import ReferFriendScreen from '../screens/TabNavigator/ReferFriend';
import ChangePasswordScreen from '../screens/TabNavigator/ChangePassword';

const Tab = createBottomTabNavigator();
const MainTabScreen = () => {
    return (
        <Tab.Navigator tabBarOptions={{activeTintColor: 'green'}}>
            <Tab.Screen 
            name='Home' 
            component={HomeStackScreen} 
            options={{
                tabBarIcon: ({color}) => (
                    <Ionicons name='home' size={24} color={color}/>
                    )
                }} 
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
            options={{
                tabBarIcon: ({color}) => (
                    <Ionicons name='person' size={24} color={color} />
                    )
                }} 
            />
        </Tab.Navigator>
    );
}

export default MainTabScreen;

const HomeStack = createStackNavigator();
const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator  headerMode='none'>
            <HomeStack.Screen 
                name='Home' 
                component={HomeScreen} 
                options={{
                    headerLeft: () => null,
                    color:"green"
                }}
            />
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

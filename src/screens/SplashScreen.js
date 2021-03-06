import { Image, StatusBar, StyleSheet, View, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';

import { Colors, Images, Icons } from '../CommonConfig/CommonConfig';

const SplashScreen = (props) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 8000)
        loadApp()
    }, [])

    const loadApp = async () => {

        const isLogin = await AsyncStorage.getItem('isLogin');
        // const role = await AsyncStorage.getItem('role');
        // console.log(isLogin);
        if (isLogin === "true") {

            props.navigation.dispatch(CommonActions.reset({
                index: 0,
                routes: [{ name: 'MainTab' }]
            }))
        }
        else {
            props.navigation.dispatch(CommonActions.reset({
                index: 0,
                routes: [{ name: 'Auth' }]
            }))
        }
    }

    return (
        <View style={styles.screen}>
            <StatusBar backgroundColor={Colors.primary} />
            <Image source={Images.leaf} style={{ width: 200, height: 200 }} />
            <ActivityIndicator color={Colors.WHITE} size={50} />
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: Colors.primary,
        marginTop: 30
    }
})
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image, ScrollView, ImageBackground, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Colors, Images, Icons } from '../../../CommonConfig/CommonConfig';
import RBSheet from "react-native-raw-bottom-sheet";
import ProfileOption from '../../../Components/ProfileOption';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getRequest } from '../../../Helper/ApiHelper';

const MyAccountScreen = props => {

    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState({})

    useEffect(() => {
        getProfile()
        setIsLoading(false)
    }, [])

    const getProfile = async () => {
        setUser(JSON.parse(await AsyncStorage.getItem("userInfo")))
    }

    useEffect( () => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getProfile();
        })
        return unsubscribe;
    }, [props.navigation])

    const refRBSheet = useRef();

    const onPressLogout = async () => {
        setIsLoading(true);

        const response = await getRequest('/logout');
        console.log(response);
        {
            setIsLoading(false);
            AsyncStorage.clear()
            props.navigation.navigate('Auth', { screen: 'SignIn' });

        }
    }

    return (
        <>
            <View style={styles.main}>
                <ScrollView>
                    <View>
                        <StatusBar  />
                        <ImageBackground source={{ uri: user?.picture }} resizeMode='cover' style={styles.image} >
                            <View style={styles.heading} >
                                <TouchableOpacity onPress={() => { props.navigation.navigate('Home') }} >
                                    <Ionicons name={Icons.BACK_ARROW} size={30} color={Colors.white} style={styles.object} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => { props.navigation.navigate('EditInfo') }} >
                                    <Ionicons name='create-outline' size={30} color={Colors.white} style={styles.object} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ borderTopRightRadius: 30, borderTopLeftRadius: 30, overflow: 'hidden' }}>

                                <ProfileOption
                                    name='Personal Information'
                                    onPress={() => { user ? props.navigation.navigate('personalInfo', { user }) : props.navigation.navigate('SignIn') }}
                                    iconLeft={Icons.PERSON}
                                    iconRight={Icons.PROFILE_FORWARD}
                                />
                            </View>
                        </ImageBackground>
                        <ProfileOption
                            name='Saved Address'
                            onPress={() => { props.navigation.navigate('SavedAddress') }}
                            iconLeft={Icons.LOCATION}
                            iconRight={Icons.PROFILE_FORWARD}
                        />

                        <ProfileOption
                            name='Payment'
                            onPress={() => { props.navigation.navigate('Checkout', { screen: 'AddCard' }) }}
                            iconLeft={Icons.CARD}
                            iconRight={Icons.PROFILE_FORWARD}
                        />

                        <ProfileOption
                            name='My Orders'
                            onPress={() => { props.navigation.navigate('MyOrders') }}
                            iconLeft={Icons.BASKET}
                            iconRight={Icons.PROFILE_FORWARD}
                        />

                        <ProfileOption
                            name='Favorites'
                            onPress={() => { props.navigation.navigate('Favorites') }}
                            iconLeft={Icons.HEART}
                            iconRight={Icons.PROFILE_FORWARD}
                        />

                        <ProfileOption
                            name='Refer A Friend'
                            onPress={() => { props.navigation.navigate('ReferFriend') }}
                            iconLeft={Icons.PERSON_ADD}
                            iconRight={Icons.PROFILE_FORWARD}
                        />
                        <ProfileOption
                            name='Change Password'
                            onPress={() => { props.navigation.navigate('ChangePassword') }}
                            iconLeft={Icons.LOCK}
                            iconRight={Icons.PROFILE_FORWARD}
                        />
                        <ProfileOption
                            name='FAQ'
                            onPress={() => { props.navigation.navigate('FAQ') }}
                            iconLeft={Icons.HELP}
                            iconRight={Icons.PROFILE_FORWARD}
                        />

                        <ProfileOption
                            name='Logout'
                            onPress={() => refRBSheet.current.open()}
                            iconLeft={Icons.LOG_OUT}
                        />
                    </View>
                </ScrollView>
            </View>

            <View>
                <RBSheet
                    height={300}
                    ref={refRBSheet}
                    closeOnDragDown={true}
                    closeOnPressMask={false}
                    customStyles={{
                        wrapper: {
                            backgroundColor: 'rgba(0,0,0,0.5)',
                        },
                        draggableIcon: {
                            backgroundColor: Colors.grey,
                            width: 80,
                        },
                        container: {
                            borderTopLeftRadius: 30,
                            borderTopRightRadius: 30,
                        }
                    }}
                >
                    <Ionicons name={Icons.LOG_OUT} size={60} color={Colors.grey} style={styles.logo} />
                    <Text style={styles.bottom} >Are you sure you want to logout?</Text>
                    <TouchableOpacity onPress={onPressLogout} style={styles.logout} >
                        <Text style={styles.signin} > Logout </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => refRBSheet.current.close()} style={{ alignItems: 'center' }}>

                        <Text style={styles.signin2} > Cancel </Text>
                    </TouchableOpacity>
                </RBSheet>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    header: {
        justifyContent: 'center',
    },
    image: {

        justifyContent: 'space-between',
        height: Dimensions.get('window').height * 0.45,
        paddingTop: 15,
    },
    main:{
        flex: 1
    },
    text: {
        padding: 15,
        fontSize: 17,
        color: 'black'
    },
    bodyContainer: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    signin: {
        width: "80%",
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
    logout: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    signin2: {
        width: "80%",
        alignItems: "center",
        justifyContent: "center",
        textAlign: 'center',
        color: Colors.primary,
        fontSize: 18,
        padding: 10,
        overflow: 'hidden',
    },
    bottom: {
        fontWeight: '500',
        fontSize: 20,
        justifyContent: 'center',
        alignContent: 'center',
        marginLeft: 60,
        marginBottom: 20,
    },
    logo: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        marginLeft: 150
    },
    object: {
        marginLeft: 10,
        color: Colors.red
    },
    heading:{
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        paddingHorizontal: 10 
    }
});


export default MyAccountScreen;

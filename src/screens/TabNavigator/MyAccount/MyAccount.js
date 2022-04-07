import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image, ScrollView, ImageBackground } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import Images from '../../../CommonConfig/Images';
// import Colors from '../../../CommonConfig/Colors';
import { Colors, Images, Icons } from '../../../CommonConfig/CommonConfig';
import RBSheet from "react-native-raw-bottom-sheet";
import ProfileOption from '../../../Components/ProfileOption';

const MyAccountScreen = props => {
    const refRBSheet = useRef();

    return (
        <View>
            <ScrollView>
                {/* Header */}
                <View style={styles.container} >
                    <View style={styles.header} >
                        <ImageBackground source={{ uri: Images.ronaldo }} resizeMode='cover' style={styles.image} >
                            <TouchableOpacity onPress={() => { props.navigation.navigate('Home') }} >
                                <Ionicons name='arrow-back-outline' size={30} color='white' style={{ marginTop: 20, marginLeft: 10 }} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Ionicons name='create-outline' size={30} color='white' style={{ marginTop: 20, marginRight: 10 }} />
                            </TouchableOpacity>
                        </ImageBackground>
                    </View>
                    { /*  Body */}
                    <View style={styles.bodyContainer}>
                        <TouchableOpacity style={styles.body} onPress={() => { props.navigation.navigate('personalInfo') }}>
                            <View style={styles.card} >
                                <Ionicons name='person-outline' size={24} color={Colors.grey} />
                            </View>
                            <View style={styles.card2} >
                                <Text style={styles.text} > Personal Information </Text>
                            </View>
                            <View style={styles.card3} >
                                <Ionicons name='chevron-forward-outline' size={24} color={Colors.grey} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.body} onPress={() => { props.navigation.navigate('SavedAddress') }} >
                            <View style={styles.card} >
                                <Ionicons name='location-outline' size={24} color={Colors.grey} />
                            </View>
                            <View style={styles.card2} >
                                <Text style={styles.text} > Saved Address </Text>
                            </View>
                            <View style={styles.card3} >
                                <Ionicons name='chevron-forward-outline' size={24} color={Colors.grey} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.body} onPress={() => { props.navigation.navigate('Payment') }} >
                            <View style={styles.card} >
                                <Ionicons name='card-outline' size={24} color={Colors.grey} />
                            </View>
                            <View style={styles.card2} >
                                <Text style={styles.text} > Payment </Text>
                            </View>
                            <View style={styles.card3} >
                                <Ionicons name='chevron-forward-outline' size={24} color={Colors.grey} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.body} onPress={() => { props.navigation.navigate('MyOrders') }} >
                            <View style={styles.card} >
                                <Ionicons name='basket-outline' size={24} color={Colors.grey} />
                            </View>
                            <View style={styles.card2} >
                                <Text style={styles.text} > My Orders </Text>
                            </View>
                            <View style={styles.card3} >
                                <Ionicons name='chevron-forward-outline' size={24} color={Colors.grey} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.body} onPress={() => { props.navigation.navigate('Favorites') }} >
                            <View style={styles.card} >
                                <Ionicons name='heart-outline' size={24} color={Colors.grey} />
                            </View>
                            <View style={styles.card2} >
                                <Text style={styles.text} > Favorites </Text>
                            </View>
                            <View style={styles.card3} >
                                <Ionicons name='chevron-forward-outline' size={24} color={Colors.grey} />
                            </View>
                        </TouchableOpacity>

                        <ProfileOption 
                            name = 'Refer A Friend'
                            onPress={() => { props.navigation.navigate('ReferFriend') }}
                            iconLeft = 'person-add-outline'
                            iconRight = {Icons.PROFILE_FORWARD}
                        />
                        <ProfileOption 
                            name = 'Change Password'
                            onPress ={() => { props.navigation.navigate('ChangePassword') }}
                            iconLeft = 'lock-closed-outline'
                            iconRight = 'chevron-forward-outline'
                        />
                        <ProfileOption 
                            name = 'FAQ'
                            onPress={() => { props.navigation.navigate('FAQ') }}
                            iconLeft = 'help-circle-outline'
                            iconRight = 'chevron-forward-outline'
                        />

                        <ProfileOption 
                            name = 'Logout'
                            onPress={() => refRBSheet.current.open()}
                            iconLeft = 'log-out-outline'
                        />
                            <View style={styles.rb} >
                            <RBSheet
                                ref={refRBSheet}
                                
                                closeOnDragDown={true}
                                closeOnPressMask={false}
                                customStyles={{
                                    wrapper: {
                                        backgroundColor: "transparent"
                                    },
                                    draggableIcon: {
                                         backgroundColor: Colors.grey,
                                        width: 80
                                    }
                                }}
                            >
                                <Ionicons  name='log-out-outline' size={60} color={Colors.grey} style={styles.logo} />
                            <Text style={styles.bottom} >Are you sure you want to logout?</Text>
                            <TouchableOpacity onPress={() => {props.navigation.navigate('SignIn')}} style={styles.logout} >
                                <Text style={styles.signin} > Logout </Text>
                            </TouchableOpacity>
                            <TouchableOpacity  onPress={() => refRBSheet.current.close()}  style={{ alignItems: 'center'}}>

                            <Text style={styles.signin2} > Cancel </Text>
                            </TouchableOpacity>
                            </RBSheet>
                            </View>

                    </View>
                </View>
            </ScrollView>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        justifyContent: 'space-between',
        height: 305,
        flexDirection: 'row',
        padding: 15,
    },
    body: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderBottomColor: Colors.grey,
        borderBottomWidth: 0.5,
        paddingHorizontal: 15,
        marginLeft: 15,
    },
    text: {
        padding: 15,
        fontSize: 17,
        color: 'black'
    },
    bodyContainer: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderWidth: 1
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
        borderColor: Colors.green,
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
        // backgroundColor: Colors.primary,
        textAlign: 'center',
        color: Colors.primary,
        fontSize: 18,
        padding: 10,
        borderRadius: 10,
        borderColor: Colors.green,
        overflow: 'hidden',
        
    },  
    bottom: {
        fontWeight: '500',
        fontSize: 20,
        //alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        marginLeft: 60,
        marginBottom:20,
    },
    rb: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        marginLeft: 150
    }
});


export default MyAccountScreen;

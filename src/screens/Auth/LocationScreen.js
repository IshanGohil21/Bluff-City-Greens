import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, StatusBar} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Searchbar3 from '../../components/SearchBar3';
import { Images, Colors, Icons }from '../../CommonConfig/CommonConfig';

const LocationScreen = (props) => {
    const [value, setValue] = useState();
    const [query, setQuery] = useState();

    return (
        <View >
             <StatusBar barStyle='light-content' backgroundColor={Colors.primary} />

            {/* Header */}

            <View style={styles.header}>

                {/*Title*/}

                <View>
                    
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Location </Text>
                    </View>
                    <View>
                        <Text style={styles.service}> Service is location specific </Text>
                    </View>
                </View>
            </View>

            {/* Body */}

            <View style={styles.body} >
                <View style={styles.search} >
                    <View style={{marginHorizontal: 10}} >
                        <Searchbar3
                            value={value}
                        />
                    </View  >
                        <View style={{marginHorizontal: 10}} >
                        <Ionicons  name={Icons.LOCATION} size={30} color={Colors.white} style={styles.icon} />
                        </View>
                    
                </View>

                <View style={styles.searchContainer2}>
                    <View style={styles.vwSearch} onPress={() => { props.navigation.navigate('PickCurrentLocation') }} >
                        <Ionicons name={Icons.NAVIGATE} size={20} color={Colors.grey} />
                    </View>

                    <Text style={styles.text3} onPress={() => { props.navigation.navigate('PickCurrentLocation') }} > Use current location </Text>
                </View>

                <Image source={Images.location}
                    style={styles.image}
                />
                <Text style={styles.text} >
                    Choose your location to start shopping around you
                </Text>
                <Text style={styles.text2} >
                    Existing Customer?
                </Text>

                <TouchableOpacity onPress={() => { props.navigation.navigate('SignIn') }} >
                    <Text style={styles.signin}> SIGN IN </Text>
                </TouchableOpacity>

                <View style={styles.signUpContainer}>
                    <Text style={{ color: Colors.grey}} >Don't have account?</Text>
                    <TouchableOpacity onPress={() => {
                        props.navigation.navigate('SignUp')
                    }} >
                        <Text style={styles.signup} > SignUp </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    title: {
        color: 'white',
        fontSize: 30,
        padding: 10,
        fontWeight: '600',
        marginTop: 10,
        fontWeight: 'bold'
    },
    service: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    vwSearch: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'row',
        width: 20,
    },
    image: {
        height: 250,
        width: 250,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        //  marginLeft: 50
    },
    text: {
        color: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 14,
        textAlign: 'center',
        padding: 10
    },
    text2: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 20
    },
    text3: {
        textAlign: 'left'
    },
    signin: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "green",
        textAlign: 'center',
        color: 'white',
        fontSize: 23,
        padding: 10,
        borderRadius: 10,
        borderColor: 'green',
        overflow: 'hidden',
        width: '70%',
        // marginLeft: 50,
        marginTop: 20,
        paddingBottom: 10,
        width: 300
    },
    searchContainer2: {
        width: '90%',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        //  marginRight: 30

    },
    body: {
        alignItems: 'center',
        
    },
    textInput: {
        // backgroundColor: 'green',
        flex: 1,
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    search: {
        // flexGrow: 1,
        flexDirection: 'row',
        padding: 20,
        // marginHorizontal: 15,
        
      
    },
    icon:{
        backgroundColor: Colors.primary,
        borderRadius: 10,
        padding: 10,
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        flexDirection: 'row', 
        padding: 10, 
        backgroundColor: Colors.primary
    },
    
    signup: {
        color: Colors.green , 
        fontWeight: 'bold', 
        fontSize: 20 
    }
});

export default LocationScreen;
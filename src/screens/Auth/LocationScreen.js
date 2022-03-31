import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Searchbar from '../../../components/SearchBar';


const LocationScreen = (props) => {
    const [value, setValue] = useState();
    const [query, setQuery] = useState();

    return (
        <View >
            
            {/* Header */}
            <View style={{ flexDirection: 'row', padding: 10, backgroundColor: '#259D57' }}>
                {/*Title*/}
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.title}>Location </Text>
                    </View>
                    <View>
                        <Text style={styles.service}> Service is location specific </Text>
                    </View>
                </View>
            </View>
            {/* Body */}
            <View  style={styles.body} >
                <Searchbar
                    value={value}
                    style={{ margin: 20 }}
                />

<View style={styles.searchContainer2}>
            <View style={styles.vwSearch}  onPress={() => {props.navigation.navigate('PickCurrentLocation')}} >
                <Ionicons name="navigate" size={20} color="grey" />
            </View>

            <Text style={styles.text3} onPress={() => {props.navigation.navigate('PickCurrentLocation')}} > Use current location </Text>
        </View>

                <Image source={require('../../../assets/icon/icons8-location-100.png')}
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

                <View  style={{flexDirection: 'row', justifyContent:'center', alignItems:'center', marginTop: 10}}>
                            <Text style={{color:'black'}} >Don't have account?</Text>
                            <TouchableOpacity onPress={() => {
                                props.navigation.navigate('SignUp')
                            }} > 
                        <Text style={{color:'#4ef001', fontWeight:'bold', fontSize:20}} > SignUp </Text>
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
        marginTop: 40,
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
        alignItems:'flex-start',
        flexDirection: 'row',
        width: 40,
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
        fontSize: 18,
        textAlign: 'center',
        padding: 10
    },
    text2: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
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
        paddingBottom:10
    }, 
    searchContainer2: {
        width: '80%',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems:'flex-start',
        marginRight: 30
      
    },
    body:{
        alignItems: 'center'
    },
    textInput: {
        // backgroundColor: 'green',
        flex: 1,
    },


});

export default LocationScreen;
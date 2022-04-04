
import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    FlatList,
    TouchableOpacity,
    TextInput, Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Searchbar({ value, updateSearch, style }) {

    const [query, setQuery] = useState();
    const [error, setError] = useState()
    return (
        <View style={{alignItems: 'center'}}>
        <View style={[styles.container, style]}>
            <View style={{flexDirection:'row', alignItems:'center'}} >
        <View style={styles.searchContainer}>
            <View style={styles.vwSearch}>
                <Ionicons name="search-outline" size={20} color="grey" />
            </View>

            <TextInput
                value={query}
                placeholder="Search for Your Location"
                style={styles.textInput}
                // onChangeText={(text) => {
                //     var letters = /^$|^[a-zA-Z._\b ]+$/;
                //     if (text.length > 12)
                //         setError("Query too long.")
                //     else if (text.match(letters)) {
                //         setQuery(text)
                //         updateSearch(text)
                //         if (error)
                //             setError(false)
                //     }
                //     else setError("Please only enter alphabets")
                // }}
            />
        </View>
        <Image 
            source={require('../assets/icon/location-icon.png')}
            style={{height: 40, width: 40}}
            />
        </View>
    </View >
    </View>
    )
}
const styles = StyleSheet.create({
    txtError: {
        marginTop: '2%',
        width: '89%',
        color: 'white',

    },
    textInput: {
        // backgroundColor: 'green',
        flex: 1,
    },

    vwSearch: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
         width: 40,
    },
    icSearch: {

        height: 18,
        width: 18,

    },
    searchContainer:
    {
       // backgroundColor: 'white',
        width: '90%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    searchContainer2: {
        width: '100%',
        borderBottomWidth: 1,
        height:40,
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginRight: 30
    },
    container: {
        height: 20,
        marginBottom: 50,
        alignItems: 'center',
        borderColor: 'white'
        // height: '100%', width: '100%' 
    },
    image: {
        height: 250,
        width: 250,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    text: {
        color: 'grey',
        justifyContent:'center',
        alignItems:'center',
        fontSize: 18,
        textAlign: 'center'
    }
});
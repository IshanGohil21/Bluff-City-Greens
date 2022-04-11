
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
import  Ionicons  from 'react-native-vector-icons/Ionicons';

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
            />
        </View>
        
        </View>
    </View >
    </View>
    )
}
const styles = StyleSheet.create({
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
        marginBottom: 20,
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
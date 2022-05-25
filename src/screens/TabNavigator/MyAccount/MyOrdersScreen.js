import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet, Text, TextInput, Alert, Button, View, Image, TouchableOpacity, StatusBar } from 'react-native';

import { Icons, Images, Colors } from '../../../CommonConfig/CommonConfig'

const MyOrdersScreen = props => {
    const [state, setState] = useState('Current')

    return (
        // Main 
        <View style={styles.main} >
            <StatusBar backgroundColor={Colors.primary} />
            {/* Header & Title */}
            <View style={styles.header} >
                <TouchableOpacity onPress={() => { }} >
                    <Ionicons name={Icons.BACK_ARROW} style={styles.back} size={24} />
                </TouchableOpacity>
                <Text style={styles.my} >My Order</Text>
            </View>

            {/* Body */}
            <View style={styles.body} >
                <View style={styles.lineContainer} >
                    <TouchableOpacity style={{ ...styles.tabButton, borderBottomWidth: state === 'Current' ? 2.5 : 0.5, borderBottomColor: state === 'Current' ? Colors.primary : Colors.grey }} onPress={() => { setState('Current') }}>
                        <Text style={{ ...styles.filterText, color: state === 'Current' ? Colors.primary : Colors.grey }} >Current Order</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ ...styles.tabButton, borderBottomWidth: state === 'Past' ? 2.5 : 0.5, borderBottomColor: state === 'Past' ? Colors.primary : Colors.grey }} onPress={() => { setState('Past') }} >
                        <Text style={{ ...styles.filterText, color: state === 'Past' ? Colors.primary : Colors.grey }} >Past Order</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    header: {
        flex: 0.8,
        backgroundColor: Colors.primary,
        justifyContent: 'space-between',
        padding: 10,
    },
    back: {
        marginVertical: 20,
        color: Colors.white
    },
    my: {
        fontSize: 24,
        color: Colors.white,
        fontWeight: 'bold'
    },
    body: {
        flex: 3,
    },
    lineContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    filterText: {
        fontSize: 15,
        fontWeight: '900',
    },
})

export default MyOrdersScreen;
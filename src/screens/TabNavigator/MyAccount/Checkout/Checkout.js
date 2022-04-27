import React from 'react';
import { View,Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icons, Colors } from '../../../../CommonConfig/CommonConfig';

const CheckoutScreen = props => {
    return (
        <View style={styles.main} >
            {/* Header */}
            <View style={styles.header} >
                <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
                    <Ionicons name={Icons.BACK_ARROW} size={24} color={Colors.white} />
                </TouchableOpacity>
                <Text style={styles.cartext} >Cart</Text>
            </View>
            {/* Body */}
            <View style={styles.body} > 
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex:1
    },
    header:{
        flex: 0.5,
        backgroundColor: Colors.primary,
        justifyContent:'space-evenly',
        padding:5
    },
    cartext:{
        fontSize:24,
        color:Colors.white,
        fontWeight:'bold'
    },
    body:{
        flex: 3
    }
});


export default CheckoutScreen;

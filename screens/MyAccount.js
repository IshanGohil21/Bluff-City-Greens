import React from 'react';
import { View,Text, StyleSheet } from 'react-native';

const MyAccountScreen = props => {
    return (
        <View>
            <Text> My Account </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    }
});


export default MyAccountScreen;

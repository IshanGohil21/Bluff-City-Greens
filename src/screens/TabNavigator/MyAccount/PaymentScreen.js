import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TextInput, Alert, Button, View, Image, TouchableOpacity, Animated } from 'react-native';

import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient  from 'react-native-linear-gradient';

const PaymentScreen = props => {
    return (
        <View>
            <ShimmerPlaceholder LinearGradient={LinearGradient} height={150} /> 
        </View>
    )
}

export default PaymentScreen;
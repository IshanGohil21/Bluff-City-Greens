import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image, ScrollView, ImageBackground, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Colors, Images, Icons } from '../../../CommonConfig/CommonConfig';

const EditInfoScreen = () => {
  return (
    // Home Screen
    <View style={styles.main} >
        <StatusBar backgroundColor={Colors.primary} />

        {/* Header */}
        
        <View style={styles.header} >
                    <View style={styles.row} >
                        <TouchableOpacity onPress={() => { props.navigation.goBack() }} >
                            <Ionicons name={Icons.BACK_ARROW} size={28} color={Colors.white} style={styles.back} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.heading} >
                        <Text style={styles.titleFruit} >Edit Information</Text>

                    </View>

                </View>
        </View>
  )
}

export default EditInfoScreen;

const styles = StyleSheet.create({
    main:{
        flex:1,
    },
    header:{
        flex:1,
        backgroundColor:Colors.primary
    }
})
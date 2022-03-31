import React from 'react';
import { View,Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
// import Icon from 'react-native-ionicons';
// import  Ionicons from 'react-native-ionicons'; 
import { Ionicons } from '@expo/vector-icons';
const ContactScreen = props => {
    return (
        <SafeAreaView>
        <View> 
            <View style={{padding: 20, backgroundColor:'green', fontSize:30}}>
            <Text>Back Button</Text>
            <Text> Contact US </Text>
            </View>
        <ScrollView>
        <View style={styles.container}>
            <View style={{flexDirection: 'row', padding:10}}>
            <Ionicons name="mail-outline" size={23} color='grey'/>
            <Text style={{color: 'grey', fontSize: 20}}>  Contact by email </Text>
            </View>

            <View style={{flexDirection: 'row', padding:10}}>
            <Ionicons name="call-outline" size={23} color='grey'/>
            <Text style={{color: 'grey', fontSize: 20}}>  Contact by Phone </Text>
            </View>

            <View>
            <Text style={{padding:10, fontSize: 'bold', fontSize: 24}} > Customer Care </Text>
            <Text style={{ color: 'green',fontWeight: 'bold', padding: 10, fontSize: 18}} > 800-234-2790 </Text>
            <Text style={{padding: 10, color:'black'}}>For the quickest response time, we suggest calling between 1:00 pm and 5:00 pm CT. </Text>
            </View>

            <View tyle={{flexDirection: 'row', padding: 10}}>
            <Ionicons name="time-outline" size={28} color='grey'/>
            <Text style={{color: 'grey',fontSize: 20}}> Hours of Operation </Text>
            </View>

        </View>
        
        </ScrollView>
        </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 10
    },
});


export default ContactScreen;

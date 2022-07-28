import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Images, Icons } from '../../CommonConfig/CommonConfig';


const ContactScreen = props => {
    return (
        <View style={{ flex: 1 }} >
            <StatusBar backgroundColor={Colors.primary} />
            
            <View style={styles.contacting}>
                
                    <TouchableOpacity onPress={() => { props.navigation.navigate('Home') }} >
                        <Ionicons
                            name='arrow-back'
                            size={30}
                            color='white'
                            style={{paddingHorizontal:5, marginTop:20}}
                        />
                    </TouchableOpacity>
                    <Text style={styles.text} > Contact Us </Text>
               
            </View>
            <ScrollView  >
                <View style={styles.container}>
                    <View style={styles.mains0} >
                    <View style={styles.contactContainer}>
                        <Ionicons name="mail-outline" size={23} color='grey' />
                        <Text style={styles.contact}>  Contact by email </Text>
                    </View>

                    <View style={styles.line} />

                    <View style={styles.contactContainer}>
                        <Ionicons name="call-outline" size={23} color='grey' />
                        <Text style={styles.contact}>  Contact by Phone </Text>
                        </View>
                    </View>

                    <View style={styles.line} />

                    <View style={styles.mains} >
                        <Text style={{ padding: 10, fontSize: 'bold', fontSize: 24 }} > Customer Care </Text>
                        <Text style={{ color: 'green', fontWeight: 'bold', padding: 10, fontSize: 18 }} > 800-234-2790 </Text>
                        <Text style={{ padding: 10, color: 'black', color: 'grey', fontSize: 14 }}>For the quickest response time, we suggest calling between 1:00 pm and 5:00 pm CT. </Text>


                        <View style={styles.contactContainer}>
                            <Ionicons name="time-outline" size={28} color='grey' />
                            <Text style={styles.contact}> Hours of Operation </Text>
                        </View>

                        <View style={styles.daysContainer} >
                            <Text style={styles.days} >Days</Text>
                            <Text style={styles.days} >Hours</Text>
                        </View>

                        <View style={styles.timeContainer} >
                            <Text style={styles.time}>   Mon - Fri </Text>
                            <Text style={styles.time}>6:00 am - 10:00 pm CT </Text>
                        </View>

                        <View style={styles.timeContainer} >
                            <Text style={styles.time}>   Sat </Text>
                            <Text style={styles.time}>6:00 am - 10:00 pm CT </Text>
                        </View>

                        <View style={styles.timeContainer} >
                            <Text style={styles.time}>   Sun </Text>
                            <Text style={styles.time}>6:00 am - 10:00 pm CT </Text>
                        </View>
                    </View>

                    <View style={styles.line} />

                    <View style={styles.mains} >
                        <Text style={{ padding: 10, fontSize: 'bold', fontSize: 24 }} > Customer Receivables </Text>
                        <Text style={{ color: 'green', fontWeight: 'bold', padding: 10, fontSize: 18 }} > 800-234-2790 </Text>
                        <Text style={{ padding: 10, color: 'black', color: 'grey', fontSize: 14 }}>For the quickest response time, we suggest calling between 1:00 pm and 5:00 pm CT. </Text>


                        <View style={styles.contactContainer}>
                            <Ionicons name="time-outline" size={28} color='grey' />
                            <Text style={styles.contact}> Hours of Operation </Text>
                        </View>

                        <View style={styles.daysContainer} >
                            <Text style={styles.days} >Days</Text>
                            <Text style={styles.days} >Hours</Text>
                        </View>

                        <View style={styles.timeContainer} >
                            <Text style={styles.time}>   Mon - Fri </Text>
                            <Text style={styles.time}>7:00 am - 5:00 pm CT </Text>
                        </View>

                        <View>
                            <Text style={styles.request}>Request an item</Text>
                        </View>
                    </View>

                    <View style={styles.line} />

                    <View style={styles.faqContainer}>
                    <View style={styles.mains0} >
                        <TouchableOpacity onPress={() => { props.navigation.navigate('FAQ') }} style={{ flexDirection: 'row' }}>
                            <Ionicons name="help-circle-outline" size={28} color='grey' />
                            
                            <Text style={styles.faq}>FAQ</Text>
                           
                        </TouchableOpacity>
                    </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 10,
        flex:3
    },
    text: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold'
    },
    days: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    daysContainer: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'space-between',
        width: 200
    },
    timeContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 5,
        width: 285
    },
    time: {
        fontSize: 14,
        color: 'grey'
    },
    request: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'green',
        padding: 10
    },
    faqContainer: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        width: '100%'
    },
    faq: {
        color: 'grey',
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 10
    },
    contact: {
        color: 'grey',
        fontSize: 18,
    },
    contactContainer: {
        flexDirection: 'row',
        padding: 10
    },
    line: {
        height: 0,
        borderColor: Colors.grey,
        borderWidth: 0.2,
        width: '100%',
        marginVertical: 5,
    },
    mains:{
        backgroundColor:Colors.white,
        borderRadius:10,
        paddingHorizontal:5,
        margin:5,
        elevation:15
      },
      mains0:{
        backgroundColor:Colors.white,
        borderRadius:10,
        paddingHorizontal:5,
        margin:5,
        elevation:15,
        width:'95%',
        padding:10
      },
      contacting:{
        paddingHorizontal:10,
        paddingVertical:10 ,
        backgroundColor:Colors.primary,
      }
});

export default ContactScreen;

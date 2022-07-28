import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {Icons, Colors} from '../../CommonConfig/CommonConfig';
import FAQ from '../../Dummy-Data/FAQ';
import Collapsible from 'react-native-collapsible';
import * as Animatable from 'react-native-animatable';
import Accordian from '../../Components/Accordian(FAQ)';
import { ScrollView } from 'react-native-gesture-handler';

const FAQScreen = (props) => {
    
    const renderAccordians = () => {
        const items = [];
        for(const item of FAQ){
            items.push(
                <Accordian 
                    q = {item.q}
                    data= {item.a}
                />
            )
        }
        return items
    }

    return (
        <ScrollView>
        <View style={styles.mains} >
            {/*  HEADER */}
            <View style={styles.accrdioanComp}>
                <TouchableOpacity onPress={() => { props.navigation.goBack() }} >
                    <Ionicons
                        name={Icons.BACK_ARROW}
                        size={30}
                        color={Colors.white}
                        style={{marginTop:20}}
                    />
                </TouchableOpacity>
                <Text style={styles.text} > FAQ </Text>
            </View>
            {renderAccordians()}
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
        marginTop:20
    },
    paymentContainer: {
        justifyContent:'flex-start',
        fontSize: 18, 
        padding:10,
        marginBottom: 5,
        marginBottom: 5
    },
    main: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding:10
    },
    textContianer:{
        fontSize: 14,
        color: 'grey',
    },
    accrdioanComp:{
        padding:5 , 
        backgroundColor: Colors.primary , 
        fontSize: 30 
    },
    mains:{ 
        flex: 1 
    }
});

export default FAQScreen;





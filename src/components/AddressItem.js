import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet, Text, TextInput, Alert, Button, View, Image, TouchableOpacity,StatusBar } from 'react-native';
import Colors from '../Colors/Colors';

const AddressItem = props => {
    return (
        <View style={{marginVertical:10}}>
            <View  style={styles.mainContainer}> 
                <Ionicons  name={props.icon} size={25} color='grey'/>
                <Text style={styles.tags} > {props.tag} - {props.name} </Text>
            </View>
            <Text style={styles.address} > {props.address} </Text>
            <View style={styles.buttonContainer} >
                <TouchableOpacity style={styles.Button} onPress={props.edit}>
                    <Ionicons name='pencil-outline' size={25} color={Colors.grey} />
                    <Text style={styles.text} > EDIT </Text>
                </TouchableOpacity>
                <View style={styles.line} ></View>
                <TouchableOpacity style={styles.Button} onPress={props.delete} >
                    <Ionicons name='trash-bin-outline' size={25} color={Colors.grey} />
                    <Text style={styles.text} > DELETE </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles=StyleSheet.create({
    mainContainer: {
        flexDirection:'row' ,
        alignItems:'center', 
        justifyContent:'flex-start'
    },
    Button:{
        flexDirection: 'row', 
    },
    buttonContainer: {
        flexDirection:'row', 
        alignItems:'center', 
        marginTop:20
    },
    tags:{
        fontWeight:'bold', 
        fontSize:20
    },
    address:{
        marginTop:15, 
        fontSize:13,
        fontWeight:'500',
        color:Colors.grey
    },
    line:{
        width: 0, 
        borderColor:Colors.grey, 
        borderWidth: 1, 
        height: 25,
        marginHorizontal:30
    },
    text:{
        fontWeight:'bold',
        padding:5
    },
});

export default AddressItem;
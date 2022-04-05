import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet, Text, TextInput, Alert, Button, View, Image, TouchableOpacity,StatusBar } from 'react-native';
import Colors from '../../../Colors/Colors';
import Address from '../../../dummy-data/Address';
import AddressItem from '../../../components/AddressItem';
import { ScrollView } from 'react-native-gesture-handler';
import { VirtualizedListCellContextProvider } from 'react-native/Libraries/Lists/VirtualizedListContext';
import { array } from 'yup';


const SavedAddressScreen = props => {
    const [addressArray,  setAddressArray]= useState(Address)
    // console.log(addressArray)
   // console.log(Address)
     const deleteHandler = (prevState) => {
        setAddressArray =>  prevState.filter( (address) =>  address !== prevState  )
     }
       
    return (
        <View  style={styles.main}>
             {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => {
                    props.navigation.goBack()
                }}
                >
                    <Ionicons name='arrow-back-outline' color='white' size={30} style={styles.back} />
                </TouchableOpacity>
                {/*Title*/}
                    <View>
                        <Text style={styles.title}> Saved Address </Text>
                    </View>
            </View>
            { /* Body */ }
                <View style={styles.body} >
                    {/* <ScrollView  showsVerticalScrollIndicator={false}> */}
                    {addressArray.map( (address) => (
                        <AddressItem  
                            key={address.id}  
                            icon={address.icon}
                            tag={address.tag}
                            name={address.name}
                            address={address.address}
                            edit={() => {props.navigation.navigate('EditAddress')}}
                            delete={ () => deleteHandler(address.id)}
                            />
                    ) )}
                </View> 
                <TouchableOpacity  onPress={()=> {props.navigation.navigate('AddNewAddress')}}>
                    <Text style={styles.signin} > ADD NEW ADDRESS </Text>
                </TouchableOpacity>
        </View>
    )
}

const styles= StyleSheet.create({
    main:{
        flex:1
    },
    header: {
        padding: 10, 
        backgroundColor: Colors.primary, 
        flex:1,
    },
    title: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 28,
        marginTop: 50
    },
    back:{
        marginTop:20
    },
    body:{
        flex:3,
        padding:30
    },
    signin: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.primary,
        textAlign: 'center',
        fontSize: 23,
        padding: 10,
        borderRadius: 10,
        overflow: 'hidden',
        width: '80%',
        marginLeft: 30,
        marginBottom: 30,
        color: Colors.white
    },
});

export default SavedAddressScreen;
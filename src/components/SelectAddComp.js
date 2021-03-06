import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Icons, Colors, Images } from '../CommonConfig/CommonConfig';
import { useDispatch, useSelector } from 'react-redux';
import * as AddressAction from '../Redux/Action/Address';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SelectAddComp = (props) => {
    const dispatch = useDispatch();
    const [isFavorite, setIsFavorite] = useState(props.initialState);

    const activeId = useSelector(state => state.Address.activeAddress)
    // console.log(activeId);

    // const [ activeAddress, setActiveAddress ] = useState( {} )
    // //  console.log("\n\nActive null        ",activeAddress)

    // useEffect( async() => {
    //     setActiveAddress( JSON.parse( await AsyncStorage.getItem('activeAddress')))
    // },[])  

    const addObj = props.item
    // console.log("\n\nADDRESS OBJ         ",addObj)

    return (
        
        <TouchableOpacity style={{ ...styles.main, borderRadius: props.id === activeId ? 10 : 10, borderColor: props.id === activeId ? Colors.primary : null, borderWidth: props.id === activeId ? 1 : 0, elevation: props.id === activeId ? 0 : 0 }} onPress={async() => { dispatch(AddressAction.activateAddress(props.id)), await AsyncStorage.setItem('activeAddress', JSON.stringify(props.item)) }} >
            <View style={styles.overall} >
                <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)} >

                    <Ionicons name={Icons.PIN} color={Colors.primary} size={30} />
                    {/* <Ionicons name={Icons.PIN_FILLED} color={Colors.primary} size={30}  /> */}

                </TouchableOpacity>

                <View>
                    <Text style={styles.heading} >{props.tag} - {props.name}</Text>
                    <Text style={styles.texting} >{props.address}</Text>
                    <Text style={styles.texting} >{props.country}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    main: {

        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginHorizontal: 20,
        marginTop: 10,
        elevation: 10,
        overflow: 'hidden',
        borderRadius: 10,
        backgroundColor: Colors.white
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    overall: {
        flexDirection: 'row',
        // padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    },
    texting: {
        fontSize: 13,
        color: Colors.grey,
    },
    work: {
        marginTop: 10
    }
});

export default SelectAddComp
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet, Text, TextInput, Alert, Button, View, Image, TouchableOpacity, StatusBar, ScrollView, FlatList } from 'react-native';

import AddressItem from '../../../../components/AddressItem';
import { Icons, Colors } from '../../../../CommonConfig/CommonConfig';
import { getRequest, deleteRequest } from '../../../../Helper/ApiHelper';
import Toast from 'react-native-simple-toast';

const SavedAddressScreen = props => {
    const deleteHandler = (prevState) => {
        setAddressArray => prevState.filter((address) => address !== prevState)
    }

    useEffect(() => {
        getAddress();
    }, [address])

    // const onPressDelete = async() => {
    //     const deleteResponse = await deleteRequest('/delete-address/') 
    // }

    const [address, setAddress] = useState([]);

    const getAddress = async () => {
        const response = await getRequest('/get-address');
        // console.log('\n\nResponse          ', response.data.data);
        if (!response.success) {
            setAddress(response.data.data)
            // console.log("\n\nSET_ADDRESS          ", response.data.data);
        }
        else {
            Toast.show('Please Add a Address Initially');
        }
    }

    return (
        <View style={styles.main}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => {
                    props.navigation.goBack()
                }}
                >
                    <Ionicons name={Icons.BACK_ARROW} color={Colors.white} size={30} style={styles.back} />
                </TouchableOpacity>
                {/*Title*/}
                <View>
                    <Text style={styles.title}>Saved Address</Text>
                </View>
            </View>
            { /* Body */}
            <View style={styles.body} >
                {/* <ScrollView  showsVerticalScrollIndicator={false}> */}
                <FlatList
                    data={address}
                    showsVerticalScrollIndicator={false}
                    renderItem={(item) => {
                        // console.log("\n\nAddress             ", item)
                        return (
                            <View>
                                <AddressItem
                                    id={item.item.id}
                                    tag={item.item.is_select}
                                    name={item.item.primary_address}
                                    address={item.item.addition_address_info}
                                    onEdit={() => { props.navigation.navigate('EditAddress', { edit: item, editId: item.item.id }) }}
                                />
                            </View>
                        )
                    }}
                />
            </View>
            <TouchableOpacity onPress={() => { props.navigation.navigate('AddNewAddress') }}>
                <Text style={styles.signin} >ADD NEW ADDRESS</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    header: {
        padding: 10,
        backgroundColor: Colors.primary,
        flex: 1,
    },
    title: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 28,
        marginTop: 50
    },
    back: {
        marginTop: 20
    },
    body: {
        flex: 3,
        padding: 30
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
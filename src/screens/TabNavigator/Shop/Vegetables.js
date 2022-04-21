import { StyleSheet, Text, View, StatusBar, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React from 'react'

import { Colors, Icons, Images } from '../../../CommonConfig/CommonConfig';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchBarScreen from '../../../Components/Slider/SearchBar2';
import Fruits from '../../../dummy-data/Fruits';
import VegetablesComp from '../../../Components/Vegetables';

const VegetableScreen = (props) => {
  return (
      <ScrollView>
    <View style={styles.main} >
    <StatusBar backgroundColor={Colors.primary} />
        {/* Header */}
        <View style={styles.header} >
            <View style={styles.row} >
                <TouchableOpacity onPress={() => {props.navigation.goBack()}} >
                    <Ionicons name={Icons.BACK_ARROW} size={28} color={Colors.white} style={styles.back} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name={Icons.CART} size={28} color={Colors.white} style={styles.back} />
                </TouchableOpacity>
        </View>
            <View style={styles.heading} >
                <Text style={styles.titleFruit} >Vegetables</Text>
            <TouchableOpacity onPress={() => {props.navigation.navigate('Filter')}} >
                <Ionicons name={Icons.OPTIONS} size={35} color={Colors.white} />
            </TouchableOpacity>
        </View>
        </View>
        {/* Body */}
        <View style={styles.body} >
            <View style={styles.search} >
                <SearchBarScreen />
            </View>
            <View>
                <FlatList 
                    data={Fruits.items}
                    renderItem={({ item }) => {
                        return(
                            <View key={item.id}>
                                <VegetablesComp />

                            </View>
                        )
                    } }

                />
            </View>
        </View>
    </View>
    </ScrollView>
  )
}

export default VegetableScreen

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    header: {
        flex: 1,
        backgroundColor: Colors.primary,
        justifyContent: 'space-between'
    },
    back:{
        marginTop: 20,
        padding: 10
    },
    title: {
        flexDirection: 'row',
        flex:1,
        justifyContent:'flex-end',
    },
    titleFruit:{
        fontSize: 30,
        fontWeight: 'bold',
        color: Colors.white
    },
    heading: {
        justifyContent:'space-between', 
        flexDirection: 'row', 
        paddingLeft: 10, 
        paddingRight: 10
    },
    body: {
        flex: 3
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    search: {
        padding: 20
    }
})
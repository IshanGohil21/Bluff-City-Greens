import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image, Dimensions,FlatList } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Images, Colors, Icons} from '../../../CommonConfig/CommonConfig';
import Fruits from '../../../dummy-data/Fruits';
import fruitsComp from '../../../Components/fruits';

const { width } = Dimensions.get('window')
const height = width * 100 / 0.6

const FruitShopScreen = (props) => {
  return (
    <View style={styles.main} >
        <StatusBar backgroundColor={Colors.primary} />
        {/* Header */}
        <View style={styles.header} >
            <View style={styles.row} >
                <TouchableOpacity onPress={() => {props.navigation.goBack()}} >
                    <Ionicons name={Icons.BACK_ARROW} size={28} color={Colors.white} style={styles.back} />
                </TouchableOpacity>
            <View style={styles.title} >
                <TouchableOpacity>
                    <Ionicons name={Icons.SEARCH} size={28} color={Colors.white} style={styles.back} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name={Icons.CART} size={28} color={Colors.white} style={styles.back} />
                </TouchableOpacity>
            </View>
        </View>
            <View style={styles.heading} >
                <Text style={styles.titleFruit} >Fruits & Vegetables</Text>
            <TouchableOpacity onPress={() => {props.navigation.navigate('Filter')}} >
                <Ionicons name={Icons.OPTIONS} size={35} color={Colors.white} />
            </TouchableOpacity>
        </View>
        </View>
        {/* Body  */}
        <View style={styles.body} >
            <View>
                <Image source={Images.organic}  style={styles.images}/>
            </View>

            <View style={styles.cato}>
                <Text style={styles.by} > SHOP BY CATEGORY </Text>
            </View>

            <View>
                <FlatList
                    data={Fruits}
                    renderItem={({ item }) => {
                        <fruitsComp 
                            nameF={item.nameF}
                            img={item.img}
                        />
                    }
                }
                />
            </View>

        </View>
       
      
    </View>
  )
}
const styles = StyleSheet.create({
    main: {
        flex: 1
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
    },
    images: {
        width: '100%',
    height: 160,
    },
    cato:{
        borderRadius: 15,
        padding: 15,
        alignItems:'center', 
        backgroundColor: Colors.primary, 
        marginTop: 15, 
        width: '90%',
        marginLeft: 20
    },
    by: {
        fontSize: 20,
        color:Colors.white,
        fontWeight: 'bold'
    }
})

export default FruitShopScreen;

import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image, Dimensions,FlatList, ScrollView } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Images, Colors, Icons} from '../../../CommonConfig/CommonConfig';
import Fruits from '../../../dummy-data/Fruits';
import FruitsComp from '../../../Components/Fruits';


const { width } = Dimensions.get('window')
const height = width * 100 / 0.6

const numColumns = 2

const FruitShopScreen = (props) => {

    const shopID = props.route.params.shopId
    // console.log(shopID);

    const shopSub = props.route.params.shop
    console.log("\n\n\n\n Sub_Categories for each  products           ",shopSub.sub_categories);

  return (
       
    <View style={styles.main} >
        <StatusBar backgroundColor={Colors.primary} />
        {/* Header */}
        <View style={styles.header} >
            <View style={styles.row} >
                <TouchableOpacity onPress={() => {props.navigation.goBack()}} >
                    <Ionicons name={Icons.BACK_ARROW} size={24} color={Colors.white} style={styles.back} />
                </TouchableOpacity>
            <View style={styles.title} >
                <TouchableOpacity>
                    <Ionicons name={Icons.SEARCH} size={24} color={Colors.white} style={styles.back} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {props.navigation.navigate('Checkout')} } >
                    <Ionicons name={Icons.CART} size={24} color={Colors.white} style={styles.back} />
                </TouchableOpacity>
            </View>
        </View>
            <View style={styles.heading} >
                <Text style={styles.titleFruit} >{shopSub.title}</Text>
            <TouchableOpacity onPress={() => {props.navigation.navigate('Filter')}} >
                <Ionicons name={Icons.OPTIONS} size={35} color={Colors.white} />
            </TouchableOpacity>
        </View>
        </View>
        {/* Body  */}
        
        <View style={styles.body} >
        <ScrollView>
            <View>
                <Image source={Images.organic}  style={styles.images}/>
                {/* <Image source={{ uri: shopSub.sub_categories.image  }} /> */}
            </View>
            
            <View style={styles.cato}>
                <Text style={styles.by} > SHOP BY CATEGORY </Text>
            </View>

            <View style={{flex:1, justifyContent:'center', alignItems: 'center'}} >
                <FlatList
                    data={shopSub.sub_categories}
                    numColumns= {2}
                    renderItem={({ item }) => {
                       // console.log("\n\n\n Vegetables        ",item);
                        return(
                            <View key={item.id}   >
                                <FruitsComp 
                                    img={item.image}
                                    item={item}
                                    nameF={item.title}
                                    onClick={() => {props.navigation.navigate('Vegetables', { vegi:item, vegiId: item.id }  )}}
                                />
                            </View>
                        )
                    }
                }
                />
            </View>
            </ScrollView>
        </View>
            
    </View>
     
  )
}
const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    header: {
        flex: 0.5,
        backgroundColor: Colors.primary,
        justifyContent: 'space-between',
        paddingVertical:10
        
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
        fontSize: 24,
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
        height: 150,
    },
    cato:{
        borderRadius: 10,
        padding: 10,
        alignItems:'center', 
        backgroundColor: Colors.primary, 
        marginTop: 15, 
         width: '80%',
        // marginLeft: 20,
         marginHorizontal:40,
        justifyContent:'center',
        
    },
    by: {
        fontSize: 20,
        color:Colors.white,
        fontWeight: 'bold'
    },
    imageCato: {
        height: 150,
        width: 150,
        borderRadius: 10,
    },
    mappingComp:{
        padding: 5,
        marginTop: 10,
        flex: 1,
    }
})

export default FruitShopScreen;

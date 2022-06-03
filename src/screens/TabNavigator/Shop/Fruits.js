import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image, Dimensions, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import RBSheet from "react-native-raw-bottom-sheet";
import { RangeSlider } from '@sharcoux/slider';

import { Images, Colors, Icons } from '../../../CommonConfig/CommonConfig';
import FruitsComp from '../../../components/fruits';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { postRequest } from '../../../Helper/ApiHelper';

const { width } = Dimensions.get('window')
const height = width * 100 / 0.6

const numColumns = 2

const FruitShopScreen = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const filterRBSheet = useRef();
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(10);

    const shopID = props.route.params.shopId
    // console.log(shopID);

    const shopSub = props.route.params.shop
    // console.log("\n\n\n\n Sub_Categories for each  products           ", shopSub);


    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }, [])

    return (

        <View style={styles.main} >
            <StatusBar backgroundColor={Colors.primary} />
            {/* Header */}
            <View style={styles.header} >
                <View style={styles.row} >
                    <TouchableOpacity onPress={() => { props.navigation.goBack() }} >
                        <Ionicons name={Icons.BACK_ARROW} size={24} color={Colors.white} style={styles.back} />
                    </TouchableOpacity>
                    <View style={styles.title} >
                        <TouchableOpacity>
                            <Ionicons name={Icons.SEARCH} size={24} color={Colors.white} style={styles.back} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { props.navigation.navigate('Checkout') }} >
                            <Ionicons name={Icons.CART} size={24} color={Colors.white} style={styles.back} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.heading} >
                    <Text style={styles.titleFruit} >{shopSub.title}</Text>
                    <TouchableOpacity onPress={() => { props.navigation.navigate('Filter') }} >
                        <Ionicons name={Icons.OPTIONS} size={35} color={Colors.white} />
                    </TouchableOpacity>
                </View>
            </View>
            {/* Body  */}

            <View style={styles.body} >
                <ScrollView>
                    {isLoading ? <ShimmerPlaceholder LinearGradient={LinearGradient} height={150} width={width} contentStyle={styles.content} /> :
                        <View>
                            <Image source={Images.organic} style={styles.images} />
                            {/* <Image source={{ uri: shopSub.sub_categories.image  }} /> */}
                        </View>
                    }

                    <View style={styles.cato}>
                        <Text style={styles.by} >SHOP BY CATEGORY</Text>
                    </View>

                    <View>
                        <FlatList
                            data={shopSub.sub_categories}
                            numColumns={2}
                            renderItem={({ item }) => {
                                // console.log("\n\n\n Vegetables        ",item);
                                return (
                                    <View key={item.id}   >
                                        {isLoading ? <ShimmerPlaceholder LinearGradient={LinearGradient} height={height} width={width} /> :
                                            <FruitsComp
                                                img={item.image}
                                                item={item}
                                                nameF={item.title}
                                                onClick={() => { props.navigation.navigate('Vegetables', { vegi: item, vegiId: item.id, title: shopSub.title }) }}
                                            />
                                        }
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
        paddingVertical: 10

    },
    back: {
        marginTop: 20,
        padding: 10
    },
    title: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-end',
    },
    titleFruit: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.white
    },
    heading: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10
    },
    body: {
        flex: 3,
    },
    row: {
        flexDirection: 'row',
    },
    images: {
        width: '100%',
        height: 150,
    },
    cato: {
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        backgroundColor: Colors.primary,
        marginTop: 15,
        width: '80%',
        // marginLeft: 20,
        marginHorizontal: 40,
        justifyContent: 'center',

    },
    by: {
        fontSize: 20,
        color: Colors.white,
        fontWeight: 'bold'
    },
    imageCato: {
        height: 150,
        width: 150,
        borderRadius: 10,
    },
    mappingComp: {
        padding: 5,
        marginTop: 10,
        flex: 1,
    },
    content: {
        borderRadius: 10
    },
    fruit: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        overflow: 'hidden',
        borderRadius: 10,
        backgroundColor: Colors.white
    },
    priceRange: {
        padding: 10,
        marginTop: 15,
    },
    priceRange2: {
        fontSize: 20,
        fontWeight: '600'
    },
    filterText: {
        fontSize: 18,
        fontWeight: '600',
    },
    signin: {
        width: "70%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.primary,
        textAlign: 'center',
        color: Colors.white,
        fontSize: 23,
        padding: 10,
        borderRadius: 10,
        borderColor: Colors.primary,
        overflow: 'hidden',
        marginLeft: 60,
        marginTop: 80
    },
    apply: {
        color: Colors.white,
        fontSize: 18
    },
    rb: {
        borderColor: Colors.grey,
        borderWidth: 1,
        width: '85%',
        padding: 10,
        marginLeft: 30,
        borderRadius: 10,
    },
    rb2: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button2: {
        color: Colors.white,
        fontSize: 20,
        fontWeight: '700',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5
    },
    priceTag: {
        // padding: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 10,
    },
    txt1: {
        marginLeft: 15,
        color: Colors.grey
    },
    txt2: {
        marginRight: 15,
        color: Colors.grey
    },
    applyButton: {
        marginTop: 80
    },
    rangeSlider: {
        marginTop: 40
    },
    thumb: {
        elevation: 10,
        overflow: 'hidden',
        backgroundColor: Colors.white
    },
    ranger: {
        marginLeft: 20,
        marginRight: 20,
        elevation: 10
    }
})

export default FruitShopScreen;

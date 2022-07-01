import { StyleSheet, Text, View, ScrollView, StatusBar, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState, useRef } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import RBSheet from "react-native-raw-bottom-sheet";
import { RadioButton } from 'react-native-paper';

import RecommendedProducts from '../../../dummy-data/RecommendedProducts';
import { Colors, Icons, Images } from '../../../CommonConfig/CommonConfig';
import { useSelector, useDispatch } from 'react-redux';
import * as CartActions from '../../../Redux/Action/Cart';

const { width } = Dimensions.get('window')
const height = width * 100 / 0.6

var randomColor = Math.floor(Math.random() * 16111215).toString(16);
//console.log(randomColor);

const RecommendedProductsScreen = (props) => {
    const dispatch = useDispatch();

    const [isFavorite, setIsFavorite] = useState(props.initialState);

    const [checked, setChecked] = useState('first')
    const refRBSheet = useRef();

    const recommendId = props.route.params.recommendId
    const current = props.route.params.recommended
    //   console.log( "\n\n\n  Current        " ,current.item_sizes[0].size);

    // Setting Weight of the Products
    const [weight, setWeight] = useState(current.item_sizes[0]);
    const y = current.item_sizes.find(item => item.id === weight.id)
    //   console.log(y)

    const splitting = (str) => {
        let arr = str.split(' ');
        let arr0 = parseInt(arr[0]);
        return arr0
    }
     
    const height = width * 100 / 0.6
    const [active, setActive] = useState(0);

    const change = ({ nativeEvent }) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if (slide !== active) {
            setActive(slide);
        }
    }

    const cartItems = useSelector(state => {
        const updatedCartItems = [];
        for (const key in state.Cart.items) {
            updatedCartItems.push({
                ...state.Cart.items[key]
            });
        }
        return updatedCartItems.sort((a, b) => a.id > b.id ? 1 : -1);
    })
    // console.log(cartItems);
    const x = cartItems.find(item => item.id === current.id)
    //    console.log("\n\n\nx",x);

    const abc = cartItems?.length;

    return (
        <View style={styles.screen} >
            <StatusBar backgroundColor={`#${randomColor}`} barStyle='light-content' />

            {/* Header */}
            <View style={{ ...styles.header, backgroundColor: current.bgColor, backgroundColor: `#${randomColor}` }} >
                <View style={styles.back} >
                    <TouchableOpacity onPress={() => { props.navigation.goBack() }}  >
                        <Ionicons name={Icons.BACK_ARROW} size={30} color={Colors.white} style={styles.titleIcons} />
                    </TouchableOpacity>

                    <View  >
                        <TouchableOpacity onPress={() => { props.navigation.navigate('Checkout') }} >
                            <View style={styles.qtyCart} >
                                <Text style={{ fontSize: 12, fontWeight: 'bold', color: Colors.white }}>{abc}</Text>
                            </View>
                            <Ionicons name={Icons.CART} size={30} color={Colors.white} style={styles.titleIcons} />

                        </TouchableOpacity>
                    </View>
                </View>

                {/* Images ScrollView */}
                <View style={{ alignItems: 'center', padding: 10 }} >

                    <ScrollView
                        pagingEnabled
                        horizontal
                        onScroll={change}
                        showsHorizontalScrollIndicator={false}
                    >
                        {current.item_images.map((item, index) => {
                            // console.log(item);
                            return (
                                <View style={styles.fruit} key={index} >
                                    <Image source={{ uri: item.image }} style={styles.imageContainer} />
                                </View>
                            )
                        })}

                    </ScrollView>

                </View>
                <View style={styles.scroll} >
                    {
                        current.item_images.map((i, k) => (
                            <Text key={k} style={k == active ? styles.pagingActive : styles.paging} > ⬤ </Text>
                        ))
                    }
                </View>
            </View>

            {/* Body */}
            <View style={{ ...styles.header, backgroundColor: `#${randomColor}` }} >
                <View style={styles.body} >
                    <View style={styles.bodyHeading} >
                        <Text style={styles.fruitName}>{current.name}</Text>
                        <Text style={styles.priceBefore} >${current.item_sizes[1].price}</Text>
                    </View>
                    <View style={styles.bodyHeading} >
                        <Text style={styles.weightContainer} >
                            Net wt. {current.item_sizes[0].size}
                        </Text>
                        <Text style={styles.nonOriginalPrice} >${current.item_sizes[0].price}</Text>
                    </View>
                    <View style={styles.detailContainer} >
                        <Text style={styles.details} >Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                    </View>
                    {x ? <View style={styles.quantity} >
                        <Text style={styles.quantityContainer} >Quantity</Text>
                        <View style={styles.addQuantity} >
                            <TouchableOpacity style={styles.addition} onPress={() => { dispatch(CartActions.addToCart(current, weight.price, splitting(weight.size) )) }}  >
                                <Ionicons name={Icons.ADD} color={Colors.grey} size={24} />
                            </TouchableOpacity>

                            <Text style={styles.number} > {x?.size} </Text>

                            <TouchableOpacity onPress={() => { dispatch(CartActions.removeFromCart(current,weight.price, splitting(weight.size))) }}  >
                                <Ionicons name={Icons.SUB} color={Colors.grey} size={24} />
                            </TouchableOpacity>
                        </View>
                    </View> : null}
                    {/* Size Bottom Sheet */}
                    <View>
                        <Text style={styles.sizeContainer} >Size</Text>
                        <TouchableOpacity style={styles.sizeContainer2} onPress={() => refRBSheet.current.open()} >
                            <Text style={styles.selectSize} >{y?.size}</Text>
                            <Ionicons name={Icons.DOWN_ARROW} color={Colors.grey} size={24} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rb} >
                        <RBSheet
                            ref={refRBSheet}
                            closeOnDragDown={true}
                            closeOnPressMask={false}
                            customStyles={{
                                wrapper: {
                                    backgroundColor: 'rgba(0,0,0,0.5)',
                                },
                                draggableIcon: {
                                    backgroundColor: Colors.grey,
                                    width: 80,
                                },
                                container: {
                                    borderTopLeftRadius: 30,
                                    borderTopRightRadius: 30,
                                }
                            }}
                        >

                            <Text style={styles.bottom} >Available Sizes</Text>

                            <View style={styles.radio} >
                                {current.item_sizes[0] ?
                                    <View style={styles.button} >
                                        <RadioButton
                                            value="first"
                                            color={Colors.primary}
                                            status={checked === 'first' ? 'checked' : 'unchecked'}
                                            onPress={() => {
                                                setChecked('first')
                                                setWeight(current?.item_sizes[0])
                                                refRBSheet.current.close()
                                            }}
                                        />
                                        <Text>{current.item_sizes[0]?.size}</Text>
                                    </View>
                                    : null}

                                {current.item_sizes[1] ?
                                    <View style={styles.button} >
                                        <RadioButton
                                            value="second"
                                            color={Colors.primary}
                                            status={checked === 'second' ? 'checked' : 'unchecked'}
                                            onPress={() => {
                                                setChecked('second')
                                                setWeight(current?.item_sizes[1])
                                                refRBSheet.current.close()
                                            }}
                                        />
                                        <Text>{current.item_sizes[1]?.size}</Text>
                                    </View> : null}

                                {current.item_sizes[2] ?
                                    <View style={styles.button} >
                                        <RadioButton
                                            value="third"
                                            color={Colors.primary}
                                            status={checked === 'third' ? 'checked' : 'unchecked'}
                                            onPress={() => {
                                                setChecked('third')
                                                setWeight(current?.item_sizes[2])
                                                refRBSheet.current.close()
                                            }}
                                        />
                                        <Text>{current.item_sizes[2]?.size}</Text>
                                    </View> : null}
                            </View>
                        </RBSheet>
                    </View>

                    {/* Truck Statement */}
                    <View style={styles.delivery} >
                        <Ionicons name={Icons.DELIVERY} color={Colors.grey} size={28} />
                        <Text style={styles.freeDelivery} > Free delivery on purchase above $10 </Text>
                    </View>
                    {/* Heart and Add to Cart */}
                    <View style={styles.addToCart} >

                        <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
                            {isFavorite ? <Ionicons name={Icons.HEART} color={Colors.grey} size={30} style={styles.heartFilled} /> :
                                <Ionicons name={Icons.HEART_FILLED} color={Colors.red} size={30} style={styles.heartFilled} />}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.signin} onPress={() => { dispatch(CartActions.addToCart(current,weight.price, splitting(weight.size))) }} >
                            <Ionicons name={Icons.CART} size={24} color={Colors.white} />
                            <Text style={styles.textCart} >Add to Cart</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default RecommendedProductsScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.white
    },
    header: {
        flex: 1,
    },
    body: {
        flex: 1,
        backgroundColor: Colors.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    back: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15
    },
    titleIcons: {
        padding: 15,
        marginTop: 15
    },
    image2: {
        width: width * 0.60,
        height: width * 0.60,
    },
    scroll: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        zIndex: 10,
        marginBottom: 30
    },
    pagingActive: {
        color: Colors.white,
        margin: 5,
    },
    paging: {
        color: '#D4D7D8',
        margin: 5,
    },
    imageContainer: {
        height: width * 0.5,
        width: width * 0.5
    },
    fruit: {
        width: width,
        alignItems: 'center',
        justifyContent: 'center'
    },
    fruitName: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    bodyHeading: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    priceBefore: {
        color: Colors.grey,
        fontWeight: '700',
        borderBottomColor: Colors.red,
        //borderBottomWidth: 2,
        textDecorationLine: 'line-through',
    },
    weightContainer: {
        color: Colors.primary,
        marginTop: 10,
        fontSize: 16,
        fontWeight: '600'
    },
    nonOriginalPrice: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    detailContainer: {
        marginTop: 15
    },
    details: {
        fontSize: 14,
        fontWeight: '300',
        color: Colors.grey
    },
    quantity: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10
    },
    quantityContainer: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10
    },
    addQuantity: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    addition: {
        marginRight: 20
    },
    number: {
        marginRight: 20,
        color: Colors.grey
    },
    sizeContainer: {
        fontSize: 18,
        marginTop: 10
    },
    selectSize: {
        color: Colors.grey,
        padding: 10,
    },
    sizeContainer2: {
        //   borderWidth: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        elevation: 0.7
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15
    },
    bottom: {
        fontSize: 20,
        padding: 10
    },
    delivery: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    freeDelivery: {
        marginLeft: 10,
        color: Colors.primary
    },
    addToCart: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 15
    },
    heartFilled: {
        elevation: 2,
        borderRadius: 10,
        backgroundColor: Colors.white,
        overflow: 'hidden'
    },
    signin: {
        width: "80%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.primary,
        textAlign: 'center',
        padding: 10,
        borderRadius: 10,
        // borderColor: Colors.green,
        overflow: 'hidden',
        flexDirection: 'row',
    },
    textCart: {
        color: Colors.white,
        fontWeight: '700',
        fontSize: 20
    },
    qtyCart: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.yellow,
        borderRadius: 10,
        height: 22,
        width: 18,
        marginTop: 20,
        marginLeft: 30,
        position: 'absolute',
        zIndex: 10
    }
})

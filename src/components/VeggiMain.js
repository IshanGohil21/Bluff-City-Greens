import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import React, { useRef, useState } from 'react'
import { Colors, Icons } from '../CommonConfig/CommonConfig';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

import * as CartActions from '../Redux/Action/Cart';
import { useDispatch, useSelector } from 'react-redux';
import RBSheet from "react-native-raw-bottom-sheet";
import { RadioButton } from 'react-native-paper';

const { width } = Dimensions.get('window')
const height = width * 100 / 0.6

const VeggiComp = (props) => {
    const dispatch = useDispatch();

    const veggies = props.item
    //  console.log("\n\n\n\n\n\n\n\nVeggies               " ,veggies);
    const [weight, setWeight] = useState(veggies?.item_sizes[0]);
    //   console.log("\n\n\nWeights and Price                   ",veggies?.item_sizes[0].size);

    const [isTouched, setIsTouched] = useState(props.initialState);

    const refRBSheet = useRef();
    const [checked, setChecked] = useState('first')

    const cartItems = useSelector(state => {
        const updatedCartItems = [];
        for (const key in state.Cart.items) {
            updatedCartItems.push({
                ...state.Cart.items[key]
            });
        }
        return updatedCartItems.sort((a, b) => a.id > b.id ? 1 : -1);
    })
    // console.log("\nVeggie Main CART_ITEMS: \n\n",cartItems);

    // const qty = (cartItems.length ? cartItems.reduce( (a,c) =>  a + c.qty, 0 ) : 0)
    // console.log(qty);
    
    const x = cartItems.find(item => item?.itemSizeId === weight.id)
    //   console.log("\nx                           ", x);


    const y = veggies.item_sizes.find(item => item.id === weight.id)
    //  console.log("\ny    " ,y);
    
    const splitting = (str) => {
        let arr = str.split(' ');
        let arr0 = parseInt(arr[0]);
        return arr0
    }

    // const temp = splitting(y.size)
    // console.log(temp);

    return (
        <View style={styles.main} >
            <View style={{ flexDirection: 'row', flex: 1 }}>
                <Image source={{ uri: props.image }} style={styles.img} />
            </View>

            <View style={{ flex: 3, paddingHorizontal: 5, padding: 5, }} >
                <Text style={{ marginBottom: 10, color: Colors.grey, fontSize: 16, fontWeight: 'bold' }} >{props.name}</Text>

                <View>

                    <TouchableOpacity style={styles.weight} onPress={() => refRBSheet.current.open()} >
                        <Text style={styles.weight0} >{y?.size}</Text>
                        <Ionicons name={Icons.DOWN_ARROW} size={24} color={Colors.grey} />
                    </TouchableOpacity>

                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }} >

                    <View >
                        <Text style={styles.Oprice} >${(props.price.toFixed(2))}</Text>
                        <Text style={styles.discount} >${(y?.price.toFixed(2))}</Text>
                    </View>

                    <View >
                        {x ?
                            <View style={styles.signin2}>
                                <TouchableOpacity onPress={() => { dispatch(CartActions.addToCart(props.item, weight)) }}>
                                    <Ionicons name={Icons.ADD} size={20} color={Colors.white} />
                                </TouchableOpacity>

                                <Text style={styles.qtyText} > {x?.qty} </Text>

                                <TouchableOpacity onPress={() => { dispatch(CartActions.removeFromCart(props.item, weight)) }}>
                                    <Ionicons name={Icons.SUB} size={20} color={Colors.white} />
                                </TouchableOpacity>
                            </View>
                            :
                            <TouchableOpacity onPress={() => { dispatch(CartActions.addToCart(props.item, weight)) }}  >
                                <View style={styles.signin} >
                                    <Ionicons name={Icons.CART} size={24} color={Colors.white} style={styles.cart} />
                                    <Text style={styles.add}>Add</Text>
                                </View>
                            </TouchableOpacity>
                        }
                    </View>

                </View>
            </View>
            <View>

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
                            padding: 10,
                            borderTopLeftRadius: 30,
                            borderTopRightRadius: 30,
                        }
                    }}
                >
                    <Text style={styles.bottom} >Available Sizes</Text>
                    <View style={styles.radio} >
                        {veggies.item_sizes[0] ?
                            <View style={styles.button} >
                                <RadioButton
                                    value="first"
                                    color={Colors.primary}
                                    status={checked === 'first' ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setChecked('first')
                                        setWeight(veggies?.item_sizes[0])
                                        refRBSheet.current.close()
                                    }}
                                />
                                <Text>{veggies.item_sizes[0]?.size}</Text>
                            </View>
                            : null}

                        {veggies.item_sizes[1] ?
                            <View style={styles.button} >
                                <RadioButton
                                    value="second"
                                    color={Colors.primary}
                                    status={checked === 'second' ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setChecked('second')
                                        setWeight(veggies?.item_sizes[1])
                                        refRBSheet.current.close()
                                    }}
                                />
                                <Text>{veggies.item_sizes[1]?.size}</Text>
                            </View>
                            : null}

                        {veggies.item_sizes[2] ? <View style={styles.button} >
                            <RadioButton
                                value="third"
                                color={Colors.primary}
                                status={checked === 'third' ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setChecked('third')
                                    setWeight(veggies?.item_sizes[2])
                                    refRBSheet.current.close()
                                }}
                            />
                            <Text>{veggies.item_sizes[2]?.size}</Text>
                        </View> : null}
                    </View>

                </RBSheet>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'row'
    },
    img: {
        flex: 1,
        height: 50,
        aspectRatio: 1,
        margin: 10,
        borderRadius: 10,
    },
    add: {
        color: Colors.white,
        fontSize: 18
    },
    discount: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    Oprice: {
        color: Colors.grey,
        textDecorationLine: 'line-through',
        justifyContent: 'center',
        alignItems: 'center',
    },
    weight: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10,
        borderWidth: 0.5,
        padding: 5,
        width: '95%',
        borderColor: Colors.grey
    },
    signin: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.primary,
        textAlign: 'center',
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        width: 150,
        marginRight: 20
    },
    weight0: {
        color: Colors.grey
    },
    signin2: {
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: Colors.primary,
        textAlign: 'center',
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        width: 150,
        marginRight: 20
    },
    qtyText: {
        color: Colors.white
    },
    bottom: {
        fontSize: 20,
        padding: 10
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15
    },
    line: {
        height: 0,
        borderColor: Colors.grey,
        borderWidth: 0.5,
        width: '100%',
        marginVertical: 10,
        marginTop: 20,
        flexDirection: 'row'
    }
});

export default VeggiComp;
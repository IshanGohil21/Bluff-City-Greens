import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import React, { useRef, useState } from 'react'
import { Colors, Icons } from '../CommonConfig/CommonConfig';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

import * as CartActions from '../Redux/Action/Cart';
import { useDispatch, useSelector } from 'react-redux';
import RBSheet from "react-native-raw-bottom-sheet";
import { RadioButton } from 'react-native-paper';
import { Rating } from 'react-native-ratings';

const { width } = Dimensions.get('window')
const height = width * 100 / 0.6

const VeggiComp = (props) => {
    const dispatch = useDispatch();


    const veggies = props.item
    const [weight, setWeight] = useState(veggies.item_sizes[0].id);
    // console.log("\n\n\nFull Description of Vegetable Products       " ,veggies.item_sizes[0].size);

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

    // const qty = (cartItems.length ? cartItems.reduce( (a,c) =>  a + c.qty, 0 ) : 0)
    // console.log(qty);
    const x = cartItems.find(item => item.id === props.id)
    // console.log(x);


    return (
        <View style={styles.main} >
            <View style={{ flexDirection: 'row', flex: 1 }}>
                <Image source={{ uri: props.image }} style={styles.img} />
            </View>

            <View style={{ flex: 3, paddingHorizontal: 5, padding: 5 }} >
                <Text style={{ marginBottom: 10, color: Colors.grey, fontSize: 16, fontWeight: 'bold' }} >{props.name}</Text>
                <View>
                    <TouchableOpacity style={styles.weight} onPress={() => refRBSheet.current.open()} >
                        <Text style={styles.weight0} >{props.weight}</Text>
                        <Ionicons name={Icons.DOWN_ARROW} size={24} color={Colors.grey} />
                    </TouchableOpacity>


                </View>
                <Text style={styles.Oprice} >${props.price}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                    <Text style={styles.discount} >${props.disPrice}</Text>

                    <View >
                        {x ?
                            <View style={styles.signin2}>
                                <TouchableOpacity onPress={() => { dispatch(CartActions.addToCart(props.item)) }}>
                                    <Ionicons name={Icons.ADD} size={20} color={Colors.white} />
                                </TouchableOpacity>

                                <Text style={styles.qtyText} > {x.qty} </Text>

                                <TouchableOpacity onPress={() => { dispatch(CartActions.removeFromCart(props.item)) }}>
                                    <Ionicons name={Icons.SUB} size={20} color={Colors.white} />
                                </TouchableOpacity>
                            </View>
                            :
                            <TouchableOpacity onPress={() => { dispatch(CartActions.addToCart(props.item)) }}  >
                                <View style={styles.signin} >
                                    <Ionicons name={Icons.CART} size={24} color={Colors.white} style={styles.cart} />
                                    <Text style={styles.add}>Add</Text>
                                </View>
                            </TouchableOpacity>
                        }
                    </View>

                </View>

                {/* <TouchableOpacity  onPress={() => {dispatch(CartActions.removeFromCart(props.item))}}  >
                    <Ionicons name={Icons.TRASH} size={30} color={Colors.green} />
                </TouchableOpacity>  */}

                {/* <TouchableOpacity onPress={() => {dispatch(CartActions.clearCart(props.item))}} >
                <Ionicons name={Icons.TRASH} size={30} color={Colors.green} />
                </TouchableOpacity> */}

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
                        <View style={styles.button} >
                            <RadioButton
                                value="first"
                                color={Colors.primary}
                                status={checked === 'first' ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setChecked('first')
                                    setWeight(veggies.item_sizes[0].id)
                                    refRBSheet.current.close()
                                }}
                            />
                            <Text>{veggies.item_sizes[0].size}</Text>
                        </View>

                        <View style={styles.button} >
                            <RadioButton
                                value="second"
                                color={Colors.primary}
                                status={checked === 'second' ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setChecked('second')
                                    setWeight(veggies.item_sizes[1].id)
                                    refRBSheet.current.close()
                                }}
                            />
                            <Text>{veggies.item_sizes[1].size}</Text>
                        </View>

                        <View style={styles.button} >
                            <RadioButton
                                value="third"
                                color={Colors.primary}
                                status={checked === 'third' ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setChecked('third')
                                    setWeight(veggies.item_sizes[2].id)
                                    refRBSheet.current.close()
                                }}
                            />
                            <Text>{veggies.item_sizes[2].size}</Text>
                        </View>
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
        textDecorationLine: 'line-through'
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
});

export default VeggiComp;
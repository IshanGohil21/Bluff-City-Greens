import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert, TurboModuleRegistry } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RBSheet from "react-native-raw-bottom-sheet";

import { Icons, Images, Colors } from '../CommonConfig/CommonConfig';
import { Rating } from 'react-native-ratings';
import { postRequest } from '../Helper/ApiHelper';
import { ErrorMessage } from 'formik';

import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

const OrderProfile = (props) => {
    const refRBSheet = useRef();

    const [rating, setRating] = useState();
    const [ratingDescription, setRatingdescription] = useState('');
    const [loading, setLoading] = useState(true)

    const ratingHandler = async () => {
        // console.log("\n\n\nRating            ",rating);
        // console.log("\n\n\nDescription",ratingDescription);
        const data = {
            rate: rating,
            rating_description: ratingDescription
        }
        // console.log("\n\n\nDATA       ", data);
        const response = await postRequest(`/customer/rate-order?orderId=${props.id}`, data)
        console.log("\n\n\nResponse                ", response);

        let errorMessage = "Invalid Rating"
        if (response.success) {
            refRBSheet.current.close()
        }
        else {
            Alert.alert('Error', errorMessage, [{ text: "Okay" }])
        }
    }

    return (


        <View style={styles.main} >



            <View >
                <Text style={styles.time}  >{props.date} , {props.time}</Text>
            </View>


            <View style={styles.card} >
                <Ionicons name={Icons.CHECKMARK} size={30} color={Colors.primary} />
                <View style={styles.orders} >
                    <TouchableOpacity onPress={props.onClick} >
                        <View style={styles.details} >
                            <Text>Order Number:</Text>
                            <Text style={styles.margin} >{props.Order_Number}-{props.Order_Number1}</Text>
                        </View>

                        <View style={styles.details} >
                            <Text>Order Items:</Text>
                            <Text style={styles.margin} >{props.quantity} items</Text>
                        </View>

                        <View style={styles.details}>
                            <Text>Total Amount:</Text>
                            <Text style={styles.margin} >${props.total}</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.line} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                        <Ionicons name={Icons.ELLIPSE} size={16} color={Colors.primary} />
                        <Text style={styles.deli} >Order {props.status}</Text>
                        <TouchableOpacity onPress={() => refRBSheet.current.open()} >
                            <Text style={{ fontSize: 18, color: Colors.primary }} >Rate Order</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <RBSheet
                height={500}
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'rgba(0,0,0,0.5)',
                    },
                    draggableIcon: {
                        backgroundColor: Colors.grey,
                        width: 100,
                    },
                    container: {
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                    }
                }}
            >
                <View style={{ paddingVertical: 10 }} >
                    <View style={{ alignItems: 'center' }} >
                        <Image source={Images.thumb} style={{ height: 80, width: 80, alignItems: 'center' }} />
                    </View>
                    <View style={{ alignItems: 'center' }} >
                        <Text style={styles.bottom} >Rate Your Order</Text>
                        <Rating
                            ratingColor={Colors.yellow}
                            imageSize={50}
                            startingValue={0}
                            onFinishRating={(e) => { setRating(e) }}
                        />
                    </View>
                    <View style={{ alignItems: 'center' }} >
                        <TextInput
                            style={{ borderWidth: 1, marginTop: 10, width: '80%', height: 150, borderColor: Colors.grey, borderRadius: 10 }}
                            placeholder="Write Comment..."
                            onChangeText={(e) => { setRatingdescription(e) }}
                            multiline={true}
                            numberOfLines={4}
                        />
                    </View>

                    <View style={{ alignItems: 'center' }} >
                        <TouchableOpacity onPress={ratingHandler} style={{ marginTop: 20 }}>
                            <Text style={styles.rate} >RATE ORDER</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </RBSheet>
        </View>

    )

}

export default OrderProfile

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    time: {
        fontSize: 16,
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 10
    },
    card: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 10,
        padding: 10
    },
    orders: {
        flex: 1,
        padding: 10,
        elevation: 10,
        overflow: 'hidden',
        borderRadius: 10,
        backgroundColor: Colors.white
    },
    line: {
        height: 0,
        borderColor: Colors.grey,
        borderWidth: 0.5,
        width: '100%',
        marginVertical: 10,
        marginTop: 20,
        flexDirection: 'row'
    },
    deli: {
        fontSize: 16,
        marginHorizontal: 10
    },
    bottom: {
        padding: 20,
        fontSize: 20,
        fontWeight: 'bold'
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
    },
    margin: {
        marginRight: 50,
        color: Colors.grey,
        fontSize: 15,
    },
    rate: {
        justifyContent: "center",
        backgroundColor: Colors.primary,
        textAlign: 'center',
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 20,
        width: 300,
        color: Colors.white,
        fontSize: 18
    }
})
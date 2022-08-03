import React, { useEffect, useState, useRef } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Animated, StyleSheet, Text, TextInput, Alert, Button, View, Image, TouchableOpacity, StatusBar, FlatList, Dimensions, ScrollView } from 'react-native';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import Toast from 'react-native-simple-toast'

import { Icons, Images, Colors } from '../../../../CommonConfig/CommonConfig'
import { getRequest } from '../../../../Helper/ApiHelper';
import OrderProfile from '../../../../Components/OrderProfile';

const { width } = Dimensions.get('window')

const MyOrdersScreen = props => {
    const [state, setState] = useState('current')
    const [loading, setIsloading] = useState(true)
    const [isMoreItem, setisMoreItem] = useState(false);
    const [paging, setPaging] = useState(0)

    const [dots, setDots] = useState(0)

    const [pastOrder, setPastOrders] = useState([]);
    const [currentOrder, setCurrentOrders] = useState([]);

    const [active, setActive] = useState(0);

    useEffect(() => {
        getOrders();
    }, [paging, state])

    const getOrders = async () => {
        const response = await getRequest(`/customer/get-order?&paging=${paging}&status=${state}&page_size=2`)
        // console.log("\n\nAll Orders   hello     ", response.data);

        if (response.success) {
            setPastOrders(response.data.order);
            setCurrentOrders(response.data.order)
            // console.log("\n\n\nOrders                       ",response.data.order );
        }
        else {
            Toast.show('No Orders Available');
        }
        setIsloading(false);
    }

    return (
        // Main 
        <View style={styles.main} >
            <StatusBar backgroundColor={Colors.primary} />
            {/* Header & Title */}
            <View style={styles.header} >
                <TouchableOpacity onPress={() => { props.navigation.goBack() }} >
                    <Ionicons name={Icons.BACK_ARROW} style={styles.back} size={24} />
                </TouchableOpacity>
                <Text style={styles.my} >My Order</Text>
            </View>

            {/* Body */}
            <View style={styles.body} >
                <View style={styles.lineContainer} >
                    <TouchableOpacity style={{ ...styles.tabButton, borderBottomWidth: state === 'current' ? 2.5 : 0.5, borderBottomColor: state === 'current' ? Colors.primary : Colors.grey }} onPress={() => { setState('current') }}>
                        <Text style={{ ...styles.filterText, color: state === 'current' ? Colors.primary : Colors.grey }} >Current Order</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ ...styles.tabButton, borderBottomWidth: state === 'past' ? 2.5 : 0.5, borderBottomColor: state === 'past' ? Colors.primary : Colors.grey }} onPress={() => { setState('past') }} >
                        <Text style={{ ...styles.filterText, color: state === 'past' ? Colors.primary : Colors.grey }} >Past Order</Text>
                    </TouchableOpacity>
                </View>

                { state === 'past' ?
                    // Past Order Screen
                    <View>
                        <FlatList
                            data={pastOrder}
                            showsVerticalScrollIndicator={false}
                            renderItem={(item) => {
                                // console.log("\n\n\nPast     ", item);
                                return (
                                    <View key={item.id} >
                                        {loading ? <ShimmerPlaceholder LinearGradient={LinearGradient} height={150} width={width} /> :
                                            <OrderProfile
                                                id={item.item.id}
                                                date={item.item.delivery_date}
                                                time={item.item.delivery_time}
                                                Order_Number={item.item.id}
                                                quantity={item.item.order_items.length}
                                                total={item.item.total_amount}
                                                status={item.item.status}
                                                onClick={() => { props.navigation.navigate('OrderDetails', { order: item, orderId: item.id }) }}
                                            />
                                        }
                                    </View>
                                )
                            }}
                        />
                    </View>

                    :

                    // Current Orders Screen
                    <View>
                        {loading ? <ShimmerPlaceholder LinearGradient={LinearGradient} height={150} width={width} /> :
                            <FlatList
                                data={currentOrder}
                                pagingEnabled

                                showsVerticalScrollIndicator={true}
                                renderItem={(item) => {
                                    //    console.log("\n\n\nCurrent     ", item);
                                    return (
                                        <View key={item.id} >
                                            <OrderProfile
                                                id={item.item.id}
                                                date={item.item.delivery_date}
                                                time={item.item.delivery_time}
                                                Order_Number={item.item.id}
                                                quantity={item.item.order_items.length}
                                                total={item.item.total_amount}
                                                status={item.item.status}
                                                onClick={() => { props.navigation.navigate('OrderDetails', { order: item, orderId: item.id }) }}
                                            />
                                        </View>
                                    )
                                }}
                            />
                        }
                    </View>
                }
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
        padding: 10,
    },
    back: {
        color: Colors.white,
        marginTop: 20
    },
    my: {
        fontSize: 24,
        color: Colors.white,
        fontWeight: 'bold'
    },
    body: {
        flex: 3,
    },
    lineContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    filterText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    paging: {
        color: Colors.grey,
        margin: 5,
    },
    pagingActive: {
        color: Colors.white,
        margin: 5,
    },
    scroll: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        zIndex: 10
    },
})

export default MyOrdersScreen;
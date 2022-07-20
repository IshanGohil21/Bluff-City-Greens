import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet, Text, TextInput, Alert, Button, View, Image, TouchableOpacity, StatusBar, FlatList, Dimensions } from 'react-native';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';


import { Icons, Images, Colors } from '../../../../CommonConfig/CommonConfig'
import { getRequest } from '../../../../Helper/ApiHelper';
import OrderProfile from '../../../../components/OrderProfile';

const val = Math.floor(1 + Math.random() * 999);
const num = Math.floor(Math.random() * 9999)
// console.log(val);
// console.log(num);

const { width } = Dimensions.get('window')

const MyOrdersScreen = props => {
    const [state, setState] = useState('past')
    const [loading, setIsloading] = useState(true)
    const [isMoreItem, setisMoreItem] = useState(false);
    const [paging, setPaging] = useState(1)

    const [pastOrder, setPastOrders] = useState([]);
    const [currentOrder, setCurrentOrders] = useState([]);


    let renderLoader = () => {
        return (
            <View style={styles.loaderStyle}>
                {isMoreItem ?
                    (
                        <ActivityIndicator size="large" />
                    ) : null}
            </View>
        );
    }

    const loadMoreItem = () => {
        // console.log("currentpage       ",setCurrentPage)
        setPaging(paging + 1)
        console.log("loadMore  ", paging)
    };

    useEffect(() => {
        update();
    }, [props.navigation])

    const update = async () => {
        props.navigation.addListener('focus', () => {
            getOrders();
        });
    }

    useEffect(() => {
        getOrders();
    }, [paging, state])

    const getOrders = async () => {
        const response = await getRequest(`/customer/get-order?page=${paging}&status=${state}&page_size=10`)
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

                {state === 'past' ?
                    // Past Order Screen
                    <View>
                       
                            <FlatList
                                // ListFooterComponent={renderLoader}
                                // onEndReached={loadMoreItem}
                                // onEndReached={()=>{console.log("hi")}}
                                // onEndReachedThreshold={0.5}
                                data={pastOrder}
                                showsVerticalScrollIndicator={false}
                                renderItem={(item) => {
                                    // console.log("\n\n\nPast     ", item);
                                    return (
                                        <View key={item.id} >
                                            {loading ? <ShimmerPlaceholder LinearGradient={LinearGradient} height={150} width={width} /> :
                                            <OrderProfile
                                                id={item.item.id}
                                                date={moment(item.item.delivery_date).format('ddd, Do MMM YYYY')}
                                                time={item.item.delivery_time}
                                                Order_Number={val}
                                                Order_Number1={num}
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
                                showsVerticalScrollIndicator={false}
                                renderItem={(item) => {
                                    //  console.log("\n\n\nCurrent     ", item);
                                    return (
                                        <View key={item.id} >
                                            {/* <Text>Hello</Text> */}
                                            <OrderProfile
                                                id={item.item.id}
                                                date={moment(item.item.delivery_date).format('ddd, Do MMM YYYY')}
                                                time={item.item.delivery_time}
                                                Order_Number={val}
                                                Order_Number1={num}
                                                quantity={item.item.order_items.length}
                                                total={item.item.total_amount}
                                                status={item.item.status}
                                            // onClick={ () => {props.navigation.navigate('OrderDetails',{ order:item, orderId: item.id })} }
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
        flex: 0.6,
        backgroundColor: Colors.primary,
        justifyContent: 'space-between',
        padding: 10,
    },
    back: {
        color: Colors.white
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
})

export default MyOrdersScreen;
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, ScrollView, FlatList, Dimensions } from 'react-native'
import React, { useRef, useState, useEffect, useCallback } from 'react'
import RBSheet from "react-native-raw-bottom-sheet";
import { RadioButton } from 'react-native-paper';
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { RangeSlider } from '@sharcoux/slider'

import { Colors, Icons, Images } from '../../../CommonConfig/CommonConfig';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchBarScreen from '../../../components/Slider/SearchBar2';
import VegetablesComp from '../../../components/Vegetables';
import VeggiComp from '../../../components/VeggiMain';
import { getRequest, postRequest } from '../../../Helper/ApiHelper';


const { width } = Dimensions.get('window')

const VegetableScreen = (props) => {

    const [enableScroll, setEnable] = useState(true);
    const [disableScroll, setDisable] = useState(false);
    const [range, setRange] = useState(0);
    const [value, setValue] = useState([0, 50])
    const [state, setState] = useState('filter')
    const refRBSheet = useRef();
    const refRBSheet2 = useRef();
    const [checked, setChecked] = useState('first')
    const [isLoading, setIsLoading] = useState(true)
    const [sort, setSort] = useState('ASC')

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

    const subTotal = (cartItems.length ? cartItems.reduce((a, c) => a + c.itemTotal, 0) : 0)
    //  console.log("\n\nsub total                 ",subTotal);

    const veggieId = props.route.params.vegiId
    // console.log(veggieId);

    const veggiAll = props.route.params.vegi
    //console.log("\n\n\n\nAll Products    ", veggiAll.title);

    useEffect(async () => {
        getSort();
    }, [])

    const [asc, setAsc] = useState([]);

    const getSort = async () => {
        const response = await getRequest(`/customer/sort?price=${sort}`)
         console.log("\n\n\nSorting              ", response.data.data);
    }

    const onPressFilter = async () => {
        // const data = {

        // }
        const Filter = await postRequest('/customer/filter')
        // console.log("\n\n\nFilter                  ",Filter.data);
    }

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }, [])

    return (
        <>
            <View style={styles.main} >
                <StatusBar backgroundColor={Colors.primary} />
                {/* Header */}
                <View style={styles.header} >
                    <View style={styles.row} >
                        <TouchableOpacity onPress={() => { props.navigation.goBack() }} >
                            <Ionicons name={Icons.BACK_ARROW} size={28} color={Colors.white} style={styles.back} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { props.navigation.navigate('Checkout') }} >
                            <Ionicons name={Icons.CART} size={28} color={Colors.white} style={styles.back} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.heading} >
                        <Text style={styles.titleFruit} >{veggiAll.title}</Text>
                        {/* <TouchableOpacity onPress={() => { props.navigation.navigate('Filter') }} >
                            <Ionicons name={Icons.OPTIONS} size={35} color={Colors.white} />
                        </TouchableOpacity> */}

                        <TouchableOpacity onPress={() => refRBSheet.current.open()} >
                            <Ionicons name={Icons.OPTIONS} size={35} color={Colors.white} />
                        </TouchableOpacity>
                    </View>

                </View>
                {/* Body */}
                <View style={styles.body} >
                    <ScrollView>
                        <View style={styles.search} >
                            <SearchBarScreen />

                        </View>
                        <View>
                            <FlatList
                                data={veggiAll.items}
                                renderItem={({ item }) => {
                                    //  console.log("\n\n\n\nFinal Products "        , item);
                                    return (
                                        <View key={item.id} >
                                            {isLoading ? <ShimmerPlaceholder LinearGradient={LinearGradient} height={150} width={width} contentStyle={styles.content} /> :
                                                <VeggiComp
                                                    item={item}
                                                    id={item.id}
                                                    image={item.item_images[0].image}
                                                    name={item.name}
                                                    weight={item.item_sizes[0].size}
                                                    price={item.item_sizes[0].price}
                                                    disPrice={item.item_sizes[0].price}
                                                    onPress={() => { }}
                                                />
                                            }
                                            <View style={styles.line1} />
                                        </View>
                                    )
                                }}
                            />
                        </View>
                    </ScrollView>
                </View>
                <RBSheet
                    ref={refRBSheet}
                    height={500}
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
                    <View style={styles.lineContainer} >
                        <TouchableOpacity style={{ ...styles.tabButton, borderBottomWidth: state === 'filter' ? 2.5 : 0.5, borderBottomColor: state === 'filter' ? Colors.primary : Colors.grey }} onPress={() => { setState('filter') }}>
                            <Text style={{ ...styles.filterText, color: state === 'filter' ? Colors.primary : Colors.grey }} >Filter By</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ ...styles.tabButton, borderBottomWidth: state === 'sort' ? 2.5 : 0.5, borderBottomColor: state === 'sort' ? Colors.primary : Colors.grey }} onPress={() => { setState('sort') }} >
                            <Text style={{ ...styles.filterText, color: state === 'sort' ? Colors.primary : Colors.grey }} >Sort By</Text>
                        </TouchableOpacity>
                    </View>

                    {/* RB Sheet Filter and Range Slider */}
                    <View>
                        {state === 'filter' ?
                            <View style={styles.commonContainer} >

                                {/* Range Slider */}
                                <View style={styles.priceRange} >
                                    <Text style={styles.priceRange2} >Price Range</Text>

                                    <View style={styles.rangeSlider} >
                                        <RangeSlider
                                            range={[0, 1]}
                                            minimumValue={0}
                                            maximumValue={1}
                                            step={0}
                                            outboundColor='#DCDCDC'
                                            inboundColor='#0603C6'
                                            thumbTintColor={Colors.white}
                                            thumbStyle={styles.thumb}
                                            style={styles.ranger}
                                            trackHeight={6}
                                            thumbSize={20}
                                            onValueChange={ () => {onPressFilter()} }
                                        />
                                    </View>
                                    <View style={styles.priceTag} >
                                        <Text style={styles.txt1} > $0 </Text>
                                        <Text style={styles.txt2} > $50 </Text>
                                    </View>
                                </View>
                                <View style={styles.applyButton} >
                                    <TouchableOpacity style={styles.signin} onPress={() => { props.navigation.navigate('Home') }} >
                                        <Text style={styles.apply} >APPLY</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            :

                            // Sort By Screen
                            <View>
                                <View>

                                    <View style={styles.radio} >
                                        <View style={styles.button} >
                                            <RadioButton
                                                value="first"
                                                color={Colors.primary}
                                                status={checked === 'first' ? 'checked' : 'unchecked'}
                                                onPress={() => setChecked('first')}
                                            />
                                            <Text>Delivery Time</Text>

                                        </View>
                                        <View style={styles.rb} >
                                            <TouchableOpacity style={styles.rb2} onPress={() => refRBSheet2.current.open()}  >
                                                <Text style={styles.select} >-Select Time-</Text>
                                                <Ionicons name={Icons.DOWN_ARROW} size={30} color={Colors.grey} />
                                            </TouchableOpacity>

                                            <RBSheet
                                                ref={refRBSheet2}
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
                                                <Text style={styles.delivery} >Delivery Time</Text>

                                                <View style={styles.button2} >
                                                    <RadioButton
                                                        value="first"
                                                        color={Colors.primary}
                                                        status={checked === 'first' ? 'checked' : 'unchecked'}
                                                        onPress={() => setChecked('first')}
                                                    />
                                                    <Text>07:00 AM to 9:30 AM</Text>
                                                </View>

                                                <View style={styles.button2} >
                                                    <RadioButton
                                                        value="second"
                                                        color={Colors.primary}
                                                        status={checked === 'second' ? 'checked' : 'unchecked'}
                                                        onPress={() => setChecked('second')}
                                                    />
                                                    <Text>9:30 AM to 11:00 AM</Text>
                                                </View>


                                                <View style={styles.button2} >
                                                    <RadioButton
                                                        value="third"
                                                        color={Colors.primary}
                                                        status={checked === 'third' ? 'checked' : 'unchecked'}
                                                        onPress={() => setChecked('third')}
                                                    />
                                                    <Text>5:00 PM to 7:30 PM</Text>
                                                </View>

                                                <View style={styles.button2} >
                                                    <RadioButton
                                                        value="fourth"
                                                        color={Colors.primary}
                                                        status={checked === 'fourth' ? 'checked' : 'unchecked'}
                                                        onPress={() => setChecked('fourth')}
                                                    />
                                                    <Text>07:30 PM to 10:00 PM</Text>
                                                </View>
                                            </RBSheet>
                                        </View>

                                        <View style={styles.button} >
                                            <RadioButton
                                                value="second"
                                                color={Colors.primary}
                                                status={checked === 'second' ? 'checked' : 'unchecked'}
                                                onPress={() => {
                                                    setChecked('second')
                                                    setSort('ASC')
  
                                            }}
                                            />
                                            <Text>Price- Low to High</Text>
                                        </View>

                                        <View style={styles.button} >
                                            <RadioButton
                                                value="third"
                                                color={Colors.primary}
                                                status={checked === 'third' ? 'checked' : 'unchecked'}
                                                onPress={() => {
                                                    setChecked('third')
                                                    setSort('DESC')
                                                }}
                                            />
                                            <Text>Price - High to Low</Text>
                                        </View>
                                    </View>
                                </View>

                                <View >
                                    <TouchableOpacity style={styles.signin} onPress={() => { props.navigation.navigate('Home') }}  >
                                        <Text style={styles.apply} >APPLY</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                    </View>
                </RBSheet>
            </View>

        </>
    )
}

export default VegetableScreen

const styles = StyleSheet.create({
    main: {
        flex: 1,
        // backgroundColor:Colors.white
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
        fontSize: 30,
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
        flex: 3
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    search: {
        padding: 20
    },
    line1: {
        height: 0,
        borderColor: Colors.grey,
        borderWidth: 0.5,
        width: '95%',
        marginVertical: 10,
        marginTop: 20,
        flexDirection: 'row',
        marginLeft: 10
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
    lineContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    filterContainer: {
        marginTop: 20,
        padding: 15
    },
    line: {
        borderBottomWidth: 1,
        padding: 15
    },
    lineContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    lineText: {
        fontWeight: '600',
        fontSize: 20,
        color: Colors.grey
    },
    common: {
        fontSize: 20,
        fontWeight: '900',
        padding: 10
    },
    commonContainer: {
        padding: 10
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.grey
    },
    text2: {
        color: Colors.grey,
        fontWeight: '300',
        fontSize: 12
    },
    price1: {
        fontSize: 20,
        marginHorizontal: 30,
        fontWeight: 'bold'
    },
    orders: {
        position: 'absolute',
        bottom: 170,
        left: width * 0.5 - 15,
        zIndex: 10
    },
    orderContainer: {
        flex: 1,
        width: width * 0.50,
        height: 200,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 15,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15
    },
    addButton: {
        flexDirection: 'row',
        backgroundColor: Colors.primary,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15
    },
    button: {
        color: Colors.white,
        fontSize: 20,
        fontWeight: '700',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    image2: {
        width: width * 0.25,
        height: width * 0.25
    },
    view: {
        color: Colors.primary,
        fontSize: 16
    },
    slider: {
        color: Colors.primary
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
    select: {
        fontSize: 20,
        color: Colors.grey,
        paddingLeft: 5
    },
    delivery: {
        fontSize: 20,
        padding: 10
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
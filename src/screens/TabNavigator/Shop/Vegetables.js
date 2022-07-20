import { StyleSheet, Text, View, StatusBar, TouchableOpacity, ScrollView, FlatList, Dimensions } from 'react-native'
import React, { useRef, useState, useEffect, useCallback } from 'react'
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
import RBSheet from "react-native-raw-bottom-sheet";
import { RadioButton } from 'react-native-paper';

const { width } = Dimensions.get('window')

const VegetableScreen = (props) => {

    const [enableScroll, setEnable] = useState(true);
    const [disableScroll, setDisable] = useState(false);
    const [range, setRange] = useState(0);
    const [value, setValue] = useState([0, 15])
    const [state, setState] = useState('filter')
    const refRBSheet = useRef();
    const [checked, setChecked] = useState('first')
    const [isLoading, setIsLoading] = useState(true)
    const [sort, setSort] = useState('ASC')

    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(20);


    const cartItems = useSelector(state => {
        const updatedCartItems = [];
        for (const key in state.Cart.items) {
            updatedCartItems.push({
                ...state.Cart.items[key]
            });
        }
        return updatedCartItems.sort((a, b) => a.id > b.id ? 1 : -1);
    })
    //  console.log("\n\n\nCart Items         ", cartItems);

    const subTotal = (cartItems.length ? cartItems.reduce((a, c) => a + c.itemTotal, 0) : 0)
    const abc = cartItems?.length
    //  console.log("\n\nsub total                 ",subTotal);

    const veggieId = props.route.params.vegiId
    // console.log(veggieId);

    const veggiAll = props.route.params.vegi
    // console.log("\n\n\n\nAll Products    ", veggiAll.items[0].id);

    const title = props.route.params.title
    // console.log("Title    ", title );

    const [sorting, setSorting] = useState([]);

    const onPressSort = async () => {
        refRBSheet.current.close()
        const response = await getRequest(`/customer/sort?price=${sort}`)
        //  console.log("\n\n\nSorting              ", response.data);

        if (response.success) {
            setSorting(response.data.data)
            //  console.log("\n\nAfter API Call          ",response.data.data);
        }
    }
    const [filterResult, setResult] = useState([]);

    const onPressFilter = async (values) => {
        const data = {
            title,
            start_price: start,
            end_price: end
        }
        console.log("\n\nDATA          ", data);
        const Filter = await postRequest('/customer/filter', data)
        //   console.log("\n\n\nFilter                  ",Filter.data.data[0].sub_categories);

        const x = Filter.data.data[0].sub_categories.find(item => item.title === veggiAll.title)
        //   console.log("\n\n\n CART ITEMS  from Vegetables Screen                   ",x );

        if (Filter.success) {
            setResult(x.items)
        }
        refRBSheet.current.close()
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
                            <View style={styles.qtyCart} >
                                <Text style={{ fontSize: 12, fontWeight: 'bold', color: Colors.white }}>{abc}</Text>
                            </View>
                            <Ionicons name={Icons.CART} size={28} color={Colors.white} style={styles.back} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.heading} >
                        <Text style={styles.titleFruit} >{veggiAll.title}</Text>

                        <TouchableOpacity onPress={() => {
                            setStart(0)
                            setEnd(20)
                            refRBSheet.current.open()
                        }} >
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
                                data={filterResult.length > 0 ? filterResult : sorting.length > 0 ? sorting : veggiAll.items}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => {
                                    //  console.log("\n\n\n\nFinal Products "        , item);
                                    return (
                                        <View  >
                                            {isLoading ? <ShimmerPlaceholder LinearGradient={LinearGradient} height={150} width={width} contentStyle={styles.content} /> :
                                                <VeggiComp
                                                    item={item}
                                                    id={item.id}
                                                    image={item?.item_images[0]?.image}
                                                    name={item.name}
                                                    weight={item.item_sizes?.size}
                                                    price={item.item_sizes[0].price}
                                                    disPrice={item.item_sizes?.price}
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
                    height={400}
                    closeOnDragDown={true}
                    closeOnPressMask={true}
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
                            backgroundColor: "#F5F5F5"
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
                                    <View style={{ alignItems: 'center', justifyContent: 'center', padding: 5 }} >
                                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: Colors.grey }} >${start} - ${end}</Text>
                                    </View>
                                    <View style={styles.rangeSlider} >
                                        <RangeSlider
                                            range={[0, 20]}
                                            minimumValue={0}
                                            maximumValue={20}
                                            step={1}
                                            outboundColor='#DCDCDC'
                                            inboundColor='#0603C6'
                                            thumbTintColor={Colors.white}
                                            thumbStyle={styles.thumb}
                                            style={styles.ranger}
                                            trackHeight={6}
                                            thumbSize={20}
                                            onValueChange={(value) => {
                                                setStart(value[0])
                                                setEnd(value[value.length - 1])
                                            }}
                                        />
                                    </View>
                                    <View style={styles.priceTag} >
                                        <Text style={styles.txt1} > $0 </Text>
                                        <Text style={styles.txt2} > $20 </Text>
                                    </View>
                                </View>
                                <View style={styles.applyButton} >
                                    <TouchableOpacity style={styles.signin0} onPress={onPressFilter} >
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
                                                value="second"
                                                color={Colors.primary}
                                                status={checked === 'second' ? 'checked' : 'unchecked'}
                                                onPress={() => {
                                                    setChecked('second')
                                                    setSort('ASC')
                                                    // refRBSheet.current.close()
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
                                                    // refRBSheet.current.close()
                                                }}
                                            />
                                            <Text>Price - High to Low</Text>
                                        </View>
                                    </View>
                                </View>

                                <View >
                                    <TouchableOpacity style={styles.signin} onPress={onPressSort}  >
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
        flex: 0.71,
        backgroundColor: Colors.primary,
        justifyContent: 'space-between',
        // paddingVertical: 10
    },
    back: {
        marginTop: 10,
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
        padding: 10,
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
        padding: 5,
        marginTop: 10,
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
        marginTop: 120
    },
    signin0: {
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
    // applyButton: {
    //     marginTop: 10
    // },
    rangeSlider: {
        marginTop: 20
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
    },
    qtyCart: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.yellow,
        borderRadius: 10,
        height: 22,
        width: 18,
        marginTop: 18,
        marginLeft: 22,
        position: 'absolute',
        zIndex: 10
    }
})
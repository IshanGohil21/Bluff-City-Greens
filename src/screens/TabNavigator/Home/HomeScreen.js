import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, TextInput, Image, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';

import { Colors, Icons, Images } from '../../../CommonConfig/CommonConfig';
import SearchBarScreen from '../../../Components/Slider/SearchBar2';
import CategoriesScreen from '../../../Components/Categories';
import { getRequest } from '../../../Helper/ApiHelper';
import Toast from 'react-native-simple-toast';
import RecommendedProductsCommon from '../../../Components/RecommendedProducts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import PastProductsCommon from '../../../Components/PastOrdesCommon';

const { width } = Dimensions.get('window')

const HomeScreen = (props) => {

  const [isLoading, setIsLoading] = useState(true)
  const [banner, setBanner] = useState([]);
  const [categories, setCatogeries] = useState([]);
  const [recommendedOrders, setRecommendedOrders] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);

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

  // console.log("After selector",cartItems);
  const y = cartItems?.length;

  const dispatch = useDispatch();

  const z = cartItems.find(item => item.id === props.id)
  // console.log(z)

  const [activeAddress, setActiveAddress] = useState({})
  // console.log("\n\nActive null        ", activeAddress)

  useEffect(() => {
    const refresh = props.navigation.addListener('focus',async() => {
      getHome();
      setActiveAddress(JSON.parse(await AsyncStorage.getItem('activeAddress')))
    })
    return refresh
  }, [props.navigation])
  
  const getHome = async () => {
    const response = await getRequest('/customer/get-homepage')
    // console.log("All Home",response);

    if(response.success){
      setBanner(response.data.banners)
      setCatogeries(response.data.categories)
      setPastOrders(response.data.past_orders)
      setRecommendedOrders(response.data.recommended_products)
      setIsLoading(false)
    } else {
      Toast.show('Nothing to Show')
    }
  }

  const tag = (address_type) => {
    if (address_type === 0) return "Home"
    if (address_type === 1) return "Work"
    if (address_type === 2) return "Other"
  }

  return (
    <ScrollView>
      <View style={styles.main} >
        <StatusBar backgroundColor={Colors.primary} />
        { /* Header */}
        <View style={styles.title}>
          <View style={styles.header} >
            <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}  >
              <Ionicons name='menu-outline' color={Colors.white} size={30} style={styles.drawer} />
            </TouchableOpacity>

            {/* Delivery Logo */}

            <TouchableOpacity onPress={() => { props.navigation.navigate('DeliveryLocation') }}  >
              <Text style={styles.deliver} > Deliver to </Text>
              {activeAddress === null ?
                <View style={styles.location} >
                  <Text style={styles.address} >Please Select Address</Text>
                  <Ionicons name={Icons.DOWN_ARROW} size={24} color={Colors.white} />
                </View>
                :
                <TouchableOpacity style={styles.location} onPress={() => { props.navigation.navigate('Checkout', { screen: 'DeliveryCheckout' }) }}>
                  <Text style={styles.address} >{activeAddress.primary_address}</Text>
                  <Ionicons name={Icons.DOWN_ARROW} size={24} color={Colors.white} />
                </TouchableOpacity>
              }
            </TouchableOpacity>

            {/* Cart */}
            <TouchableOpacity onPress={() => { props.navigation.navigate('Checkout') }} style={{ marginRight: 20 }}  >
              <View style={styles.qtyCart} >
                <Text style={styles.quanty}>{y}</Text>
              </View>
              {/* <Text style={styles.xyz} >{z}</Text> */}
              <Ionicons name={Icons.CART} size={24} color={Colors.white} style={styles.notify0} />
            </TouchableOpacity>
          </View>

          {/* Serach bar */}
          <View style={styles.filter} >
            <TouchableOpacity onPress={() => { props.navigation.navigate('Search') }} >
              <SearchBarScreen />
            </TouchableOpacity>

            {/* Filers Screen */}
            
          </View>
        </View>

        { /* Body */}

        <ScrollView>
          <View style={styles.body} >

            {/* Banners */}
            {isLoading ? <ShimmerPlaceholder LinearGradient={LinearGradient} height={150} width={width} /> :
              <View>
                <ScrollView
                  pagingEnabled
                  horizontal
                  onScroll={change}
                  showsHorizontalScrollIndicator={false}
                >
                  {
                    banner.map((item, index) => {
                      // console.log("\n\nITEM:      ",item);
                      return (
                        <View key={index}>
                          <Image source={{ uri: item.image }} style={styles.imaging} />
                        </View>
                      )
                    })
                  }
                </ScrollView>
                <View style={styles.scroll} >
                  {
                    banner.map((i, k) => (
                      <Text key={k} style={k == active ? styles.pagingActive : styles.paging} > ⬤ </Text>
                    ))
                  }
                </View>
              </View>
            }

            {/* Categories */}

            <View style={styles.commonContainer} >
              <Text style={styles.common} >Categories</Text>
              {/* Loading Effect */}
              {isLoading ? <ShimmerPlaceholder LinearGradient={LinearGradient} height={100} width={width} /> :
                <FlatList
                  data={categories}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={(itemData) => {
                    // console.log(" \n\n\n\Categories ITEMS        ",itemData.item);
                    return (
                      <View key={itemData.item.id}>
                        <CategoriesScreen
                          image={itemData.item.image}
                          id={itemData.item.id}
                          name={itemData.item.title}
                          onClick={() => { props.navigation.navigate('Shop', { screen: 'Fruits', params: { shop: itemData.item, shopId: itemData.item.id } }) }}
                        />
                      </View>
                    )
                  }}
                />
              }
            </View>

            {/* Past Orders */}

            {pastOrders.length === 0 ? null :
              <View style={styles.commonContainer} >
                <View style={styles.past} >
                  <Text style={styles.common} >Past Orders</Text>
                  <Text style={styles.view} >View All</Text>
                </View>

                {isLoading ? <ShimmerPlaceholder LinearGradient={LinearGradient} height={100} width={width} /> :
                  <View style={styles.heading}>

                    <FlatList
                      data={pastOrders}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      renderItem={(item, index) => {
                          //  console.log("\n\n\n\n\nOnly for FlatList    ",item.item.order_items);
                        return (
                          <View key={index} style={styles.ailing} >
                            {
                              item.item.order_items.map((indi) => {
                                //  console.log("\n\nNest FlatList:   ",indi.item_size);
                                return (
                                  <View>
                                    <PastProductsCommon
                                      name={indi.item.name}
                                      id={indi.id}
                                      item={indi}
                                      price={indi.item_size?.price}
                                      weight={indi.item_size?.size}
                                      image={indi.item.item_images[0].image}
                                      onClick={() => { props.navigation.navigate('Past_Orders', { past: indi, pastId: indi.id }) }}
                                      onHeart={() => { }}
                                    />
                                  </View>
                                )
                              }
                              )
                            }
                          </View>
                        )
                      }}
                    />
                  </View>
                }
              </View>
            }

            {/* Recommended Products render by API */}
            <View style={styles.commonContainer} >
              <View style={styles.reco} >
                <Text style={styles.common} >Recommended Products</Text>
                <Text style={styles.view} >View All</Text>
              </View>
              {isLoading ? <ShimmerPlaceholder LinearGradient={LinearGradient} height={100} width={width} /> :
                <View style={styles.heading} >
                  <FlatList
                    data={recommendedOrders}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={(itemData) => {
                      //  console.log("\n\n\nRecommended Orders   ",itemData.item);
                      return (
                        <View key={itemData.item.id} >
                          <RecommendedProductsCommon
                            item={itemData.item}
                            name={itemData.item.name}
                            image={itemData.item.item_images[0]?.image}
                            weight={itemData.item.item_sizes[0]?.size}
                            price={itemData.item.item_sizes[0]?.price}
                            onClick={() => { props.navigation.navigate('Recommended_Products', { recommended: itemData.item, recommendId: itemData.item.id }) }}
                            onHeart={() => { }}
                          />
                        </View>
                      )
                    }}
                  />
                </View>
              }
            </View>
          </View>
        </ScrollView>

        {/* } */}

      </View>
    </ScrollView>

  )
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  header: {
    justifyContent: 'space-between',
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    marginTop:10,
  },
  title: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: Colors.primary,

  },
  drawer: {
    padding: 20
  },
  deliver: {
    color: Colors.white,
    marginTop: 25,
  },
  address: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.white
  },
  location: {
    flexDirection: 'row'
  },
  notify: {
    marginTop: 40,
    marginRight: 10
  },
  notify0: {
    marginTop: 40,
    marginRight: 10
  },
  searchContainer:
  {
    width: '80%',
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: 5,
    marginBottom: 10
  },
  vwSearch: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textInput: {
    flex: 1,
  },
  filter: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
    padding: 5
  },
  body: {
    flex: 3
  },
  imageContainer: {
    width: '100%',
    height: 300
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
  discount: {
    width: '100%',
    height: 160,
  },
  common: {
    fontSize: 20,
    fontWeight: '900',
  },
  commonContainer: {
    padding: 10,
  },
  categories: {
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 10,
    elevation: 1.5,
    backgroundColor: Colors.white
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
    fontWeight: '700'
  },
  image2: {
    width: width * 0.25,
    height: width * 0.25
  },
  heading: {
    flexDirection: 'row',
    padding: 10,
  },
  view: {
    color: Colors.primary,
    fontSize: 16
  },
  catoContainer: {
    height: 50,
    width: 50,
  },
  past: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cart: {
    position: 'absolute',
    overflow: 'hidden',
    backgroundColor: Colors.red,
    height: 20,
    width: 20,
    borderRadius: 50,
    marginTop: 30,
    marginLeft: 10,
    color: Colors.white
  },
  xyz: {
    color: Colors.white,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    marginTop: 30,
    marginLeft: 12,
    backgroundColor: Colors.yellow,
    borderRadius: 10,
    width: 20,
    height: 20,

  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  qtyCart: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.yellow,
    borderRadius: 10,
    height: 22,
    width: 18,
    marginTop: 30,
    marginLeft: 15,
    position: 'absolute',
    zIndex: 10
  },
  quanty:{
    fontSize: 12, 
    fontWeight: 'bold', 
    color: Colors.white 
  },
  ailing:{
    flex: 1, 
    flexDirection: 'row' 
  },
  reco:{
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },
  imaging:{
    height: 150, 
    width: width 
  }
});

export default HomeScreen;
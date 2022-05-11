import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, TextInput, Image, Dimensions, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';

import { Colors, Icons, Images } from '../../../CommonConfig/CommonConfig';
import Address from '../../../dummy-data/Address';
import CouponImages from '../../../dummy-data/Imagess';
import Categories from '../../../dummy-data/Categories';
import PastOrder from '../../../dummy-data/PastOrders';
import Orders from '../../../Components/Orders';
import SearchBarScreen from '../../../Components/Slider/SearchBar2';
import CategoriesScreen from '../../../Components/Categories';
import { getMainRequest } from '../../../Helper/ApiHelper';
import Toast from 'react-native-simple-toast';

const { width } = Dimensions.get('window')

const HomeScreen = (props) => {

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
  const y = cartItems?.length;

  const dispatch = useDispatch();

  const activeId = useSelector(state => state.Address.activeAddress)

  const x = Address.find(item => item.id === activeId)

  const [pastOrders, setPastOrders] = useState([]);
  const [recommendedOrders, setRecommendedOrders] = useState([]);
  
  
  const [isLoading, setIsLoading] = useState([]);

  useEffect(() => {
    // getPastOrders();
     getRecommendedOrders();
      getBanners();
     getCategories();
    setIsLoading(false)
  }, [])

  // useEffect( () => {
  //   console.log(recommendedOrders);
  // }, [recommendedOrders])




    // Banners API
  const [banners, setBanners] = useState([]);
  const getBanners = async() => {
    const response = await getMainRequest('/customer/get-banner')
     //console.log("Banners   ", response.data );

     if(response.success){
       setBanners(response.data.banner);
     } else {
       Toast.show('No Banners to Show Currently!')
     }
  }

  // Recommended APIs
  const getRecommendedOrders = async() => {
    const response = await getMainRequest('/customer/get-rec')
    //  console.log('get Recommended   ', response)

    if(response.success){
      setRecommendedOrders(response.data)
      //  console.log('Recommended' , response.data);
    }
    else {
      Toast.show('No Recommended Orders Available Currently');
    }
  }

  // Categories API
  const [categories, setCatogeries] = useState([]);

  const getCategories = async () => {
    const response = await getMainRequest('/customer/get-homepage')
    // console.log("Categories   ", response);

    if (response.success) {
      setCatogeries(response.data.recommended)
        // console.log('Categories      ', response.data);
    }
    else {
      Toast.show('No Categories Available Currently');
    }
  }
  
  const  renderImage = itemData => {
    return (
      <View>
        <Image style={{uri: itemData.item.image}} style={{height: 50, width:50}} />
      </View>
    )
  }


return (
  <ScrollView>
    <StatusBar backgroundColor={Colors.primary} />
    {/* <StatusBar backgroundColor={Colors.primary} /> */}
    <View>

      <View style={styles.main} >
        { /* Header */}
        <View style={styles.title}>
          <View style={styles.header} >
            <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}  >
              <Ionicons name='menu-outline' color={Colors.white} size={30} style={styles.drawer} />
            </TouchableOpacity>

            {/* Delivery Logo */}

            <TouchableOpacity onPress={() => { props.navigation.navigate('DeliveryLocation') }} >
              <Text style={styles.deliver} > Deliver to </Text>
              {x ?
                <View style={styles.location} >
                  <Text style={styles.address} >{x.address}</Text>
                  <Ionicons name={Icons.DOWN_ARROW} size={24} color={Colors.white} />
                </View>
                :
                <TouchableOpacity style={styles.location} onPress={() => { props.navigation.navigate('Checkout', { screen: 'DeliveryCheckout' }) }}>
                  <Text style={styles.address} >Please Select Address</Text>
                  <Ionicons name={Icons.DOWN_ARROW} size={24} color={Colors.white} />
                </TouchableOpacity>
              }
            </TouchableOpacity>

            {/* Notification Logo */}
            <TouchableOpacity onPress={() => { props.navigation.navigate('Notification') }} >
              <Ionicons name={Icons.NOTIFICATION} size={24} color={Colors.white} style={styles.notify} />
            </TouchableOpacity>

            {/* Cart */}
            <TouchableOpacity onPress={() => { props.navigation.navigate('Checkout') }} >
              <Text style={styles.xyz} >{y}</Text>
              <Ionicons name={Icons.CART} size={24} color={Colors.white} style={styles.notify} />
            </TouchableOpacity>
          </View>

          {/* Serach bar */}
          <View style={styles.filter} >
            <TouchableOpacity onPress={() => { props.navigation.navigate('Search') }} >
              <SearchBarScreen />
            </TouchableOpacity>

            {/* Filers Screen */}
            <TouchableOpacity onPress={() => { props.navigation.navigate('Filter') }}>
              <Ionicons name={Icons.OPTIONS} size={30} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      { /* Body */}
      <View >

        {/* Banners */}
        <View>
          <ScrollView
            pagingEnabled
            horizontal
            onScroll={change}
            showsHorizontalScrollIndicator={false}
          >
            
            {
              banners.map( (item,index) => {
                // console.log("\n\nITEM:      ",item);
                return( 
                  <View key={index}> 
                    <Image source={{uri: item.image}}  style={{height:150, width:width}}/>
                  </View>
                )
              })
            }
          </ScrollView>
          <View style={styles.scroll} >
            {
              banners.map((i, k) => (
                <Text key={k} style={k == active ? styles.pagingActive : styles.paging} > ⬤ </Text>
              ))
            }
          </View>
        </View>
        {/* Discount Coupon Image */}
        <View>
          <Image source={Images.discount} style={styles.discount} />
        </View>
        {/* Categories */}
        <View style={styles.commonContainer} >
          <Text style={styles.common} >Categories</Text>
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={( item ) => {
                // console.log("Heloooooooo        ",itemData.item);
              return (
                <View key={item.id}>
                  <CategoriesScreen
                    image={item.item_images[0].image}
                    id={item.id}
                    name={item.name}
                   // color={item.color}
                    onClick={() => { props.navigation.navigate( 'Shop' , {screen:'Fruits' }) }}
                  />
                </View>
              )
            }}
          />
        </View>
        {/* Past Orders */}
        <View style={styles.commonContainer} >
          <View style={styles.past} >
            <Text style={styles.common} >Past Orders</Text>
            <Text style={styles.view} >View All</Text>
          </View>
          <View style={styles.heading}>
            <FlatList
              data={PastOrder}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                  <View key={item.id}>
                    <Orders
                      item={item}
                      id={item.id}
                      image={item.fruitimages[0]}
                      name={item.name}
                      weight={item.weight[0]}
                      price={item.discountedPrice}
                      onClick={() => { props.navigation.navigate('Past_Orders', { id: item.id }) }}
                      onHeart={() => { }}
                    />
                  </View>
                )
              }}
            />
          </View>
        </View>

        {/* Recommended Products */}
        <View style={styles.commonContainer} >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
            <Text style={styles.common} >Recommended Products</Text>
            <Text style={styles.view} >View All</Text>
          </View>
          {/* <View style={styles.heading} >
            <FlatList
              data={recommendedOrders}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={(itemData) => {
                // console.log(itemData.item);
                return (
                  <View key={itemData.item.id}>
                    <Orders
                      
                      // image= {itemData.item.item_images.image}
                      item={itemData.item}
                      id={itemData.item.id}
                      name={itemData.item.name}
                      weight={itemData.item.item_sizes[0].size}
                      price={itemData.item.item_sizes[0].price}
                      onClick={() => { props.navigation.navigate('Recommended_Products', { recommended: itemData.item, recommendId: itemData.item.id }) }}
                      onHeart={() => { }}
                    />
                    
                  </View>
                )
              }}
            />
            
          </View> */}

            <ScrollView>
              <View>
                {
                  recommendedOrders.map((item) => {
                    // console.log(item);  
                    return (
                      <View key={item.id} >

                        <Text>{item.name}</Text>
                        <Image source={{uri: item.item_images[0].image }} style={{height:50, width:50}} />

                      </View>
                    )
                  })
                }
              </View>
            </ScrollView>
          </View>
        
      </View>
    </View>

  </ScrollView>
)
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    // flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    marginTop: 20
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
    marginLeft: 10
  },
  searchContainer:
  {
    width: '80%',
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    //marginTop: 10,
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
    // backgroundColor: 'green',
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
    padding: 10
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
    backgroundColor: Colors.white
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
    // right: Dimensions.get('window').width * 500,
    // top: Dimensions.get('window').width * 350,
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
    marginLeft: 25,
    backgroundColor: Colors.yellow,
    borderRadius: 20,
    width: 15,
    height: 20,
  }
});

export default HomeScreen;
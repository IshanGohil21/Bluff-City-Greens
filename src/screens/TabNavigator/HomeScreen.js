import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, TextInput, Image, Dimensions, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Colors, Icons, Images } from '../../CommonConfig/CommonConfig';
import Address from '../../dummy-data/Address';
import CouponImages from '../../dummy-data/Imagess';
import Categories from '../../dummy-data/Categories';
import PastOrder from '../../dummy-data/PastOrders';
import RecommendedProducts from '../../dummy-data/RecommendedProducts';
import Orders from '../../Components/Orders';
import SearchBarScreen from '../../Components/Slider/SearchBar2';
import CategoriesScreen from '../../Components/Categories';

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
              <TouchableOpacity onPress={() => { props.navigation.navigate('DeliveryLocation') }} >
                <Text style={styles.deliver} > Deliver to </Text>
                <View style={styles.location} >
                  <Text style={styles.address} > {Address[0].landmark}</Text>
                  <Ionicons name={Icons.DOWN_ARROW} size={24} color={Colors.white} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { props.navigation.navigate('Notification') }} >
                <Ionicons name={Icons.NOTIFICATION} size={24} color={Colors.white} style={styles.notify} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {props.navigation.navigate('Checkout')}} >
                <Ionicons name={Icons.CART} size={24} color={Colors.white} style={styles.notify} />
              </TouchableOpacity>
            </View>
            <View style={styles.filter} >
              <TouchableOpacity onPress={() => { props.navigation.navigate('Search') }} >
                <SearchBarScreen />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { props.navigation.navigate('Filter') }}>
                <Ionicons name={Icons.OPTIONS} size={30} color={Colors.white} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        { /* Body */}
        <View >

          <View>
            <ScrollView
              pagingEnabled
              horizontal
              onScroll={change}
              showsHorizontalScrollIndicator={false}
            >
              {
                CouponImages.map((image, index) => (
                  <Image
                    key={index}
                    source={{ uri: image }}
                    style={{ height: 150, width: width, resizeMode: 'cover' }}
                  />
                ))
              }
            </ScrollView>
            <View style={styles.scroll} >
              {
                CouponImages.map((i, k) => (
                  <Text key={k} style={k == active ? styles.pagingActive : styles.paging} > ⬤ </Text>
                ))
              }
            </View>
          </View>
          <View>
            <Image source={Images.discount} style={styles.discount} />
          </View>
          {/* Categories */}
          <View style={styles.commonContainer} >
            <Text style={styles.common} >Categories</Text>
            <FlatList
              data={Categories}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                  <View key={item.id} >
                    <CategoriesScreen
                      image={item.image}
                      name={item.name}
                      color={item.color}
                    // onClick={() => {}}
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
            <View style={styles.heading} >
              <FlatList
                data={RecommendedProducts}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                  return (
                    <View key={item.id}>
                      <Orders
                        image={item.fruitimages[0]}
                        name={item.name}
                        weight={item.weight[0]}
                        price={item.discountedPrice}
                        onClick={() => { props.navigation.navigate('Recommended_Products', { id: item.id }) }}
                        onHeart={() => { }}
                      />
                    </View>
                  )
                }}
              />

            </View>
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
  }
});

export default HomeScreen;
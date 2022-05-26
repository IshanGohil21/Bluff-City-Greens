import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Dimensions, FlatList, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Colors, Icons, Images } from '../../../CommonConfig/CommonConfig';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MostPopularProductScreen from '../../../dummy-data/MostPopular';
import Popular from '../../../components/Popular';
import SearchBarScreen3 from '../../../components/SearchBar3';
import { getRequest } from '../../../Helper/ApiHelper';
import SearchDetails from '../../../components/SearchDetails';

const SearchScreen = (props) => {
  const [state, setState] = useState('');
  const [loading, setLoading] = useState(true)
  const [length, setLength] = useState(0)

  // useEffect(() => {
  //       console.log(`\n\nState${state}        \n`,search);
  //   },[search])


  // useEffect( () => {
  //  if(search.length !==0 ){
  //   getSearch()
  //  }
  // },[search])

  const [search, setSearch] = useState('');
  const [result, setResult] = useState([]);

  const getSearch = async () => {
    const response = await getRequest(`/customer/search?term=${state}`)
    // console.log(`\n\n\nSearch Products  `, response.data);
    if (response.success) {
      setResult(response.data)
      setLoading(false)
    } else {
      console.log(response);
      // }
    }
  }
  // useEffect( () => {
  //   console.log("Dishes:\n", result)

  // },[result])

  return (
    <View style={styles.main} >
      <StatusBar backgroundColor={Colors.primary} />
      {/* Header */}

      <View style={styles.header} >
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Ionicons name={Icons.BACK_ARROW} size={24} color={Colors.white} style={styles.back} />
        </TouchableOpacity>
        <Text style={styles.cartext} >Search</Text>
      </View>

      {/* Body */}
      <View style={styles.body} >
        <KeyboardAwareScrollView>
          <View style={styles.searchButton} >

            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <TextInput
                value={search}
                placeholder="Search"
                onChangeText={(e) => { setSearch(e) }}
                autoFocus
                style={{
                  fontSize: 20,
                  width: '80%'
                }}
              />

              <View style={{ alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
                {/* <Text style={{fontSize:20, fontWeight:'bold', marginLeft:10}}>{search}</Text> */}
                {search.length === 0 ? null : <TouchableOpacity onPress={() => { setSearch('') }}><Ionicons name="close" size={Dimensions.get('screen').width * 0.08} color={Colors.grey} /></TouchableOpacity>}
                <TouchableOpacity disabled={search.length === 0 ? true : false} onPress={getSearch} ><Ionicons name="search-outline" size={Dimensions.get('screen').width * 0.08} color={Colors.grey} /></TouchableOpacity>
              </View>

            </View>

            <TouchableOpacity style={styles.filter} onPress={() => { props.navigation.navigate('Filter2') }} >
              <Ionicons name={Icons.OPTIONS} size={30} color={Colors.white} backgroundColor={Colors.primary} />
            </TouchableOpacity>
          </View>



          <View>
            <Text>Categories</Text>
            {/* Categories */}
            <FlatList
              data={result.categories}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => {
                // console.log("\n\n\n\nResult of Cato              " ,result.categories);
                return (
                  <View key={item.id} >
                    <Text>{item.title}</Text>
                  </View>
                )
              }}
            />
          </View>

          {/* Sub Categories */}

          <FlatList
            data={result.sub_categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              // console.log("\n\n\n\nResult of sub             " ,result.sub_categories);
              return (
                <View key={item.id} >
                  <Text>{item.title}</Text>
                </View>
              )
            }}
          />

          {/* Products */}

          <View>
            <Text style={styles.heading} >Products</Text>
            <FlatList
              data={result.items}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => {
                console.log(item);
                return (
                  <View key={item.id} >

                    <SearchDetails
                      name={item.name}
                      image={item.item_images[0].image}
                      price={item.item_sizes[0].price}
                      weight={item.item_sizes[0].size}
                    />
                  </View>
                )
              }}
            />
          </View>

          {/* Most Popular */}

          <View style={styles.popular} >
            <Text style={styles.most} >Most Popular</Text>
          </View>
          <View>
            <FlatList
              data={MostPopularProductScreen}

              renderItem={({ item }) => {
                // console.log("\n\n\nSearch  ", item);
                // console.log(result.items);
                return (
                  <View key={item.id}>

                    <Popular
                      image={item.image}
                      name={item.name}
                      weight={item.weight}
                      price={item.price}
                      onHeart={() => { }}
                    />
                  </View>
                )
              }}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  header: {
    flex: 0.7,
    backgroundColor: Colors.primary,
    justifyContent: 'space-between',
    //padding:10,
    // marginTop: 20,
    paddingVertical: 10
  },
  body: {
    flex: 3,
  },

  cartext: {
    fontSize: 24,
    color: Colors.white,
    fontWeight: 'bold',
    paddingHorizontal: 10
  },
  back: {
    padding: 10,
    marginTop: 20,
    // marginHorizontal:10
  },
  text: {
    fontSize: 28,
    padding: 10,
    color: Colors.white,
    fontWeight: 'bold'
  },
  searchText: {
    marginTop: 30
  },
  searchButton: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    // marginLeft: 10,
    marginBottom: 5
  },
  filter: {
    borderRadius: 10,
    borderWidth: 4,
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
    marginLeft: 5,
    marginBottom: 5
  },
  popular: {
    padding: 20
  },
  most: {
    fontSize: 24,
    color: Colors.primary
  },
  vwSearch: {
    // flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 20
  },
  searchContainer: {
    width: Dimensions.get('window').width * 0.80,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderRadius: 5,
    marginBottom: 10,
    // flex:1
  },
  heading: {
    fontSize: 20,
    color: Colors.black
  }
});

export default SearchScreen;
import { StyleSheet, Text, View , StatusBar, TouchableOpacity, Dimensions,FlatList, TextInput} from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Colors, Icons, Images} from '../../../CommonConfig/CommonConfig';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MostPopularProductScreen from '../../../dummy-data/MostPopular';
import Popular from '../../../Components/Popular';
import SearchBarScreen3 from '../../../Components/SearchBar3';
import { getRequest } from '../../../Helper/ApiHelper';

const SearchScreen = (props) => {
  const [state, setState] = useState('');
  const [loading, setLoading] = useState(true)
  const [length, setLength] = useState(0)

  // useEffect(() => {
  //       console.log(`\n\nState${state}        \n`,search);
  //   },[search])

  useEffect( () => {
    getSearch();
  },[])

  const [search, setSearch] = useState([]);
  const getSearch = async() => {
    const response = await getRequest(`/customer/search?term=${state}`)
    //console.log(`\n\n\n\n\n\n\nSetting Search ${state}     `, response.data);
    if (response.success) {
      // setLength(response.data.length)
      // console.log(response.data.length);
      setSearch(response.data.search)
      // console.log(response.data)
      setLoading(false)
  } else {
      console.log(response);
      // }
  }
}

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
            {/* <SearchBarScreen3 /> */}
            {/* Search Bar */}
            <View  style={styles.searchContainer}>
        <View style={styles.vwSearch} >
          <Ionicons name='search-outline' size={20} color={Colors.grey} />
        </View>
        <TextInput 
        placeholder="Search"
        style={styles.textInput}
        />
      </View>


            <TouchableOpacity style={styles.filter} onPress={() => {props.navigation.navigate('Filter2')}} >
            <Ionicons name={Icons.OPTIONS} size={30} color={Colors.white} backgroundColor={Colors.primary} />
            </TouchableOpacity>
        </View>

      

        <View style={styles.popular} >
            <Text style={styles.most} >Most Popular</Text>
        </View>
        <View>
        <FlatList 
                data={MostPopularProductScreen}
                renderItem={ ({ item }) => {
                  return(
                    <View key={item.id}>
                    <Popular
                          image={item.image}
                          name={item.name}
                          weight={item.weight}
                          price={item.price}
                          onHeart={() => {}}
                        />
                    </View>
                  )
                } }
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
    header:{
      flex: 0.5,
      backgroundColor: Colors.primary,
      justifyContent:'space-between',
      //padding:10,
     // marginTop: 20,
    paddingVertical:10
  },
    body: {
        flex: 3,
    },
    
    cartext:{
      fontSize:24,
      color:Colors.white,
      fontWeight:'bold',
      paddingHorizontal:10
    },
    back:{
        padding:10,
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
        marginBottom:5
    },
    popular:{
        padding: 20
    },
    most:{
        fontSize: 24,
        color: Colors.primary
    },
    vwSearch:{
      flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    },
    searchContainer: {
      width: Dimensions.get('window').width * 0.80,
      height: 40,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      backgroundColor: Colors.white,
      borderRadius: 5,
      marginBottom: 10
    }
});

export default SearchScreen;
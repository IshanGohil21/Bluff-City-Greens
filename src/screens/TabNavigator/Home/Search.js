import { StyleSheet, Text, View , StatusBar, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Colors, Icons, Images } from '../../../CommonConfig/CommonConfig';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MostPopularProductScreen from '../../../dummy-data/MostPopular';
import Popular from '../../../Components/Popular';
import SearchBarScreen3 from '../../../Components/SearchBar3';

const SearchScreen = (props) => {

  return (
      <KeyboardAwareScrollView>
    <View style={styles.main} >
        <StatusBar backgroundColor={Colors.primary} />
      {/* Header */} 
      <View style={styles.header} >
        <TouchableOpacity onPress={() => {props.navigation.goBack()} } >
            <Ionicons name={Icons.BACK_ARROW} color={Colors.white} size={24} style={styles.back}  />
        </TouchableOpacity>
        <View style={styles.searchText} >
        <Text style={styles.text} >Search</Text>
        </View>
      </View>
      {/* Title */}
      <View>

      </View>
      {/* Body */} 
      <View style={styles.body} >
        <View style={styles.searchButton} >
            <SearchBarScreen3 />
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
      </View>
    </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    header: {
        flex: 0.1,
        backgroundColor: Colors.primary
    },
    body: {
        flex: 3,
    },
    back:{
        padding:20,
        marginTop: 10
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
       marginLeft: 10
    },
    filter: {
        borderRadius: 10,
         borderWidth: 4,
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
        marginLeft: 70
    },
    popular:{
        padding: 20
    },
    most:{
        fontSize: 24,
        color: Colors.primary
    }
});

export default SearchScreen;
import { StyleSheet, Text, View , StatusBar, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Colors, Icons, Images } from '../../CommonConfig/CommonConfig';
import SearchBarScreen from '../../Components/Slider/SearchBar2';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
            <SearchBarScreen />
            <TouchableOpacity style={styles.filter} onPress={() => {props.navigation.navigate('Filter2')}} >
            <Ionicons name={Icons.OPTIONS} size={30} color={Colors.white} backgroundColor={Colors.primary} />
            </TouchableOpacity>
        </View>
        <View style={styles.popular} >
            <Text style={styles.most} >Most Popular</Text>
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
        flex: 0.80,
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
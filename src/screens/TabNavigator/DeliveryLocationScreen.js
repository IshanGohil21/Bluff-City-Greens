import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import Colors from '../CommonConfig/Colors/Colors';
// import Images from '../CommonConfig/Images/Images';
import { Colors, Images, Icons } from '../../CommonConfig/CommonConfig';
import Address from '../../dummy-data/Address';
import Searchbar from '../../components/SearchBar';



const PickCurrentLocationScreen = (props) => {
  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {
          props.navigation.goBack()
        }}
        >
          <Ionicons name={Icons.BACK_ARROW} color={Colors.white} size={28} style={styles.icon} />
        </TouchableOpacity>
      </View>
      {/* Header */}
      <View style={styles.title }>
        {/*Title*/}
        <View>
          <View style={styles.location}>
            <Text style={styles.locationContainer}>Location </Text>
          </View>
          <View>
            <Text style={styles.service}> {Address[0].landmark} </Text>
          </View>
        </View>
      </View>
      {/* Body */}
      <ImageBackground
        resizeMode='cover'
        source={Images.mapKey}
        style={styles.map}
      >
        <View style={styles.searchContainer}>
            <View style={styles.vwSearch}>
                <Ionicons name="search-outline" size={20} color="grey" />
            </View>

            <TextInput
              //  value={query}
                placeholder="Enter manually"
                style={styles.textInput}
            />
        </View>

    </ImageBackground>
    <View>
      <Text style={styles.delivery} >
        Delivery Location
      </Text>
      <Text style={styles.address} >
       {Address[0].landmark} , {Address[0].city} , NY {Address[0].zip}, {Address[0].country}
      </Text>

      <TouchableOpacity onPress={ () => { props.navigation.goBack() }} >
           <Text style={styles.signin}> USE THE LOCATION </Text>
      </TouchableOpacity>

    </View>
    </View>
    )
}

const styles = StyleSheet.create({
  title: {
    color: Colors.white,
    fontSize: 30,
    padding: 10,
    fontWeight: '600',
    //  marginTop: 40,
    fontWeight: 'bold',
  },
  service: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom:10,
    marginLeft: 10
  },
  map: {
    height: 400,
    width:500,
  },
  delivery: {
    textAlign: 'center',
    color: Colors.grey,
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 20
  },
  address: {
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 24,
    padding: 20
  },
  signin: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.green,
    textAlign: 'center',
    color: Colors.white ,
    fontSize: 23,
    padding: 10,
    borderRadius: 10,
    borderColor: Colors.green ,
    overflow: 'hidden',
    width: '70%',
     marginLeft: 50,
    marginTop: 20,
    paddingBottom:10
  },  
  header: {
    flexDirection: 'row', 
    padding:10, 
    backgroundColor: Colors.primary,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    
  },
  title:{
    flexDirection: 'row',  
    backgroundColor: Colors.primary
  },
  location: {
    flexDirection: 'row'
  },
  icon: {
    marginTop: 10
  },
  locationContainer: {
    fontSize: 24,
    fontWeight:'bold',
    color: Colors.white,
    marginLeft: 15
  },
  searchbar: {
      padding: 10,
      marginTop: 30,
  },
  searchContainer:
    {
        width: '90%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    vwSearch: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
         width: 40,
    },
    textInput: {
        // backgroundColor: 'green',
        flex: 1,
    },

});

export default PickCurrentLocationScreen;
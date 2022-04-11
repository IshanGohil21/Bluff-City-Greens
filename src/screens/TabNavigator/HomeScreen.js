import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, TextInput, Image, Dimensions } from 'react-native';
import { ToggleButton } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Icons } from '../../CommonConfig/CommonConfig';
import Address from '../../dummy-data/Address';
import Images from '../../dummy-data/Images';

const HomeScreen = (props) => {
  const {width} = Dimensions.get('window')
  const height = width * 100 / 0.6

  return (
    <ScrollView>
      <StatusBar backgroundColor={Colors.primary} />
      {/* <StatusBar backgroundColor={Colors.primary} /> */}
      <View>
        
          <View style={styles.main} >
          { /* Header */}
          <View style={styles.title}>
            <View style={styles.header} >
            <TouchableOpacity >
              <Ionicons name='menu-outline' color={Colors.white} size={30} style={styles.drawer} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { props.navigation.navigate('DeliveryLocation') }} >
              <Text style={styles.deliver} > Deliver to </Text>
              <View style={styles.location} >
                <Text style={styles.address} > {Address[0].landmark}</Text>
                <Ionicons name={Icons.DOWN_ARROW} size={24} color={Colors.white} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {props.navigation.navigate('Notification')}} >
              <Ionicons name={Icons.NOTIFICATION} size={24} color={Colors.white} style={styles.notify} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name={Icons.CART} size={24} color={Colors.white} style={styles.notify} />
            </TouchableOpacity>
          </View> 
            <View style={styles.filter} >
          <View style={styles.searchContainer}>
            <View style={styles.vwSearch}>
                <Ionicons name="search-outline" size={20} color="grey" />
            </View>

            <TextInput
              //  value={query}
                placeholder="Search"
                style={styles.textInput}
            />
        </View>
        <TouchableOpacity onPress={() => { props.navigation.navigate('Filter')}}>
          <Ionicons name={Icons.OPTIONS} size={30}  color={Colors.white} />
          </TouchableOpacity>
        </View>
          </View>
          </View> 
          { /* Body */}
          <View >
            <ScrollView 
            pagingEnabled 
            horizontal 
            showsHorizontalScrollIndicator={false}
             
            >
              {
                Images.map((image, index) => (
                  <Image  
                    key={index}
                    source={{uri: image}}
                    style= {{height: 200 , width: width}}
                  />
                ))
              }
              </ScrollView>
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
        marginBottom:10
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
    body:{
      flex: 3
    },
    imageContainer: {
      width: '100%',
      height: 300
    }
});

export default HomeScreen;
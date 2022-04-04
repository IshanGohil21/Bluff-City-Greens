import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PickCurrentLocationScreen = (props) => {
  return (
    <View>
      <View style={{ flexDirection: 'row', padding:10, backgroundColor: '#259D57' }}>
        <TouchableOpacity onPress={() => {
          props.navigation.goBack()
        }}
        >
          <Ionicons name='arrow-back-outline' color='white' size={28} style={{ marginTop: 10}} />
        </TouchableOpacity>
      </View>
      {/* Header */}
      <View style={{ flexDirection: 'row',  backgroundColor: '#259D57' }}>
        {/*Title*/}
        <View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.title}>Location </Text>
          </View>
          <View>
            <Text style={styles.service}> Service is location specific </Text>
          </View>
        </View>
      </View>
      {/* Body */}
      <Image
        source={require('../../assets/icon/map.jpeg')}
        style={styles.map}
      />
      <Text style={styles.delivery} >
        Delivery Location
      </Text>
      <Text style={styles.address} >
        Culture Tea Bar, Broadway, new York, NY 10027, United States
      </Text>

      <TouchableOpacity onPress={ () => { props.navigation.goBack() }} >
           <Text style={styles.signin}> USE THE LOCATION </Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 30,
    padding: 10,
    fontWeight: '600',
    //  marginTop: 40,
    fontWeight: 'bold',
  },
  service: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom:10
  },
  map: {
    height: 400,
    width:500
  },
  delivery: {
    textAlign: 'center',
    color: '#99A3A4',
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
    backgroundColor: "green",
    textAlign: 'center',
    color: 'white',
    fontSize: 23,
    padding: 10,
    borderRadius: 10,
    borderColor: 'green',
    overflow: 'hidden',
    width: '70%',
     marginLeft: 50,
    marginTop: 20,
    paddingBottom:10
}, 
});

export default PickCurrentLocationScreen;
import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Images, Icons } from '../../CommonConfig/CommonConfig';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

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
      <View style={styles.title}>
        {/*Title*/}
        <View>
          <View style={styles.location}>
            <Text style={styles.locationContainer}>Location </Text>
          </View>
          <View>
            <Text style={styles.service}> Service is location specific </Text>
          </View>
        </View>
      </View>
      {/* Body */}

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
      />
      <Text style={styles.delivery} >
        Delivery Location
      </Text>
      <Text style={styles.address} >
        Culture Tea Bar, Broadway, new York, NY 10027, United States
      </Text>

      <TouchableOpacity onPress={() => { props.navigation.goBack() }} >
        <Text style={styles.signin}> USE THE LOCATION </Text>
      </TouchableOpacity>

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
    marginBottom: 10,
    marginLeft: 10
  },
  map: {
    height: 400,
    width: 500
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
    backgroundColor: Colors.primary,
    textAlign: 'center',
    color: Colors.white,
    fontSize: 23,
    padding: 10,
    borderRadius: 10,
    borderColor: Colors.primary,
    overflow: 'hidden',
    width: '70%',
    marginLeft: 50,
    marginTop: 20,
    paddingBottom: 10
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: Colors.primary,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',

  },
  title: {
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
    fontWeight: 'bold',
    color: Colors.white,
    marginLeft: 15
  }

});

export default PickCurrentLocationScreen;
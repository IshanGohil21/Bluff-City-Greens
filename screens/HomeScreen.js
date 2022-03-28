import  * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function HomeScreen() {
    return (
    <View style={styles.Home}>
      <Text>Home Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    Home: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }
  });  

export default HomeScreen;
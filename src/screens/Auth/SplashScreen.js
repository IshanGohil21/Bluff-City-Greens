import  * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SplashScreen = (props) => {
    return (
    <View style={styles.Home}>
      <Text>Splash Screen</Text>
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

export default SplashScreen;
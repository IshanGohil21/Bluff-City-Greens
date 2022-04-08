import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import { Colors,Images } from '../CommonConfig/CommonConfig'


const Button =({
    label,
  onPress,
  color,
  backgroundColor,
  style,
  textStyle,
  showActivityIndicator,
  inidicatorColor,
  disabled,
})=>{
    return(
      <TouchableOpacity 
      delayPressIn={0}
      style={{ padding: 20 }} 
      onPress={onPress} 
      >
      <View style={styles.buttoncon}>
          <Text style={[styles.signin, textStyle]}>
              {label}
          </Text>
      </View>
  </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
//   ButtonLabel: {
//     color: Colors.white,
//      textAlign: 'center',
//  },
//  buttoncon: {
//      backgroundColor:Colors.green,
//      borderRadius: 10,
//      height: 50,
//      width: "100%",
//      justifyContent: 'center',
//  },
signin: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.green,
    textAlign: 'center',
    color: Colors.white,
    fontSize: 23,
    padding: 10,
    borderRadius: 10,
    borderColor: Colors.green,
    overflow: 'hidden',
    width: '100%',
},
})
export default Button;
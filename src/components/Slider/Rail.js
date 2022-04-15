import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../../CommonConfig/Colors';

const Rail = () => {
  return (
    <View style={styles.root}/>
  );
};

export default memo(Rail);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    // backgroundColor: '#7f7f7f',
    backgroundColor: Colors.red
  },
});

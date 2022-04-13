import { StyleSheet, Text, View} from 'react-native'
import React, {useState} from 'react'
 import { RadioButton, Title } from 'react-native-paper';
import { Colors } from '../CommonConfig/CommonConfig';

const RadioButtonScreen = props => {
    const [checked, setChecked] = useState('first')
  return (
      <View  style={{flexDirection: 'row', justifyContent: 'center'}}>
          <RadioButton
          value={props.value}
              color={Colors.primary}
              status={props.checked === 'first' ? 'checked' : 'unchecked'}
              onPress={props.onPress}
          />
          <Text style={{alignSelf: 'center', justifyContent: 'center'}} >{props.label}</Text>
      </View>
  )
}

export default RadioButtonScreen;

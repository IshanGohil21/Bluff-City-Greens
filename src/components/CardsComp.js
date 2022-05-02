import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

import { Images, Colors, Icons } from '../CommonConfig/CommonConfig';
 
const CardsComp = (props) => {
  return (
      <View>
    <View style={styles.main} >
      {/* Image */}
      <Image  source={props.image}  style={styles.imageStyle} />
      <Text style={styles.cardnum} >{props.number}</Text>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
    main:{
        flexDirection: 'row',
        alignItems:'center',
        paddingHorizontal: 20,
        padding: 20
    },
    imageStyle:{
        height: 50,
        width: 50
    },
    cardnum:{
        fontSize: 18,
        color: Colors.grey
    }
});

export default CardsComp;
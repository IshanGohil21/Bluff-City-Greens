import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { Images, Colors, Icons } from '../CommonConfig/CommonConfig';
import * as CardAction from '../Redux/Action/CardAction';
 
const CardsComp = (props) => {
  const dispatch = useDispatch()

  const activeCard = useSelector(state => state.Card.activeMethodID)
  
  const logoSelector = (brand) => {
    if(brand === 'Visa'){
      return Images.visa;
    }
    else if(brand === 'American Express'){
      return Images.UsaExpress;
    }
    else if(brand === 'Master Card'){
      return Images.mastercard;
    }
  }

  return (
      <TouchableOpacity style={{...styles.main, borderRadius:props.id === activeCard ? 10: 10, borderColor: props.id === activeCard ? Colors.primary: null, borderWidth: props.id === activeCard ? 1 : 0, elevation: props.id === activeCard ? 0 : 0.01 }} onPress={() => {dispatch(CardAction.activatePayment(props.id))}}>
    {/* <View  > */}
      {/* Image */}
      {/* <Text style={styles.imageStyle} >{props.brand}</Text> */}
      <Image  source={logoSelector(props.brand)}  style={styles.imageStyle} />
      <Text style={styles.cardnum} > **** **** ****{props.number}</Text>
    {/* </View> */}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    main:{
        flexDirection: 'row',
        alignItems:'center',
        paddingHorizontal: 15,
        padding: 10,
        marginLeft: 15,
        elevation:10,
        overflow:'hidden',
        backgroundColor:Colors.white,
        borderRadius:10
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
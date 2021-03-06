import { Dimensions, StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useMemo, useRef } from 'react';
import Svg , {Line} from 'react-native-svg';
import {PanGestureHandler, State} from 'react-native-gesture-handler'; 
import Animated from 'react-native-reanimated';

import { Colors, Icons, Images } from '../../CommonConfig/CommonConfig';

const {View: AView, Value, event, set, block, cond, lessThan, greaterThan, add, eq, createAnimatedComponent} = Animated;

const { width } = Dimensions.get('window');

const WIDTH = width - 110; 

const MAX_WIDTH = WIDTH - 20;

const  ALine = createAnimatedComponent(Line);

const  AText = createAnimatedComponent(TextInput);

const usePanGesture = (initialPos) => {
    const transX = useRef(new Value(initialPos)).current;
    const offsetX = useRef(new Value(initialPos)).current;

    const onGestureHandle = useMemo(() => {
        return event([
            {
                nativeEvent:({translationX: x, state}) => 
                block(
                    [
                        cond(lessThan( add(offsetX, x),0), set(transX,0), [
                            cond(greaterThan(add(offsetX, x),MAX_WIDTH ), 
                            set(transX, MAX_WIDTH),
                            set(transX,add(offsetX,x))
                            ),
                        ]),
                        cond(eq(state, State.END), set(offsetX, add(offsetX,x))),
                    ]
                )
            },
        ])
    },[transX, offsetX]);

    return {transX, onGestureHandle}
};

const PanComponent = (initialPos) => {
    const {transX, onGestureHandle} = usePanGesture(initialPos);

    const Pan = () => (
        <PanGestureHandler onGestureEvent={onGestureHandle} onHandlerStateChange={onGestureHandle} > 
            <AView  style={[ styles.knob, {transform: [{translateX: transX}]} ]}  />  
        </PanGestureHandler> 
    )

    return{Pan, transX};
}

const InputRangeScreen = (minValue, maxValue, onChangeMin, onChangeMax) => {
    const min = useRef(null);
    const max = useRef(null);
    
    
    const {Pan:Pan1, transX:x1} = PanComponent(0);
    const {Pan:Pan2, transX:x2} = PanComponent(MAX_WIDTH);

  return (
    <View style={styles.container} >
      <View style={styles.trilho} />
        {/* <View style={styles.txtContainer} >
            <AText 
                defaultValue="0" 
                editable={false} 
                ref={min} 
                style={styles.label}
            />
            
            <Text style={styles.label} >{ ' - ' }</Text>

            <AText 
                defaultValue={MAX_WIDTH} 
                editable={false} 
                ref={max} 
                style={styles.label} 
            />
        </View> */}
      <View style={{position: 'absolute'}} >
          <Svg height='6' width={WIDTH} >
            <ALine 
            stroke='#00008B' 
            strokeWidth='12' 
            x1={x1} 
            y1={0} 
            x2={x2} 
            y2={0} 
        />
          </Svg>

      </View>
      <Pan1 />
      <Pan2 />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal:40,
        justifyContent: 'center'
    },
    trilho: {
        backgroundColor: 	'#C0C0C0',
        position: 'absolute',
        height: 6,
        borderRadius: 6,
        width: WIDTH,
    },
    knob: {
       height: 20,
       width: 20,
       borderRadius: 10,
       backgroundColor:  Colors.white,
       position: 'absolute',
       elevation: 5,
       shadowColor: '#000',
       shadowRadius: 4,
       shadowOffset: {
           height: 2,
           width:0,
       },
       shadowOpacity: 0.3
    },
});


export default InputRangeScreen
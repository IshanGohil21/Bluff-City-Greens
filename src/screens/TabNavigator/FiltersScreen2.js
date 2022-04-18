import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { RadioButton } from 'react-native-paper';

import { Colors, Icons, Images } from '../../CommonConfig/CommonConfig';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';


const FiltersScreen2 = (props) => {
    const [checked, setChecked] = useState('first')

    return (
        <View style={styles.main}>
            <StatusBar backgroundColor={Colors.primary} />

            {/* Header */}
            <View style={styles.header} >
                <TouchableOpacity onPress={() => {props.navigation.goBack()}} >
                    <Ionicons name={Icons.BACK_ARROW} size={24} color={Colors.white} style={styles.back} />
                </TouchableOpacity>

                <Text style={styles.filterContainer}>Filter</Text>

            </View>

            {/* Body */}
            <View style={styles.radio} >
                {/* Radio buttons */}
                <View  style={styles.buttonContainer} >
                    <View style={styles.button} >
                        <RadioButton
                            value="first"
                            color={Colors.primary}
                            status={checked === 'first' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('first')}
                        />
                        <Text>Price - High to Low</Text>
                    </View>

                    <View style={styles.button} >
                        <RadioButton
                            value="second"
                            color={Colors.primary}
                            status={checked === 'second' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('second')}
                        />
                        <Text>Price - High to Low</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.applyButton} onPress={() => {props.navigation.navigate('Search')} } >
                    <Text style={styles.apply} >APPLY</Text>
                </TouchableOpacity>


            </View>
        </View>
    )
}

export default FiltersScreen2

const styles = StyleSheet.create({
    apply: {
        fontSize: 18,
        color: Colors.white
    },
    button: {
        color: Colors.white,
        fontSize: 20,
        fontWeight: '700',
        flexDirection: 'row',
        alignItems: 'center',
        // padding: 10
      },
      buttonContainer: {
        flex:0.5
      },
      applyButton:{
        padding:15 , 
        backgroundColor: Colors.primary, 
        justifyContent: 'center', 
        alignItems: 'center' , 
        borderRadius: 10, 
        marginHorizontal: 30
      },
      main: {
        flex: 1 
      },
      header: {
        flex: 0.8, 
        backgroundColor: Colors.primary 
      },
      back: {
          padding: 20,
          marginTop: 10
      },
      filterContainer: {
          padding: 20,
          marginTop: 10,
          fontSize: 28,
          color: Colors.white,
          fontWeight: 'bold'
      },
      radio: {
        flex: 3,
        padding: 15,
        justifyContent: 'space-between' 
      }
})
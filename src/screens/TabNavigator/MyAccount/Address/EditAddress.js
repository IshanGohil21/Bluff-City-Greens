import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Colors from '../../../../Colors/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Address from '../../../../dummy-data/Address';
import { RadioButton } from 'react-native-paper';

const EditAddressScreen = (props) => {
   
    const [checked, setChecked] = useState('first')

    return (
        <View  style={styles.main}>
        {/* Header */}
       <View style={styles.header}>
           <TouchableOpacity onPress={() => {
               props.navigation.goBack()
           }}
           >
               <Ionicons name='arrow-back-outline' color='white' size={30} style={styles.back} />
           </TouchableOpacity>
           {/*Title*/}
               <View>
                   <Text style={styles.title}>Edit Address </Text>
               </View>
               </View>
               { /* Body */ }
               <View style={styles.body} >
                <View>
                    <Image
                        source={require('../../../../assets/icon/location.jpeg')}
                        style={styles.map}
                    />
                </View>
                <View style={styles.bodyContainer} >
                <View style={styles.detailContainer} >
                <Text style={styles.details} > Stree Name, Flat No., Society/Office Name </Text>
                <Text style={styles.address} >{Address[0].address} </Text>
                <Text style={styles.details} > Zip Code </Text>
                <Text style={styles.address} > {Address[0].zip} </Text>
                <Text style={styles.details} > Nearest Landmark (Optional) </Text>
                <Text style={styles.address} > {Address[0].landmark} </Text>
                </View>
                <Text style={styles.radioContainer} > Tag this address as: </Text>
               
               {/* <TouchableOpacity style={styles.radio} > */}
               <View style={styles.radio} >
               <RadioButton
                        value="first"
                        color={Colors.primary}
                        status={ checked === 'first' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('first')}
                />
                <Text> Home</Text>
                <RadioButton
                        value="second"
                        color={Colors.primary}
                        status={ checked === 'second' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('second')}
                />
                 <Text> Work</Text>
                <RadioButton
                        value="third"
                        color={Colors.primary}
                        status={ checked === 'third' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('third')}
                />
                 <Text> Others</Text>
               {/* </TouchableOpacity> */}
               </View>
               <TouchableOpacity onPress={ () => {props.navigation.goBack()} } >
               <Text style={styles.signin} > EDIT ADDRESS </Text>
               </TouchableOpacity>
              
               </View>
               </View>
       </View>
  )
}

const styles = StyleSheet.create({
    main:{
        flex:1
    },
    header: {
        padding: 10, 
        backgroundColor: Colors.primary, 
    },
    title: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 28,
        marginTop:40
    },
    body:{
        flex:3
    },
    map: {
        height: 300,
        width:400,
      },
      details: {
          color: Colors.grey
      },
      detailContainer: {
          borderColor: Colors.white,
        //   borderWidth: 5,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          padding:10,
      },
      address: {
          padding: 5,
          marginBottom:10
      },
      back: {
          marginTop: 20
      },
      radioContainer:{
        fontWeight:'bold',
        padding:10,
      },
      bodyContainer: {
          flex:1
      },
      radio:{ 
       //   marginLeft: 10,
          flexDirection: 'row',
          alignItems:'center'
      },
      signin: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.primary,
        textAlign: 'center',
        fontSize: 23,
        padding: 10,
        borderRadius: 10,
        overflow: 'hidden',
        width: '80%',
        marginLeft: 30,
        marginBottom: 30,
        color: Colors.white,
        marginTop: 30
    },
  });  

export default EditAddressScreen;

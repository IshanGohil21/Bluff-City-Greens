import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { RadioButton } from 'react-native-paper';

import { Colors, Images, Icons } from '../../../../CommonConfig/CommonConfig';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Report = (props) => {
    const [checked, setChecked] = useState('first')

    return (
        <View style={styles.main} >
            {/* Header & Statuse Bar */}
            <StatusBar backgroundColor={Colors.primary} />
            <View style={styles.title} >
                <TouchableOpacity onPress={() => { props.navigation.goBack() }} >
                    <Ionicons name={Icons.BACK_ARROW} size={30} color={Colors.white} />
                </TouchableOpacity>
                <Text style={styles.issue} >Report Issue</Text>
            </View>

            {/* Body */}
            <View style={styles.body} >
                <View style={styles.box} >
                    <View style={styles.button} >
                        <RadioButton
                            value="first"
                            color={Colors.primary}
                            status={checked === 'first' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('first')}
                        />
                        <Text  style={styles.txt} >I have recieved a bad or low quality product</Text>
                    </View>

                    <View style={styles.button} >
                        <RadioButton
                            value="second"
                            color={Colors.primary}
                            status={checked === 'second' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('second')}
                        />
                        <Text  style={styles.txt} >I have recieved a bad or low quality product</Text>
                    </View>
                    <View style={styles.button} >
                        <RadioButton
                            value="third"
                            color={Colors.primary}
                            status={checked === 'third' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('third')}
                        />
                        <Text  style={styles.txt} >I have recieved a bad or low quality product</Text>
                    </View>
                    <View style={styles.button} >
                        <RadioButton
                            value="fourth"
                            color={Colors.primary}
                            status={checked === 'fourth' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('fourth')}
                        />
                        <Text style={styles.txt}  >I have recieved a bad or low quality product</Text>
                    </View >
                    <View style={styles.button} >
                        <RadioButton
                            value="fifth"
                            color={Colors.primary}
                            status={checked === 'fifth' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('fifth')}
                        />
                        <Text style={styles.txt}  >I have recieved a bad or low quality product</Text>
                    </View>
                    <View style={styles.button} >
                        <RadioButton
                            value="sixth"
                            color={Colors.primary}
                            status={checked === 'sixth' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('sixth')}
                        />
                        <Text style={styles.txt}  >I have recieved a bad or low quality product</Text>
                    </View>
                    <View style={styles.button} >
                        <RadioButton
                            value="ninth"
                            color={Colors.primary}
                            status={checked === 'ninth' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('ninth')}
                        />
                        <Text style={styles.txt}  >I have recieved a bad or low quality product</Text>
                    </View>
                    <View style={styles.button} >
                        <RadioButton
                            value="seventh"
                            color={Colors.primary}
                            status={checked === 'seventh' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('seventh')}
                        />
                        <Text style={styles.txt}  >I have recieved a bad or low quality product</Text>
                    </View>
                    <View style={styles.button} >
                        <RadioButton
                            value="eighth"
                            color={Colors.primary}
                            status={checked === 'eighth' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('eighth')}
                        />
                        <Text style={styles.txt} >I have recieved a bad or low quality product</Text>
                    </View>

                </View>
                <TouchableOpacity onPress={() => {props.navigation.goBack()}} >
                    <Text style={styles.mark} >REPORT ISSUE</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Report

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    title: {
        flex: 0.6,
        backgroundColor: Colors.primary,
        justifyContent: 'space-between',
        padding: 10
    },
    issue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.white
    },
    body: {
        flex: 3,
        justifyContent:'space-between',
        alignItems:'center'
    },
    box: {
        flex: 0.75,
        marginBottom: 40,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
        // borderWidth:1,
        marginTop: 30,
        elevation: 8,
        overflow: 'hidden',
        borderRadius: 10,
        backgroundColor: Colors.white,
        padding:20
    },
    button: {
        color: Colors.white,
        fontSize: 20,
        fontWeight: '700',
        flexDirection: 'row',
        alignItems: 'center',
        // padding: 10
    },
    Txt:{
        fontSize:20,
    },
    mark:{
        justifyContent: "center",
        backgroundColor: Colors.primary,
        textAlign: 'center',
        padding: 10,
        borderRadius: 10,
       marginHorizontal: 20,
       width:300,
       color:Colors.white,
       fontSize:18,
       marginBottom:30
    }

})
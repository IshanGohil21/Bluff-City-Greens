import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { RadioButton } from 'react-native-paper';

import { Colors, Images, Icons } from '../../../../CommonConfig/CommonConfig';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { postRequest } from '../../../../Helper/ApiHelper';
import  Toast  from 'react-native-simple-toast';

const Report = (props) => {
    const [checked, setChecked] = useState('first')

    const orderId = props.route.params.order

    // console.log(orderId.item.id);

    const onPressCancel = async () => {
        const data = {
            orderId: orderId.item.id,
            cancellation_reason: checked
        }
        console.log("CANCEL:  \n\n", data);
        const responseCancel = await postRequest('/customer/cancel-order', data)
        console.log(responseCancel);

        if (responseCancel.success) {
            props.navigation.navigate('MyAccount');
            Toast.show("Order Cancelled SuccessFully!")
        }
        else {
            Toast.show('Something went Wrong')
        }
    }

    return (
        <View style={styles.main} >
            {/* Header & Statuse Bar */}
            <StatusBar backgroundColor={Colors.primary} />
            <View style={styles.title} >
                <TouchableOpacity onPress={() => { props.navigation.goBack() }} >
                    <Ionicons name={Icons.BACK_ARROW} size={30} color={Colors.white} style={{ marginTop: 30 }} />
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
                        <Text style={styles.txt} >I have recieved a bad or low quality product</Text>
                    </View>

                    <View style={styles.button} >
                        <RadioButton
                            value="second"
                            color={Colors.primary}
                            status={checked === 'second' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('second')}
                        />
                        <Text style={styles.txt} >I have not recieved a product, but it is billed</Text>
                    </View>
                    <View style={styles.button} >
                        <RadioButton
                            value="third"
                            color={Colors.primary}
                            status={checked === 'third' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('third')}
                        />
                        <Text style={styles.txt} >I have recieved a product nearing expiry</Text>
                    </View>
                    <View style={styles.button} >
                        <RadioButton
                            value="fourth"
                            color={Colors.primary}
                            status={checked === 'fourth' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('fourth')}
                        />
                        <Text style={styles.txt}  >Product has been charged more than MRP</Text>
                    </View >
                    <View style={styles.button} >
                        <RadioButton
                            value="fifth"
                            color={Colors.primary}
                            status={checked === 'fifth' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('fifth')}
                        />
                        <Text style={styles.txt}  >I didn't recieve my order, but I got an SMS stating it is delivered</Text>
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
                        <Text style={styles.txt}  >I recieved a wrong product</Text>
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
                        <Text style={styles.txt} >My return was picked up but I haven't recieved any refund yet</Text>
                    </View>

                </View>
                <TouchableOpacity onPress={() => { props.navigation.goBack() }} >
                    <Text style={styles.mark} >REPORT ISSUE</Text>
                </TouchableOpacity>

                { orderId.item.status ==="Ordered" ?  

                <TouchableOpacity onPress={onPressCancel} >
                    <Text style={styles.mark1} >CANCEL ORDER</Text>
                </TouchableOpacity>

                : 
                 null}

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
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    box: {
        flex: 0.64,
        marginBottom: 20,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 10,
        marginTop: 20,
        elevation: 8,
        overflow: 'hidden',
        borderRadius: 10,
        backgroundColor: Colors.white,
        padding: 10
    },
    button: {
        color: Colors.white,
        fontSize: 20,
        fontWeight: '700',
        flexDirection: 'row',
        alignItems: 'center',
    },
    Txt: {
        fontSize: 20,
    },
    mark: {
        justifyContent: "center",
        backgroundColor: Colors.primary,
        textAlign: 'center',
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 20,
        width: 300,
        color: Colors.white,
        fontSize: 18,
        marginBottom:25
    },
    mark1: {
        justifyContent: "center",
        backgroundColor: Colors.primary,
        textAlign: 'center',
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 20,
        width: 300,
        color: Colors.white,
        fontSize: 18,
        marginBottom: 10
    }
})
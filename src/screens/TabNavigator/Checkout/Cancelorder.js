import { StyleSheet, Text, View, StatusBar, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { RadioButton } from 'react-native-paper';

import { Icons, Colors, Images } from '../../../CommonConfig/CommonConfig';
import { postRequest } from '../../../Helper/ApiHelper';
import Toast from 'react-native-simple-toast';

const CancelorderScreen = (props) => {
    const [checked, setChecked] = useState('first')

    const order = props.route.params.order 
     console.log("\nCancel Params       ",order);

    const onPressCancel = async() => {
        const data = {
            orderId : order.id,
            cancellation_reason : "Items is not fresh."
        }
        // console.log("CANCEL:  \n\n"  ,data);
        const responseCancel = await postRequest('/customer/cancel-order', data)
        console.log(responseCancel);

        if(responseCancel.success){
            props.navigation.navigate('Home');
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
                <View style={{ alignItems: 'center', justifyContent: 'center', }} >
                    <Text style={{ fontSize: 18, fontWeight: 'bold', padding: 10, alignItems: 'center' }} >We are sorry to see you are canelling your order Tell us why and we'll improve</Text>
                </View>
                <View style={styles.box} >
                    <View style={styles.button} >
                        <RadioButton
                            value="first"
                            color={Colors.primary}
                            status={checked === 'first' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('first')}
                        />
                        <Text style={styles.txt} >I want to Order a different product</Text>
                    </View>

                    <View style={styles.button} >
                        <RadioButton
                            value="second"
                            color={Colors.primary}
                            status={checked === 'second' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('second')}
                        />
                        <Text style={styles.txt} >Not intrested anymore</Text>
                    </View>
                    <View style={styles.button} >
                        <RadioButton
                            value="third"
                            color={Colors.primary}
                            status={checked === 'third' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('third')}
                        />
                        <Text style={styles.txt} >I want to re-order using promo code</Text>
                    </View>
                    <View style={styles.button} >
                        <RadioButton
                            value="fourth"
                            color={Colors.primary}
                            status={checked === 'fourth' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('fourth')}
                        />
                        <Text style={styles.txt}  >Order delivery delayed</Text>
                    </View >
                    <View style={styles.button} >
                        <RadioButton
                            value="fifth"
                            color={Colors.primary}
                            status={checked === 'fifth' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('fifth')}
                        />
                        <Text style={styles.txt}  >Found a better deal</Text>
                    </View>
                    <View style={styles.button} >
                        <RadioButton
                            value="sixth"
                            color={Colors.primary}
                            status={checked === 'sixth' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('sixth')}
                        />
                        <Text style={styles.txt}  >Order duplicate/Wrong items</Text>
                    </View>
                    <View style={styles.button} >
                        <RadioButton
                            value="ninth"
                            color={Colors.primary}
                            status={checked === 'ninth' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('ninth')}
                        />
                        <Text style={styles.txt}  >Other</Text>
                    </View>
                    <View style={styles.button} >
                        <RadioButton
                            value="seventh"
                            color={Colors.primary}
                            status={checked === 'seventh' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('seventh')}
                        />
                        <Text style={styles.txt}  >Other</Text>
                    </View>

                    <View style={{ alignItems: 'center', padding: 15 }} >
                        <Text style={{ fontSize: 16, fontWeight: '600' }} >Want to edit order then call us on this number</Text>
                    </View>

                    <View style={{ alignItems: 'center', padding: 15, flexDirection: 'row', paddingHorizontal: 20 }}  >
                        <Ionicons name={Icons.CALL} size={30} color={Colors.primary} />
                        <Text style={{ fontWeight: 'bold', fontSize: 20, paddingHorizontal: 30 }} >+011 - 8893023406</Text>
                    </View>

                </View>

                <TouchableOpacity onPress={onPressCancel} >
                    <Text style={styles.mark} >CANCEL ORDER</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CancelorderScreen;

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
        flex: 0.90,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
        marginTop: 20,
        elevation: 8,
        overflow: 'hidden',
        borderRadius: 10,
        backgroundColor: Colors.white,
        padding: 20
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
        marginBottom: 10
    },
})
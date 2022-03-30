import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

const DiscountCouponScreen = props => {
    return (
        <View>

            {/* Header */}
            <View style={{ flexDirection: 'row', padding: 10, backgroundColor: 'green' }}>
                <TouchableOpacity onPress={() => {
                    props.navigation.goBack()
                }} style={{ flex: 1 }}
                >
                    <Ionicons name='arrow-back-outline' color='black' size={28} style={{ marginBottom: 20 }} />
                </TouchableOpacity>

                {/*Title*/}
                <View style={{ flex: 3 }}>
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: 'white', fontSize: 40, padding: 10, fontWeight: '600' }}>Bluff City </Text>
                        </View>
                        <View>
                            <Text style={{ color: 'white', fontSize: 50, fontWeight: 'bold' }}> GREENS </Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Body */}

            <View>
                <Text style={styles.discount} > Discount Coupon </Text>
                <Text style={styles.text} > Do you have discount coupon? </Text>
                <Text style={styles.text} > Enter your coupon code below: </Text>

                <TextInput
                    //maxLength={6}
                    keyboardType='default'
                    style={styles.textBox}
                    placeholder='XX52XX34'
                />

                <View>
                    <TouchableOpacity onPress={() => { }} style={{ marginTop: 50, marginHorizontal: 40 }}>
                        <Text style={styles.signin}> SUBMIT </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { }} style={{ marginTop: 50, marginHorizontal: 40 }}>
                        <Text style={styles.take}> TAKE ME SHOPPING </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.borderAccessibility}>
                    <TouchableOpacity onPress={() => { props.navigation.navigate('AccessibilityPolicy') }} >
                        <Text style={styles.policy}> Accessibility Policy </Text>
                    </TouchableOpacity>
                </View>
            </View>


        </View>
    );
};

const styles = StyleSheet.create({
    discount: {
        fontSize: 30,
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        marginHorizontal: 70,
        marginBottom: 30,
        marginTop: 50
    },
    text: {
        color: 'grey',
        fontSize: 18,
        textAlign: 'center',
        padding: 5
    },
    signin: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "green",
        textAlign: 'center',
        color: 'white',
        fontSize: 23,
        padding: 10,
        borderRadius: 10,
        borderColor: 'green',
        overflow: 'hidden',
        width: '100%',
    },
    opt: {
        alignItems: 'center',
        fontWeight: '600',
        alignSelf: 'center',
        paddingHorizontal: 100,
        borderRadius: 4,
        fontSize: 20,
        height: 55,
        borderBottomColor: 'grey',
        borderBottomWidth: 5,
        justifyContent: 'center',
        textAlign: 'center'
    },
    textBox: {
        height: 50,
        textAlign: 'left',
        color: 'grey',
        marginTop: 50,
        marginHorizontal: 70,
    },
    take: {
        backgroundColor: 'white',
        color: 'green',
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        textAlign: 'center',
        fontSize: 20,
        padding: 10,
        borderRadius: 10,
        borderColor: 'green',
        borderWidth: 1,
        marginTop: 40
    },
    policy: {
        textAlign: 'center',
        color: 'green',
        fontSize: 18,
        marginTop: 30,
        textDecorationLine: 'underline'
    }

});


export default DiscountCouponScreen;

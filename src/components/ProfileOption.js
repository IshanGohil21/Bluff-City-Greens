import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react'
import { Colors, Icons } from '../CommonConfig/CommonConfig'


const ProfileOption = (props) => {
    return (
        <TouchableOpacity style={styles.body} onPress={props.onPress} >
            <View style={styles.card} >
                <Ionicons name={props.iconLeft} size={24} color={Colors.grey} />
            </View>
            <View style={styles.card2} >
                <Text style={styles.text} >{props.name}</Text>
            </View>
            <View style={styles.card3} >
                <Ionicons name={props.iconRight} size={24} color={Colors.grey} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderBottomColor: Colors.grey,
        borderBottomWidth: 0.5,
        paddingHorizontal: 15,
        height: (Dimensions.get('window').height-40)*0.55/ 8
    },
    text: {
        padding: 15,
        fontSize: 17,
        color: 'black'
    },
    card: {
        flex: 0.2
    },
    card2: {
        flex: 0.7
    },
    card3: {
        flex: 0.1
    },
})

export default ProfileOption;


import React from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SearchBarScreen from '../../../Components/Slider/SearchBar2';
import { Colors, Images, Icons } from '../../../CommonConfig/CommonConfig';
import Products from '../../../dummy-data/Products';
import ShopProductScreen from '../../../Components/Shop';

const ShopScreen = (props) => {
    return (
        <View style={styles.main} >
            <StatusBar backgroundColor={Colors.primary} />
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { props.navigation.navigate('Home') }} >
                    <Ionicons name={Icons.BACK_ARROW} size={24} color={Colors.white} style={styles.back} />
                </TouchableOpacity>
                <Text style={styles.shop} > Shop </Text>
            </View>
            {/* Body */}
            <View style={styles.body} >
                <View style={styles.search} >
                    <SearchBarScreen />
                </View>
                {/* Flatlist */}
                <View>
                    <ShopProductScreen
                        images={Products[0].images}
                        Pname={Products[0].Pname}
                        color={Products[0].color}
                        onPress={() => { props.navigation.navigate('Fruits', { id: Products[0].id }) }}
                    />

                    <FlatList
                        data={Products}
                        renderItem={({ item }) => {
                            return (
                                <View key={item.id}>
                                    <ShopProductScreen
                                        images={item.images}
                                        Pname={item.Pname}
                                        color={item.color}
                                        onPress={() => { }}
                                    />
                                </View>
                            )
                        }}
                    />
                </View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingBottom: 65,
    },
    header: {
        flex: 0.7,
        backgroundColor: Colors.primary,
        justifyContent: 'space-between'
    },
    back: {
        marginTop: 20,
        padding: 10
    },
    shop: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.white
    },
    body: {
        flex: 3
    },
    search: {
        justifyContent: 'flex-start',
        padding: 10
    }

});

export default ShopScreen;

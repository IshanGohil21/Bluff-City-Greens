import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, TextInput, Image, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import { Colors, Icons, Images } from '../../../CommonConfig/CommonConfig';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ViewAllCommonComp from '../../../Components/ViewAll';

const ViewAll = (props) => {
    const products = props.route.params.reco
    // console.log("View all products\n",products);

    return (
        <View style={styles.main} >
            {/* Title */}
            <View style={styles.title} >
                <TouchableOpacity onPress={() => { props.navigation.goBack() }} >
                    <Ionicons name={Icons.BACK_ARROW} size={24} color={Colors.white} style={{ marginTop: 10 }} />
                </TouchableOpacity>
                <Text style={styles.views} >View All</Text>
            </View>

            {/* Body */}
            <View style={styles.body} >
                <ScrollView>
                <View style={styles.heading} >
                  <FlatList
                    data={products}
                    numColumns={2}
                    
                    renderItem={(itemData) => {
                      //  console.log("\n\n\nRecommended Orders   ",itemData.item);
                      return (
                        <View key={itemData.item.id} >
                          <ViewAllCommonComp
                            item={itemData.item}
                            name={itemData.item.name}
                            image={itemData.item.item_images[0]?.image}
                            weight={itemData.item.item_sizes[0]?.size}
                            price={itemData.item.item_sizes[0]?.price}
                            onClick={() => { props.navigation.navigate('Recommended_Products', { recommended: itemData.item, recommendId: itemData.item.id }) }}
                           
                          />
                        </View>
                      )
                    }}
                  />
                </View>
                </ScrollView>

            </View>
        </View>
    )
}

export default ViewAll

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    title: {
        justifyContent: 'space-between',
        flex: 0.7,
        backgroundColor: Colors.primary,
        paddingHorizontal: 10
    },
    views: {
        fontSize: 20,
        color: Colors.white,
        fontWeight: 'bold'
    },
    body: {
        flex: 3
    },
})
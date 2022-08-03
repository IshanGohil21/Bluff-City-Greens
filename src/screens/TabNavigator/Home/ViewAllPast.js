import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, TextInput, Image, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import { Colors, Icons, Images } from '../../../CommonConfig/CommonConfig';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ViewAllPastComp from '../../../Components/VIewAllPast';

const ViewAllPast = (props) => {
    const past = props.route.params.past
     console.log("View all products\n",past);

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
                <View style={styles.heading}>

                    <FlatList
                      data={past}
                      numColumns={2}
                      renderItem={(item, index) => {
                          //  console.log("\n\n\n\n\nOnly for FlatList    ",item.item.order_items);
                        return (
                          <View key={index} style={styles.ailing} >
                            {
                              item.item.order_items.map((indi) => {
                                //  console.log("\n\nNest FlatList:   ",indi.item_size);
                                return (
                                  <View>
                                    <ViewAllPastComp
                                      name={indi.item.name}
                                      id={indi.id}
                                      item={indi}
                                      price={indi.item_size?.price}
                                      weight={indi.item_size?.size}
                                      image={indi.item.item_images[0].image}
                                      onClick={() => { props.navigation.navigate('Past_Orders', { past: indi, pastId: indi.id }) }}
                                      onHeart={() => { }}
                                    />
                                  </View>
                                )
                              }
                              )
                            }
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

export default ViewAllPast

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
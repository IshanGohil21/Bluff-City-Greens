import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image, ScrollView, ImageBackground } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MyAccountScreen = props => {
    const image = {uri:'https://static01.nyt.com/images/2022/03/25/multimedia/25rory-ronaldo/25rory-ronaldo-articleLarge.jpg?quality=75&auto=webp&disable=upscale'};
    return (
        <View>
        <ScrollView>
        {/* Header */}
        <View style={styles.container} >
        <View  style={styles.header} >
            <ImageBackground source={image} resizeMode='cover' style={styles.image} >
                <TouchableOpacity onPress={() => {props.navigation.navigate('Home')}} >
                    <Ionicons  name='arrow-back-outline' size={30}  color='white' style={{marginTop: 20, marginLeft:10}}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name='create-outline' size={30} color='white'  style={{marginTop: 20, marginRight:10}} />
                </TouchableOpacity>
                </ImageBackground>
        </View>
        { /*  Body */ }
        <View style={styles.bodyContainer}>
        <TouchableOpacity style={styles.body} onPress={() => {props.navigation.navigate('personalInfo')}}> 
            <View style={{flex:0.2}} >
            <Ionicons name='person-outline' size={24} color='grey' />
            </View>
            <View style={{flex:0.7}} >
            <Text style={styles.text} > Personal Information </Text>
            </View>
            <View style={{flex:0.1}} >
            <Ionicons name='chevron-forward-outline' size={24} color='grey'/>
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.body} onPress={() => {props.navigation.navigate('SavedAddress')}} > 
        <View style={{flex:0.2}} >
            <Ionicons name='location-outline' size={24} color='grey' />
            </View>
            <View style={{flex:0.7}} >
            <Text style={styles.text} > Saved Address </Text>
            </View>
            <View style={{flex:0.1}} >
            <Ionicons name='chevron-forward-outline' size={24} color='grey' />
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.body} onPress={() => {props.navigation.navigate('Payment')}} > 
        <View style={{flex:0.2}} >
            <Ionicons name='card-outline' size={24} color='grey' />
            </View>
            <View style={{flex:0.7}} >
            <Text style={styles.text} > Payment </Text>
            </View>
            <View style={{flex:0.1}} >
            <Ionicons name='chevron-forward-outline' size={24} color='grey' />
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.body} onPress={() => {props.navigation.navigate('MyOrders')}} > 
        <View style={{flex:0.2}} >
            <Ionicons name='basket-outline' size={24} color='grey' />
            </View>
            <View style={{flex:0.7}} >
            <Text style={styles.text} > My Orders </Text>
            </View>
            <View style={{flex:0.1}} >
            <Ionicons name='chevron-forward-outline' size={24} color='grey' />
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.body} onPress={() => {props.navigation.navigate('Favorites')}} > 
        <View style={{flex:0.2}} >
            <Ionicons name='heart-outline' size={24} color='grey' />
            </View>
            <View style={{flex:0.7}} >
            <Text style={styles.text} > Favorites </Text>
            </View>
            <View style={{flex:0.1}} >
            <Ionicons name='chevron-forward-outline' size={24} color='grey' />
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.body}  onPress={() => {props.navigation.navigate('ReferFriend')}} > 
        <View style={{flex:0.2}} >
            <Ionicons name='person-add-outline' size={24} color='grey' />
            </View>
            <View style={{flex:0.7}} >
            <Text style={styles.text} > Refer A Friend </Text>
            </View>
            <View style={{flex:0.1}} >
            <Ionicons name='chevron-forward-outline' size={24} color='grey' />
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.body} onPress={() => {props.navigation.navigate('ChangePassword')}} > 
        <View style={{flex:0.2}} >
            <Ionicons name='lock-closed-outline' size={24} color='grey' />
            </View>
            <View style={{flex:0.7}} >
            <Text style={styles.text} > Change Password </Text>
            </View>
            <View style={{flex:0.1}} >
            <Ionicons name='chevron-forward-outline' size={24} color='grey' />
            </View>
        </TouchableOpacity>

        
        <TouchableOpacity onPress={() => {props.navigation.navigate('FAQ')}}  style={styles.body}  >
        <View style={{flex:0.2}} >
            <Ionicons name='help-circle-outline' size={24} color='grey' />
            </View>
            <View style={{flex:0.7}} >
            <Text style={styles.text} > FAQ </Text>
            </View>
            <View style={{flex:0.1}} >
            <Ionicons name='chevron-forward-outline' size={24} color='grey' />
            </View>
            </TouchableOpacity>
       

        <TouchableOpacity onPress={() => {}}   style={styles.body}  >
        <View style={{flex:0.2}} >
            <Ionicons name='log-out-outline' size={24} color='grey'/>
            </View>
            <View style={{flex:0.8}} >
            <Text style={styles.text} > Logout</Text>
            </View>
            </TouchableOpacity>
        
       
        </View>
        </View>
        </ScrollView>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex:1,
        flexDirection:'row',
       justifyContent:'center',
     },
    image:{
        flex:1,
        justifyContent: 'space-between',
        height: 305,
        flexDirection:'row',
        padding:15,
    },
    body:{
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderBottomColor:'grey',
        borderBottomWidth: 0.5,
        paddingHorizontal: 15,
        marginLeft: 15,
        // borderTopLeftRadius: 30,
        // borderTopRightRadius: 30,
        // borderWidth: 5
    },
    text:{
        padding:15,
        fontSize: 17,
      color:'black'
     },
    bodyContainer: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderWidth: 1
    }
});


export default MyAccountScreen;

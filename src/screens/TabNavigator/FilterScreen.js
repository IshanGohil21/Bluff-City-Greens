import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView, Image, Dimensions } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Icons, Images } from '../../CommonConfig/CommonConfig';

import Categories from '../../dummy-data/Categories';
// import Slider from '@react-native-community/slider';
// import { Slider } from 'react-native';
import RangeSlider from 'rn-range-slider';

const { width } = Dimensions.get('window')

const FilterScreen = (props) => {
  return (
    <View style={styles.main} >
      <StatusBar backgroundColor={Colors.primary} />
      {/* Title & Back Button */}
      <View style={styles.title} >
        <TouchableOpacity onPress={() => { props.navigation.goBack() }} >
          <Ionicons name={Icons.BACK_ARROW} size={30} color={Colors.white} style={styles.back} />
        </TouchableOpacity>
        {/* Header */}
        <View style={styles.filterContainer} >
          <Text style={styles.filter} >Filter</Text>
        </View>
      </View>
      {/* Body */}
      <View style={styles.body} >
        <View style={styles.line} >
          <View style={styles.lineContainer} >
            <TouchableOpacity  >
              <Text style={styles.lineText} >Filter By</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.lineText} >Sort By</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Categories */}
        <View style={styles.commonContainer} >
          <Text style={styles.common} >Categories</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {
              Categories.map((item) => {
                return (
                  <TouchableOpacity key={item.id} style={styles.categories}>
                    <Image source={item.image} style={{ height: 50, width: 50 }} />
                    <Text style={{ color: item.color }} > {item.name} </Text>
                  </TouchableOpacity>
                )
              }
              )
            }
          </ScrollView>
          {/* Range Slider */}
          <View>
          <RangeSlider
  style={styles.slider}
  min={0}
  max={100}
  step={1}
  // floatingLabel
  // renderThumb={renderThumb}
  // renderRail={renderRail}
  // renderRailSelected={renderRailSelected}
  // renderLabel={renderLabel}
  // renderNotch={renderNotch}
  // onValueChanged={handleValueChange}
/>

          {/* <Slider
              minimumValue={0}
              maximumValue={50}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              style={styles.slider} 
          /> */}
          </View>
        </View>
      </View>
    </View>
  )
}

export default FilterScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  title: {
    flex: 1,
    backgroundColor: Colors.primary
  },
  body: {
    flex: 3
  },
  back: {
    paddingTop: 20,
    marginTop: 10,
    padding: 15
  },
  filter: {
    fontSize: 26,
    color: Colors.white,
    fontWeight: 'bold'
  },
  filterContainer: {
    marginTop: 20,
    padding: 15
  },
  line: {
    borderBottomWidth: 1,
    padding: 15
  },
  lineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  lineText: {
    fontWeight: '600',
    fontSize: 20,
    color: Colors.grey
  },
  common: {
    fontSize: 20,
    fontWeight: '900',
    padding: 10
  },
  commonContainer: {
    padding: 10
  },
  categories: {
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: Colors.white
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.grey
  },
  text2: {
    color: Colors.grey,
    fontWeight: '300',
    fontSize: 12
  },
  price1: {
    fontSize: 20,
    marginHorizontal: 30,
    fontWeight: 'bold'
  },
  orders: {
    position: 'absolute',
    bottom: 170,
    left: width * 0.5 - 15,
    zIndex: 10
  },
  orderContainer: {
    flex: 1,
    width: width * 0.50,
    height: 200,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15
  },
  button: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '700'
  },
  image2: {
    width: width * 0.25,
    height: width * 0.25
  },
  heading: {
    flexDirection: 'row',
    padding: 10
  },
  view: {
    color: Colors.primary,
    fontSize: 16
  },
  slider: {
    
    color:Colors.primary
  }
})
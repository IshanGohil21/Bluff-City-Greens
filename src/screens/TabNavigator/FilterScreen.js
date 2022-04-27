import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView, Image, Dimensions } from 'react-native'
import React, { useState, useCallback, useRef } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Icons, Images } from '../../CommonConfig/CommonConfig';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import RBSheet from "react-native-raw-bottom-sheet";
import { RadioButton } from 'react-native-paper';


import Categories from '../../dummy-data/Categories';
import InputRangeScreen from '../../Components/Slider/InputRange';




const { width } = Dimensions.get('window')

const FilterScreen = (props) => {
  const [enableScroll, setEnable] = useState(true);
  const [disableScroll, setDisable] = useState(false);

  const [range, setRange] = useState(0);

  const [value, setValue] = useState([0, 50])

  const [state, setState] = useState('filter')

  const [checked, setChecked] = useState('first')

  const refRBSheet = useRef();

  
  const onValueSChange = (values) => {
    setValue(values)
  }

  return (
    <View style={styles.main} >
      <StatusBar backgroundColor={Colors.primary} />
      {/* Title & Back Button */}
      <View style={styles.title} >
        <TouchableOpacity onPress={() => { props.navigation.goBack() }} >
          <Ionicons name={Icons.BACK_ARROW} size={30} color={Colors.white} style={styles.back} />
        </TouchableOpacity>
        {/* {/* Header  */}
        <View style={styles.filterContainer} >
          <Text style={styles.filter} >Filter</Text>
        </View>
      </View>
      {/* Body  */}
      <View style={styles.body} >
        <View style={styles.lineContainer} >
          <TouchableOpacity style={{ ...styles.tabButton, borderBottomWidth: state === 'filter' ? 2.5 : 0.5, borderBottomColor: state === 'filter' ? Colors.primary : Colors.grey }} onPress={() => { setState('filter') }}>
            <Text style={{ ...styles.filterText, color: state === 'filter' ? Colors.primary : Colors.grey }} >Filter By</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ ...styles.tabButton, borderBottomWidth: state === 'sort' ? 2.5 : 0.5, borderBottomColor: state === 'sort' ? Colors.primary : Colors.grey }} onPress={() => { setState('sort') }} >
            <Text style={{ ...styles.filterText, color: state === 'sort' ? Colors.primary : Colors.grey }} >Sort By</Text>
          </TouchableOpacity>
        </View>
        {/* Body */}
        <View>
          {state === 'filter' ?
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
              <View style={styles.priceRange} >
                <Text style={styles.priceRange2} >Price Range</Text>
               
                <View style={styles.rangeSlider} >
                <InputRangeScreen 
                  minValue={0}
                  maxValue={50}
                  onChangeMin={(v) => console.log(v)}
                  onChangeMax={(z) => console.log(z)}
                />
                </View>
                <View style={styles.priceTag} >
                <Text style={styles.txt1} > $0 </Text>
                <Text style={styles.txt2} > $50 </Text>
                </View>
              </View>
              <View style={styles.applyButton} >
              <TouchableOpacity style={styles.signin} onPress={() => {props.navigation.navigate('Home')}} >
                <Text style={styles.apply} >APPLY</Text>
              </TouchableOpacity>
              </View>
            </View>

            :

            // Sort By Screen
            <View>
              <View>

                <View style={styles.radio} >
                  <View style={styles.button} >
                    <RadioButton
                      value="first"
                      color={Colors.primary}
                      status={checked === 'first' ? 'checked' : 'unchecked'}
                      onPress={() => setChecked('first')}
                    />
                    <Text>Delivery Time</Text>

                  </View>
                  <View style={styles.rb} >
                    <TouchableOpacity style={styles.rb2} onPress={() => refRBSheet.current.open()}  >
                      <Text style={styles.select} >-Select Time-</Text>
                      <Ionicons name={Icons.DOWN_ARROW} size={30} color={Colors.grey} />
                    </TouchableOpacity>

                    <RBSheet
                            ref={refRBSheet}
                            closeOnDragDown={true}
                            closeOnPressMask={false}
                            customStyles={{
                                wrapper: {
                                    backgroundColor: 'rgba(0,0,0,0.5)',
                                },
                                draggableIcon: {
                                    backgroundColor: Colors.grey,
                                    width: 80,
                                },
                                container: {
                                    borderTopLeftRadius: 30,
                                    borderTopRightRadius: 30,
                                }
                            }}
                        >
                           <Text style={styles.delivery} >Delivery Time</Text>

                           <View style={styles.button2} >
                            <RadioButton
                              value="first"
                              color={Colors.primary}
                              status={checked === 'first' ? 'checked' : 'unchecked'}
                              onPress={() => setChecked('first')}
                            />
                    <Text>07:00 AM to 9:30 AM</Text>
                  </View>

                  <View style={styles.button2} >
                            <RadioButton
                              value="second"
                              color={Colors.primary}
                              status={checked === 'second' ? 'checked' : 'unchecked'}
                              onPress={() => setChecked('second')}
                            />
                    <Text>9:30 AM to 11:00 AM</Text>
                  </View>


                  <View style={styles.button2} >
                            <RadioButton
                              value="third"
                              color={Colors.primary}
                              status={checked === 'third' ? 'checked' : 'unchecked'}
                              onPress={() => setChecked('third')}
                            />
                    <Text>5:00 PM to 7:30 PM</Text>
                  </View>


                  <View style={styles.button2} >
                            <RadioButton
                              value="fourth"
                              color={Colors.primary}
                              status={checked === 'fourth' ? 'checked' : 'unchecked'}
                              onPress={() => setChecked('fourth')}
                            />
                    <Text>07:30 PM to 10:00 PM</Text>
                  </View>
                      </RBSheet>
                  </View>


                  <View style={styles.button} >
                    <RadioButton
                      value="second"
                      color={Colors.primary}
                      status={checked === 'second' ? 'checked' : 'unchecked'}
                      onPress={() => setChecked('second')}
                    />
                    <Text>Price- Low to High</Text>
                  </View>

                  <View style={styles.button} >
                    <RadioButton
                      value="third"
                      color={Colors.primary}
                      status={checked === 'third' ? 'checked' : 'unchecked'}
                      onPress={() => setChecked('third')}
                    />
                    <Text>Price - High to Low</Text>
                  </View>
                </View>
              </View>

              <View >
                <TouchableOpacity style={styles.signin} onPress={() => { props.navigation.navigate('Home') }}  >
                  <Text style={styles.apply} >APPLY</Text>
                </TouchableOpacity>
              </View>
            </View>
          }
        </View>
        {/* Categories  */}

      </View>
    </View>
  )
}

export default FilterScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  slider: {
    flex: 1
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
    alignItems: 'center'
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
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
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
    fontWeight: '700',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
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
    color: Colors.primary
  },
  priceRange: {
    padding: 10,
    marginTop: 15,
  },
  priceRange2: {
    fontSize: 20,
    fontWeight: '600'
  },
  filterText: {
    fontSize: 18,
    fontWeight: '600',
  },
  signin: {
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    textAlign: 'center',
    color: Colors.white,
    fontSize: 23,
    padding: 10,
    borderRadius: 10,
    borderColor: Colors.primary,
    overflow: 'hidden',
    marginLeft: 60,
    marginTop: 80
  },
  apply: {
    color: Colors.white,
    fontSize: 18
  },
  rb: {
    borderColor: Colors.grey,
    borderWidth: 1,
    width: '85%',
    padding: 10,
    marginLeft: 30,
    borderRadius: 10,
  },
  rb2: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  select: {
    fontSize: 20,
    color: Colors.grey,
    paddingLeft: 5
  },
  delivery: {
    fontSize: 20,
    padding: 10
  },
  button2:{
      color: Colors.white,
      fontSize: 20,
      fontWeight: '700',
      flexDirection: 'row',
      alignItems: 'center',
       padding: 5
  },
  priceTag: {
    // padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 20,
  },
  txt1: {
    marginLeft: 30,
    color: Colors.grey
  },
  txt2: {
    marginRight: 30,
    color: Colors.grey
  },
  applyButton: {
    marginTop: 80
  },
  rangeSlider: {
    marginTop: 40
  }
})
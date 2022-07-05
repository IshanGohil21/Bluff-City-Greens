import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Icons, Images } from '../CommonConfig/CommonConfig';
import * as CartActions from '../Redux/Action/Cart';
import { postRequest } from '../Helper/ApiHelper';

const { width } = Dimensions.get('window')
const height = width * 100 / 0.6

const RecommendedProductsCommon = (props) => {
   const itemW = props.item
     const [weight, setWeight] = useState(itemW?.item_sizes[0]);

     const splitting = (str) => {
      let arr = str.split(' ');
      let arr0 = parseInt(arr[0]);
      return arr0
  }  

    const cartItems = useSelector(state => {
        const updatedCartItems = [];
        for (const key in state.Cart.items) {
          updatedCartItems.push({
            ...state.Cart.items[key]
          });
        }
        return updatedCartItems.sort((a, b) => a.id > b.id ? 1 : -1);
      })
       //console.log(cartItems);
    
      const dispatch = useDispatch();
    
      const x = cartItems.find(item => item.id === itemW.id);
    
      const [isTouched, setIsTouched] = useState(props.initialState);
    
      const [isFavorite, setIsFavorite] = useState(props.initialState);

      const onPressFav = async () => {
        setIsFavorite(true)
        const data = {
          itemId : itemW.id
        }
        
        //  console.log("\n\nDATA            ",data);
        const responseFav = await postRequest('/customer/add-to-favourites', data);
        // console.log("\n\nFAVORITES            ", responseFav);
      }

  return (
    <View  >
      {/* Favorite */}
      <TouchableOpacity style={styles.orders} onPress={onPressFav} disabled={isFavorite} >
          {isFavorite ?
            <Ionicons name={Icons.HEART_FILLED} size={30} color={Colors.red} />:
            <Ionicons name={Icons.HEART} size={30} color={Colors.black} />
          }
      </TouchableOpacity>

{/* Image Containers */}
<TouchableOpacity style={styles.orderContainer} onPress={props.onClick} >
        <View style={styles.ordersScreen}>
          <Image source={{  uri: props.image}} style={styles.image2}  />
          
          {/* Text Container */}
          <View style={styles.textContainer} >
            {/* Title Weight */}
            <View>
              <Text style={styles.text} >{props.name}</Text>
              <Text style={styles.text2}>Net wt. {props.weight}</Text>
            </View>
            {/* Price */}
            <View>
              <Text style={styles.price1} >${props.price}</Text>
            </View>
          </View>
        </View>
        {/* Button */}
        {x ?

          <View style={styles.signin2} >
            <TouchableOpacity onPress={() => { dispatch(CartActions.addToCart(itemW, weight.price, splitting(weight.size))) }} >
              <Ionicons name={Icons.ADD} size={24} color={Colors.white} />
            </TouchableOpacity>

            <Text style={styles.qtyText} > {x?.size} </Text>

            <TouchableOpacity onPress={() => { dispatch(CartActions.removeFromCart(itemW, weight.price, splitting(weight.size))) }} >
              <Ionicons name={Icons.SUB} size={24} color={Colors.white} />
            </TouchableOpacity>
          </View>
          :
          <TouchableOpacity onPress={() => { dispatch(CartActions.addToCart(itemW, weight.price, splitting(weight.size))) }} style={styles.addButton} >
            <Ionicons name={Icons.CART} size={24} color={Colors.white} />
            <Text style={styles.button} >ADD</Text>
          </TouchableOpacity>
        }
      </TouchableOpacity>

    </View>
  )
}

export default RecommendedProductsCommon;

const styles = StyleSheet.create({
    main: {
      flex: 1,
      justifyContent: 'center',
    },
    header: {
      // flex: 1,
      justifyContent: 'flex-start',
      backgroundColor: Colors.primary,
      flexDirection: 'row',
      marginTop: 20
    },
    title: {
      flex: 1,
      justifyContent: 'flex-start',
      backgroundColor: Colors.primary,
  
    },
    notify: {
      marginTop: 40,
      marginLeft: 10
    },
    filter: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginTop: 10,
      padding: 5
    },
    body: {
      flex: 3
    },
    imageContainer: {
      width: '100%',
      height: 300
    },
    paging: {
      color: Colors.grey,
      margin: 5,
    },
    scroll: {
      flexDirection: 'row',
      position: 'absolute',
      bottom: 0,
      alignSelf: 'center',
      zIndex: 10
    },
    discount: {
      width: '100%',
      height: 160,
    },
    common: {
      fontSize: 20,
      fontWeight: '900',
    },
    commonContainer: {
      padding: 10
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
      bottom: 165,
      left: width * 0.5 - 20,
      zIndex: 10,
      elevation:15
    },
    orderContainer: {
      flex: 1,
      width: width * 0.5,
      height: 200,
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: 15,
      borderBottomRightRadius: 15,
      borderBottomLeftRadius: 15,
       backgroundColor: Colors.white,
       elevation:15,
       borderRadius: 5,
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
    textContainer: {
      flexDirection: 'row',
      marginLeft: 30
    },
    ordersScreen: {
      alignItems: 'center',
      padding: 10
    },
    signin2: {
      flexDirection: 'row',
      backgroundColor: Colors.primary,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: 10,
      borderBottomRightRadius: 15,
      borderBottomLeftRadius: 15,
    },
    qtyText: {
      color: Colors.white,
      fontSize: 18,
      fontWeight: 'bold'
    },
  });
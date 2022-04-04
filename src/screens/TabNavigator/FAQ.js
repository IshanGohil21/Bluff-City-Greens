import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FAQScreen = (props) => {
    return (
        <View style={{ flex: 1 }} >
            {/*  HEADER */}
            <View style={{ padding: 20, backgroundColor: '#259D57', fontSize: 30 }}>
                <TouchableOpacity onPress={() => { props.navigation.goBack() }} >
                    <Ionicons
                        name='arrow-back'
                        size={30}
                        color='white'
                    />
                </TouchableOpacity>
                <Text style={styles.text} > FAQ </Text>
            </View>
            {/* BODY */}
            <View>
                <Text style={styles.paymentContainer} > Payment Related queries </Text>
            </View>

            <View style={styles.main} >
                <Text style={styles.textContianer} > How can I make paymemt to Thank Green? </Text>
                <Ionicons name='chevron-down-outline' color={'grey'} size={30} />
            </View>

            <View style={styles.main} >
                <Text style={styles.textContianer} > How long do you take to inititate my refund? </Text>
                <Ionicons name='chevron-down-outline' color={'grey'} size={30}  />
            </View>

            <View style={styles.main} >
                <Text style={styles.textContianer} > How can I review my reciept </Text>
                <Ionicons name='chevron-down-outline' color={'grey'} size={30}  />
            </View>


            <View>
                <Text style={styles.paymentContainer} > Delivery related queries </Text>
            </View>

            <View style={styles.main} >
                <Text style={styles.textContianer} > Do you charge for delivery? </Text>
                <Ionicons name='chevron-down-outline' color={'grey'} size={30} />
            </View>

            <View style={styles.main} >
                <Text style={styles.textContianer} > What are the delivery times? </Text>
                <Ionicons name='chevron-down-outline' color={'grey'} size={30}  />
            </View>

            <View style={styles.main} >
                <Text style={styles.textContianer} > Can I change the address of my order? </Text>
                <Ionicons name='chevron-down-outline' color={'grey'} size={30}  />
            </View>

            <View>
                <Text style={styles.paymentContainer} > Cancellation and Returns </Text>
            </View>

            <View style={styles.main} >
                <Text style={styles.textContianer} > How can I cancel my orders? </Text>
                <Ionicons name='chevron-down-outline' color={'grey'} size={30} />
            </View>

            <View style={styles.main} >
                <Text style={styles.textContianer} > What if I want to return something? </Text>
                <Ionicons name='chevron-down-outline' color={'grey'} size={30}  />
            </View>

            <View style={styles.main} >
                <Text style={styles.textContianer} > Can I reschedule my order? </Text>
                <Ionicons name='chevron-down-outline' color={'grey'} size={30}  />
            </View>



        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 28,
        color: 'white',
        marginTop: 20,
        fontWeight: 'bold'
    },
    paymentContainer: {
        justifyContent:'flex-start',
        fontSize: 18, 
        padding:10,
        marginBottom: 5,
        marginBottom: 5
    },
    main: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textContianer:{
        padding:15,
        fontSize: 17,
        color: 'grey',
    }
});

export default FAQScreen;


// import React, { useState } from 'react';
// import { View, StyleSheet, Text } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import { sub } from 'react-native-reanimated';
// import { computeWindowedRenderLimits } from 'react-native/Libraries/Lists/VirtualizeUtils';
// import FAQ from '../../../dummy-data/FAQ';



// const FAQScreen = props => {
//     const [currentIndex, setCurrentIndex] = useState(null)
//     return (
//         <View style={styles.container}>
//             {/* <Text style={styles.title} >Frequently Asked Questions</Text> */}
//             {FAQ.map(({title,subCategories,bg,color,},index) => {
//                 return <TouchableOpacity key={title} onPress={() => {
//                     setCurrentIndex(index===currentIndex? null : index);
//                 }} style={styles.cardContainer} activeOpacity={0.9}>
//                     <View style={[styles.card, {backgroundColor: bg}]}>
//                         <Text style={[styles.heading,{color}]}>{title}</Text>
//                         {index === currentIndex && <View style={styles.subCategoriesList}>
//                             {subCategories.map(subCategory => (
//                                 <Text key={subCategory} style={[styles.body,{color}]}>{subCategory}</Text>
//                             ))}
//                         </View>}
//                     </View>
//                 </TouchableOpacity>
//             })}
//         </View>

//     );
// }
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         backgroundColor: '#fff',
//         padding:10,
//     },
//     title:{
//         textAlign:'center',
//         fontSize:40,
//         fontWeight:'bold',
//         marginBottom:15
//     },
//     cardContainer:{
//         flexGrow:1,
//     },
//     card:{
//         flexGrow:1,
//         borderRadius:10,
//         alignItems:'center',
//         justifyContent:'center',
//         marginVertical:10
//     },
//     heading:{
//         fontSize:25,
//         fontWeight:'900',
//         textTransform:'capitalize',
//         marginBottom:15,
//     },
//     body:{
//         fontSize:18,
//         lineHeight: 20 * 1.5,
//         textAlign:'center'
//     }
// });


// export default FAQScreen;

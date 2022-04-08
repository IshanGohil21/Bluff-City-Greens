import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {Icons, Colors} from '../../CommonConfig/CommonConfig';
import FAQ from '../../dummy-data/FAQ';


const FAQScreen = (props) => {
    const [currentIndex, setCurrentIndex] = useState(null)
    const [activeSections, setActiveSections] = useState('');

    const [collapsed, setCollapsed] = useState(true);


    const _head = (item) => {
        return(
            <Separator bordered style={{alignItems:'center'}}>
              <Text>{item.title}</Text>
            </Separator>
        );
    }

    const _body = (item) => {
        return (
            <View style={{padding:10}}>
              <Text style={{textAlign:'center'}}>{item.body}</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }} >
            {/*  HEADER */}
            <View style={{ padding: 20, backgroundColor: Colors.primary , fontSize: 30 }}>
                <TouchableOpacity onPress={() => { props.navigation.goBack() }} >
                    <Ionicons
                        name={Icons.BACK_ARROW}
                        size={30}
                        color={Colors.white}
                    />
                </TouchableOpacity>
                <Text style={styles.text} > FAQ </Text>
            </View>
            {/* BODY */}
            <View>
                <Text style={styles.paymentContainer} > Payment Related queries </Text>
            </View>

        <View> 
         {FAQ.map(item=>{
            return( 
                <View key={item.id}>
                    <View  style={styles.main}>
                        <Text style={styles.textContianer} >{item.q}</Text>
                        <TouchableOpacity  onPress={() => {}} >
                            
                        <Ionicons  name={Icons.DOWN_ARROW} size={24} color={Colors.grey} />
                        </TouchableOpacity>
                    </View>
                    <View key={item.id}>
                        <Text  style={styles.textContianer} > {item.a} </Text>
                    </View>
                </View>
            )
        })}
        </View>

            {/* <View style={styles.main} >
                <Text style={styles.textContianer} > How can I make paymemt to Thank Green? </Text>
                <Ionicons name={Icons.DOWN_ARROW} color={Colors.grey} size={30} />
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
            </View>  */}

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
        justifyContent: 'space-between',
        padding:10
    },
    textContianer:{
        //padding:5,
        fontSize: 14,
        color: 'grey',
    }
});

export default FAQScreen;



// import React, { Component } from 'react';
// import {
//   Switch,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
// } from 'react-native';
// import Constants from 'expo-constants';
// import * as Animatable from 'react-native-animatable';
// import Collapsible from 'react-native-collapsible';
// import Accordion from 'react-native-collapsible/Accordion';

// const BACON_IPSUM =
//   'Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs. Picanha beef prosciutto meatball turkey shoulder shank salami cupim doner jowl pork belly cow. Chicken shankle rump swine tail frankfurter meatloaf ground round flank ham hock tongue shank andouille boudin brisket. ';

// const CONTENT = [
//   {
//     title: 'First',
//     content: BACON_IPSUM,
//   },
//   {
//     title: 'Second',
//     content: BACON_IPSUM,
//   },
//   {
//     title: 'Third',
//     content: BACON_IPSUM,
//   },
//   {
//     title: 'Fourth',
//     content: BACON_IPSUM,
//   },
//   {
//     title: 'Fifth',
//     content: BACON_IPSUM,
//   },
// ];

// const SELECTORS = [
//   {
//     title: 'First',
//     value: 0,
//   },
//   {
//     title: 'Third',
//     value: 2,
//   },
//   {
//     title: 'None',
//   },
// ];

// export default class App extends Component {
//   state = {
//     activeSections: [],
//     collapsed: true,
//     multipleSelect: false,
//   };

//   toggleExpanded = () => {
//     this.setState({ collapsed: !this.state.collapsed });
//   };

//   setSections = (sections) => {
//     this.setState({
//       activeSections: sections.includes(undefined) ? [] : sections,
//     });
//   };

//   renderHeader = (section, _, isActive) => {
//     return (
//       <Animatable.View
//         duration={400}
//         style={[styles.header, isActive ? styles.active : styles.inactive]}
//         transition="backgroundColor"
//       >
//         <Text style={styles.headerText}>{section.title}</Text>
//       </Animatable.View>
//     );
//   };

//   renderContent(section, _, isActive) {
//     return (
//       <Animatable.View
//         duration={400}
//         style={[styles.content, isActive ? styles.active : styles.inactive]}
//         transition="backgroundColor"
//       >
//         <Animatable.Text animation={isActive ? 'bounceIn' : undefined}>
//           {section.content}
//         </Animatable.Text>
//       </Animatable.View>
//     );
//   }

//   render() {
//     const { multipleSelect, activeSections } = this.state;

//     return (
//       <View style={styles.container}>
//         <ScrollView contentContainerStyle={{ paddingTop: 30 }}>
//           <Text style={styles.title}>Accordion Example</Text>

//           <View style={styles.multipleToggle}>
//             <Text style={styles.multipleToggle__title}>Multiple Select?</Text>
//             <Switch
//               value={multipleSelect}
//               onValueChange={(a) => this.setState({ multipleSelect: a })}
//             />
//           </View>

//           <View style={styles.selectors}>
//             <Text style={styles.selectTitle}>Select:</Text>

//             {SELECTORS.map((selector) => (
//               <TouchableOpacity
//                 key={selector.title}
//                 onPress={() => this.setSections([selector.value])}
//               >
//                 <View style={styles.selector}>
//                   <Text
//                     style={
//                       activeSections.includes(selector.value) &&
//                       styles.activeSelector
//                     }
//                   >
//                     {selector.title}
//                   </Text>
//                 </View>
//               </TouchableOpacity>
//             ))}
//           </View>

//           <TouchableOpacity onPress={this.toggleExpanded}>
//             <View style={styles.header}>
//               <Text style={styles.headerText}>Single Collapsible</Text>
//             </View>
//           </TouchableOpacity>
//           <Collapsible collapsed={this.state.collapsed} align="center">
//             <View style={styles.content}>
//               <Text>
//                 Bacon ipsum dolor amet chuck turducken landjaeger tongue spare
//                 ribs
//               </Text>
//             </View>
//           </Collapsible>
//           <Accordion
//             activeSections={activeSections}
//             sections={CONTENT}
//             touchableComponent={TouchableOpacity}
//             expandMultiple={multipleSelect}
//             renderHeader={this.renderHeader}
//             renderContent={this.renderContent}
//             duration={400}
//             onChange={this.setSections}
//             renderAsFlatList={false}
//           />
//         </ScrollView>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5FCFF',
//     paddingTop: Constants.statusBarHeight,
//   },
//   title: {
//     textAlign: 'center',
//     fontSize: 22,
//     fontWeight: '300',
//     marginBottom: 20,
//   },
//   header: {
//     backgroundColor: '#F5FCFF',
//     padding: 10,
//   },
//   headerText: {
//     textAlign: 'center',
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   content: {
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   active: {
//     backgroundColor: 'rgba(255,255,255,1)',
//   },
//   inactive: {
//     backgroundColor: 'rgba(245,252,255,1)',
//   },
//   selectors: {
//     marginBottom: 10,
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   selector: {
//     backgroundColor: '#F5FCFF',
//     padding: 10,
//   },
//   activeSelector: {
//     fontWeight: 'bold',
//   },
//   selectTitle: {
//     fontSize: 14,
//     fontWeight: '500',
//     padding: 10,
//   },
//   multipleToggle: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginVertical: 30,
//     alignItems: 'center',
//   },
//   multipleToggle__title: {
//     fontSize: 16,
//     marginRight: 8,
//   },
// });
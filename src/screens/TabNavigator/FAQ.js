import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {Icons, Colors} from '../../CommonConfig/CommonConfig';
import FAQ from '../../dummy-data/FAQ';
import Collapsible from 'react-native-collapsible';
import * as Animatable from 'react-native-animatable';
import Accordian from '../../components/Accordian(FAQ)';
import { ScrollView } from 'react-native-gesture-handler';

const FAQScreen = (props) => {
    
    const renderAccordians = () => {
        const items = [];
        for(const item of FAQ){
            items.push(
                <Accordian 
                    q = {item.q}
                    data= {item.a}
                />
            )
        }
        return items
    }

    return (
        <ScrollView>
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
            {renderAccordians()}
        </View>
        </ScrollView>
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

/* BODY
            <View>
                <Text style={styles.paymentContainer} > Payment Related queries </Text>
            </View>

        <View> 
         {FAQ.map(item=>{
            return( 
                <View key={item.id}>
                    <View  style={styles.main}>
                        <Text style={styles.textContianer} >{item.q}</Text>
                        <TouchableOpacity 
                        
                         onPress={() => setActiveSections([item.a])}
                        //onPress={toggleExpanded}
                        >
                        <Ionicons  name={Icons.DOWN_ARROW} size={24} color={Colors.grey} />
                        </TouchableOpacity>
                    </View>
                    
                    {/* <Collapsible collapsed={iscollapsed}>
                    <View key={item.id}>
                        <Text  style={styles.textContianer} > {item.a} </Text>
                    </View>
                    </Collapsible> 
                    <Accordion 
                    // collapsed={iscollapsed}
                    renderHeader={renderHeader}
                    renderContent={renderContent}
                    sections={FAQ}
                    onChange={setSections}
                    expandMultiple={multipleSelect}
                    duration={5000}
                    >
                    <View key={item.id}>
                        <Text  style={styles.textContianer} > {item.a} </Text>
                    </View>
                    </Accordion>
                </View>
            )
        })}
        </View> */

        // const [currentIndex, setCurrentIndex] = useState(null)

//     const [iscollapsed, setCollapsed] = useState(true);

//     const toggleExpanded = () => {
//         setCollapsed(!iscollapsed)
//     }

//     const [activeScetions, setActiveSections] = useState('');
//     const [multipleSelect, setmultipleSelect] = useState(false);

//    const [sections, setSections] = useState([]);

//    const renderHeader = (item, isActive) => {
//        return (
//            <Animatable.View
//            duration={5000}
//            transition="backgroundColor"
//            >
//                <Text> {item.q} </Text>
//            </Animatable.View>
//        )
//    }

//    const renderContent = (item, isActive ) => {
//        return(
//            <Animatable.View
//            duration={5000}
//            transition="backgroundColor"
//            >
//                <Animatable.Text>
//                    {item.a}
//                </Animatable.Text>
//            </Animatable.View>
//        )
//    }





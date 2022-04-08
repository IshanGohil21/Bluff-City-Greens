import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styleProps } from 'react-native-web/dist/cjs/modules/forwardedProps';
import {Colors, Icons} from '../../CommonConfig/CommonConfig';

const AccessibilityPolicyScreen = (props) => {
  return (
    <View>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {
          props.navigation.goBack()
        }}>
          <Ionicons name={Icons.BACK_ARROW} color={Colors.white} size={28} style={styles.icon} />
        </TouchableOpacity>

        {/* Title */}
        <View >
          <Text style={styles.policy}>Accessibility Policy</Text>
        </View>
      </View>

      {/* Footer */}
      <View>
        <View style={styles.fontContainer}  >
          <Text style={styles.font}>
            At Thank Greens, we are committes to ensuring that inidividuals with disabilities can access all of the goods,services,facilities,privileges,advantanges and accomodations offered by Thank Greens through its mobile applications.{"\n"}
          </Text>
          <Text style={styles.font}>
            If you are having trouble accessing mobile apps, please call Customer Care at <Text style={{ color: 'green', fontWeight: 'bold' }} > 1-800-234-2790 </Text> or <Text style={styles.email} > email us </Text> for assistance.{"\n"}
          </Text>
          <Text  style={styles.font}>
            Google Chrome has internet accessibility limitations when using with the Thank Greens application on the android platform. The Thank Greens application cannot work around these limitations, therefore we recommend using Mozilla Firefox as an alternative browser, especially if accessibility tools or assistive technology will be used in conjuction with the Thank Greens Application . Mozilla Firefox is only supported platform when using accessibility tool or assistive technology on Android Devices. <Text style={{ color: Colors.green}} >To download the Mozilla Firefox browser, please click here. </Text>
          </Text>
          <View style={styles.footer} >
          <View style={{width: '100%'}} >
            <TouchableOpacity onPress={() => { }} style={styles.agree}>
              <Text style={styles.signin}> AGREE </Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  fontContainer: {
    alignItems: 'flex-start',
    padding: 10
  },
  font: {
    fontSize: 18,
    textAlign: 'left'
  },
  font2: {
    marginTop: 20
  },
  signin: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.green,
    textAlign: 'center',
    color: Colors.white,
    fontSize: 23,
    padding: 10,
    borderRadius: 10,
    borderColor: Colors.green,
    overflow: 'hidden',
    width: '100%',
  },
  header: {
    padding: 10, 
    backgroundColor: Colors.primary
  },
  email: {
    color: Colors.green,
    fontWeight: 'bold' 
  },
  policy: {
    color: Colors.white, 
    fontSize: 30,
    padding: 20, 
    fontWeight: 'bold'
  },
  footer: {
    alignItems:'center', 
    width: '100%'
  },
  agree: {
    marginTop: 50,
    marginHorizontal: 40 
  },
  icon:{
    marginTop: 30
  }
});

export default AccessibilityPolicyScreen;
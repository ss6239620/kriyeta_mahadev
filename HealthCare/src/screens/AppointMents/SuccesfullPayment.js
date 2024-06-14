import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {  blackText, blueText, grayText, colorTheme } from '../../constant'
import Header from '../../components/Header'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


export default function Chat({navigation}) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.subContainer}>
          <Header header={"Payment"} leftIconName={true} titleMargin={40} />
          <View style={{ justifyContent: "center", alignItems: 'center', marginTop: 100 }}>
            <AntDesign name={"checkcircle"} size={100} color={colorTheme.primaryColor} />
            <Text style={[styles.bigText, { fontWeight: "900", fontSize: 25, marginTop: 10 }]}>Payment Successfull!</Text>
            <Text style={[styles.smallText, { marginTop: 15 }]}>You have Successfully booked appointment with</Text>
            <Text style={styles.bigText}>Dr. Jonny Wilson</Text>
          </View>
          <View style={{ marginTop: 30, backgroundColor: "white", elevation: 2, marginBottom: 10, flexDirection: 'row', borderRadius: 10, justifyContent: "space-between" }}>
            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialIcons name={"person"} size={25} color={colorTheme.primaryColor} />
                <Text style={[styles.smallText, { color: "black", marginLeft: 5 }]}>Ether Howard</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
                <MaterialIcons name={"date-range"} size={25} color={colorTheme.primaryColor} />
                <Text style={[styles.smallText, { color: "black", marginLeft: 5 }]}>16 Aug, 2023</Text>
              </View>
            </View>
            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialIcons name={"attach-money"} size={25} color={colorTheme.primaryColor} />
                <Text style={[styles.smallText, { color: "black", marginLeft: 5 }]}>$20</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
                <MaterialIcons name={"watch-later"} size={25} color={colorTheme.primaryColor} />
                <Text style={[styles.smallText, { color: "black", marginLeft: 5 }]}>10:00 AM</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={{
        width: "100%",
        height: 120,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 1,
        // backgroundColor:'white',
        justifyContent: "center",
        alignItems: "center"
      }}>
        <TouchableOpacity
          style={{ backgroundColor: blueText.color, width: "90%", height: 40, borderRadius: 50, justifyContent: "center",marginBottom:10 }}
        // onPress={() => navigation.navigate('PatientDetails')}
        >
          <Text style={[styles.smallText, { color: "white", alignSelf: 'center' }]}>View Application</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{  width: "90%", height: 40, borderRadius: 50, justifyContent: "center" }}
        onPress={() => navigation.navigate('Home')}
        >
          <Text style={[styles.smallText, { color: blueText.color, alignSelf: 'center' }]}>Go to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorTheme.appBackGroundColor
  },
  subContainer: {
    width: "90%",
    height: "auto",
    alignSelf: "center",
  },
  bigText: {
    fontSize: blackText.fontSize,
    color: blackText.color,
    fontWeight: blackText.fontWeight
  },
  smallText: {
    fontSize: grayText.fontSize,
    color: grayText.color,
    fontWeight: grayText.fontWeight
  },
  blueText: {
    fontSize: blueText.fontSize,
    color: blueText.color,
    fontWeight: blueText.fontWeight
  },
})
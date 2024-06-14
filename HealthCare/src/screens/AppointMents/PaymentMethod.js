import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { blackText, blueText, colorTheme, grayText } from '../../constant'
import Header from '../../components/Header'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import RadioButton from '../../components/RadioButton'
import { PayNow } from '../../components/PayWithUpi'

function Payment({ icon, method,colors }) {
  return (
    <Pressable 
    onPress={()=>{PayNow()}}
    style={{ flexDirection: "row", borderWidth: 1, borderColor: colorTheme.borderColor, borderRadius: 10, height: 45, alignItems: 'center',marginTop:5 }}>
      <FontAwesome6 name={icon} size={35} color={colors} style={{ marginLeft: 10, marginRight: 10 }} />
      <Text>{method}</Text>
    </Pressable>
  )
}
export default function PaymentMethod() {
  const [selected, setselected] = useState(true)
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Header header={"Payment Methods"} leftIconName titleMargin={20} />
        <Text style={[styles.bigText, { marginTop: 25 }]}>Credit & Debit Card</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", elevation: 1, backgroundColor: "white", borderColor: colorTheme.borderColor, borderWidth: 1, height: 45, borderRadius: 10, marginTop: 15 }}>
          <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
            <MaterialIcons name={"credit-card"} size={25} color={colorTheme.primaryColor} style={{ marginLeft: 10 }} />
            <Text style={[styles.grayText, { marginLeft: 5 }]}>Add New Card</Text>
          </View>
          <TouchableOpacity onPress={() => selected ? setselected(false) : setselected(true)} style={{ marginRight: 10 }}>
            <RadioButton selected={selected} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.bigText, { marginTop: 25 }]}>Pay with UPI</Text>
        <Payment icon={"google-pay"} method={"Click here to pay with upi"} colors={"black"}/>
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
    // backgroundColor:"red"
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
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { blackText, blueText, colorTheme, grayText } from '../../constant'
import Header from '../../components/Header'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

function Details({ title, inputTitle, inputBoxRequire }) {
  const [search, setSearch] = useState('')
    return (
        <>
            <Text style={[styles.smallText, { marginTop: 25, color: "black" }]}>{title}</Text>
            {inputBoxRequire
                ?
                    <TextInput
                        placeholder='Write here...'
                        onChangeText={(text)=>setSearch(text)}
                        value={search}
                        style={styles.textInput}
                        multiline
                    />
                :
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", elevation: 1, backgroundColor: "white", borderColor: colorTheme.borderColor, borderWidth: 1, height: 45, borderRadius: 10, marginTop: 10 }}>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <Text style={[styles.grayText, { marginLeft: 15, color: "black" }]}>{inputTitle}</Text>
                    </View>
                    <MaterialIcons name="keyboard-arrow-down" color={colorTheme.primaryColor} size={35} style={{}} />
                </View>
            }
        </>
    )
}

export default function PatientDetails({navigation}) {
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.subContainer}>
                    <Header header={"Patient Details"} leftIconName />
                    <Details title={"Booking For"} inputTitle={"Self"} />
                    <Details title={"Gender"} inputTitle={"Male"} />
                    <Details title={"Your Age"} inputTitle={"24 Years"} />
                    <Details title={"Write Your Problem"} inputBoxRequire />
                </View>
            </ScrollView>
            <View style={{
                width: "100%",
                height: 70,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                elevation: 1,
                // backgroundColor:'white',
                justifyContent: "center",
                alignItems: "center"
            }}>
                <TouchableOpacity
                    style={{ backgroundColor: blueText.color, width: "90%", height: 40, borderRadius: 50, justifyContent: "center" }}
                onPress={() => navigation.navigate('PaymentMethod')}
                >
                    <Text style={[styles.smallText, { color: "white", alignSelf: 'center' }]}>Next</Text>
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
    textInput: {
        borderRadius: 10,
        backgroundColor: "white",
        padding: 7,
        borderWidth: 1,
        borderColor: colorTheme.borderColor,
        height:200,
        textAlignVertical:'top',
    },
})